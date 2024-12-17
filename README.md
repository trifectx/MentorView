# MentorView

## Requirements

Make sure you have the following installed on your system:

- **Python**: Version 3.8 or higher (check with `python --version`).
- **Node.js**: for the node package manager (npm)

---

## Setup

### Creating a Virtual Environment

- To avoid dependency conflicts, it’s recommended to use a virtual environment:
- To create a virtual environment, do `python -m venv venv`

### Running neccessary commands

- Run the virtual environment by doing `venv/Scripts/activate`
- In the virtual environment, do `pip install -r requirements.txt`
- Then go to MentorView-ui and do `npm install`

### Create a .env file

- In src/backend create a file called `.env`
- Within that file, paste the following:
  `DEEPGRAM_API_KEY=<your-deepgram-key-here>`

---

## Running the application

- Go to MentorView-ui and do `npm start`
- Go to src/backend by doing `cd src/backend`
- Run `python api.py`
