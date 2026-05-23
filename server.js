"use strict";

/* Cutia de Mesaje — Express server.
   Serves the static frontend and the JSON API: contact messages,
   admin registration/login, and the protected inbox. */

require("dotenv").config();

const path = require("path");
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
// In production SESSION_SECRET must be set in the environment. The fallback
// below exists only so the app can boot in local development.
const SESSION_SECRET =
  process.env.SESSION_SECRET || "dev-only-insecure-secret-change-me";

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax", maxAge: 1000 * 60 * 60 * 8 },
  })
);

// --- helpers ---
function isEmail(v) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function requireAuthApi(req, res, next) {
  if (req.session && req.session.adminId) return next();
  return res.status(401).json({ error: "Trebuie să fii autentificat." });
}
function requireAuthPage(req, res, next) {
  if (req.session && req.session.adminId) return next();
  return res.redirect("/login");
}

// --- API: contact messages ---
app.post("/api/messages", (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const body = String(req.body.message || "").trim();
  if (name.length < 2)
    return res.status(400).json({ error: "Numele este prea scurt." });
  if (!isEmail(email))
    return res.status(400).json({ error: "Adresa de email nu este validă." });
  if (body.length < 5)
    return res.status(400).json({ error: "Mesajul este prea scurt." });
  if (body.length > 2000)
    return res.status(400).json({ error: "Mesajul este prea lung." });
  db.prepare(
    "INSERT INTO messages (name, email, body, created_at) VALUES (?, ?, ?, ?)"
  ).run(name, email, body, new Date().toISOString());
  res.status(201).json({ ok: true });
});

// --- API: admin account ---
app.get("/api/admin-exists", (req, res) => {
  const row = db.prepare("SELECT COUNT(*) AS n FROM admins").get();
  res.json({ exists: row.n > 0 });
});

app.post("/api/register", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const existing = db.prepare("SELECT COUNT(*) AS n FROM admins").get();
  if (existing.n > 0)
    return res.status(409).json({ error: "Contul de admin există deja." });
  if (!isEmail(email))
    return res.status(400).json({ error: "Adresa de email nu este validă." });
  if (password.length < 8)
    return res
      .status(400)
      .json({ error: "Parola trebuie să aibă cel puțin 8 caractere." });
  const hash = bcrypt.hashSync(password, 10);
  const info = db
    .prepare(
      "INSERT INTO admins (email, password_hash, created_at) VALUES (?, ?, ?)"
    )
    .run(email, hash, new Date().toISOString());
  req.session.adminId = info.lastInsertRowid;
  res.status(201).json({ ok: true });
});

app.post("/api/login", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const admin = db.prepare("SELECT * FROM admins WHERE email = ?").get(email);
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    return res.status(401).json({ error: "Email sau parolă greșite." });
  }
  req.session.adminId = admin.id;
  res.json({ ok: true });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get("/api/session", (req, res) => {
  res.json({ loggedIn: !!(req.session && req.session.adminId) });
});

// Protected: only a logged-in admin can read the messages.
app.get("/api/messages", requireAuthApi, (req, res) => {
  const rows = db
    .prepare(
      "SELECT id, name, email, body, created_at FROM messages ORDER BY id DESC"
    )
    .all();
  res.json({ messages: rows });
});

// --- page routes ---
const PUBLIC = path.join(__dirname, "public");
const PRIVATE = path.join(__dirname, "private");

app.get("/", (req, res) => res.sendFile(path.join(PUBLIC, "index.html")));
app.get("/login", (req, res) => res.sendFile(path.join(PUBLIC, "login.html")));
app.get("/register", (req, res) =>
  res.sendFile(path.join(PUBLIC, "register.html"))
);
// The inbox page itself is gated — an unauthenticated request is redirected.
app.get("/admin", requireAuthPage, (req, res) =>
  res.sendFile(path.join(PRIVATE, "admin.html"))
);

// --- static assets (css, js) ---
app.use(express.static(PUBLIC));

app.listen(PORT, () => {
  console.log("Cutia de Mesaje ruleaza pe http://localhost:" + PORT);
});
