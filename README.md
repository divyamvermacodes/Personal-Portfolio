# Divyam Verma — Portfolio

A full-stack developer portfolio: React + Vite frontend, Node/Express + MongoDB backend for the contact form.

```
portfolio/
├── frontend/   React + Vite site (all portfolio sections)
└── backend/    Express API (contact form storage)
```

---

## 1. Prerequisites

- Node.js 18+ and npm
- A MongoDB connection string — either:
  - Local MongoDB (`mongodb://localhost:27017/portfolio`), or
  - A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (recommended — no local install needed)

---

## 2. Local development

### Backend

```bash
cd backend
cp .env.example .env
# open .env and set MONGO_URI (and ADMIN_KEY if you want to view submissions)
npm install
npm run dev
```

The API runs at `http://localhost:5000`. Check it's alive:

```bash
curl http://localhost:5000/api/health
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The site runs at `http://localhost:5173`. In dev, Vite proxies any `/api/*` request to `http://localhost:5000` (see `vite.config.js`), so the contact form works against your local backend automatically — no extra config needed.

---

## 3. Add your real CV

Drop your resume PDF into:

```
frontend/public/resume/Divyam-Verma-CV.pdf
```

Every "Download CV" / "View Online" button already points to `/resume/Divyam-Verma-CV.pdf` — no code changes needed. If you name the file differently, update `profile.resumeUrl` in `frontend/src/data/portfolioData.js`.

---

## 4. Editing your content (no component code required)

Everything you'd normally hardcode lives in one file:

```
frontend/src/data/portfolioData.js
```

It exports plain objects/arrays that the components read from:

| Export | Powers |
|---|---|
| `profile` | Name, title, tagline, email, GitHub/LinkedIn URLs, resume path |
| `heroChecks` | The "test suite" lines in the hero terminal |
| `about` | Summary paragraphs, focus areas, short/long-term goals |
| `skills` | Skill categories and the items inside each |
| `projects` | Every project card — name, description, problem solved, tech, features, links |
| `educationTimeline` | Degree entries |
| `courses` | Completed/ongoing courses |
| `certifications` | Certifications with verification links |
| `experience` | Internships/experience entries |
| `nav` | Nav bar links (keep in sync with section `id`s if you rename a section) |

### Adding a new project

Open `projects` in `portfolioData.js` and add an object to the array:

```js
{
  id: "unique-id",
  name: "Project Name",
  description: "One or two sentence summary.",
  problem: "The real problem this solved.",
  technologies: ["React", "Node.js"],
  features: ["Feature one", "Feature two"],
  githubUrl: "https://github.com/you/repo",
  liveUrl: "https://your-demo-url.com", // omit or leave "" if none
  image: "https://your-image-url.com/screenshot.png", // omit if you don't have one yet
}
```

Adding certifications, courses, or experience entries follows the exact same pattern — copy an existing object in that array and fill in the fields.

### Replacing placeholders

Search the codebase for `[` — every bracketed value like `[YOUR_EMAIL@example.com]` or `[YOUR COLLEGE NAME]` is a placeholder waiting for your real info. They're all in `portfolioData.js` except the resume file itself.

```bash
grep -rn "\[YOUR" frontend/src/data/portfolioData.js
```

---

## 5. Production deployment

### Backend (e.g. Render, Railway, Fly.io, or any Node host)

1. Push the `backend/` folder to its own repo (or deploy as a subdirectory).
2. Set environment variables on the host: `MONGO_URI`, `CLIENT_ORIGIN` (your deployed frontend URL), `ADMIN_KEY`, `PORT` (most hosts set this for you).
3. Start command: `npm start`.
4. Confirm `https://your-api-domain.com/api/health` responds.

### Frontend (e.g. Vercel, Netlify, GitHub Pages via static hosting)

1. Build: `npm run build` inside `frontend/` — outputs to `frontend/dist/`.
2. Deploy the `dist/` folder as a static site.
3. Since there's no dev proxy in production, either:
   - Point your host's rewrite/proxy rules at your backend for `/api/*`, **or**
   - Simplest: change the `fetch('/api/contact', ...)` call in `src/components/Contact.jsx` to your full backend URL, e.g. `fetch('https://your-api-domain.com/api/contact', ...)`.
4. Update `profile.github`, `profile.linkedin`, `og:url` in `index.html`, etc. to your real URLs before sharing the link.

### MongoDB in production

Use a MongoDB Atlas cluster and put its connection string in the backend's `MONGO_URI`. Whitelist your backend host's IP (or `0.0.0.0/0` for simplicity if the host doesn't have a static IP) in Atlas's network access settings.

---

## 6. Viewing contact submissions

The `GET /api/contact` route returns the last 100 messages, protected by a header:

```bash
curl -H "x-admin-key: YOUR_ADMIN_KEY" https://your-api-domain.com/api/contact
```

This is intentionally minimal (a shared secret key, not full auth) — good enough for a personal portfolio, but swap in real authentication if you expose this more broadly.

---

## 7. Tech stack summary

**Frontend:** React 18, Vite 5, plain CSS with design tokens (no framework lock-in), React Router available if you want to add more pages later.

**Backend:** Express 4, Mongoose 8, express-validator (input validation), express-rate-limit (abuse protection on the contact form), helmet (security headers), cors, dotenv.

**Design:** Dark terminal-inspired theme (`#0A0E14` background, `#39D98A` pass-green accent, `#F2B705` amber highlight), JetBrains Mono for headings/labels, Inter for body text — built around the idea of a QA engineer's test suite passing on your own skills.
