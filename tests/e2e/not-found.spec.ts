import { expect, test } from '@playwright/test'

test.describe('404 ページ', () => {
  test('存在しないURLで404メッセージが表示される', async ({ page }) => {
    await page.goto('/nonexistent-page', { waitUntil: 'domcontentloaded' })
    await expect(page.getByText('404 - ページが見つかりません')).toBeVisible()
  })

  test('「トップページに戻る」リンクでトップに遷移する', async ({ page }) => {
    await page.goto('/nonexistent-page', { waitUntil: 'domcontentloaded' })
    await page.getByRole('link', { name: 'トップページに戻る' }).click()
    await expect(page).toHaveURL('/')
  })
})
