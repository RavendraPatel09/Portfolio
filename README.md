# 🚀 Portfolio — Flask Web App

A futuristic glassmorphism portfolio built with Python (Flask).

---

## 📁 Project Structure

```
portfolio/
├── app.py                  ← Flask app + all your data (edit this!)
├── requirements.txt        ← Python dependencies
├── .gitignore
├── templates/
│   └── index.html          ← HTML template (Jinja2)
└── static/
    ├── css/
    │   └── style.css       ← All styles
    └── js/
        └── main.js         ← Animations & interactions
```

---

## ⚡ STEP-BY-STEP SETUP IN VS CODE

### STEP 1 — Open the project in VS Code
```
File → Open Folder → select the `portfolio` folder
```

### STEP 2 — Open the terminal in VS Code
```
Terminal → New Terminal   (or press Ctrl + `)
```

### STEP 3 — Create a virtual environment
```bash
python -m venv venv
```

### STEP 4 — Activate the virtual environment

**Windows:**
```bash
venv\Scripts\activate
```

**Mac / Linux:**
```bash
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### STEP 5 — Install dependencies
```bash
pip install -r requirements.txt
```

### STEP 6 — Run the app
```bash
python app.py
```

### STEP 7 — Open in browser
```
http://localhost:5000
```

---

## ✏️ HOW TO CUSTOMISE

Open `app.py` and edit the `PORTFOLIO` dictionary at the top:

| Field        | What to change                          |
|-------------|------------------------------------------|
| `name`      | Your full name                           |
| `role`      | Your job title                           |
| `tagline`   | Short intro line                         |
| `email`     | Your email address                       |
| `github`    | Your GitHub profile URL                  |
| `linkedin`  | Your LinkedIn profile URL                |
| `stats`     | Numbers like years exp, projects, etc.   |
| `about`     | Your bio paragraph                       |
| `skills`    | Your skills with icon + level (0–100)    |
| `tools`     | Extra tools shown as pills               |
| `projects`  | Your projects (title, desc, tags, link)  |

---
