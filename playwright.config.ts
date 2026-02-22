import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  baseURL: 'http://localhost:3000',
  use: {
    locale: 'ja-JP',
    screenshot: 'only-on-failure',
    navigationTimeout: 60_000,
  },
  timeout: 60_000,
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
  },
})
