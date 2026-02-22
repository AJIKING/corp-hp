# CLAUDE.md - corp-hp (株式会社PLARIA コーポレートサイト)

## プロジェクト概要

- Next.js 15 (App Router) + React 19 + TypeScript
- UI: MUI v7 + Emotion
- フォーム: react-hook-form + zod
- デプロイ: Cloudflare Worker (OpenNext)
- パスエイリアス: `@/*` → プロジェクトルート

## TDD (テスト駆動開発) - 最重要ルール

**すべての実装は必ず TDD で進めること。例外なし。**

### TDD サイクル

1. **Red**: まず失敗するテストを書く
2. **Green**: テストを通す最小限のコードを書く
3. **Refactor**: テストが通る状態を維持しながらリファクタリング

### TDD の具体的なルール

- 新機能の実装前に、必ず先にテストを書く
- バグ修正前に、そのバグを再現するテストを書く
- テストなしのコードを本番に入れない
- テストが通らない状態でコミットしない
- 1 つのテストケースにつき 1 つのアサーション（原則）
- テストファイルは `tests/` ディレクトリに種別ごとに配置（下記「テストファイル配置」参照）

### テスト構成

- **ユニットテスト**: Vitest
- **コンポーネントテスト**: Vitest + React Testing Library
- **E2E テスト**: Playwright（必要に応じて）

### テスト実行コマンド

```bash
npx vitest run           # 全テスト実行
npx vitest run --watch   # ウォッチモード
npx vitest run <path>    # 特定ファイルのテスト
```

### テストファイル配置

テストは `tests/` ディレクトリに種別ごとに配置し、ソースの構造をミラーする:

```
tests/
  unit/                  ← 純粋な関数・zod スキーマ・ユーティリティ
    api/contact/route.test.ts
    lib/schemas/contact.test.ts
  component/             ← React コンポーネント（Testing Library）
    features/ContactForm.test.tsx
  integration/           ← API ルートの統合テスト
    api/contact/route.integration.test.ts
  e2e/                   ← Playwright E2E テスト
    home.spec.ts
```

## コーディング規約

- 言語: TypeScript (strict mode)
- フォーマッタ/リンタ: ESLint (Flat Config)
- シングルクォート、セミコロンなし（既存コードに準拠）
- `'use client'` は必要なコンポーネントにのみ付与
- Server Components をデフォルトとする

## ディレクトリ構成

```
app/              # App Router ページ・API
components/
  features/       # 機能単位のコンポーネント
  ui/             # 汎用 UI コンポーネント
config/           # テーマ等の設定
hooks/            # カスタムフック・プロバイダ
public/           # 静的アセット
tests/
  unit/           # ユニットテスト
  component/      # コンポーネントテスト
  integration/    # 統合テスト
  e2e/            # E2E テスト
```

## 開発コマンド

```bash
npm run dev       # 開発サーバー起動
npm run build     # ビルド
npm run lint      # ESLint
npm run deploy    # Cloudflare デプロイ
```

## 環境変数

- `GOOGLE_CHAT_WEBHOOK_URL`: GOOGLECHAT Webhook URL（お問い合わせ通知）
