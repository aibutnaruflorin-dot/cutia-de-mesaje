"use strict";

/* Contact page — validate, then send the message to the API. */

var form = document.getElementById("contactForm");
var successBanner = document.getElementById("successBanner");
var errorBanner = document.getElementById("errorBanner");
var submitBtn = document.getElementById("submitBtn");

function setFieldError(field, msg) {
  var wrap = document.getElementById("field-" + field);
  var err = document.getElementById("err-" + field);
  var input = document.getElementById(field);
  if (msg) {
    wrap.classList.add("invalid");
    err.textContent = msg;
    input.setAttribute("aria-invalid", "true");
  } else {
    wrap.classList.remove("invalid");
    err.textContent = "";
    input.removeAttribute("aria-invalid");
  }
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validate(data) {
  var ok = true;
  if (data.name.trim().length < 2) {
    setFieldError("name", "Introdu un nume (minim 2 caractere)."); ok = false;
  } else { setFieldError("name", ""); }
  if (!isEmail(data.email.trim())) {
    setFieldError("email", "Adresa de email nu este validă."); ok = false;
  } else { setFieldError("email", ""); }
  if (data.message.trim().length < 5) {
    setFieldError("message", "Mesajul este prea scurt (minim 5 caractere)."); ok = false;
  } else { setFieldError("message", ""); }
  return ok;
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  errorBanner.hidden = true;
  successBanner.hidden = true;

  var data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };
  if (!validate(data)) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Se trimite...";
  try {
    var res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    var out = await res.json().catch(function () { return {}; });
    if (res.ok) {
      successBanner.hidden = false;
      form.reset();
    } else {
      errorBanner.textContent = out.error || "Mesajul nu a putut fi trimis.";
      errorBanner.hidden = false;
    }
  } catch (err) {
    errorBanner.textContent = "Eroare de rețea. Încearcă din nou.";
    errorBanner.hidden = false;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Trimite mesajul";
  }
});
