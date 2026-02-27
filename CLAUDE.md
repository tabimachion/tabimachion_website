# tabimachion.com - コーポレートサイト

## プロジェクト概要

旅と街と音楽と株式会社のコーポレートサイト。
Notionベースのサイトから、静的HTML/CSS/JSで再構築。シングルページ構成。

- **URL**: https://tabimachion.com
- **ホスティング**: GitHub Pages（`main`ブランチからデプロイ）
- **技術**: HTML5 / CSS3 / JavaScript（フレームワーク・ビルドツールなし）
- **カスタムドメイン**: `CNAME`ファイルで設定済み

## ディレクトリ構成

```
/
├── index.html                    # メインページ（全セクション含む、シングルページ）
├── css/
│   └── style.css                 # スタイルシート（約1500行、モバイルファースト）
├── js/
│   └── main.js                   # インタラクション（約220行、vanilla JS）
├── images/
│   ├── logo.jpg                  # オリジナルロゴ（ダークグレー背景）
│   ├── logo.png                  # 代替ロゴ
│   ├── logo-transparent.png      # 透過ロゴ（ヒーロー・ヘッダー用）
│   ├── hero-bg.jpg               # ヒーロー背景画像
│   ├── hero.png                  # ヒーロー画像
│   ├── recruit.jpg               # 採用画像
│   ├── service-1.png             # サービス画像1
│   ├── service-2.png             # サービス画像2
│   ├── illustrations/            # SVGイラスト（未使用、レガシー）
│   ├── partners/                 # 提携団体ロゴ
│   │   └── hpaj-logo.png
│   ├── team/                     # 経営陣・メンバー写真
│   │   ├── member-1.png          # 藤牧（現在使用中）
│   │   ├── takahashi.png         # 高橋（現在使用中）
│   │   └── ...                   # その他メンバー写真
│   └── works/                    # 事例写真（6件分）
│       ├── ritz-carlton.png
│       ├── jtb-living.png
│       ├── cathay.png
│       ├── web3.png
│       ├── trunk.png
│       └── fujisan-mag.jpg
├── videos/                       # ヒーロー・サービス動画（合計約4.7MB）
│   ├── studio.mp4                # スタジオ（ヒーロー + サービス05）
│   ├── equipment.mp4             # 機材（ヒーロー + サービス02）
│   ├── event.mp4                 # イベント（ヒーロー + サービス03）
│   └── community.mp4             # コミュニティ（サービス01）
├── scripts/                      # ユーティリティ（本番未使用）
│   ├── download-illustrations.js
│   └── download-more-illustrations.js
├── CNAME                         # カスタムドメイン設定（tabimachion.com）
├── README.md                     # GitHub用README
├── .gitignore                    # node_modules, .DS_Store, *.log
└── CLAUDE.md                     # 本ファイル
```

## デザインガイドライン

### スタイル方針
- **ミニマル・洗練**: 余白を活かしたシンプルなデザイン
- **日本的美意識**: 欧米的すぎない、落ち着いた雰囲気
- **B2B向け**: 新規取引先に見せて恥ずかしくない品質

### 絶対にやらないこと
- チャラい・派手なデザイン
- センスのないストックイラスト
- 過度に欧米ナイズされたデザイン
- 嘘くさい実績数値（200+など）
- ぶち上げすぎる表現（第一線、トップクラス、プロフェッショナル集団など）

### フォント
- **見出し**: Shippori Mincho（明朝体）
- **本文**: Noto Sans JP
- **英文**: Inter（一部で使用）

### 配色
| 用途 | カラーコード |
|------|-------------|
| 背景 | #FAFAFA |
| テキスト | #1A1A1A |
| サブテキスト | #4A4A4A |
| ミュート | #8A8A8A |
| ボーダー | #E5E5E5 |

## ロゴ仕様

### オリジナル（logo.jpg）
- ダークグレー背景、白い丸、黒い「&」マーク

### 透過版（logo-transparent.png）
- ImageMagickで作成（余白トリム済み）
- コマンド: `magick logo.jpg -fuzz 25% -transparent "#3a3a3a" -trim +repage logo-transparent.png`

### 使用箇所
| 箇所 | ファイル | 処理 |
|------|---------|------|
| ヘッダー | logo-transparent.png | そのまま |
| ヒーロー | logo-transparent.png | `filter: brightness(0)` で黒に |
| フッター | logo.jpg | `filter: invert(1)` で白黒反転 |

## ページ構成

1. **ヘッダー** - 固定ナビゲーション（ロゴ + メニュー）、スクロールで影追加
2. **ヒーロー** - 3本の動画カルーセル背景 + フロストガラス効果 + キャッチコピー「空間を、音楽で豊かに。」+ CTA2つ
3. **About** - ミッション + 5つの特徴（01〜05）
4. **Services** - 8つのサービス（01〜08、動画・YouTube埋め込み付き、ターゲット別タグ）
5. **Brands** - 運営ブランド3つ（外部リンク付き）
6. **Partners** - 提携団体（日本ホームパーティー協会）
7. **Works** - 6つの事例（3×2グリッド、タグ・説明付き）
8. **Board** - 経営陣2名（藤牧宗太郎・高橋ひでつう、カラー写真、プロフィール全文）
9. **Company** - 会社情報テーブル（設立、代表者、所在地、スタジオ、事業内容）
10. **Contact** - お問い合わせ（メールコピー + Instagram）
11. **Footer** - ロゴ + 社名 + ナビ + Instagram

## 技術詳細

### モバイルファースト
- CSSはモバイルベースで記述
- デスクトップ対応: `@media (min-width: 769px)`
- タブレット調整: `@media (max-width: 1024px)`
- 小画面調整: `@media (max-width: 480px)`
- ヒーロー動画カルーセルはモバイル・デスクトップ共通で動作

### 動画
- **ヒーローカルーセル**: 3本の動画を5秒間隔で自動切り替え（`data-src`による遅延読み込み）
- **サービス動画**: `preload="none"` + Intersection Observerで遅延読み込み、表示時に自動再生
- **YouTube埋め込み**: サービス07（ホームパーティー検定）でiframe使用
- FFmpegで圧縮済み: `ffmpeg -i input.mp4 -vf scale=-2:540 -crf 30 output.mp4`

### JavaScript機能（main.js）
- ヒーローのフェードインアニメーション（段階的）
- モバイルメニュー（ハンバーガートグル、スクロール防止）
- ヘッダーのスクロールエフェクト（50px閾値で影追加）
- スムーズスクロール（ヘッダー高さ + 20px オフセット考慮）
- スクロールアニメーション（Intersection Observer、スタッガー遅延）
- 経営陣カードは同時表示（スタッガーなし）
- メールアドレスのスパム対策（JSで構築 + クリップボードコピー）

### キャッシュ対策
- CSS/JSにバージョンパラメータ付与
- 現在のバージョン: `style.css?v=20250224q` / `main.js?v=20250224f`
- 更新時はバージョン文字列を変更すること

### スパム対策
- メールアドレスはJavaScriptで構築（`info` + `@` + `tabimachion.com`）
- HTMLに平文で書かない
- クリックでクリップボードにコピー（「コピーしました！」フィードバック、2秒後に復帰）

### SEO / OGP
- `<title>`: 旅と街と音楽と株式会社 | 空間を、音楽で豊かに
- `<meta name="description">`: DJ派遣・イベント企画から新規事業開発まで...
- `og:title`, `og:description`, `og:type`, `og:url` 設定済み
- `og:image` 未設定（要対応）

## 開発コマンド

```bash
# ローカルプレビュー
python3 -m http.server 8080
# → http://localhost:8080 でアクセス

# ロゴ透過版作成（余白トリム）
magick logo.jpg -fuzz 25% -transparent "#3a3a3a" -trim +repage logo-transparent.png

# 動画圧縮
ffmpeg -i input.mp4 -vf scale=-2:540 -crf 30 -c:a copy output.mp4
```

## デプロイ

GitHub Pagesで自動デプロイ:
1. `main`ブランチにプッシュすると自動公開
2. Settings → Pages → Source: Deploy from branch → `main` / `(root)`
3. カスタムドメイン: `CNAME`ファイルで`tabimachion.com`を設定

CI/CDパイプラインやビルドステップは不要（静的ファイルのみ）。

## 外部リンク

| ブランド / サービス | URL |
|---------|-----|
| NRSR Soundsystem | https://soundsystem.norishirocks.com/ |
| Serendipity | https://www.instagram.com/serendipity.collective.tokyo/ |
| ホームパーティー検定 | https://homepartykentei.com/ |
| 日本ホームパーティー協会 | https://hpaj.org/ |
| Instagram | https://www.instagram.com/serendipity.collective.tokyo/ |

## 変更履歴

### v5.0 - コンテンツ拡充・モバイルカルーセル対応（2025-02-27）
- ヒーローにキャッチコピー「空間を、音楽で豊かに。」追加（会社名は削除）
- ヒーロー動画カルーセルをモバイルでも動作するよう対応
- About特徴を3→5項目に拡充（IT・マーケティング背景、柔軟なチーム編成を追加）
- サービスを7→8項目に拡充（08: 映像制作を追加）
- 「提携団体」セクション新設（日本ホームパーティー協会）
- About・選ばれる理由セクションを統合
- フェードインアニメーション強化
- 経営陣カード同時表示
- 各種テキスト校正

### v4.0 - モバイルファースト化（2025-02-24）
- CSSをモバイルファーストに書き換え
- ヒーロー動画カルーセル（当初デスクトップのみ→v5.0でモバイル対応）
- 動画65%圧縮（27MB→9.4MB）
- サービス動画のlazy loading
- 経営陣セクション（2名、プロフィール全文）
- フッター簡素化
- メールスパム対策（クリップボードコピー）
- CSSキャッシュバスティング

### v3.0 - B2B向け強化（2024-02-24）
- ヒーローに実績数値追加（→後に削除）
- 「選ばれる理由」セクション新設（→v5.0でAboutに統合）
- サービス説明を具体化、ターゲット別タグ追加
- 事例説明を成果ベースに変更

### v2.0 - ミニマルデザイン（2024-02-24）
- イラスト全削除、タイポグラフィ重視に方針転換
- Shippori Mincho導入
- 透過ロゴ作成・適用

### v1.0 - 初期構築（2024-02-24）
- Notionサイトからの移行
- 基本HTML/CSS構造作成

## 今後の課題

- [x] GitHub Pagesへのデプロイ
- [x] カスタムドメイン設定
- [x] モバイルでのヒーローカルーセル対応
- [ ] OGP画像の設定（`og:image`未設定）
- [ ] ファビコンの設定（`<link rel="icon">`未設定）
- [ ] Google Analyticsの導入
- [ ] 画像最適化（WebP対応、service-1/2.pngが各3〜4MBと大きい）
