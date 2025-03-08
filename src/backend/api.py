import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from moviepy import VideoFileClip
import torch
from openai import OpenAI
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

# Initialize the Flask app
app = Flask(__name__)
transcript = ""
client = OpenAI(api_key=OPENAI_API_KEY)
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
    try:
        # Open the audio file in binary read mode
        with open(audio_path, "rb") as audio_file:
            # whisper-1 is the API-optimized version of the large-v2 model
            transcription = client.audio.transcriptions.create(
                model="whisper-1", 
                file=audio_file, 
                response_format="text"
            )
            transcript = transcription
        
        return jsonify({"transcript": transcript}), 200
    
    # try:
    #     # Initialize deepgram client
    #     deepgram = DeepgramClient(DEEPGRAM_API_KEY)

    #     payload = { 'buffer': audio_file }
 
    #     options = PrerecordedOptions(
    #         model="nova-2", 
    #         language="en-US",
    #         filler_words=True
    #     )

    #     response = deepgram.listen.rest.v('1').transcribe_file(payload, options)
    #     transcript = response["results"]["channels"][0]["alternatives"][0]["transcript"]
 
    #     return jsonify({"transcript": transcript}), 200

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
    
    # Check if required fields are present
    if not all([role, company, question, transcript]):
        return jsonify({"error": "All fields (role, company, question, answer) are required"}), 400

    # Send the input data to the model
    try:
        feedback = model.query_model_for_feedback(role=role, company=company, question=question, answer=transcript)
        return jsonify({"feedback": feedback}), 200
    except Exception as e:
        return jsonify({"error": f"Error during query: {str(e)}"}), 500
    


# Run the app
if __name__ == '__main__':
    app.run(debug=True)