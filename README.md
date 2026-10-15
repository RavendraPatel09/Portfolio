# Ravendra Patel — Developer Portfolio

Premium **React + Vite** portfolio with **Three.js**, **Framer Motion**, **Lenis**, **Tailwind CSS**, and **EmailJS**.

The React app and its Vite configuration live in `frontend/`. Backend-related files
live in `backend/`; the existing Python file there is compiled bytecode, not source.

## Run the site (important)

This is **not** plain HTML. **Go Live alone on the project root will show a black screen** because the browser cannot run the app entry point without Vite.

### Option A — Development (recommended)

```bash
npm install --prefix frontend
npm --prefix frontend run dev
```

Opens **http://localhost:5173** with hot reload.

### Option B — Production preview (after build)

```bash
npm --prefix frontend run build
npm --prefix frontend run preview
```

Or one command:

```bash
npm --prefix frontend start
```

Opens **http://localhost:5501** serving `frontend/dist/` correctly.

### VS Code Go Live

Only works **after** building, with Live Server root set to `frontend/dist` (see `.vscode/settings.json`):

1. `npm --prefix frontend run build`
2. Click **Go Live**

Better: use **Terminal → Run Task → Dev server (hot reload)** or **Run portfolio (build + preview)**.

## EmailJS

Copy `frontend/.env.example` to `frontend/.env` and add your EmailJS keys.

## Resume

Add `frontend/public/resume.pdf` for the Download Resume button.
