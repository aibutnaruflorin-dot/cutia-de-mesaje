"use strict";

/* Register page — create the single admin account, then go to the inbox. */

var form = document.getElementById("registerForm");
var errorBanner = document.getElementById("errorBanner");
var submitBtn = document.getElementById("submitBtn");

// Registration is open only until the admin account exists.
fetch("/api/admin-exists")
  .then(function (r) { return r.json(); })
  .then(function (d) {
    if (d.exists) {
      errorBanner.textContent = "Contul de admin există deja. Mergi la autentificare.";
      errorBanner.hidden = false;
      submitBtn.disabled = true;
    }
  })
  .catch(function () {});

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  errorBanner.hidden = true;

  var data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Se creează...";
  try {
    var res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    var out = await res.json().catch(function () { return {}; });
    if (res.ok) {
      window.location.href = "/admin";
    } else {
      errorBanner.textContent = out.error || "Contul nu a putut fi creat.";
      errorBanner.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Creează contul";
    }
  } catch (err) {
    errorBanner.textContent = "Eroare de rețea. Încearcă din nou.";
    errorBanner.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = "Creează contul";
  }
});
