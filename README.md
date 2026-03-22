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

## 🌐 GIT — COMMIT & PUSH TO GITHUB

### First time setup:

```bash
# Step 1: Initialise git
git init

# Step 2: Stage all files
git add .

# Step 3: First commit
git commit -m "🚀 Initial commit — portfolio"

# Step 4: Create a repo on GitHub (github.com → New Repository)
#         Copy the repo URL, then:

git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Step 5: Push
git push -u origin main
```

### Future updates:
```bash
git add .
git commit -m "✏️ Updated projects section"
git push
```

---

## 🛑 Stop the server
Press `Ctrl + C` in the terminal.

## 🔁 Deactivate virtual environment
```bash
deactivate
```
