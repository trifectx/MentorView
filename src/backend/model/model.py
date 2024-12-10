from transformers import AutoModelForCausalLM, AutoTokenizer
from huggingface_hub import login, InferenceClient
from transformers import BitsAndBytesConfig, pipeline
import torch
import requests

class Model:
    
    def __init__(self) -> None:
        login("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")        
        self.client = InferenceClient(api_key="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")
        self.model_name = "mistralai/Mistral-7B-Instruct-v0.3"
        print("Model loaded")
    
    def _construct_chat(self, role, company, question, answer):
        return [{"role": "system", "content": f"You are an interviewer, interviewing a candidate for an {role} role at {company}. Rate their answer to your question out of 10 and give feedback. You have just asked: {question}?",},
        {"role": "user", "content": f"{answer}"}]
         
    
    def query_model(self, role="Software engineer", company="Amazon", question="tell me about yourself", answer=""):
        res = self.client.chat.completions.create(
            model=self.model_name, 
            messages=self._construct_chat(role, company, question, answer), 
            stream=False
        )

        return res['choices'][0]['message']['content']
