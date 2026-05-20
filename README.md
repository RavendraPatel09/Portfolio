# Ravendra Patel — Developer Portfolio

Premium **React + Vite** portfolio with **Three.js / React Three Fiber**, **Framer Motion**, **GSAP ScrollTrigger**, **Lenis** smooth scroll, **Tailwind CSS**, and **EmailJS** for the contact form.

## Quick start

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

### VS Code “Go Live” (Live Server)

This project is **Vite + React**, not plain HTML. **Go Live** only serves static files, so it must use the **production build** in `dist/` (already configured in `.vscode/settings.json`).

1. Run **`npm run build`** once (or use **Terminal → Run Build Task**, default **Ctrl+Shift+B** / **Cmd+Shift+B**).
2. Click **Go Live** — Live Server will serve from **`dist/`** and the site should load normally.

After you change source code, run **`npm run build`** again before refreshing Go Live.

### VS Code Run and Debug (dev server)

Use **Run → Start Debugging** and pick **“Vite: dev server”** for hot reload (same as `npm run dev`).

Build:

```bash
npm run build
npm run preview
```

## EmailJS

1. Copy `.env.example` to `.env`.
2. Create a service + template at [EmailJS](https://www.emailjs.com/) that delivers to **patelsamerth9@gmail.com**.
3. Map template variables (e.g. `from_name`, `from_email`, `message`) to match `src/components/Contact.jsx`.

## Resume download

Add your PDF as `public/resume.pdf` so the **Download Resume** button works.

## Stack

- React 18, Vite 5  
- `@react-three/fiber`, `@react-three/drei`, `three`  
- `framer-motion`, `gsap`, `lenis`, `@emailjs/browser`, `lucide-react`  
- Tailwind CSS  

---

Built with care for **Ravendra Patel** ([@RavendraPatel09](https://github.com/RavendraPatel09)).
