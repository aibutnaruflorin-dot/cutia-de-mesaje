# Handoff Guide — Cutia de Mesaje

## Run It Locally
1. Install Node.js 18 or newer.
2. `npm install`
3. `cp .env.example .env`, then set a long random `SESSION_SECRET` in `.env`.
4. `npm start`
5. Open http://localhost:3000. Visit `/register` once to create the admin
   account; afterwards sign in at `/login`.

## Accounts & Access Needed
- **GitHub** — the repository is at
  https://github.com/aibutnaruflorin-dot/cutia-de-mesaje
- **A hosting account** (Render is recommended) to deploy — see
  `docs/deploy-guide.md`.

## Environment Variables
- `PORT` — the port the server listens on (default 3000). Hosts usually set this
  automatically.
- `SESSION_SECRET` — the secret used to sign session cookies. Must be a long
  random string. Never commit it; it lives only in `.env` locally, and in the
  host's environment settings in production.

## How to Make Common Changes
- **Edit page text** — the three public pages are `public/*.html`.
- **Change the look** — every color and spacing value is a CSS variable at the
  top of `public/css/styles.css`.
- **Add an API endpoint** — add a route in `server.js`, following the existing
  validate-then-respond pattern.
- **Change the data model** — edit the `CREATE TABLE` statements in `db.js`. In
  development, delete `data.db` to recreate the database from scratch.

## Deployment
The app needs a host that runs a Node server process — not static hosting.
Full step-by-step instructions are in `docs/deploy-guide.md`.

## Tests
`npx playwright test` — runs the Playwright suite against a fresh database. The
server is started automatically by the test runner.

## Known Limitations & Next Steps
- One admin account only; there is no password reset.
- No email notification when a message arrives.
- No rate limiting on the public contact form yet — a security review would add
  it (see the `security-review` skill).
- SQLite is fine for a small inbox; a busy site would move to a hosted database.
