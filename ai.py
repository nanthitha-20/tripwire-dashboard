import spacy

# load AI language model
nlp = spacy.load("en_core_web_sm")

resume_text = """
Nanthitha S
Email: nanthi@gmail.com
Phone: 9876543210

Skills: Python, JavaScript, React, HTML, CSS, Machine Learning, SQL

Education:
B.E Computer Science - Anna University

Projects:
AI Resume Analyzer using React and Flask
Chatbot using NLP
"""

doc = nlp(resume_text)

print("\n===== KEYWORDS DETECTED FROM RESUME =====\n")

for token in doc:
    if token.pos_ in ["PROPN", "NOUN"]:
        print(token.text)
        