# 新規 API ルート追加: {API名}

## 基本情報

- **endpoint**: `POST /api/xxxxx`
- **runtime**: nodejs / edge
- **似ている既存実装**: `app/api/contact/route.ts`

## 概要

{1〜2文で何をする API か}

## リクエスト

### Body（JSON）

| フィールド | 型     | 必須 | 制約                |
| ---------- | ------ | ---- | ------------------- |
| name       | string | o    | 1〜100文字          |
| email      | string | o    | メール形式          |

### Response（成功: 200）

```json
{
  "ok": true
}
```

### Response（エラー: 422）

```json
{
  "ok": false,
  "error": "Validation error",
  "details": []
}
```

## 要件

- バリデーション: zod スキーマで定義
- 外部サービス: {なし / Lark Webhook / メール送信 — 具体的に}
- CORS: {不要 / OPTIONS ハンドラ必要}
- 環境変数: {必要な変数名を列挙}

## 似ている既存実装

以下のパターン（zod バリデーション、エラーハンドリング、レスポンス形式）に合わせること：

- `app/api/contact/route.ts`

## テスト方針

- **重視する正常系**: {例: 正常なリクエストで外部サービスに送信されること}
- **重視する異常系**: {例: バリデーションエラー、外部サービス障害時}
- **テスト層**:
  - [ ] Unit（zod スキーマ / ペイロード生成ロジック）
  - [ ] Component（不要 — API ルートのため）
  - [ ] E2E（不要 / フォーム送信フローに含める場合のみ）

## 進め方

TDD で進めてください（CLAUDE.md の TDD ルールに従う）。

1. テストを先に書く（Red）
2. テストを通す実装（Green）
3. リファクタリング

各フェーズで `npm test` が通ることを確認しながら進めてください。
