# Resume Parser + JD Matcher

A full-stack web app that extracts structured data from resumes (PDF / DOCX / TXT)
and scores them against a job description. Built with **FastAPI** and a lightweight
**HTML/CSS/JS** frontend. Matching uses a **pure-Python TF-IDF cosine similarity**
plus a curated **skill-overlap** score — no heavy ML dependencies or external APIs.

## Features

- Upload a resume (PDF, DOCX, or TXT) via drag-and-drop.
- Extracts: name, email, phone, LinkedIn, GitHub, skills, education, experience/projects sections.
- Paste a job description to get:
  - Overall fit score (0-100) with a verdict.
  - Skill-overlap % and text-similarity % breakdown.
  - Matched skills and missing skills (skill gaps) as chips.
- Clean, responsive dark UI.

## Architecture

```
resume-parser/
├── backend/
│   ├── main.py       # FastAPI app + endpoints, serves the frontend
│   ├── parser.py     # text extraction (pypdf/python-docx) + field parsing
│   ├── matcher.py    # TF-IDF cosine + skill-overlap scoring
│   └── skills.py     # curated skill dictionary with aliases
├── static/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── requirements.txt
└── README.md
```

## Setup

```powershell
# from the resume-parser folder
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

## Run

```powershell
python backend/main.py
```

Then open http://127.0.0.1:8000 in your browser.

## API

| Method | Endpoint      | Body                                   | Returns                        |
|--------|---------------|----------------------------------------|--------------------------------|
| GET    | `/api/health` | —                                      | `{"status": "ok"}`             |
| POST   | `/api/parse`  | `file` (multipart)                     | parsed resume fields           |
| POST   | `/api/match`  | `file` + `job_description` (multipart) | parsed fields + match report   |

Example:

```powershell
curl -X POST http://127.0.0.1:8000/api/parse -F "file=@resume.pdf"
```

## How the match score works

`final = 0.65 * skill_overlap + 0.35 * tfidf_cosine`

- **skill_overlap** = (resume skills ∩ JD skills) / (JD skills)
- **tfidf_cosine** = cosine similarity of TF-IDF vectors over the full texts