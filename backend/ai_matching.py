import numpy as np
from sentence_transformers import SentenceTransformer, util

# Initialize the SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def match_users_by_skills(user_list: list) -> list:
    # ... (code omitted for brevity)
    pass

def recommend_events_for_user(user_profile_string: str, event_list: list) -> list:
    # ... (code omitted for brevity)
    pass
