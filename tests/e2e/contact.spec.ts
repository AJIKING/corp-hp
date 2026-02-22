import { expect, test } from '@playwright/test'

/** 全フィールドに有効値を入力するヘルパー */
async function fillForm(page: import('@playwright/test').Page) {
  await page.getByRole('combobox').click()
  await page.getByRole('option', { name: 'その他' }).click()
  await page.getByPlaceholder('例）株式会社PLARIA').fill('株式会社テスト')
  await page.getByPlaceholder('例）山田 太郎').fill('テスト太郎')
  await page.getByPlaceholder('例）03-1234-5678').fill('09012345678')
  await page.getByPlaceholder('例）info@example.com').fill('test@example.com')
  await page.getByPlaceholder('お気軽にお問い合わせ内容をご記入ください。').fill('これはテスト用の問い合わせです。')
}

test.describe('お問い合わせフォーム', () => {
  test('全フィールドに有効値を入力して送信すると成功メッセージが表示される', async ({ page }) => {
    await page.route('/api/contact', (route) =>
      route.fulfill({ status: 200, json: { ok: true } }),
    )

    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForLoadState('networkidle')

    await fillForm(page)
    await page.getByRole('button', { name: /送信する/ }).click()
    await expect(page.getByText('送信が完了しました')).toBeVisible()
  })

  test('必須項目未入力で送信するとバリデーションエラーが表示される', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: /送信する/ }).click()
    await expect(page.getByText('3文字以上で入力してください')).toBeVisible()
  })

  test('ネットワークエラー時にエラーメッセージが表示される', async ({ page }) => {
    await page.route('/api/contact', (route) => route.abort())

    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.locator('#contact').scrollIntoViewIfNeeded()
    await page.waitForLoadState('networkidle')

    await fillForm(page)
    await page.getByRole('button', { name: /送信する/ }).click()
    await expect(page.getByText('送信に失敗しました')).toBeVisible()
  })
})
