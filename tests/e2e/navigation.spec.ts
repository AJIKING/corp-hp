import { expect, test } from '@playwright/test'

test.describe('ナビゲーション', () => {
  test('ヘッダーの「事業内容」リンクで該当セクションが表示される', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.getByRole('link', { name: '事業内容' }).first().click()
    await expect(page.locator('#services')).toBeInViewport()
  })

  test('ヘッダーの「お問い合わせ」リンクで該当セクションが表示される', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.getByRole('link', { name: 'お問い合わせ' }).first().click()
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('フッターの「プライバシーポリシー」リンクで遷移する', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.getByRole('link', { name: 'プライバシーポリシー' }).click()
    await expect(page).toHaveURL(/\/privacypolicy/)
    await expect(page.getByRole('heading', { name: 'プライバシーポリシー' })).toBeVisible()
  })

  test('モバイル幅でハンバーガーメニューが表示される', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.getByLabel('メニューを開く')).toBeVisible()
  })
})
