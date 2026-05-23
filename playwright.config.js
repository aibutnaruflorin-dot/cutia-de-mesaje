const { defineConfig, devices } = require('@playwright/test');

/* Playwright config for Cutia de Mesaje.
   The runner starts the Express server itself via the webServer block.

   channel: 'chromium' uses the full Chromium build — the lighter
   chrome-headless-shell fails to start in some sandboxed Linux environments.

   Tests run serially (workers: 1) because they share one SQLite database and
   the admin account is created once, by the first test. */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 15000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3000',
    channel: 'chromium',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node server.js',
    url: 'http://localhost:3000',
    reuseExistingServer: false,
    timeout: 20000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
});
