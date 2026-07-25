"""Curated skill dictionary used for keyword-based skill extraction.

Keys are canonical skill names; values are lists of aliases/variants that may
appear in a resume or job description. Matching is case-insensitive and
whole-word (so "r" won't match inside "react").
"""

SKILL_ALIASES = {
    # Programming languages
    "Python": ["python"],
    "Java": ["java"],
    "JavaScript": ["javascript", "js"],
    "TypeScript": ["typescript", "ts"],
    "C++": ["c++", "cpp"],
    "C": ["c language", " c "],
    "C#": ["c#", "csharp"],
    "Go": ["golang", "go lang"],
    "Rust": ["rust"],
    "Ruby": ["ruby"],
    "PHP": ["php"],
    "Swift": ["swift"],
    "Kotlin": ["kotlin"],
    "R": ["r programming", " r,"],
    "Scala": ["scala"],
    "MATLAB": ["matlab"],
    "SQL": ["sql"],
    "Bash": ["bash", "shell scripting"],

    # Web / frameworks
    "React": ["react", "react.js", "reactjs"],
    "Angular": ["angular", "angular.js", "angularjs"],
    "Vue": ["vue", "vue.js", "vuejs"],
    "Node.js": ["node.js", "nodejs", "node js"],
    "Express": ["express", "express.js"],
    "Django": ["django"],
    "Flask": ["flask"],
    "FastAPI": ["fastapi", "fast api"],
    "Spring": ["spring", "spring boot", "springboot"],
    "Next.js": ["next.js", "nextjs"],
    "HTML": ["html", "html5"],
    "CSS": ["css", "css3"],
    "Tailwind": ["tailwind", "tailwindcss"],
    "Bootstrap": ["bootstrap"],

    # Data / ML / AI
    "Machine Learning": ["machine learning", "ml"],
    "Deep Learning": ["deep learning"],
    "NLP": ["nlp", "natural language processing"],
    "Computer Vision": ["computer vision", "opencv"],
    "TensorFlow": ["tensorflow"],
    "PyTorch": ["pytorch", "torch"],
    "Keras": ["keras"],
    "scikit-learn": ["scikit-learn", "sklearn", "scikit learn"],
    "Pandas": ["pandas"],
    "NumPy": ["numpy"],
    "Matplotlib": ["matplotlib"],
    "Data Analysis": ["data analysis", "data analytics"],
    "Data Science": ["data science"],
    "Statistics": ["statistics", "statistical"],
    "LLM": ["llm", "large language model", "large language models"],
    "Generative AI": ["generative ai", "genai", "gen ai"],

    # Databases
    "MySQL": ["mysql"],
    "PostgreSQL": ["postgresql", "postgres"],
    "MongoDB": ["mongodb", "mongo"],
    "Redis": ["redis"],
    "SQLite": ["sqlite"],
    "Oracle": ["oracle db", "oracle database"],
    "Cassandra": ["cassandra"],
    "Elasticsearch": ["elasticsearch"],

    # Cloud / DevOps
    "AWS": ["aws", "amazon web services"],
    "Azure": ["azure"],
    "GCP": ["gcp", "google cloud"],
    "Docker": ["docker"],
    "Kubernetes": ["kubernetes", "k8s"],
    "CI/CD": ["ci/cd", "cicd", "continuous integration"],
    "Jenkins": ["jenkins"],
    "Terraform": ["terraform"],
    "Linux": ["linux", "unix"],
    "Git": ["git", "github", "gitlab"],

    # Concepts
    "REST API": ["rest api", "restful", "rest apis"],
    "GraphQL": ["graphql"],
    "Microservices": ["microservices", "microservice"],
    "Data Structures": ["data structures", "dsa"],
    "Algorithms": ["algorithms", "algorithm"],
    "OOP": ["oop", "object oriented", "object-oriented"],
    "Agile": ["agile", "scrum"],
    "System Design": ["system design"],
    "Testing": ["unit testing", "pytest", "junit", "selenium"],
}

# All canonical skill names, useful for iteration.
ALL_SKILLS = list(SKILL_ALIASES.keys())
