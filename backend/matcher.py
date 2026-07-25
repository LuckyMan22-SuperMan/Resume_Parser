"""Resume <-> Job Description matching.

Combines two signals, no heavy ML dependencies required:

1. TF-IDF cosine similarity over the full texts (captures overall relevance).
2. Skill overlap (captures concrete hard-skill matches + gaps).

Final score is a weighted blend, returned as a 0-100 percentage.
"""

from __future__ import annotations

import math
import re
from collections import Counter
from typing import Dict, List

from .skills import SKILL_ALIASES

# Common English words to ignore when building TF-IDF vectors.
STOPWORDS = set(
    """
    a an the and or but if then else for while of to in on at by with from as is
    are was were be been being this that these those it its i you he she they we
    me him her them my your his our their will would should could can may might
    do does did done have has had not no yes so than too very just also into over
    under again further once here there all any both each few more most other some
    such only own same what which who whom where when why how about above below up
    down out off per via etc using use used work working experience knowledge
    strong good excellent ability skills skill team teams role responsibilities
    """.split()
)

TOKEN_RE = re.compile(r"[a-zA-Z][a-zA-Z0-9+#.\-]*")


def _tokenize(text: str) -> List[str]:
    tokens = TOKEN_RE.findall(text.lower())
    return [t for t in tokens if t not in STOPWORDS and len(t) > 1]


def _tfidf_cosine(text_a: str, text_b: str) -> float:
    """Cosine similarity of two docs using a 2-doc TF-IDF model."""
    tokens_a = _tokenize(text_a)
    tokens_b = _tokenize(text_b)
    if not tokens_a or not tokens_b:
        return 0.0

    tf_a = Counter(tokens_a)
    tf_b = Counter(tokens_b)
    vocab = set(tf_a) | set(tf_b)

    # Document frequency across our 2-document corpus.
    def df(term: str) -> int:
        return (1 if term in tf_a else 0) + (1 if term in tf_b else 0)

    # Smoothed IDF so shared terms still contribute.
    idf = {t: math.log((1 + 2) / (1 + df(t))) + 1 for t in vocab}

    def vec(tf: Counter) -> Dict[str, float]:
        return {t: tf[t] * idf[t] for t in tf}

    va, vb = vec(tf_a), vec(tf_b)
    dot = sum(va[t] * vb.get(t, 0.0) for t in va)
    norm_a = math.sqrt(sum(v * v for v in va.values()))
    norm_b = math.sqrt(sum(v * v for v in vb.values()))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def _extract_skills(text: str) -> List[str]:
    lower = " " + text.lower() + " "
    found = []
    for canonical, aliases in SKILL_ALIASES.items():
        for alias in aliases:
            pattern = r"(?<![a-zA-Z0-9+#.])" + re.escape(alias) + r"(?![a-zA-Z0-9+#])"
            if re.search(pattern, lower):
                found.append(canonical)
                break
    return sorted(set(found))


def match(resume_text: str, jd_text: str, resume_skills: List[str] | None = None) -> Dict:
    """Return a match report between a resume and a job description."""
    if resume_skills is None:
        resume_skills = _extract_skills(resume_text)
    jd_skills = _extract_skills(jd_text)

    resume_set = set(resume_skills)
    jd_set = set(jd_skills)

    matched = sorted(resume_set & jd_set)
    missing = sorted(jd_set - resume_set)
    extra = sorted(resume_set - jd_set)

    skill_score = (len(matched) / len(jd_set)) if jd_set else 0.0
    text_score = _tfidf_cosine(resume_text, jd_text)

    # Weighted blend: hard-skill overlap matters most for placements.
    final = 0.65 * skill_score + 0.35 * text_score
    final_pct = round(final * 100, 1)

    return {
        "score": final_pct,
        "skill_match_pct": round(skill_score * 100, 1),
        "text_similarity_pct": round(text_score * 100, 1),
        "matched_skills": matched,
        "missing_skills": missing,
        "extra_skills": extra,
        "jd_skills": jd_skills,
        "verdict": _verdict(final_pct),
    }


def _verdict(score: float) -> str:
    if score >= 75:
        return "Strong match"
    if score >= 55:
        return "Good match"
    if score >= 35:
        return "Partial match"
    return "Weak match"
