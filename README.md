# Ravendra Patel — Developer Portfolio

Premium React + Vite portfolio featuring 3D visuals, scroll-based animations, and a working contact form.

**Tech:** React, Vite, Three.js, Framer Motion, Lenis (smooth scroll), Tailwind CSS, EmailJS

---

## Project Structure

- `frontend/` — the React app and Vite configuration (this is where you run all commands)
- `backend/` — reserved for future backend use; currently contains no active source (the existing Python file is compiled bytecode, not source)

---

## Running the site

> ⚠️ This is a Vite app, not static HTML. Opening the project root with "Go Live" or directly in a browser will show a **black screen** — the browser can't resolve the app entry point without Vite running.

### Option A — Development (recommended)

```bash
npm install --prefix frontend
npm --prefix frontend run dev
```

Runs at **http://localhost:5173** with hot reload.

### Option B — Production preview

```bash
npm --prefix frontend run build
npm --prefix frontend run preview
```

Or, as a single command:

```bash
npm --prefix frontend start
```

Serves the built app from `frontend/dist/` at **http://localhost:5501**.

### Using VS Code's "Go Live"

Only works *after* a production build, with the Live Server root set to `frontend/dist` (already configured in `.vscode/settings.json`):

1. `npm --prefix frontend run build`
2. Click **Go Live**

For a smoother experience, use VS Code's **Terminal → Run Task** menu instead:
- **Dev server (hot reload)**
- **Run portfolio (build + preview)**

---

## Environment setup

### Contact form (EmailJS)

```bash
cp frontend/.env.example frontend/.env
```

Then add your EmailJS service ID, template ID, and public key to `frontend/.env`.

### Resume download

Place your resume PDF at:
