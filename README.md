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

Next.js をビルドします。Workers 用にデプロイするには `npm run build:worker`（OpenNext で `.open-next/` を生成）を使います。

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

**必ず「ビルドコマンド」を `npm run build:worker` に設定してください。** `npm run build` にすると Next.js のみビルドされ `.open-next/worker.js` が生成されずデプロイに失敗します。また `build` を `opennextjs-cloudflare build` にすると OpenNext が内部で `npm run build` を呼ぶため無限ループになります。

| 設定 | 値 |
|------|-----|
| **ビルドコマンド** | `npm run build:worker` |
| **デプロイコマンド** | `npx wrangler deploy` または `npm run deploy:worker` |

### GitHub 経由で Cloudflare にデプロイする（推奨）

コードを GitHub にプッシュするたびに自動でビルド・デプロイするには、Cloudflare の **Workers Builds** でリポジトリを接続します。

#### 1. コードを GitHub にプッシュする

まだの場合、リポジトリを作成してプッシュします。

```bash
# リモートが未設定の場合
git remote add origin https://github.com/<あなたのユーザー名>/<リポジトリ名>.git
git branch -M main
git push -u origin main
```

#### 2. Cloudflare でリポジトリをインポート

1. [Cloudflare ダッシュボード](https://dash.cloudflare.com/) を開く
2. **Workers & Pages** を開く
3. **Create application** → **Get started**（**Import a repository** の横）
4. **Git account** で GitHub を選び、このプロジェクトのリポジトリを選択
5. **Save and Deploy** の前に、下記のビルド設定を行う

#### 3. ビルド設定（必須）

Worker の **Settings** → **Builds** → **Build configuration** で次を設定します。

| 項目 | 値 |
|------|-----|
| **Git branch** | `main`（本番用ブランチ） |
| **Build command** | `npm run build:worker` |
| **Deploy command** | `npx wrangler deploy` または `npm run deploy:worker` |
| **Root directory** | 空欄（リポジトリルートでビルドする場合） |

> **⚠️ デプロイで「.open-next/worker.js was not found」と出る場合**  
> ビルドコマンドが `npm run build` のままになっています。上記のとおり **Build command を `npm run build:worker` に変更**し、保存してから再デプロイしてください。

- ビルド時の環境変数（`NEXT_PUBLIC_*` など）が必要な場合は、**Build variables and secrets** に追加します。
- 本番用のシークレット（`ADMIN_PASSWORD_1` など）は **Settings** → **Variables and Secrets** で設定し、ビルド変数とは別にしてください。

#### 4. 初回デプロイ後

- デプロイが成功すると、`<Worker名>.workers.dev` の URL でサイトが表示されます。
- カスタムドメイン（例: `takehari.com`）を使う場合は、次の「カスタムドメインの設定」を行います。

#### 5. Workers Builds で「Worker 名」（URL）を変えたい場合

Git 連携している場合、**Cloudflare の「Worker 名」が wrangler より優先**されます。`wrangler.jsonc` の `name` を変えても、ダッシュボードの名前が古いままだと Cloudflare のボットが **「名前を一致させる」PR を自動作成**し、wrangler をダッシュボードの名前に戻してしまいます。

**URL を変える手順（例: takehari.k4ppa.workers.dev にしたい）:**

1. [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) を開く
2. 該当の **Worker（プロジェクト）** をクリック
3. **Settings** を開き、**「Worker 名」や「Name」** を変更できる項目を探す（**General** や **Builds** の近くにあることが多いです）
4. 名前を **takehari**（希望の名前）に変更して保存
5. リポジトリの `wrangler.jsonc` の `"name"` を同じ **takehari** にし、コミット・プッシュする

これでダッシュボードと wrangler が一致し、ボットの PR で上書きされず、次回デプロイ後に `https://takehari.k4ppa.workers.dev` でアクセスできるようになります。

- ダッシュボードに「名前変更」の項目が見つからない場合は、[Cloudflare のドキュメント（Worker name requirement）](https://developers.cloudflare.com/workers/ci-cd/builds/troubleshoot/#workers-name-requirement) やサポートで確認してください。

### カスタムドメインの設定（例: takehari.～）

`takehari.com` や `www.takehari.com` のように独自ドメインで公開する手順です。

#### 前提

- 使いたいドメイン（例: `takehari.com`）を **Cloudflare にゾーンとして追加**している必要があります。  
  （ドメイン取得だけの場合は、Cloudflare の「サイトを追加」でネームサーバーを切り替えます。）

#### 手順

1. [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) を開く
2. デプロイした **Worker** をクリック
3. **Settings** → **Domains & Routes** → **Add** → **Custom Domain**
4. 使いたいドメインを入力（例: `takehari.com` または `www.takehari.com`）
5. **Add Custom Domain** をクリック

Cloudflare が DNS レコードと証明書を自動作成します。数分で `https://takehari.com` などでアクセスできるようになります。

- 複数ホスト（例: `takehari.com` と `www.takehari.com`）を使う場合は、それぞれ Custom Domain を追加してください。
- Worker 名（`wrangler.jsonc` の `name`）はドメインと一致している必要はありません。表示用の名前です。

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
- **トップページ** … 「ご予約」セクションで電話案内・予約状況（1か月）・メールお問い合わせを表示

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
