---
name: unit
description: Unit Test（単体テスト）の作成・修正ガイド。純粋な関数・ロジック・zod スキーマ・ユーティリティに対する Vitest テストを TDD で書く。Arrange/Act/Assert パターン、vi.mock・vi.spyOn によるモック、環境変数スタブ、エッジケースカバレッジを扱う。コンポーネントテストは /component、E2E テストは /e2e スキルを参照。
---

# Unit Test ガイド

## 対象

- zod スキーマのバリデーション
- ユーティリティ関数・ヘルパー関数
- データ変換・フォーマット処理
- API ルートハンドラのロジック部分
- カスタムフックの内部ロジック（UI を伴わないもの）

## テストツール

- **Vitest** (`import { describe, it, expect, vi } from 'vitest'`)

## TDD 手順

1. **Red**: `tests/unit/` 配下にソース構造をミラーした `*.test.ts` を作成し、失敗するテストを書く
2. **Green**: テストが通る最小限の実装を書く
3. **Refactor**: テストを維持しながらコードを整理する

## ファイル配置ルール

`tests/unit/` 配下にソースの構造をミラーして配置:

```
app/api/contact/route.ts       → tests/unit/api/contact/route.test.ts
lib/schemas/contact.ts         → tests/unit/lib/schemas/contact.test.ts
```

import は `@/` エイリアスを使う:

```typescript
import { myFunction } from '@/lib/utils/myFunction'
```

## テストの書き方

```typescript
import { describe, expect, it, vi } from 'vitest'

describe('<テスト対象の名前>', () => {
  it('<期待する振る舞いを日本語で記述>', () => {
    // Arrange
    const input = ...

    // Act
    const result = targetFunction(input)

    // Assert
    expect(result).toBe(expected)
  })
})
```

## ルール

- 1 テストケースにつき 1 アサーション（原則）
- テスト名は日本語で、何を検証しているか明確に書く
- Arrange / Act / Assert パターンに従う
- 外部依存（fetch, env, DB）は `vi.mock()` や `vi.spyOn()` でモック化
- エッジケース（空文字、境界値、null/undefined）を必ずカバーする
- テストデータはテスト内にインラインで定義（外部ファイル不要な場合）

## 実行コマンド

```bash
npx vitest run <path>          # 特定ファイル実行
npx vitest run --watch <path>  # ウォッチモードで TDD
npm test                       # 全テスト実行
```

## 典型的なテストパターン

### zod スキーマバリデーション

```typescript
describe('contactFormSchema', () => {
  it('有効なデータでバリデーションが通る', () => {
    expect(() => schema.parse(validData)).not.toThrow()
  })

  it('必須フィールドが空でエラーになる', () => {
    expect(() => schema.parse({ ...validData, name: '' })).toThrow()
  })
})
```

### 関数のモック

```typescript
vi.mock('node:crypto', () => ({
  createHmac: vi.fn().mockReturnValue({
    update: vi.fn().mockReturnValue({
      digest: vi.fn().mockReturnValue('mocked-sign'),
    }),
  }),
}))
```

### 環境変数のモック

```typescript
import { afterEach, beforeEach, vi } from 'vitest'

beforeEach(() => {
  vi.stubEnv('LARK_WEBHOOK_URL', 'https://example.com/webhook')
})

afterEach(() => {
  vi.unstubAllEnvs()
})
```
