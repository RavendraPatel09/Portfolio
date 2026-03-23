"""
Portfolio Web App — Built with Flask
Run: python app.py  →  open http://localhost:5000
"""

from flask import Flask, render_template, jsonify

app = Flask(__name__)
PORTFOLIO = {
    "name":      "SAMARTH SINGH",
    "role":      "Frontend Developer",
    "tagline":   "Crafting pixel-perfect interfaces at the intersection of design & engineering.",
    "available": True,
    "email":     "you@example.com",
    "github":    "https://github.com/yourusername",
    "linkedin":  "https://linkedin.com/in/yourusername",

    "stats": [
        {"number": "3+",   "label": "Years Experience"},
        {"number": "24",   "label": "Projects Shipped"},
        {"number": "8",    "label": "Happy Clients"},
        {"number": "100%", "label": "Passion for Craft"},
    ],

    "about": (
        "I'm a Frontend Developer obsessed with the details most people miss — "
        "the spacing that makes a layout breathe, the easing curve that makes an "
        "animation feel alive. I specialise in React, TypeScript, and Tailwind CSS "
        "with a strong eye for UI/UX using Figma."
    ),

    "highlights": [
        {"icon": "⚡", "title": "Performance First", "desc": "Core Web Vitals obsessed — fast loads, smooth interactions"},
        {"icon": "🎨", "title": "Design → Code",     "desc": "Pixel-perfect Figma to React with zero compromise"},
        {"icon": "🔧", "title": "Full Ownership",    "desc": "From architecture decisions to CI/CD deployment"},
    ],

    "skills": [
        {"name": "React / Next.js", "icon": "⚛️", "level": 95},
        {"name": "TypeScript",      "icon": "🔷", "level": 90},
        {"name": "Tailwind CSS",    "icon": "💨", "level": 95},
        {"name": "Figma",           "icon": "🎨", "level": 85},
        {"name": "Node.js",         "icon": "🟢", "level": 75},
    ],

    "tools": [
        "Next.js", "Zustand", "React Query", "Framer Motion",
        "Shadcn/ui", "Prisma", "PostgreSQL", "Vercel", "Git", "REST APIs",
    ],

    "projects": [
        {
            "num":      "01",
            "title":    "Luminar Dashboard",
            "desc":     "Real-time analytics dashboard for SaaS. Handles 50k+ data points at 60fps. Multi-tenant auth, custom widget builder, and CSV export.",
            "tags":     ["React", "TypeScript", "Tailwind", "Node.js"],
            "link":     "#",
            "featured": True,
            "emoji":    "📊",
        },
        {
            "num":      "02",
            "title":    "Orbita UI Kit",
            "desc":     "Open-source component library with 80+ production-ready components. Built with Tailwind CSS and Radix UI. 900+ GitHub stars.",
            "tags":     ["Figma", "TypeScript", "Tailwind"],
            "link":     "#",
            "featured": False,
            "emoji":    "🧩",
        },
        {
            "num":      "03",
            "title":    "FlowForm Builder",
            "desc":     "Drag-and-drop form builder with conditional logic, multi-step flows, and analytics. Saved clients 40+ hours/month.",
            "tags":     ["Next.js", "React", "Node.js"],
            "link":     "#",
            "featured": False,
            "emoji":    "📋",
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
