---
name: component
description: Component Test（コンポーネントテスト）の作成・修正ガイド。Vitest + React Testing Library + userEvent による React コンポーネントの描画・インタラクション・状態変化テストを TDD で書く。MUI ThemeProvider ラッパー、next/link モック、react-hook-form + zod フォームテスト、fetch モックを扱う。単体テストは /unit、E2E テストは /e2e スキルを参照。
---

# Component Test ガイド

## 対象

- `components/ui/` 配下の汎用 UI コンポーネント
- `components/features/` 配下の機能コンポーネント
- フォームコンポーネント（react-hook-form + zod）
- クライアントコンポーネント（`'use client'`）

## テストツール

- **Vitest** + **React Testing Library** + **@testing-library/user-event**
- `import { render, screen } from '@testing-library/react'`
- `import userEvent from '@testing-library/user-event'`

## TDD 手順

1. **Red**: `tests/component/` 配下にソース構造をミラーした `*.test.tsx` を作成し、失敗するテストを書く
2. **Green**: テストが通る最小限の実装を書く
3. **Refactor**: テストを維持しながらコードを整理する

## ファイル配置ルール

`tests/component/` 配下にソースの構造をミラーして配置:

```
components/features/ContactForm.tsx → tests/component/features/ContactForm.test.tsx
components/ui/Header.tsx            → tests/component/ui/Header.test.tsx
```

import は `@/` エイリアスを使う:

```typescript
import { ContactForm } from '@/components/features/ContactForm'
```

## テストの書き方

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

describe('<ComponentName />', () => {
  it('<期待する振る舞いを日本語で記述>', () => {
    render(<ComponentName />)
    expect(screen.getByText('期待するテキスト')).toBeInTheDocument()
  })
})
```

## ルール

- 1 テストケースにつき 1 アサーション（原則）
- テスト名は日本語で記述
- **実装の詳細ではなくユーザーの振る舞いをテストする**
- クエリの優先順位: `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
- `data-testid` は最終手段としてのみ使う
- MUI コンポーネントはそのまま描画してテストする（モックしない）

## MUI + ThemeProvider が必要な場合

テーマに依存するコンポーネントはラッパーで囲む:

```tsx
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/config/theme'

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

it('テーマ付きで正しく描画される', () => {
  renderWithTheme(<Header />)
  expect(screen.getByRole('banner')).toBeInTheDocument()
})
```

## next/link, next/router のモック

```typescript
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))
```

## 実行コマンド

```bash
npx vitest run <path>          # 特定ファイル実行
npx vitest run --watch <path>  # ウォッチモードで TDD
npm test                       # 全テスト実行
```

## 典型的なテストパターン

### 描画テスト

```tsx
it('ナビゲーションリンクが表示される', () => {
  render(<Header />)
  expect(screen.getByText('事業内容')).toBeInTheDocument()
  expect(screen.getByText('お問い合わせ')).toBeInTheDocument()
})
```

### ユーザーインタラクション

```tsx
it('ハンバーガーメニューをクリックするとドロワーが開く', async () => {
  const user = userEvent.setup()
  render(<Header />)

  await user.click(screen.getByLabelText('メニューを開く'))
  expect(screen.getByRole('presentation')).toBeInTheDocument()
})
```

### フォーム送信

```tsx
it('必須項目未入力で送信するとエラーが表示される', async () => {
  const user = userEvent.setup()
  render(<ContactForm />)

  await user.click(screen.getByRole('button', { name: '送信する' }))
  expect(await screen.findByText('3文字以上で入力してください')).toBeInTheDocument()
})
```

### fetch のモック

```typescript
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
})

afterEach(() => {
  vi.unstubAllGlobals()
})
```
