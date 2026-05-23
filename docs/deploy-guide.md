# Deploy Guide — Cutia de Mesaje

This app has a backend (a Node server), so it cannot go on static hosting like
GitHub Pages. It needs a host that runs a Node process. This guide uses
**Render**, which has a free tier and deploys straight from GitHub.

## One-time setup on Render
1. Go to https://render.com and sign up — you can sign in with your GitHub
   account.
2. Click **New +** → **Web Service**.
3. Connect GitHub and select the **cutia-de-mesaje** repository.
4. Fill in the service settings:
   - **Name:** cutia-de-mesaje (or anything you like)
   - **Region:** the one closest to you
   - **Branch:** main
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Open the **Environment** section and add one variable:
   - **Key:** `SESSION_SECRET`  **Value:** a long random string (32+ characters).
   - Do not set `PORT` — Render provides it automatically and the app already
     reads it.
6. Click **Create Web Service**. Render builds and starts the app; after a
   minute or two you get a live URL such as
   `https://cutia-de-mesaje.onrender.com`.

## First run
Open the live URL, go to `/register`, and create the admin account. From then
on, sign in at `/login` to read messages.

## Updates
Every time you push to the `main` branch on GitHub, Render redeploys
automatically — no extra step.

## Important notes
- The free tier **sleeps after inactivity**; the first request after a pause
  takes a few extra seconds while the service wakes up.
- **Data persistence:** the SQLite file lives on the server's disk. On Render's
  free tier that disk is not permanent — submitted messages can be lost on a
  redeploy. For real use, either attach a Render **persistent disk**, or switch
  to a hosted database (Render offers a free PostgreSQL instance). This is the
  trade-off noted in `docs/ARCHITECTURE.md`.
