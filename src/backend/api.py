import os
import json
import uuid
import time
import random
import string
import tempfile
import os
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_file, send_from_directory

# Try different moviepy import approaches to ensure compatibility
try:
    from moviepy.editor import VideoFileClip
except ImportError:
    try:
        from moviepy import VideoFileClip
    except ImportError:
        print("Warning: Could not import VideoFileClip from moviepy. Video processing will be unavailable.")
        VideoFileClip = None

import torch
from openai import OpenAI
from deepgram import DeepgramClient, PrerecordedOptions
from model.model import Model

# Check and retrieve environment variables
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("Missing OpenAI API Key. Set OPENAI_API_KEY in .env file.")
DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
if not DEEPGRAM_API_KEY:
    raise ValueError("Missing Deepgram API Key. Set DEEPGRAM_API_KEY in .env file.")

# Check if CUDA is available
print("!!t!!")
print("CUDA is available?", torch.cuda.is_available())

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
video_path = os.path.join(BASE_DIR, "video.mp4")
audio_path = os.path.join(BASE_DIR, "audio.mp3")

# Create a directory for saved interviews if it doesn't exist
saved_interviews_dir = os.path.join(BASE_DIR, "saved_interviews")
if not os.path.exists(saved_interviews_dir):
    os.makedirs(saved_interviews_dir)

# Initialize Flask app with static folder support
app = Flask(__name__, static_folder='static')
transcript = ""

# Initialize OpenAI client based on version
if OPENAI_VERSION == 1:
    # For newer versions (>=1.0.0)
    # Use a custom transport that explicitly doesn't use proxies
    # This is needed because some environments have proxy settings that aren't compatible with OpenAI SDK v1.12.0+
    try:
        # First try importing httpx which is required for OpenAI SDK 1.x
        import httpx
        # Create a transport with no proxies
        http_client = httpx.Client()
        # Make sure the transport doesn't use any proxies
        client = OpenAI(
            api_key=OPENAI_API_KEY,
            http_client=http_client
        )
        print("OpenAI client initialized with custom HTTP client")
    except (ImportError, TypeError) as e:
        print(f"Error initializing OpenAI with custom client: {e}")
        # Fallback to basic initialization which may still fail
        client = OpenAI(api_key=OPENAI_API_KEY)
        print("OpenAI client initialized with default settings")
else:
    # For older versions (<1.0.0)
    openai.api_key = OPENAI_API_KEY
    client = openai

# Initialize the model
model = Model()


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,OPTIONS,POST,PUT'
    return response


@app.route('/question_suggestions', methods=['POST'])
def question_suggestions():
    data = request.get_json()
    print("get questions for:", data)
    
    role = data.get('role', '')
    company = data.get('company', '')
    style = data.get('style', '')

    try:
        questions = model.get_questions_from_model(role, company, style)
        return jsonify({"questions": questions}), 200
    except Exception as e:
        return jsonify({"error": f"Error during query: {str(e)}"}), 500


# accepts video blob from js frontend
@app.route('/upload', methods=['POST'])
def upload():
    # Check if the 'file' part is in the request
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']  # Get the file from the request
    file.save(video_path)

    # Convert MP4 to MP3 using moviepy
    try:
        # Load video file using MoviePy
        video = VideoFileClip(video_path)
        audio = video.audio

        # Save audio as MP3
        audio.write_audiofile(audio_path)

        audio.close()
        video.close()

        return jsonify({"message": "File uploaded successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Error processing file: {str(e)}"}), 500



# Transcribe audio
@app.route('/transcribe', methods=['GET'])
def transcribe():
    global transcript
    # try:
    #     # Open the audio file in binary read mode
    #     with open(audio_path, "rb") as audio_file:
    #         # whisper-1 is the API-optimized version of the large-v2 model
    #         transcription = client.audio.transcriptions.create(
    #             model="whisper-1", 
    #             file=audio_file, 
    #             response_format="text"
    #         )
    #         transcript = transcription
        
    #     return jsonify({"transcript": transcript}), 200
    
    try:
        # Initialize deepgram client
        deepgram = DeepgramClient(DEEPGRAM_API_KEY)

        with open(audio_path, "rb") as audio_file:
            payload = { 'buffer': audio_file }
            options = PrerecordedOptions(
                punctuate=True,
                model="nova-2", 
                language="en-US",
                filler_words=True,
            )

            response = deepgram.listen.rest.v('1').transcribe_file(payload, options)
            transcript = response["results"]["channels"][0]["alternatives"][0]["transcript"]

        return jsonify({"transcript": transcript}), 200

    except Exception as e:
        return jsonify({"error": f"Error during transcription: {str(e)}"}), 500



# Query the OpenAI GPT-4 model
@app.route('/rate_answer', methods=['POST'])
def query():
    # Get input data from the request
    data = request.get_json()
    print(data)
    role = data.get('role', '')
    company = data.get('company', '')
    question = data.get('question', '')
    transcript_data = data.get('transcript', '')
    style = data.get('style', '')
    wpm = data.get('wpm', 0)
    filler_words = data.get('fillerWords', {})
    total_filler_words = data.get('totalFillerWords', 0)
    
    # Check if this is an assessment centre request
    if style == 'assessment-centre' or data.get('isAssessmentCentre', False):
        return assessment_centre_feedback(data)
    
    # Check if required fields are present
    if not all([role, company, question, transcript_data]):
        return jsonify({"error": "All fields (role, company, question, transcript) are required"}), 400

    # Send the input data to the model
    try:
        feedback = model.query_model_for_feedback(
            role=role, 
            company=company, 
            question=question, 
            answer=transcript_data, 
            wpm=wpm, 
            filler_words=filler_words, 
            total_filler_words=total_filler_words
        )
        return jsonify({"feedback": feedback}), 200
    except Exception as e:
        return jsonify({"error": f"Error during query: {str(e)}"}), 500


# Dedicated endpoint for assessment centre feedback
@app.route('/assessment_centre_feedback', methods=['POST'])
def assessment_centre_feedback(data=None):
    # If data is not provided, get it from the request
    if data is None:
        data = request.get_json()
        print("Assessment Centre Feedback Request:", data)
    
    # Extract data
    role = data.get('role', 'Candidate')
    company = data.get('company', 'Assessment Centre')
    question = data.get('question', '')
    transcript_data = data.get('transcript', '')
    participant_name = data.get('participantName', 'Participant')
    other_participants = data.get('otherParticipants', [])
    
    # Check if required fields are present
    if not all([question, transcript_data]):
        return jsonify({"error": "Question and transcript are required"}), 400

    try:
        # Format the response with structured feedback
        # This is a more detailed feedback format specifically for assessment centres
        feedback_text = model.query_model_for_feedback(
            role=role, 
            company=company, 
            question=question, 
            answer=transcript_data,
            context="assessment centre evaluation"
        )
        
        # Parse the feedback to extract various sections
        import re
        
        # Initialize response sections
        strengths = []
        improvements = []
        team_contribution = ""
        team_interaction = ""
        participation_balance = ""
        individual_assessments = {}
        score = None
        name_references = {}
        
        # Extract a score if present (looking for patterns like "Score: 7/10" or "Rating: 8")
        score_match = re.search(r'(?:score|rating)\s*(?::|is)?\s*(\d+)(?:\s*\/\s*10)?', feedback_text.lower())
        if score_match:
            try:
                score = int(score_match.group(1))
                # Ensure score is between 1-10
                score = max(1, min(10, score))
            except:
                score = None
        
        # Extract team contribution section
        team_contribution_section = re.search(r'(?:overall team contribution|team contribution)\s*:(.+?)(?:team interaction|strengths|improvements|areas for improvement|participation balance|score|$)', 
                                            feedback_text.lower(), re.DOTALL)
        if team_contribution_section:
            team_contribution = team_contribution_section.group(1).strip()
        
        # Extract team interaction section
        team_interaction_section = re.search(r'(?:team interaction)\s*:(.+?)(?:strengths|improvements|areas for improvement|participation balance|score|$)', 
                                           feedback_text.lower(), re.DOTALL)
        if team_interaction_section:
            team_interaction = team_interaction_section.group(1).strip()
        
        # Extract participation balance section
        participation_section = re.search(r'(?:participation balance)\s*:(.+?)(?:score|conclusion|summary|$)', 
                                        feedback_text.lower(), re.DOTALL)
        if participation_section:
            participation_balance = participation_section.group(1).strip()
        
        # Look for strengths section
        strengths_section = re.search(r'(?:strengths)\s*:(.+?)(?:improvements|areas for improvement|weaknesses|areas to improve|participation balance|score|overall|conclusion|summary|$)', 
                                     feedback_text.lower(), re.DOTALL)
        if strengths_section:
            # Extract bullet points or numbered items
            strength_items = re.findall(r'(?:^|\n)\s*(?:\-|\*|\d+\.)\s*(.+?)(?=\n\s*(?:\-|\*|\d+\.)|$)', 
                                       strengths_section.group(1), re.DOTALL)
            if strength_items:
                strengths = [item.strip() for item in strength_items if item.strip()]
            else:
                # If no bullet points, split by sentences
                strength_text = strengths_section.group(1).strip()
                strengths = [s.strip() for s in re.split(r'(?<=[.!?])\s+', strength_text) if s.strip()]
        
        # Look for improvements section
        improvements_section = re.search(r'(?:improvements|areas for improvement|weaknesses|areas to improve)\s*:(.+?)(?:participation balance|score|overall|conclusion|summary|$)', 
                                       feedback_text.lower(), re.DOTALL)
        if improvements_section:
            # Extract bullet points or numbered items
            improvement_items = re.findall(r'(?:^|\n)\s*(?:\-|\*|\d+\.)\s*(.+?)(?=\n\s*(?:\-|\*|\d+\.)|$)', 
                                         improvements_section.group(1), re.DOTALL)
            if improvement_items:
                improvements = [item.strip() for item in improvement_items if item.strip()]
            else:
                # If no bullet points, split by sentences
                improvement_text = improvements_section.group(1).strip()
                improvements = [s.strip() for s in re.split(r'(?<=[.!?])\s+', improvement_text) if s.strip()]
        
        # Count name references if other participants are provided
        if other_participants and isinstance(other_participants, list):
            for participant in other_participants:
                if isinstance(participant, str) and participant.strip():
                    # Count occurrences of the participant's name in the transcript
                    name_count = len(re.findall(r'\b' + re.escape(participant.strip()) + r'\b', transcript_data, re.IGNORECASE))
                    name_references[participant.strip()] = name_count
        
        # Extract individual assessments section
        individual_assessments_section = re.search(r'(?:individual assessments)\s*:(.+?)(?:score|conclusion|summary|$)', 
                                                 feedback_text.lower(), re.DOTALL)
        if individual_assessments_section:
            # Try to extract assessments for each participant
            participant_assessments = re.findall(r'([^:\n]+)\s*:\s*(.+?)(?=\n\s*[^:\n]+\s*:|$)', 
                                               individual_assessments_section.group(1), re.DOTALL)
            for name, assessment in participant_assessments:
                individual_assessments[name.strip()] = assessment.strip()
        
        # Prepare the response
        response = {
            "feedback": feedback_text,
            "teamContribution": team_contribution,
            "teamInteraction": team_interaction,
            "participationBalance": participation_balance,
            "strengths": strengths,
            "improvements": improvements,
            "individualAssessments": individual_assessments,
            "nameReferences": name_references,
            "score": score,
            "timestamp": datetime.now().isoformat()
        }
        
        return jsonify(response), 200
    except Exception as e:
        print(f"Error generating assessment centre feedback: {str(e)}")
        return jsonify({"error": f"Error generating feedback: {str(e)}"}), 500
    

# Save interview
@app.route('/save_interview', methods=['POST'])
def save_interview():
    data = request.get_json()
    role = data.get('role', '')
    company = data.get('company', '')
    question = data.get('question', '')
    answer = data.get('transcript', '')
    feedback = data.get('feedback', '')
    interview_style = data.get('style', '')
    wpm = data.get('wpm', 0)
    filler_words = data.get('fillerWords', '{}')
    total_filler_words = data.get('totalFillerWords', 0)
    filler_words_percentage = data.get('fillerWordsPercentage', 0)
    
    # Validate required fields
    if not all([role, company, question, answer]):
        return jsonify({"error": "Missing required fields"}), 400
        
    try:
        # Create a unique ID based on timestamp
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        interview_id = f"{timestamp}"
        
        # Create the interview data structure
        interview_data = {
            "id": interview_id,
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "role": role,
            "company": company,
            "style": interview_style,
            "question": question,
            "answer": answer,
            "feedback": feedback,
            "wpm": wpm,
            "fillerWords": filler_words,
            "totalFillerWords": total_filler_words,
            "fillerWordsPercentage": filler_words_percentage
        }
        
        # Save to a JSON file
        interview_file = os.path.join(saved_interviews_dir, f"{interview_id}.json")
        with open(interview_file, 'w') as f:
            json.dump(interview_data, f, indent=2)
            
        # Copy the video file if it exists
        if os.path.exists(video_path):
            import shutil
            video_save_path = os.path.join(saved_interviews_dir, f"{interview_id}.mp4")
            shutil.copy2(video_path, video_save_path)
            
        return jsonify({"message": "Interview saved successfully", "id": interview_id}), 200
    except Exception as e:
        return jsonify({"error": f"Error saving interview: {str(e)}"}), 500


# Get all saved interviews
@app.route('/saved_interviews', methods=['GET'])
def get_saved_interviews():
    try:
        interviews = []
        # List all JSON files in the saved_interviews directory
        for filename in os.listdir(saved_interviews_dir):
            if filename.endswith('.json'):
                with open(os.path.join(saved_interviews_dir, filename), 'r') as f:
                    interview_data = json.load(f)
                    interviews.append(interview_data)
                    
        # Sort interviews by date, newest first
        interviews.sort(key=lambda x: x.get('date', ''), reverse=True)
                    
        return jsonify({"interviews": interviews}), 200
    except Exception as e:
        return jsonify({"error": f"Error retrieving saved interviews: {str(e)}"}), 500


# Get a specific saved interview by ID
@app.route('/saved_interviews/<interview_id>', methods=['GET'])
def get_saved_interview(interview_id):
    try:
        interview_file = os.path.join(saved_interviews_dir, f"{interview_id}.json")
        if not os.path.exists(interview_file):
            return jsonify({"error": "Interview not found"}), 404
            
        with open(interview_file, 'r') as f:
            interview_data = json.load(f)
            
        return jsonify(interview_data), 200
    except Exception as e:
        return jsonify({"error": f"Error retrieving interview: {str(e)}"}), 500


# Transcribe audio from assessment centre participants
@app.route('/transcribe_audio', methods=['POST'])
def transcribe_audio():
    try:
        # Check if the 'file' part is in the request
        if 'file' not in request.files:
            return jsonify({"error": "No audio file provided"}), 400

        audio_file = request.files['file']  # Get the file from the request
        participant_index = request.form.get('participantIndex', '0')
        participant_name = request.form.get('participantName', f'Participant {participant_index}')
        
        # Create a temporary file for the audio
        temp_audio_path = os.path.join(tempfile.gettempdir(), f"participant_{participant_index}_audio_{uuid.uuid4()}.webm")
        audio_file.save(temp_audio_path)
        
        print(f"Saved audio file for {participant_name} to {temp_audio_path}")
        
        try:
            # Enhanced OpenAI Whisper configuration for better quality transcription
            print(f"Starting OpenAI transcription for {participant_name}...")
            with open(temp_audio_path, "rb") as audio:
                transcription = client.audio.transcriptions.create(
                    model="whisper-1", 
                    file=audio, 
                    response_format="verbose_json",  # Get more detailed response with timestamps
                    language="en",  # Specify language for better accuracy
                    prompt="This is a professional interview conversation with multiple speakers."  # Context helps accuracy
                )
                
            # Extract detailed transcription information
            if hasattr(transcription, 'text'):
                transcript_text = transcription.text
            else:
                transcript_text = transcription.get('text', '')
                
            print(f"OpenAI Whisper transcription completed for {participant_name}")
            print(f"Transcript sample: {transcript_text[:100]}...")
            
        except Exception as whisper_error:
            print(f"Error with OpenAI Whisper: {str(whisper_error)}. Trying Deepgram...")
            
            # Fallback to Deepgram if Whisper fails
            try:
                deepgram = DeepgramClient(DEEPGRAM_API_KEY)
                
                with open(temp_audio_path, "rb") as audio:
                    payload = {'buffer': audio}
                    options = PrerecordedOptions(
                        punctuate=True,
                        model="nova-2", 
                        language="en-US",
                        filler_words=True,
                        diarize=True  # Enable speaker identification
                    )
                    
                    response = deepgram.listen.rest.v('1').transcribe_file(payload, options)
                    transcript_text = response['results']['channels'][0]['alternatives'][0]['transcript']
                    print(f"Deepgram transcription completed for {participant_name}")
                    
            except Exception as deepgram_error:
                return jsonify({"error": f"Error transcribing with both services: {str(whisper_error)} and {str(deepgram_error)}"}), 500
        
        # Clean up the temporary file
        try:
            os.remove(temp_audio_path)
        except:
            print(f"Warning: Failed to remove temporary audio file: {temp_audio_path}")
        
        # Format the transcript with the participant name
        formatted_transcript = f"{participant_name}: {transcript_text}"
        
        return jsonify({
            "transcript": formatted_transcript,
            "rawTranscript": transcript_text,
            "participantName": participant_name,
            "participantIndex": participant_index
        }), 200
        
    except Exception as e:
        return jsonify({"error": f"Error processing audio for transcription: {str(e)}"}), 500


# Download interview video
@app.route('/download_interview/<interview_id>', methods=['GET'])
def download_interview(interview_id):
    try:
        video_file = os.path.join(saved_interviews_dir, f"{interview_id}.mp4")
        
        if not os.path.exists(video_file):
            return jsonify({"error": "Interview video not found"}), 404
            
        # Get interview data for file naming
        interview_file = os.path.join(saved_interviews_dir, f"{interview_id}.json")
        with open(interview_file, 'r') as f:
            interview_data = json.load(f)
            
        # Generate a user-friendly filename
        role = interview_data.get('role', '').replace(' ', '_')
        company = interview_data.get('company', '').replace(' ', '_')
        date_str = interview_data.get('date', '').split(' ')[0]
        
        filename = f"Interview_{role}_at_{company}_{date_str}.mp4"
        
        # Send the file with the custom filename
        return send_file(
            video_file,
            as_attachment=True,
            download_name=filename,
            mimetype='video/mp4'
        )
        
    except Exception as e:
        return jsonify({"error": f"Error downloading interview video: {str(e)}"}), 500


# Get interview video for streaming
@app.route('/stream_interview/<interview_id>', methods=['GET'])
def stream_interview(interview_id):
    try:
        video_file = os.path.join(saved_interviews_dir, f"{interview_id}.mp4")
        
        if not os.path.exists(video_file):
            return jsonify({"error": "Interview video not found"}), 404
            
        # Stream the file without forcing download
        return send_file(
            video_file,
            mimetype='video/mp4'
        )
        
    except Exception as e:
        return jsonify({"error": f"Error streaming interview video: {str(e)}"}), 500


# Update interview details (rename)
@app.route('/update_interview/<interview_id>', methods=['PUT'])
def update_interview(interview_id):
    try:
        # Check if the interview exists
        interview_file = os.path.join(saved_interviews_dir, f"{interview_id}.json")
        video_file = os.path.join(saved_interviews_dir, f"{interview_id}.mp4")
        
        if not os.path.exists(interview_file) or not os.path.exists(video_file):
            return jsonify({"error": "Interview not found"}), 404
        
        # Get request data
        data = request.get_json()
        
        # Read existing interview data
        with open(interview_file, 'r') as f:
            interview_data = json.load(f)
        
        # Update fields provided in the request
        if 'role' in data:
            interview_data['role'] = data['role']
        if 'company' in data:
            interview_data['company'] = data['company']
        
        # Save updated interview data
        with open(interview_file, 'w') as f:
            json.dump(interview_data, f)
        
        return jsonify({"message": "Interview updated successfully", "id": interview_id}), 200
        
    except Exception as e:
        return jsonify({"error": f"Error updating interview: {str(e)}"}), 500


# Delete an interview
@app.route('/delete_interview/<interview_id>', methods=['DELETE'])
def delete_interview(interview_id):
    try:
        # Check if the interview exists
        interview_file = os.path.join(saved_interviews_dir, f"{interview_id}.json")
        video_file = os.path.join(saved_interviews_dir, f"{interview_id}.mp4")
        
        # Files to delete
        files_to_delete = [interview_file, video_file]
        deleted_count = 0
        
        # Delete each file if it exists
        for file_path in files_to_delete:
            if os.path.exists(file_path):
                os.remove(file_path)
                deleted_count += 1
        
        if deleted_count == 0:
            return jsonify({"error": "Interview not found"}), 404
        
        return jsonify({"message": "Interview deleted successfully"}), 200
        
    except Exception as e:
        return jsonify({"error": f"Error deleting interview: {str(e)}"}), 500


# API Status endpoint
@app.route('/status', methods=['GET'])
def status():
    try:
        return jsonify({
            "status": "ok",
            "message": "API is running",
            "timestamp": datetime.now().isoformat(),
            "transcription_service": "deepgram",
            "deepgram_api_key_configured": bool(DEEPGRAM_API_KEY)
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500


# Enable CORS for all routes
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Route to serve Angular frontend files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    # Print debug information to help with troubleshooting
    print(f"Request path: {path}")

    # Special case for API endpoints
    if path.startswith('api/') or path == 'status' or path == 'question_suggestions' or path == 'transcribe' or path == 'rate_answer':
        return jsonify({"error": "Not found"}), 404

    # First, try to serve the exact file if it exists
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        print(f"Serving file directly: {path}")
        return send_from_directory(app.static_folder, path)

    # For CSS, JS, and other assets, try with and without leading slash
    if path and '.' in path:  # This is likely a file with an extension
        # Some common file extensions to check
        if path.endswith('.js') or path.endswith('.css') or path.endswith('.ico') or path.endswith('.svg') or path.endswith('.jpg') or path.endswith('.png'):
            # Try alternative paths
            alt_path = path.lstrip('/')
            if os.path.exists(os.path.join(app.static_folder, alt_path)):
                print(f"Serving alternative path: {alt_path}")
                return send_from_directory(app.static_folder, alt_path)

    # For all other routes, serve index.html (Angular routing)
    print(f"Serving index.html for path: {path}")
    return send_from_directory(app.static_folder, 'index.html')

# Run the app
if __name__ == '__main__':
    model = Model()
    # Run the server on 0.0.0.0 to make it accessible from other devices
    # This is important for ngrok to be able to forward requests to the server
    # For Render, port will be set by environment variable
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
