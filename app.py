from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import re

app = Flask(__name__)
CORS(app)

nlp = spacy.load("en_core_web_sm")

def analyze_resume(text):

    text = text.lower()
    score = 0
    suggestions = []

    # CONTACT
    email_pattern = r'\S+@\S+'
    phone_pattern = r'\b\d{10}\b'

    if re.search(email_pattern, text) and re.search(phone_pattern, text):
        score += 10
    else:
        suggestions.append("Add proper contact information (email and phone number)")

    # SKILLS
    if "skills" in text:
        score += 20
    else:
        suggestions.append("Add a skills section")

    # EDUCATION
    if any(word in text for word in ["education","university","college","btech","b.e"]):
        score += 15
    else:
        suggestions.append("Add education details")

    # PROJECTS
    if any(word in text for word in ["project","developed","built","application","system"]):
        score += 20
    else:
        suggestions.append("Add projects")

    # EXPERIENCE
    if any(word in text for word in ["experience","internship","company","worked"]):
        score += 25
    else:
        suggestions.append("Add work experience or internship")

    # CERTIFICATIONS
    if any(word in text for word in ["certificate","certification","course","training"]):
        score += 10
    else:
        suggestions.append("Add certifications")

    return score, suggestions


@app.route('/analyze', methods=['POST'])
def analyze():
    resume_text = request.json['resume']
    score, suggestions = analyze_resume(resume_text)

    return jsonify({
        "score": score,
        "suggestions": suggestions
    })


if __name__ == '__main__':
    app.run(debug=True)