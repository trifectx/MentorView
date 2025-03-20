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
        # Always use assessment centre style format for this app now
        return self.construct_prompt_for_assessment_centre(role, company)
    
    def construct_prompt_for_assessment_centre(self, role, company):
        """
        Constructs a prompt specifically for assessment centre group tasks.
        """
        return [
            {
                "role": "system",
                "content": "You are an expert recruiter who designs assessment centre group exercises for evaluating multiple candidates simultaneously."
            },
            {
                "role": "user",
                "content": f"""
                Create 5 group assessment tasks for {role} candidates at {company}.

                Format each task EXACTLY as follows:
                
                Scenario:
                [Describe a realistic workplace scenario relevant to {role} at {company} that involves group decision-making or problem-solving]
                
                Instructions:
                [List 3-5 clear, step-by-step instructions for the group to follow]
                [Include specific roles or perspectives each participant should take]
                [Include a deliverable or outcome the group must produce]
                [Specify a timeframe (between 10-30 minutes)]
                
                THE FORMAT MUST BE EXACTLY LIKE THIS EXAMPLE:
                
                Scenario:
                Your group has been given a limited budget and must decide how to distribute it among several departmental initiatives (e.g., marketing, research and development, staffing). Each participant represents a different department, and all believe their department should receive the most funding.

                Instructions:
                Discuss and list the key priorities of the organization (e.g., growth, innovation, customer retention).
                Present your department's case for funding.
                Negotiate with the other "departments" in the group to reach a consensus on the final budget allocation.
                Prepare a short presentation explaining your group's final decision to the assessors.
                
                Generate 5 unique, engaging scenarios with instructions relevant to {role} at {company}.
                Make each scenario distinctly different to test various competencies (leadership, teamwork, communication, problem-solving, decision-making).
                """
            }
        ]
    
    def clean_question(self, question):
        # For assessment centre questions, preserve the formatting but ensure it matches our exact template
        if "Scenario:" in question and "Instructions:" in question:
            # Split the question into scenario and instructions
            parts = question.split("Instructions:")
            if len(parts) == 2:
                scenario = parts[0].strip()
                instructions = parts[1].strip()
                
                # Format exactly according to the template
                formatted_question = f"{scenario}\n\nInstructions:\n{instructions}"
                return formatted_question
            
        # If it doesn't fit our expected format, return as is
        return question.strip()
        
    def get_questions_from_model(self, role, company, style):
        response = self.client.chat.completions.create(
            model=self.model_name, 
            messages=self.construct_prompt_for_questions(role, company, style),
            max_tokens=5000,
            temperature=0.7,
            stream=False
        )
        
        content = response.choices[0].message.content
        
        # Split the response by numbered points if we have them
        questions_raw = re.split(r'\n\d+\.\s+|\n\n', content)
        questions_raw = [q for q in questions_raw if q.strip() and "Scenario:" in q]
        
        # If we couldn't find any questions with our splitting logic, try a different approach
        if not questions_raw:
            # Try splitting by "Scenario:" to get the different assessment tasks
            questions_raw = content.split("Scenario:")
            questions_raw = [f"Scenario:{q}" for q in questions_raw if q.strip()]
        
        # Clean up each question
        questions = [self.clean_question(q) for q in questions_raw]
        
        return questions

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
                1. Overall assessment (score out of 10)
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
