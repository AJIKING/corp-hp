# 新規ページ・セクション追加: {ページ名}

## 基本情報

- **種別**: ページ / セクション（既存ページ内）
- **パス**: `/xxxxx`（ページの場合）
- **似ている既存実装**: `app/(site)/xxxxx/page.tsx` または `components/features/Xxxxx.tsx`

## 概要

{1〜2文で何を追加するか}

## UI 仕様

### レイアウト

- デスクトップ: {レイアウトの概要}
- モバイル: {レスポンシブ時の変更点}

### 使用する MUI コンポーネント

- {例: Typography, Stack, Card, Button}

### デザイン参考

- Figma URL: {あれば}
- 既存セクションの参考: {例: components/features/About.tsx のレイアウトに近い}

## 要件

- Server Component / Client Component: {どちらか、理由}
- メタデータ: {title, description — ページの場合}
- 外部データ: {なし / API 呼び出し / 静的データ}
- アニメーション: {なし / Lottie / CSS}

## 似ている既存実装

以下のパターン（ファイル構成、MUI の使い方、レスポンシブ対応）に合わせること：

- `components/features/Xxxxx.tsx`
- `app/(site)/xxxxx/page.tsx`

## テスト方針

- **重視する正常系**: {例: ページが正しく描画されること}
- **重視する異常系**: {例: データ未取得時のフォールバック表示}
- **テスト層**:
  - [ ] Unit（不要 — UI のみ / 必要 — データ変換ロジックあり）
  - [ ] Component（描画テスト / インタラクションテスト）
  - [ ] E2E（不要 / ナビゲーション確認が必要な場合のみ）

## 進め方

TDD で進めてください（CLAUDE.md の TDD ルールに従う）。

1. テストを先に書く（Red）
2. テストを通す実装（Green）
3. リファクタリング

各フェーズで `npm test` が通ることを確認しながら進めてください。
