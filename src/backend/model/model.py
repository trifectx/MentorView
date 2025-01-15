from huggingface_hub import login, InferenceClient
import re

class Model:
    
    def __init__(self) -> None:
        login("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")        
        self.client = InferenceClient(api_key="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")
        self.model_name = "mistralai/Mistral-7B-Instruct-v0.3"
        print("Model loaded")
    

    def _question_suggestions(self, role, company, style):
        return [
            {
                "role": "user",
                "content": f"""
                You are an expert interviewer creating interview questions for a {role} position at {company}.
                The interview style selected is: {style}

                Based on the style:
                - If Technical: Focus on technical skills, coding problems, and system design relevant to {role}, make sure the questions can be answered within 2 minutes or less
                - If Behavioral: Ask about past experiences, teamwork, and problem-solving situations
                - If Cultural: Focus on company values, work style, and team fit at {company}
                - If Situational: Present hypothetical scenarios they might face in this role

                Generate 5 detailed interview questions that:
                1. Are specifically tailored for a {role} at {company}
                2. Match the {style} interview style
                3. Help assess the candidate's suitability for this specific role
                4. Are challenging but appropriate for the position level

                Note: Ensure you only include the question and nothing else
                """,
                }
        ]

    def _clean_question(self, question: str) -> str:
        # Remove any existing numbering and extra whitespace
        cleaned = re.sub(r'^\d+\.?\s*', '', question.strip())
        # Remove any other dots at the start
        cleaned = re.sub(r'^\.+\s*', '', cleaned)
        return cleaned

    def question_query_model(self, role="Software engineer", company="Amazon", style="Behavioral Interview"):
        res = self.client.chat.completions.create(
            model=self.model_name, 
            messages=self._question_suggestions(role, company, style),
            max_tokens=20000,  
            stream=False

        )
        raw_questions = re.split(r'\n\n[0-9]', res['choices'][0]['message']['content'])
        cleaned_questions = [self._clean_question(q) for q in raw_questions if q.strip()]
        return cleaned_questions



    def _construct_chat(self, role, company, question, answer):
        return [
            {
                "role": "system",
                "content": f"""
                You are an interviewer, interviewing a candidate for an {role} role at {company}. 
                Provide a complete evaluation of their answer in the following format:
                1. Rating: Give a score out of 10
                2. Strengths: List the main strengths of their answer
                3. Areas for Improvement: Identify specific areas that need work
                4. Suggestions: Provide actionable suggestions for improvement

                The question you asked was: {question}?

                Important: Provide a complete response that covers all four sections above and make sure that the score that you are given is not too generous be very critical of it and dont give high scores for answers that are not well though through.
                """,
            },
            {
                "role": "user", 
                "content": f"{answer}"
            }
        ]
         
    
    def query_model(self, role="Software engineer", company="Amazon", question="tell me about yourself", answer=""):
        res = self.client.chat.completions.create(
            model=self.model_name, 
            messages=self._construct_chat(role, company, question, answer), 
            max_tokens=2000,  
            temperature=0.7,   
            stream=False
        )

        return res['choices'][0]['message']['content']
