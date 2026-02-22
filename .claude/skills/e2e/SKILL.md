---
name: e2e
description: E2E Test（エンドツーエンドテスト）の作成・修正ガイド。Playwright によるブラウザ上の実ユーザーフローテストを TDD で書く。ページ遷移・ナビゲーション、フォーム送信フロー、レスポンシブ対応、OGP/メタデータ確認、page.route による API モックを扱う。単体テストは /unit、コンポーネントテストは /component スキルを参照。
---

# E2E Test ガイド

## 対象

- ページ遷移・ナビゲーション
- フォーム送信フロー（入力 → バリデーション → 送信 → 結果表示）
- レスポンシブ対応（モバイル / デスクトップ）
- OGP・メタデータの確認
- API 連携を含む統合的なフロー

## テストツール

- **Playwright** (`@playwright/test`)

## セットアップ（初回のみ）

Playwright が未導入の場合、先にセットアップする:

```bash
npm install -D @playwright/test
npx playwright install --with-deps chromium
```

`playwright.config.ts` を作成:

```typescript
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  baseURL: 'http://localhost:3000',
  use: {
    locale: 'ja-JP',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
  },
})
```

## TDD 手順

1. **Red**: `tests/e2e/` ディレクトリにテストを作成し、失敗するテストを書く
2. **Green**: テストが通る最小限の実装を書く
3. **Refactor**: テストを維持しながらコードを整理する

## ファイル配置ルール

```
tests/e2e/
  home.spec.ts          ← ページ・フロー単位でファイルを分ける
  contact.spec.ts
  navigation.spec.ts
```

## テストの書き方

```typescript
import { expect, test } from '@playwright/test'

test.describe('トップページ', () => {
  test('<期待する振る舞いを日本語で記述>', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: '株式会社PLARIA' })).toBeVisible()
  })
})
```

## ルール

- テスト名は日本語で、ユーザーシナリオとして記述
- ロケータの優先順位: `getByRole` > `getByLabel` > `getByText` > `getByTestId`
- 各テストは独立して実行可能であること（他テストに依存しない）
- API モックが必要な場合は `page.route()` を使う
- 不安定なテストを避けるため `waitForSelector` より `expect().toBeVisible()` を使う

## 実行コマンド

```bash
npx playwright test                    # 全 E2E テスト実行
npx playwright test tests/e2e/contact.spec.ts  # 特定ファイル実行
npx playwright test --headed           # ブラウザ表示あり
npx playwright test --ui               # UI モード（デバッグ向き）
```

## 典型的なテストパターン

### ページ表示

```typescript
test('トップページが正しく表示される', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('株式会社PLARIA')
})
```

### ナビゲーション

```typescript
test('ヘッダーからお問い合わせセクションに遷移できる', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'お問い合わせ' }).click()
  await expect(page.locator('#contact')).toBeInViewport()
})
```

### フォーム送信フロー

```typescript
test('お問い合わせフォームを送信できる', async ({ page }) => {
  // API をモック
  await page.route('/api/contact', (route) =>
    route.fulfill({ status: 200, json: { ok: true } }),
  )

  await page.goto('/')
  await page.locator('#contact').scrollIntoViewIfNeeded()

  await page.getByLabel('カテゴリ').click()
  await page.getByRole('option', { name: 'その他' }).click()
  await page.getByLabel('会社名').fill('株式会社テスト')
  await page.getByLabel('お名前').fill('テスト太郎')
  await page.getByLabel('電話番号').fill('09012345678')
  await page.getByLabel('メールアドレス').fill('test@example.com')
  await page.getByLabel('問い合わせ内容').fill('これはテスト用の問い合わせです。')

  await page.getByRole('button', { name: '送信する' }).click()
  await expect(page.getByText('送信が完了しました')).toBeVisible()
})
```

### レスポンシブテスト

```typescript
test('モバイルでハンバーガーメニューが表示される', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await expect(page.getByLabel('メニューを開く')).toBeVisible()
})
```

### API モック

```typescript
await page.route('/api/contact', (route) => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ ok: true }),
  })
})
```
