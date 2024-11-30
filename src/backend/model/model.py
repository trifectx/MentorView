from transformers import AutoModelForCausalLM, AutoTokenizer
from huggingface_hub import login
from transformers import BitsAndBytesConfig
import torch

class Model:
    
    def __init__(self) -> None:
        login("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")        
        model_name = 'mistralai/Mistral-7B-Instruct-v0.3'
        device_map = {"": 0}
        compute_dtype = getattr(torch, "float16")
        bnb_config = BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type='nf4',
        bnb_4bit_compute_dtype=compute_dtype,
        bnb_4bit_use_double_quant=False,
    )
        
        self.model = AutoModelForCausalLM.from_pretrained(model_name, 
                                                      device_map=device_map,
                                                      quantization_config=bnb_config)
        print("Model loaded")
        self.eval_tokenizer = AutoTokenizer.from_pretrained(model_name, add_bos_token=True, trust_remote_code=True, use_fast=False)
        self.eval_tokenizer.pad_token = self.eval_tokenizer.eos_token
    
    def _construct_chat(self, role, company, question, answer):
        return [{"role": "system", "content": f"You are an interviewer, interviewing a candidate for an {role} role at {company}. Rate their answer to your question out of 10 and give feedback. You have just asked: {question}?",},
        {"role": "user", "content": f"{answer}"}]
         
    
    def query_model(self, role, company, question, answer):
        chat = self.construct_chat(role, company, question, answer)
        chat = self.eval_tokenizer.apply_chat_template(chat, tokenize=True, add_generation_prompt=True, return_tensors="pt")
        outputs = self.model.generate(chat, max_new_tokens=128) 
        return self.eval_tokenizer.decode(outputs[0])