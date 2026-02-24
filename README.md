# 竹内鍼灸治療院 - Next.js on Cloudflare Workers

このプロジェクトはNext.jsで構築され、Cloudflare Workersにデプロイされます。

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

Next.jsの開発サーバーが起動します（通常は http://localhost:3000）。

### 3. ビルド

```bash
npm run build
```

OpenNext で Workers 用にビルドします（`.open-next/` を生成）。Next.js のみビルドしたい場合は `npm run build:next` を使用してください。

## デプロイ

### Cloudflare Workersへのデプロイ

#### プレビュー（ローカルでWorkers環境をテスト）

```bash
npm run preview
```

このコマンドは：
1. OpenNext Cloudflareアダプターでビルド
2. Wranglerでローカルプレビュー

#### 本番環境へのデプロイ

```bash
npm run deploy
```

このコマンドは：
1. OpenNext Cloudflareアダプターでビルド
2. Cloudflare Workersにデプロイ

#### Workers Builds（CI/CD）でデプロイする場合

`npm run build` が OpenNext ビルドになっているため、**ビルドコマンド**はそのままで問題ありません。

| 設定 | 値 |
|------|-----|
| **ビルドコマンド** | `npm run build` |
| **デプロイコマンド** | `npx wrangler deploy` または `npm run deploy:worker` |

### 初回デプロイ前の設定

初回デプロイ前に、Cloudflareアカウントにログインします：

```bash
npx wrangler login
```

## プロジェクト構造

```
hp/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # メインページ
│   └── globals.css        # グローバルスタイル
├── components/            # Reactコンポーネント
│   ├── PasswordProtection.tsx
│   ├── ClientScripts.tsx
│   └── ContactForm.tsx
├── public/                # 静的ファイル（現在は使用していません）
├── next.config.js        # Next.js設定
├── open-next.config.ts   # OpenNext Cloudflare設定
├── wrangler.jsonc        # Wrangler設定
└── package.json
```

## 移行完了

このプロジェクトは以下の変更により、静的HTMLサイトからNext.jsに移行されました：

- ✅ Next.js 16とReact 19を導入
- ✅ OpenNext Cloudflareアダプターを設定
- ✅ HTMLコンテンツをReactコンポーネントに変換
- ✅ JavaScript機能をReact Hooksに変換
- ✅ CSSをNext.jsのグローバルスタイルとして統合
- ✅ TypeScript対応
- ✅ Cloudflare Workersデプロイ設定

## 予約システム（D1）

予約枠の可否は Cloudflare D1 で管理しています。スキーマは **マイグレーション** で管理します。

### D1 データベースの作成（初回のみ）

```bash
npx wrangler d1 create takeuchi-reservations
```

表示された `database_id` を `wrangler.jsonc` の `d1_databases[0].database_id` に設定してください。

### マイグレーションの適用

```bash
# ローカル（wrangler dev / preview 用）
npx wrangler d1 migrations apply takeuchi-reservations --local

# リモート（本番 DB）
npx wrangler d1 migrations apply takeuchi-reservations --remote
```

### 新しいマイグレーションを追加する場合

```bash
npx wrangler d1 migrations create takeuchi-reservations <説明>
```

`migrations/` に生成された `NNNN_<説明>.sql` を編集し、上記の `migrations apply` で適用します。

### 機能

- **管理画面** `/admin` … カレンダーで日付・時間帯ごとに「予約可能／予約不可」を設定
- **トップページ** … ご予約・お問い合わせセクションで「予約可能か確認する」、フッター直前に「予約状況（1か月）」を表示

RSC（React Server Components）と Server Actions で D1 を操作しています。

## 管理画面のパスワード（セキュリティ）

`/admin` はパスワードで保護されています。**パスワードはサーバー側でのみ検証**し、クライアントに送りません。セッションは **httpOnly の署名付きクッキー**（24時間有効）で管理します。

### 本番環境でシークレットを設定

Cloudflare のシークレットとして、**パスワード2つだけ**設定すれば動作します。

```bash
npx wrangler secret put ADMIN_PASSWORD_1   # 1つ目のパスワード
npx wrangler secret put ADMIN_PASSWORD_2   # 2つ目（確認用・猫の名前など）
```

セッションの署名には、未設定の場合は上記2つから自動で導出します。より強固にしたい場合のみ、別途 `ADMIN_SESSION_SECRET`（ランダムな長い文字列）を設定してください。

### ローカル・プレビューで使う場合

`.dev.vars.example` を `.dev.vars` にコピーし、`ADMIN_PASSWORD_1` と `ADMIN_PASSWORD_2` を編集してください。`.dev.vars` は git に含めないでください。

```bash
cp .dev.vars.example .dev.vars
# .dev.vars を編集して ADMIN_PASSWORD_1, ADMIN_PASSWORD_2 を設定
```

## 注意事項

- デプロイ前に`wrangler.jsonc`の`name`フィールドを確認してください
- 初回デプロイ時は、CloudflareダッシュボードでWorkerの作成を確認する必要があります
- `compatibility_date`は最新の日付に更新することを推奨します
- 予約機能を使う場合は上記のとおり D1 の作成とスキーマ適用を行ってください

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenNext Cloudflare](https://opennext.js.org/cloudflare)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
