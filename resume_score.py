import spacy
import re

# load NLP model
nlp = spacy.load("en_core_web_sm")

# read resume file
with open("resume.txt", "r", encoding="utf-8") as f:
    text = f.read().lower()

doc = nlp(text)

score = 0
suggestions = []

# ---------------- CONTACT INFORMATION (SMART DETECTION) ----------------
# detect email and phone using regex patterns
email_pattern = r'\S+@\S+'
phone_pattern = r'\b\d{10}\b'

email_found = re.search(email_pattern, text)
phone_found = re.search(phone_pattern, text)

if email_found and phone_found:
    score += 10
else:
    suggestions.append("Add proper contact information (email and phone number)")

# ---------------- SKILLS ----------------
if "skills" in text:
    score += 20
else:
    suggestions.append("Add a skills section")

# ---------------- EDUCATION ----------------
education_keywords = ["education", "university", "college", "b.e", "btech", "b.tech", "degree"]

if any(word in text for word in education_keywords):
    score += 15
else:
    suggestions.append("Add education details")

# ---------------- PROJECTS (IMPROVED DETECTION) ----------------
project_keywords = ["project", "projects", "developed", "built", "implemented", "application", "system"]

if any(word in text for word in project_keywords):
    score += 20
else:
    suggestions.append("Add academic or personal projects")

# ---------------- EXPERIENCE ----------------
experience_keywords = ["experience", "internship", "intern", "worked", "company", "organization"]

if any(word in text for word in experience_keywords):
    score += 25
else:
    suggestions.append("Add work experience or internship")

# ---------------- CERTIFICATIONS ----------------
cert_keywords = ["certification", "certificate", "certified", "course", "training"]

if any(word in text for word in cert_keywords):
    score += 10
else:
    suggestions.append("Add certifications or online courses")

# ---------------- OUTPUT ----------------
print("\nResume Score:", score, "%")

print("\nSuggestions:")
for s in suggestions:
    print("-", s)