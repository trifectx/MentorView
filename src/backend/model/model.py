from huggingface_hub import login, InferenceClient

class Model:
    
    def __init__(self) -> None:
        login("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")        
        self.client = InferenceClient(api_key="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")
        self.model_name = "mistralai/Mistral-7B-Instruct-v0.3"
        print("Model loaded")
    
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

                Important: Provide a complete response that covers all four sections above.
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
            max_tokens=2000,  # Increased token limit for longer responses
            temperature=0.7,   # Balanced temperature for consistent but natural responses
            stream=False
        )

        return res['choices'][0]['message']['content']
