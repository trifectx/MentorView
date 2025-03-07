from openai import OpenAI
import re

class Model:
    
    def __init__(self):
        self.api_key = "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"
        self.client = OpenAI(api_key=self.api_key)
        self.model_name = "gpt-4"
        print("OpenAI GPT-4 model loaded")
    

    def _question_suggestions(self, role, company, style):
        return [
            {
                "role": "system",
                "content": "You are an expert interviewer creating interview questions."
            },
            {
                "role": "user",
                "content": f"""
                Create interview questions for a {role} position at {company}.
                The interview style selected is: {style}

                Based on the style:
                - Technical Interview: Focus on technical skills, problem-solving, and domain knowledge
                - Behavioral Interview: Focus on past experiences, soft skills, and how candidates handled situations
                - Cultural Interview: Focus on values alignment, team fit, and company culture
                - Situational Interview: Present hypothetical scenarios to assess decision-making

                Generate 5 thoughtful interview questions tailored to this specific role, company, and interview style.
                Format each question on a new line with a number.
                """
            }
        ]
    
    def _clean_question(self, question):
        # Remove any existing numbering and extra whitespace
        cleaned = re.sub(r'^\d+\.?\s*', '', question.strip())
        # Remove any other dots at the start
        cleaned = re.sub(r'^\.*\s*', '', cleaned)
        return cleaned

    def question_query_model(self, role="Software engineer", company="Amazon", style="Behavioral Interview"):
        try:
            response = self.client.chat.completions.create(
                model=self.model_name, 
                messages=self._question_suggestions(role, company, style),
                max_tokens=2000,
                temperature=0.7,
                stream=False
            )
            
            # Extract content from the response
            content = response.choices[0].message.content
            
            # Split the response into individual questions
            raw_questions = [q.strip() for q in content.split('\n') if q.strip()]
            
            # Filter out any non-question lines and clean the questions
            questions = []
            for line in raw_questions:
                # Check if line starts with a number or looks like a question
                if re.match(r'^\d+\.', line) or '?' in line:
                    questions.append(self._clean_question(line))
            
            # Ensure we return at most 5 questions
            return questions[:5]
            
        except Exception as e:
            print(f"Error in question_query_model: {str(e)}")
            # Return some default questions as fallback
            return [f"Tell me about your experience as a {role}", 
                    f"Why do you want to work at {company}?", 
                    "What are your strengths and weaknesses?", 
                    "Describe a challenging situation you faced at work", 
                    "Where do you see yourself in 5 years?"]


    def _construct_chat(self, role, company, question, answer):
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
                
                Please evaluate this answer and provide:
                1. Overall assessment (score out of 10)
                2. Strengths of the answer
                3. Areas for improvement
                4. Suggestions for a better response
                """
            }
        ]
         
    
    def query_model(self, role="Software engineer", company="Amazon", question="tell me about yourself", answer=""):
        try:
            response = self.client.chat.completions.create(
                model=self.model_name, 
                messages=self._construct_chat(role, company, question, answer), 
                max_tokens=2000,  
                temperature=0.7,   
                stream=False
            )

            return response.choices[0].message.content
        except Exception as e:
            print(f"Error in query_model: {str(e)}")
            return "Error evaluating response. Please try again."
