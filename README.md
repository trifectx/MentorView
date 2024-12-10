# MentorView

## Requirements

Make sure you have the following installed on your system:

- **Python**: Version 3.8 or higher (check with `python --version`).
- **Node.js**: for the node package manager (npm)

---

## Setup

### Creating a Virtual Environment

- To avoid dependency conflicts, it’s recommended to use a virtual environment:
- To create a virtual environment, do `python -m venv venv` and to activate it to `venv/Scripts/activate`

### Running neccessary commands

- In the virtual environment, do `pip install -r requirements.txt`
- Then go to MentorView-ui and do `npm install`
- For transcription to work, open cmd in administrator and do `choco install ffmpeg`

### Create a .env file

- In src/backend create a file called `.env`
- Within that file, paste the following:
  `OPENAI_API_KEY=your-openai-api-key-here`

---

## Running the application

- Go to MentorView-ui and do `npm start`
- Run the api backend with `python .\src\backend\api.py`
