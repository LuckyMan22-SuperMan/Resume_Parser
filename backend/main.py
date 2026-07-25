"""FastAPI backend for the Resume Parser + JD Matcher.

Endpoints:
    POST /api/parse   -> upload a resume, get structured fields back
    POST /api/match   -> upload a resume + JD text, get parsed fields + match report
    GET  /api/health  -> health check

Also serves the static frontend from ../static at "/".
"""

from __future__ import annotations

import os
from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from . import matcher
from . import parser as resume_parser

MAX_FILE_MB = 5
STATIC_DIR = Path(__file__).resolve().parent.parent / "static"

app = FastAPI(title="Resume Parser + JD Matcher", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def _read_upload(file: UploadFile) -> bytes:
    data = file.file.read()
    if len(data) > MAX_FILE_MB * 1024 * 1024:
        raise HTTPException(status_code=413, detail=f"File exceeds {MAX_FILE_MB}MB limit.")
    if not data:
        raise HTTPException(status_code=400, detail="Empty file.")
    return data


def _parse_or_400(filename: str, data: bytes) -> dict:
    try:
        return resume_parser.parse_resume(filename, data)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=422, detail=f"Failed to parse resume: {exc}")


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/api/parse")
async def parse_endpoint(file: UploadFile = File(...)) -> dict:
    data = _read_upload(file)
    parsed = _parse_or_400(file.filename or "resume", data)
    parsed.pop("raw_text", None)  # keep response light
    return parsed


@app.post("/api/match")
async def match_endpoint(
    file: UploadFile = File(...),
    job_description: str = Form(...),
) -> dict:
    if not job_description.strip():
        raise HTTPException(status_code=400, detail="Job description is required.")
    data = _read_upload(file)
    parsed = _parse_or_400(file.filename or "resume", data)
    report = matcher.match(
        parsed["raw_text"], job_description, resume_skills=parsed["skills"]
    )
    parsed.pop("raw_text", None)
    return {"resume": parsed, "match": report}


# --------------------------------------------------------------------------- #
# Static frontend
# --------------------------------------------------------------------------- #
if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

    @app.get("/")
    def index() -> FileResponse:
        return FileResponse(str(STATIC_DIR / "index.html"))


if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", "8000"))
    uvicorn.run("main:app", host="127.0.0.1", port=port, reload=True)
