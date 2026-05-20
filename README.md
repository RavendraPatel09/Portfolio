# Ravendra Patel — Developer Portfolio

Premium **React + Vite** portfolio with **Three.js**, **Framer Motion**, **Lenis**, **Tailwind CSS**, and **EmailJS**.

## Run the site (important)

This is **not** plain HTML. **Go Live alone on the project root will show a black screen** because the browser cannot run `/src/main.jsx` without Vite.

### Option A — Development (recommended)

```bash
npm install
npm run dev
```

Opens **http://localhost:5173** with hot reload.

### Option B — Production preview (after build)

```bash
npm run build
npm run preview
```

Or one command:

```bash
npm start
```

Opens **http://localhost:5501** serving the `dist/` folder correctly.

### VS Code Go Live

Only works **after** `npm run build`, with Live Server root set to `dist` (see `.vscode/settings.json`):

1. `npm run build`
2. Click **Go Live**

Better: use **Terminal → Run Task → Dev server (hot reload)** or **Run portfolio (build + preview)**.

## EmailJS

Copy `.env.example` to `.env` and add your EmailJS keys.

## Resume

Add `public/resume.pdf` for the Download Resume button.
