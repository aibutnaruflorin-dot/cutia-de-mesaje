const { test, expect } = require('@playwright/test');

/* The public contact form. */
test.describe('Formular de contact', () => {

  test('trimite un mesaj cu succes', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Nume').fill('Ion Testescu');
    await page.getByLabel('Email').fill('ion@example.com');
    await page.getByLabel('Mesaj').fill('Bună, aș dori mai multe detalii despre servicii.');
    await page.getByRole('button', { name: /Trimite mesajul/ }).click();
    await expect(page.getByText('Mesajul tău a fost trimis')).toBeVisible();
    await page.screenshot({ path: 'screenshots/contact-success.png', fullPage: true });
  });

  test('arată eroare pentru un email invalid', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Nume').fill('Ion');
    await page.getByLabel('Email').fill('nu-e-un-email');
    await page.getByLabel('Mesaj').fill('Un mesaj suficient de lung.');
    await page.getByRole('button', { name: /Trimite mesajul/ }).click();
    await expect(page.locator('#field-email')).toHaveClass(/invalid/);
    await expect(page.getByText('Mesajul tău a fost trimis')).toBeHidden();
  });

  test('API: serverul respinge un mesaj fără nume', async ({ request }) => {
    const res = await request.post('/api/messages', {
      data: { name: '', email: 'x@example.com', message: 'text destul de lung' },
    });
    expect(res.status()).toBe(400);
  });
});
