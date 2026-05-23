const { test, expect } = require('@playwright/test');

/* Admin registration, login, the protected inbox, and logout.
   Serial: the first test creates the single admin account that the
   later tests sign in with. */

const ADMIN = { email: 'admin@example.com', password: 'parolatare12' };

test.describe.configure({ mode: 'serial' });

test.describe('Autentificare și inbox', () => {

  test('înregistrarea creează contul de admin și duce în inbox', async ({ page }) => {
    await page.goto('/register');
    await page.getByLabel('Email').fill(ADMIN.email);
    await page.getByLabel('Parolă').fill(ADMIN.password);
    await page.getByRole('button', { name: /Creează contul/ }).click();
    await expect(page).toHaveURL(/\/admin/);
    await expect(page.getByRole('heading', { name: 'Mesaje primite' })).toBeVisible();
  });

  test('inbox-ul protejat redirecționează spre login fără autentificare', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);
  });

  test('login cu parolă greșită arată o eroare', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(ADMIN.email);
    await page.getByLabel('Parolă').fill('parola-gresita');
    await page.getByRole('button', { name: /Intră în cont/ }).click();
    await expect(page.getByText(/greșite/)).toBeVisible();
  });

  test('login corect ajunge în inbox', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(ADMIN.email);
    await page.getByLabel('Parolă').fill(ADMIN.password);
    await page.getByRole('button', { name: /Intră în cont/ }).click();
    await expect(page).toHaveURL(/\/admin/);
    await expect(page.getByRole('heading', { name: 'Mesaje primite' })).toBeVisible();
    await page.screenshot({ path: 'screenshots/admin-inbox.png', fullPage: true });
  });

  test('delogarea duce înapoi la pagina de contact', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(ADMIN.email);
    await page.getByLabel('Parolă').fill(ADMIN.password);
    await page.getByRole('button', { name: /Intră în cont/ }).click();
    await expect(page).toHaveURL(/\/admin/);
    await page.getByRole('button', { name: /Ieși din cont/ }).click();
    await expect(page.getByRole('heading', { name: 'Contactează-ne' })).toBeVisible();
  });
});
