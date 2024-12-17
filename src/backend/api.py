from flask import Flask, jsonify, request
from model.model import Model
import torch
import os
from moviepy import VideoFileClip
from openai import OpenAI
from dotenv import load_dotenv
from deepgram import DeepgramClient, PrerecordedOptions
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

# OpenAI API Key from .env
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("Missing OpenAI API Key. Set OPENAI_API_KEY in .env file.")

client = OpenAI(api_key=OPENAI_API_KEY)

# Deepgram API Key from .env
DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
if not DEEPGRAM_API_KEY:
    raise ValueError("Missing Deepgram API Key. Set DEEPGRAM_API_KEY in .env file.")



@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response



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



# Transcribe audio using OpenAI Whisper API
@app.route('/transcribe', methods=['GET'])
def transcribe():
    global transcript
    try:
        # Initialize deepgram client
        deepgram = DeepgramClient(DEEPGRAM_API_KEY)

        with open(audio_path, "rb") as audio_file:
            payload = { 'buffer': audio_file }

            options = PrerecordedOptions(
                model="nova-2", language="en-US"
            )

            response = deepgram.listen.rest.v('1').transcribe_file(payload, options)
            transcript = response["results"]["channels"][0]["alternatives"][0]["transcript"]

        return jsonify({"transcript": transcript}), 200
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

    except Exception as e:
        return jsonify({"error": f"Error during transcription: {str(e)}"}), 500



# Query the Hugging Face model
@app.route('/query', methods=['GET'])
def query():
    try:
        feedback = model.query_model(answer=transcript)
        return jsonify({"feedback": feedback}), 200
    except Exception as e:
        return jsonify({"error": f"Error during query: {str(e)}"}), 500

    
    
    
    # Get input data from the request
    # data = request.get_json()
    # role = data.get('role', '')
    # company = data.get('company', '')
    # question = data.get('question', '')
    # answer = data.get('answer', '')
    
    # # Check if prompt is empty
    # if not role or not company or not question or not answer:
    #     return jsonify({"error": "Prompt is required"}), 400

    # # Query the Hugging Face model
    # try:
    #     # generated_text = model.query_model(role, company, question, answer)
    #     # return jsonify({"generated_text": generated_text}), 200
    #     pass
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500
    


# Run the app
if __name__ == '__main__':
    model = Model()
    app.run(debug=True)