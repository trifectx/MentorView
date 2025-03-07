from flask import Flask, jsonify, request
from model.model import Model
import torch
import os
from moviepy import VideoFileClip
from openai import OpenAI
import asyncio

# Check if CUDA is available
print("!!t!!")
print(torch.cuda.is_available())
os.chdir(os.path.dirname(os.path.abspath(__file__)))


# temp model

app = Flask(__name__)
video_path = os.path.join(os.getcwd(), "video.mp4")
audio_path = os.path.join(os.getcwd(), "audio.mp3")
transcript = ""

# OpenAI client setup with direct API key
client = OpenAI(api_key="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")



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
        questions = model.question_query_model(role, company, style)
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

    except Exception as e:
        return jsonify({"error": f"Error during transcription: {str(e)}"}), 500



# Query the OpenAI GPT-4 model
@app.route('/rate_answer', methods=['POST'])
def query():
    # Get input data from the request
    data = request.get_json()
    print("test", data)
    role = data.get('role', '')
    company = data.get('company', '')
    question = data.get('question', '')
    
    # Check if required fields are present
    if not all([role, company, question, transcript]):
        return jsonify({"error": "All fields (role, company, question, answer) are required"}), 400

    # Query the OpenAI GPT-4 model
    try:
        feedback = model.query_model(role=role, company=company, question=question, answer=transcript)
        return jsonify({"feedback": feedback}), 200
    except Exception as e:
        return jsonify({"error": f"Error during query: {str(e)}"}), 500
    


# Run the app
if __name__ == '__main__':
    model = Model()
    app.run(debug=True)