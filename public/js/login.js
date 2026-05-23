"use strict";

/* Login page — sign the admin in, then go to the inbox. */

var form = document.getElementById("loginForm");
var errorBanner = document.getElementById("errorBanner");
var submitBtn = document.getElementById("submitBtn");
var firstTime = document.getElementById("firstTime");

// If no admin account exists yet, nudge the user toward registration.
fetch("/api/admin-exists")
  .then(function (r) { return r.json(); })
  .then(function (d) { if (!d.exists && firstTime) firstTime.hidden = false; })
  .catch(function () {});

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  errorBanner.hidden = true;

  var data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Se verifică...";
  try {
    var res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    var out = await res.json().catch(function () { return {}; });
    if (res.ok) {
      window.location.href = "/admin";
    } else {
      errorBanner.textContent = out.error || "Autentificare eșuată.";
      errorBanner.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Intră în cont";
    }
  } catch (err) {
    errorBanner.textContent = "Eroare de rețea. Încearcă din nou.";
    errorBanner.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = "Intră în cont";
  }
});
