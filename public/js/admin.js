"use strict";

/* Admin inbox — load the messages and render them, newest first. */

var listEl = document.getElementById("list");
var countEl = document.getElementById("count");
var logoutBtn = document.getElementById("logoutBtn");

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("ro-RO", {
      dateStyle: "medium", timeStyle: "short",
    });
  } catch (e) {
    return iso;
  }
}

/* Escape user-supplied text before putting it in the page — prevents
   a stored message from injecting HTML or script (stored XSS). */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return {
      "&": "&amp;", "<": "&lt;", ">": "&gt;",
      '"': "&quot;", "'": "&#39;",
    }[c];
  });
}

async function loadMessages() {
  try {
    var res = await fetch("/api/messages");
    if (res.status === 401) {
      window.location.href = "/login";
      return;
    }
    var data = await res.json();
    var messages = data.messages || [];

    countEl.textContent = messages.length +
      (messages.length === 1 ? " mesaj" : " mesaje");

    if (messages.length === 0) {
      listEl.innerHTML = '<p class="empty">Încă nu a venit niciun mesaj.</p>';
      return;
    }

    listEl.innerHTML = messages.map(function (m) {
      return '<article class="message-card">' +
        '<div class="who">' + escapeHtml(m.name) + "</div>" +
        '<div class="meta">' + escapeHtml(m.email) + " &middot; " +
          escapeHtml(formatDate(m.created_at)) + "</div>" +
        '<div class="body">' + escapeHtml(m.body) + "</div>" +
        "</article>";
    }).join("");
  } catch (err) {
    listEl.innerHTML = '<p class="empty">Nu am putut încărca mesajele.</p>';
  }
}

logoutBtn.addEventListener("click", async function () {
  try {
    await fetch("/api/logout", { method: "POST" });
  } catch (e) { /* ignore */ }
  window.location.href = "/";
});

loadMessages();
