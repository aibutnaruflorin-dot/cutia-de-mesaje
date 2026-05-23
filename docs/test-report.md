# Test Report — Cutia de Mesaje

- **Date:** 2026-05-23
- **Result:** 8 passed / 0 failed
- **Browser:** Chromium, desktop viewport — Playwright 1.60

## Scenarios Covered
- Contact form: a valid message submits and shows the success banner — pass
- Contact form: an invalid email is caught by client-side validation — pass
- Contact API: the server rejects a message with no name (HTTP 400) — pass
- Admin registration creates the account and lands on the inbox — pass
- The protected inbox redirects to login when not authenticated — pass
- Login with a wrong password shows an error — pass
- Login with correct credentials reaches the inbox — pass
- Logout returns to the contact page — pass

## Issues Found & Fixed
- None — the suite passed on its first full run. The `channel: 'chromium'`
  setting (now built into the e2e-testing skill) was applied from the start, so
  the browser launched correctly with no retry needed.

## Known Limitations / Not Tested
- Tested on the desktop viewport only; the mobile viewport was left out to keep
  the run within the sandbox's per-command time limit.
- Fonts load from Google Fonts (CDN); offline the page falls back to system
  fonts — layout and behaviour are unaffected.
- No load or performance testing.

## How to Run
```
npm install
npx playwright test
```
The tests run serially against a fresh database, with the Express server started
automatically by Playwright.
