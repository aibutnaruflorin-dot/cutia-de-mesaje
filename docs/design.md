# Design Spec — Cutia de Mesaje

## Design Direction
Calm, clean, and trustworthy — the look of a tool you'd hand your business
details to. Light theme, one confident blue accent, plenty of white space, and
forms that are obvious and easy to fill. No decoration that competes with the
task.

## Information Architecture
- Contact page (`/`) → sections: header, intro heading, contact form.
- Login page (`/login`) → sections: header, login form.
- Admin inbox (`/admin`, protected) → sections: header with logout, heading,
  message list (or empty state).
- Navigation: a thin header on every page. The contact page links to "Admin";
  the inbox and login link back to the contact page.

## Design System

### Colors
| Token | Hex | Use |
|-------|-----|-----|
| primary | #2B59C3 | buttons, links, focus rings |
| primary-dark | #1F458F | button hover |
| background | #F4F6FB | page background |
| surface | #FFFFFF | cards, form panel |
| text | #1F2733 | body and headings |
| muted | #6B7685 | labels, timestamps, secondary text |
| border | #DDE3ED | input and card borders |
| success | #1E7F4F | success banner |
| error | #C8372D | error banner, field errors |

Contrast: white on primary #2B59C3 ≈ 6:1; text #1F2733 on surface and on
background both far above WCAG AA. Error and success text on their light banner
tints also meet AA.

### Typography
- Font: "Inter" (loaded from Google Fonts), fallback `system-ui, -apple-system,
  "Segoe UI", Roboto, sans-serif`. Headings use weight 600-700, body 400-500.
- Type scale: 13 / 14 / 16 / 20 / 26 / 32 px.

### Spacing & Shape
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 px.
- Radius: 8px on inputs, buttons, cards.
- Border: 1px, color `border`.
- Shadow: one subtle level — `0 1px 3px rgba(20,30,50,0.08), 0 4px 12px rgba(20,30,50,0.06)`.

### Breakpoints
- Mobile-first. Form pages cap content width at ~420px; the inbox caps at
  ~640px. Single column at every width.

## Components
- **Header** — thin bar: site name on the left, one context link on the right
  ("Admin" on the contact page, "Ieși" / logout on the inbox).
- **Form panel** — a white `surface` card holding the form, centered.
- **Field** — label above input; input full-width; error text below in `error`
  color, shown only when that field is invalid.
- **Button** — primary (filled blue, white text) and secondary (text/outline).
  States: default, hover, active, focus (visible ring), disabled.
- **Banner** — a full-width message at the top of the panel: success (green
  tint) or error (red tint). Used for "message sent" and "wrong credentials".
- **Message card** — in the inbox: sender name (bold), email and timestamp
  (muted), then the message body. Cards stacked, newest first.
- **Empty state** — friendly line shown in the inbox when there are no messages.

## Page Layouts
### Contact page (`/`)
Header → centered form panel: heading "Contactează-ne", short line of intro,
then the form (Nume, Email, Mesaj — a textarea, "Trimite mesajul" button). On
success, a green banner replaces nothing — it appears above the form and the
fields clear.

### Login page (`/login`)
Header → centered form panel: heading "Autentificare", the form (Email, Parolă,
"Intră în cont" button). On bad credentials, a red banner appears above the form.

### Admin inbox (`/admin`)
Header with a logout link → heading "Mesaje primite" with a count → the list of
message cards, newest first. If there are no messages, the empty state shows
instead of the list.

## Accessibility Notes
- Every input has a real `<label>`; errors are linked to their field with
  `aria-describedby` and the field is marked `aria-invalid`.
- Banners use `role="status"` (success) and `role="alert"` (error) so screen
  readers announce them.
- Visible focus ring (2px primary) on all inputs, buttons, and links.
- Color is never the only signal — errors also carry text.
- Contrast meets WCAG AA throughout.
