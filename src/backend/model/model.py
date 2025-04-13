from openai import OpenAI
import re
import os
from dotenv import load_dotenv

class Model:

    def load_env(self):
         load_dotenv()
         self.api_key = os.getenv("OPENAI_API_KEY")
         if not self.api_key:
             raise ValueError("Missing OpenAI API Key. Set OPENAI_API_KEY in .env file.")
    
    def __init__(self):
        self.load_env()
        
        self.client = OpenAI(api_key=self.api_key)
        self.model_name = "gpt-4"
        print("OpenAI GPT-4 model loaded")
    

    def construct_prompt_for_questions(self, role, company, style):
        # Check the interview style and use the appropriate prompt generator
        if style and "assessment" in style.lower():
            return self.construct_prompt_for_assessment_centre(role, company)
        else:
            return self.construct_prompt_for_interview_questions(role, company, style)
    
    def construct_prompt_for_interview_questions(self, role, company, style):
        """
        Constructs a prompt for generating typical job interview questions.
        """
        return [
            {
                "role": "system",
                "content": "You are an expert recruiter who designs interview questions specific to job roles and company cultures."
            },
            {
                "role": "user",
                "content": f"""
                Create 5 realistic interview questions for a {role} position at {company} with a {style} interview style.
                
                Make sure the questions:
                1. Are specific to the {role} position
                2. Reflect {company}'s industry and values
                3. Follow a {style} interview format
                4. Cover a mix of technical, behavioral, and situational aspects relevant to the role
                5. Are challenging but fair
                
                Format each question as a numbered list item.
                
                For example:
                1. [Interview Question 1]
                2. [Interview Question 2]
                3. [Interview Question 3]
                ...
                """
            }
        ]

    def construct_prompt_for_assessment_centre(self, role, company):
        """
        Constructs a prompt specifically for assessment centre group tasks.
        """
        return [
            {
                "role": "system",
                "content": "You are an expert recruiter who designs assessment centre GROUP EXERCISES for evaluating multiple candidates simultaneously. You MUST ONLY create collaborative group tasks and NEVER individual interview questions. Your tasks should always involve multiple people working together on a shared challenge."
            },
            {
                "role": "user",
                "content": f"""
                Create 1 GROUP ASSESSMENT TASK for {role} candidates at {company}.

                IMPORTANT: This MUST be a task designed for a GROUP of 3-5 candidates to work on TOGETHER. 
                DO NOT create individual interview questions - they must be collaborative exercises.
                
                Format the task EXACTLY as follows:
                
                Scenario:
                [Describe a realistic workplace scenario relevant to {role} at {company} that involves group decision-making or problem-solving]
                
                Instructions:
                [List 3-5 clear, step-by-step instructions for the group to follow]
                [Include specific roles or perspectives each participant should take]
                [Include a deliverable or outcome the group must produce]
                [Specify a timeframe (between 10-30 minutes)]
                
                USE THESE EXAMPLES AS YOUR PRIMARY REFERENCES:
                
                Example 1:
                Scenario:
                Your team represents a charitable foundation with $1 million to allocate. You must collectively agree on how to distribute these funds among these five causes: climate change initiatives, educational programs in underserved areas, medical research for rare diseases, homeless support services, and clean water projects in developing countries. You must determine the exact percentage each cause receives and justify your decisions.

                Example 2:
                Scenario:
                Your team is stranded on a remote island after a plane crash. You've recovered 10 items from the wreckage: a box of matches, a compass, a mirror, a first aid kit, a tarp, 5 liters of water, a hunting knife, a rope, a fishing net, and a flashlight. As a group, rank these items in order of importance for survival and provide reasoning for your rankings.

                Example 3:
                Scenario:
                Your team runs a large urban public library facing declining visitors and budget cuts. Collectively develop three innovative solutions to revitalize the library and make it relevant for the next decade. Each solution must be realistic, cost-effective, and serve diverse community needs.
                
                Your task should follow a SIMILAR GROUP FORMAT to these examples, but adapted for the {role} at {company}.
                Make the scenario test various collaborative competencies (leadership, teamwork, communication, problem-solving, decision-making).
                
                REMEMBER: The exercise MUST involve the entire group working TOGETHER. It should NOT be an individual interview question.
                """
            }
        ]
    
    def clean_question(self, question):
        # For assessment centre questions, preserve the formatting
        if "Scenario:" in question and "Instructions:" in question:
            # Split the question into scenario and instructions
            parts = question.split("Instructions:")
            if len(parts) == 2:
                scenario = parts[0].strip()
                instructions = parts[1].strip()
                
                # Format exactly according to the template
                formatted_question = f"{scenario}\n\nInstructions:\n{instructions}"
                return formatted_question
        
        # Remove any numbering (e.g., "1.", "Question 1:") at the beginning of the question
        cleaned = re.sub(r'^(\d+\.|\d+\)|\[Question \d+\]:|Question \d+:)\s*', '', question.strip())
        return cleaned.strip()
        
    def get_questions_from_model(self, role, company, style):
        response = self.client.chat.completions.create(
            model=self.model_name, 
            messages=self.construct_prompt_for_questions(role, company, style),
            max_tokens=5000,
            temperature=0.7,
            stream=False
        )
        
        content = response.choices[0].message.content
        
        # Check if this is an assessment centre question with the expected format
        if "Scenario:" in content and "Instructions:" in content:
            return [self.clean_question(content)]
        else:
            # Parse regular interview questions
            # Split by numbered patterns (1., 2., etc.) or double newlines
            questions_raw = re.split(r'\n\d+\.|\n\d+\)|\n\n', content)
            questions_raw = [q for q in questions_raw if q.strip()]
            
            # If the split didn't work, try another approach
            if len(questions_raw) <= 1:
                questions_raw = re.split(r'(?:\d+\.|\d+\)|\n\n)', content)
                questions_raw = [q for q in questions_raw if q.strip()]
            
            # Clean each question and return up to 5
            cleaned_questions = [self.clean_question(q) for q in questions_raw]
            return cleaned_questions[:5] if cleaned_questions else ["Failed to generate questions. Please try again."]

    def construct_prompt_for_feedback(self, role, company, question, answer, wpm=0, filler_words={}, total_filler_words=0):
        # Prepare filler word analysis for the prompt
        filler_word_analysis = ""
        if total_filler_words > 0:
            filler_word_analysis = "\nFiller Word Analysis:\n"
            for word, count in filler_words.items():
                if count > 0:
                    filler_word_analysis += f"- '{word}': {count} times\n"
            filler_word_analysis += f"Total filler words: {total_filler_words}\n"
        
        # Prepare WPM analysis
        wpm_analysis = ""
        if wpm > 0:
            wpm_status = "too slow" if wpm < 120 else "too fast" if wpm > 160 else "optimal"
            wpm_analysis = f"\nSpeaking Pace Analysis:\n- Words Per Minute (WPM): {wpm} ({wpm_status})\n"
        
        return [
            {
                "role": "system",
                "content": f"""
                You are an expert interviewer evaluating candidates for a {role} position at {company}.
                Your task is to evaluate the candidate's answer to an interview question.
                Provide constructive feedback on the strengths and areas for improvement.
                """
            },
            {
                "role": "user",
                "content": f"""
                Question: {question}
                
                Candidate's Answer: {answer}
                {wpm_analysis}{filler_word_analysis}
                Please evaluate this answer and provide:
                1. Overall assessment (score out of 10 and in the format "Score: 8/10")
                2. Content strengths of the answer
                3. Areas for improvement in content and delivery
                4. Language quality (comment on filler word usage and suggestions to reduce them)
                5. Speaking pace evaluation (comment on the WPM and whether it's appropriate)
                6. Suggestions for a better response
                
                Format your response with clear section headers for each of the above points.
                """
            }
        ]

    def query_model_for_feedback(self, role, company, question, answer, wpm=0, filler_words={}, total_filler_words=0):
        try:
            response = self.client.chat.completions.create(
                model=self.model_name, 
                messages=self.construct_prompt_for_feedback(role, company, question, answer, wpm, filler_words, total_filler_words), 
                max_tokens=2000,  
                temperature=0.7,   
                stream=False
            )

            return response.choices[0].message.content
        except Exception as e:
            print(f"Error in query_model_for_feedback: {str(e)}")
            return "Error evaluating answer. Please try again."
