# Project Brief — Cutia de Mesaje

## Summary
A small web app with two sides. Visitors submit a message through a public
contact form. The site owner logs into a private admin area to read every
message received. Built as a test of the backend half of the web-builder
pipeline. Content is in Romanian.

## Type
Small web app — a public form plus a password-protected admin area.

## Audience
Public visitors (use the contact form, no account needed) and the site owner
(one admin account, reads the messages).

## Goals
- Primary: a visitor can send a contact message and gets clear confirmation.
- Secondary: the owner can log in and read all messages; someone who is not
  logged in cannot reach the inbox.

## Pages & Sections
- Contact page (public) — the contact form: name, email, message.
- Login page — admin sign-in.
- Admin inbox (protected) — every submitted message, newest first, with a
  logout button.

## Features
- Contact form submission — saved on the server. Must-have.
- Input validation — on both the client and the server. Must-have.
- Admin account — registered once, then used to log in. Must-have.
- Session-based authentication — stays logged in; logout ends the session.
  Must-have.
- Protected route — the inbox is reachable only while logged in. Must-have.
- Messages shown newest-first, each with its timestamp. Must-have.

## Content
Placeholder content, in a generic "contact us for a small business" context.

## Visual Direction
Clean, simple, trustworthy. Light theme, one accent color, generous spacing,
clear and obvious forms. Nothing flashy — it should feel reliable.

## Tech Stack
- Choice: Node.js + Express backend, static HTML/CSS/JS frontend, SQLite
  database (better-sqlite3), bcryptjs for password hashing.
- Reason: the simplest real stack that supports a form, a database, and user
  accounts — light to install and quick to run.

## Constraints
- Runs locally with `npm install` then `npm start`.
- The session secret lives in an environment variable, never in code.
- Content language: Romanian.

## Out of Scope
- Password reset, email notifications, more than one admin user.
- Rich-text messages, file attachments.
- Spam protection beyond basic input validation.
