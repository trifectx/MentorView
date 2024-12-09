
from flask import Flask, jsonify, request
from transformers import pipeline
from model.model import Model
import torch
import os
from moviepy import VideoFileClip
import whisper

# Check if CUDA is available
print("!!t!!")
print(torch.cuda.is_available())


# temp model

app = Flask(__name__)
video_path = os.path.join(os.getcwd(), "video.mp4")
audio_path = os.path.join(os.getcwd(), "audio.mp3")



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



@app.route('/transcribe', methods=['GET'])
def transcribe():
    # Transcribe the audio using OpenAI Whisper
    try:
        model = whisper.load_model("small")

        # Transcribe the audio
        result = model.transcribe(audio_path)
        transcript = result['text'] # Extract the transcription

        return jsonify({ "transcript": transcript}), 200
    except Exception as e:
        return jsonify({"error": f"Error during transcription: {str(e)}"}), 500



@app.route('/query', methods=['GET'])
def query():
    return jsonify({"test": "Hello"}), 200
        # Get input data from the request
    data = request.get_json()
    role = data.get('role', '')
    company = data.get('company', '')
    question = data.get('question', '')
    answer = data.get('answer', '')
    
    # Check if prompt is empty
    if not role or not company or not question or not answer:
        return jsonify({"error": "Prompt is required"}), 400

    # Query the Hugging Face model
    try:
        # generated_text = model.query_model(role, company, question, answer)
        # return jsonify({"generated_text": generated_text}), 200
        pass
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


# Run the app
if __name__ == '__main__':
    app.run(debug=True)