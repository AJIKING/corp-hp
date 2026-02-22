import { expect, test } from '@playwright/test'

test.describe('メタデータ', () => {
  test('トップページの title が正しい', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveTitle('株式会社PLARIA')
  })

  test('og:title が正しい', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', '株式会社PLARIA', { timeout: 10_000 })
  })

  test('og:description が正しい', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const ogDesc = page.locator('meta[property="og:description"]')
    await expect(ogDesc).toHaveAttribute(
      'content',
      '「感動体験から笑顔を広げる」をミッションに掲げる、株式会社PLARIAのホームページです。',
    )
  })

  test('og:image が設定されている', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const ogImage = page.locator('meta[property="og:image"]')
    await expect(ogImage).toHaveAttribute('content', /ogp\.png/)
  })

  test('プライバシーポリシーページが表示される', async ({ page }) => {
    await page.goto('/privacypolicy', { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { name: 'プライバシーポリシー' })).toBeVisible()
  })
})
