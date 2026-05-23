# Cutia de Mesaje

A small web app: visitors send a message through a contact form, and the site
owner logs into a private admin area to read every message received.

Built as a test of the [web-builder](https://github.com/aibutnaruflorin-dot/web-builder-marketplace) pipeline.

## Tech stack
- Node.js + Express — server and JSON API
- SQLite via better-sqlite3 — storage
- bcryptjs — password hashing
- Static HTML / CSS / JavaScript — frontend

## Prerequisites
- Node.js 18 or newer

## Setup
```
npm install
cp .env.example .env
```
Then edit `.env` and set a long random `SESSION_SECRET`.

## Run
```
npm start
```
Open http://localhost:3000. The first visit to `/register` creates the single
admin account; after that, sign in at `/login` to read messages at `/admin`.

## Tests
```
npx playwright test
```

## Project structure
- `server.js` — Express server and JSON API
- `db.js` — SQLite database setup
- `public/` — static frontend: contact, login, register pages
- `private/admin.html` — the protected admin inbox
- `docs/` — brief, design spec, test report

## License
Add a license of your choice before publishing publicly.
