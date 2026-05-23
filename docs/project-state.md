# Project State — Cutia de Mesaje

- **Stack:** Node.js + Express, static HTML/CSS/JS frontend, SQLite (better-sqlite3), bcryptjs
- **Created:** 2026-05-23
- **Last updated:** 2026-05-23
- **Repository:** https://github.com/aibutnaruflorin-dot/cutia-de-mesaje

## Pipeline
- [x] 1. Brief — docs/brief.md
- [x] 2. Design — docs/design.md
- [x] 3. Frontend — public/ pages, css, js
- [x] 4. Backend — server.js, db.js, API + auth
- [x] 5. GitHub — https://github.com/aibutnaruflorin-dot/cutia-de-mesaje
- [x] 6. Testing — docs/test-report.md (8 passed / 0 failed)
- [ ] 7. Deploy — guide written (docs/deploy-guide.md); user to run it on Render
- [x] 8. Docs — docs/ARCHITECTURE.md, docs/HANDOFF.md

## Notes
- Full-pipeline test run of the web-builder plugin, on a project WITH a backend.
- App: public contact form + admin login + protected inbox.
- Run locally: `npm install`, then `npm start` (open http://localhost:3000).
- Tests: `npx playwright test`.
- Deploy is the only phase left for 