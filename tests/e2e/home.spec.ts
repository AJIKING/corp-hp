import { expect, test } from '@playwright/test'

test.describe('トップページ', () => {
  test('ページタイトルが正しい', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveTitle('株式会社PLARIA')
  })

  test('主要セクションが表示される', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('#services')).toBeAttached()
    await expect(page.locator('#about')).toBeAttached()
    await expect(page.locator('#message')).toBeAttached()
    await expect(page.locator('#company')).toBeAttached()
    await expect(page.locator('#contact')).toBeAttached()
  })
})
