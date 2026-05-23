# Architecture — Cutia de Mesaje

## Overview
A small server-backed web app. An Express server serves a static frontend and a
JSON API. Visitors use a public contact form; the site owner logs into a
protected admin area to read the submitted messages. All data lives in a local
SQLite file.

## Tech Stack & Why
- **Node.js + Express** — a minimal, well-understood server; the simplest stack
  that supports a form, a database, and accounts.
- **SQLite via better-sqlite3** — a zero-configuration file database; its
  synchronous API keeps the server code simple. Enough for a small inbox.
- **bcryptjs** — pure-JavaScript password hashing, with no native build step.
- **express-session** — cookie-based sessions for the admin login.
- **Static HTML/CSS/JS frontend** — no framework or build step is needed for
  three simple pages.

## Folder Structure
- `server.js` — the Express app: middleware, the JSON API, page routes, and
  static file serving.
- `db.js` — opens the SQLite database and creates the tables on first run.
- `public/` — the public frontend: `index.html` (contact), `login.html`,
  `register.html`, `css/styles.css`, and `js/*.js`.
- `private/admin.html` — the inbox page; served only through the gated `/admin`
  route, never as a static file.
- `docs/` — brief, design spec, test report, this file, and the handoff guide.
- `tests/` — the Playwright end-to-end tests.

## Data Model
- `admins` — `id`, `email` (unique), `password_hash`, `created_at`. Holds the
  single admin account.
- `messages` — `id`, `name`, `email`, `body`, `created_at`. One row per contact
  submission.

## Key Flows
- **Sending a message** — the contact form posts JSON to `POST /api/messages`.
  The server validates the name, email, and body, then inserts a `messages` row.
- **Registering the admin** — `POST /api/register` works only while no admin
  exists. It hashes the password with bcrypt and starts a session.
- **Logging in** — `POST /api/login` looks up the email and bcrypt-compares the
  password, then stores `adminId` in the session.
- **Reading messages** — `GET /admin` (the page) and `GET /api/messages` (the
  data) are both gated by the session. The page redirects to `/login` when not
  authenticated; the API returns 401. The inbox escapes every message before
  rendering it, to prevent stored XSS.

## Important Decisions
- The admin page lives in `private/`, outside the static directory, so it can
  only be reached through the auth-checked `/admin` route — not by guessing a
  file URL.
- Registration is single-use (the first account only) — this app has one owner.
- SQLite was chosen over a hosted database because the data volume is tiny and
  zero configuration matters more than scale here. See the deploy guide for the
  caveat this creates in production.
