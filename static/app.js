const fileInput = document.getElementById("fileInput");
const dropzone = document.getElementById("dropzone");
const fileName = document.getElementById("fileName");
const jdInput = document.getElementById("jdInput");
const parseBtn = document.getElementById("parseBtn");
const matchBtn = document.getElementById("matchBtn");
const errorEl = document.getElementById("error");
const placeholder = document.getElementById("placeholder");
const results = document.getElementById("results");
const sampleBtn = document.getElementById("sampleBtn");

let selectedFile = null;

const SAMPLE_JD = `We are hiring a Software Engineer (New Grad).
Requirements:
- Strong programming skills in Python or Java
- Solid understanding of Data Structures and Algorithms
- Experience with SQL and REST APIs
- Familiarity with React, Node.js and Git
- Exposure to Docker, AWS and CI/CD is a plus
- Knowledge of Machine Learning or NLP is a bonus`;

sampleBtn.addEventListener("click", () => { jdInput.value = SAMPLE_JD; });

// --- File selection ---
fileInput.addEventListener("change", () => setFile(fileInput.files[0]));

["dragover", "dragenter"].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => {
    e.preventDefault();
    dropzone.classList.add("drag");
  })
);
["dragleave", "drop"].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => {
    e.preventDefault();
    dropzone.classList.remove("drag");
  })
);
dropzone.addEventListener("drop", (e) => {
  const f = e.dataTransfer.files[0];
  if (f) { fileInput.files = e.dataTransfer.files; setFile(f); }
});

function setFile(f) {
  selectedFile = f || null;
  fileName.textContent = f ? `Selected: ${f.name}` : "";
  clearError();
}

function clearError() { errorEl.textContent = ""; }
function showError(msg) { errorEl.textContent = msg; }

function setLoading(btn, on, label) {
  btn.disabled = on;
  otherBtn(btn).disabled = on;
  btn.dataset.label = btn.dataset.label || btn.textContent;
  btn.innerHTML = on ? `<span class="spinner"></span> ${label}` : btn.dataset.label;
}
function otherBtn(btn) { return btn === parseBtn ? matchBtn : parseBtn; }

// --- Actions ---
parseBtn.addEventListener("click", async () => {
  clearError();
  if (!selectedFile) return showError("Please select a resume file first.");
  setLoading(parseBtn, true, "Parsing...");
  try {
    const fd = new FormData();
    fd.append("file", selectedFile);
    const res = await fetch("/api/parse", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Parse failed");
    renderResults({ resume: data, match: null });
  } catch (err) {
    showError(err.message);
  } finally {
    setLoading(parseBtn, false);
  }
});

matchBtn.addEventListener("click", async () => {
  clearError();
  if (!selectedFile) return showError("Please select a resume file first.");
  if (!jdInput.value.trim()) return showError("Please paste a job description to match against.");
  setLoading(matchBtn, true, "Matching...");
  try {
    const fd = new FormData();
    fd.append("file", selectedFile);
    fd.append("job_description", jdInput.value);
    const res = await fetch("/api/match", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Match failed");
    renderResults(data);
  } catch (err) {
    showError(err.message);
  } finally {
    setLoading(matchBtn, false);
  }
});

// --- Rendering ---
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

function verdictColor(score) {
  if (score >= 75) return { bg: "#dcfce7", color: "#166534", name: "Excellent Match" };
  if (score >= 55) return { bg: "#dbeafe", color: "#1e40af", name: "Good Match" };
  if (score >= 35) return { bg: "#fef3c7", color: "#92400e", name: "Moderate Match" };
  return { bg: "#fee2e2", color: "#991b1b", name: "Poor Match" };
}

function chips(list, cls) {
  if (!list || !list.length) return `<p class="empty-note">None</p>`;
  return `<div class="chips">${list.map((s) => `<span class="chip ${cls}">${esc(s)}</span>`).join("")}</div>`;
}

function link(url) {
  if (!url) return "—";
  const href = url.startsWith("http") ? url : "https://" + url;
  return `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(url)}</a>`;
}

function renderResults({ resume, match }) {
  placeholder.classList.add("hidden");
  results.classList.remove("hidden");

  let html = "";

  if (match) {
    const verdict = verdictColor(match.score);
    const hue = match.score >= 75 ? "hsl(132, 80%, 50%)" : match.score >= 55 ? "hsl(217, 91%, 60%)" : match.score >= 35 ? "hsl(38, 92%, 50%)" : "hsl(0, 90%, 60%)";
    
    html += `
      <div class="score-card">
        <div class="gauge" style="--val:${match.score}; background: conic-gradient(${hue} calc(${match.score} * 1%), #e5e7eb 0);">
          <span>${match.score}%</span>
        </div>
        <div class="score-meta">
          <h3>${verdict.name}</h3>
          <p>This resume matches ${match.score}% of the job requirements</p>
          <div class="subscores">
            <div><b>${match.skill_match_pct}%</b> Skills overlap</div>
            <div><b>${match.text_similarity_pct}%</b> Text similarity</div>
          </div>
        </div>
      </div>
      <div class="card">
        <h3>Matched Skills (${match.matched_skills.length})</h3>
        ${chips(match.matched_skills, "good")}
      </div>
      <div class="card">
        <h3>Missing Skills (${match.missing_skills.length})</h3>
        ${chips(match.missing_skills, "miss")}
      </div>`;
  }

  html += `
    <div class="card">
      <h3>Contact Information</h3>
      <div class="field-row"><span class="k">Name</span><span class="v">${esc(resume.name || "—")}</span></div>
      <div class="field-row"><span class="k">Email</span><span class="v">${esc(resume.email || "—")}</span></div>
      <div class="field-row"><span class="k">Phone</span><span class="v">${esc(resume.phone || "—")}</span></div>
      <div class="field-row"><span class="k">LinkedIn</span><span class="v">${link(resume.linkedin)}</span></div>
      <div class="field-row"><span class="k">GitHub</span><span class="v">${link(resume.github)}</span></div>
    </div>
    <div class="card">
      <h3>Skills (${resume.skills.length})</h3>
      ${chips(resume.skills, "")}
    </div>
    <div class="card">
      <h3>Education</h3>
      ${resume.education && resume.education.length
        ? resume.education.map((e) => `<div class="field-row"><span class="v" style="text-align:left">${esc(e)}</span></div>`).join("")
        : `<p class="empty-note">No education entries detected.</p>`}
    </div>`;

  results.innerHTML = html;
  results.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
