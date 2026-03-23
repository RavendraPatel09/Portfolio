"""
Portfolio Web App — Built with Flask
Run: python app.py  →  open http://localhost:5000
"""

from flask import Flask, render_template, jsonify

app = Flask(__name__)
PORTFOLIO = {
    "name":      "Ravendra Patel",
    "role":      "AI Developer",
    "tagline":   "Crafting pixel-perfect interfaces at the intersection of design & engineering.",
    "available": True,
    "email":     "Patelsamerth9@gmail.com",
    "github":    "https://github.com/RavendraPatel09",
    "linkedin":  "https://linkedin.com/in/ravendra-patel-3bb375338",

    "stats": [
        {"label": "Fresher"},
        {"number": "5",   "label": "Projects Worked"},
        {"number": "100%", "label": "Passenated to Learn"},
    ],

    "about": (
    "I focused on crafting clean, responsive, and user-friendly interfaces using React, TypeScript, and Tailwind CSS. With a strong foundation in HTML, CSS, Python, and Cpp, Im currently improving my skills in DSA, System Design, and SQL to build scalable and efficient applications"
    ),

    "highlights": [
        {"icon": "⚡", "title": "Performance First", "desc": "Core Web Vitals obsessed — fast loads, smooth interactions"},
        {"icon": "🎨", "title": "Design → Code",     "desc": "Pixel-perfect Figma to React with zero compromise"},
        {"icon": "🔧", "title": "Full Ownership",    "desc": "From architecture decisions to CI/CD deployment"},
    ],

    "skills": [
[
{"name": "React / Next.js", "icon": "⚛️", "level": 60},
{"name": "TypeScript",      "icon": "🔷", "level": 65},
{"name": "Tailwind CSS",    "icon": "💨", "level": 95},
{"name": "Figma",           "icon": "🎨", "level": 85},
{"name": "Node.js",         "icon": "🟢", "level": 75},
{"name": "HTML",            "icon": "🌐", "level": 95},
{"name": "Python",          "icon": "🐍", "level": 85},
{"name": "C++",             "icon": "⚙️", "level": 80},
{"name": "SQL",             "icon": "🗄️", "level": 80}
]
    ],

    "tools": [
        "Next.js", "Zustand", "React Query", "Framer Motion",
        "Shadcn/ui", "Prisma", "PostgreSQL", "Vercel", "Git", "REST APIs",
        "Postgres","Figma","Cursor","Google collabe"
    ],

    "projects": [
        {
            "num":      "01",
            "title":    "Socialconnect",
            "desc":     "Help in real time to connect creator and manager at one place with all the essential think kept safe.",
            "tags":     ["React", "TypeScript", "Tailwind", "Node.js","Etc"],
            "featured": True,
            "emoji":    "📊",
        },
        {
            "num":      "02",
            "title":    "Find my stuff",
            "desc":     "Open-source website that help student find there lost things at campus with the help of student and real time monitor with the help of cammera.",
            "tags":     ["Figma", "TypeScript", "Tailwind","Javascript","sql","html","tailwindcss"],
            "featured": True,
            "emoji":    "🧩",
        },
        {
            "num":      "03",
            "title":    "FlowForm Builder",
            "desc":     "Drag-and-drop form builder with conditional logic, multi-step flows, and analytics. Saved clients 40+ hours/month.",
            "tags":     ["Next.js", "React", "Node.js"],
            "link":     "#",
            "featured": False,
            "emoji":    "🌐",
        },
    ],
}
@app.route("/")
def index():
    """Main portfolio page."""
    return render_template("index.html", p=PORTFOLIO)


@app.route("/api/portfolio")
def api_portfolio():
    """Optional JSON API — useful for headless / React frontends."""
    return jsonify(PORTFOLIO)
if __name__ == "__main__":
    app.run(debug=True, port=5000)
    if PORTFOLIO["available"]:
        print(f"🚀 {PORTFOLIO['name']} is available for hire! Contact: {PORTFOLIO['email']}")
