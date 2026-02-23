# tabimachion.com - コーポレートサイト

## プロジェクト概要

旅と街と音楽と株式会社のコーポレートサイト。
Notionベースのサイトから、静的HTML/CSS/JSで再構築。

- **URL**: https://tabimachion.com
- **ホスティング**: GitHub Pages
- **技術**: HTML5 / CSS3 / JavaScript（フレームワークなし）

## ディレクトリ構成

```
/
├── index.html          # メインページ（全セクション含む）
├── css/
│   └── style.css       # スタイルシート
├── js/
│   └── main.js         # インタラクション
├── images/
│   ├── logo.jpg              # オリジナルロゴ
│   ├── logo-transparent.png  # 透過ロゴ（ヒーロー・ヘッダー用）
│   ├── team/                 # 経営陣写真
│   └── works/                # 事例写真
├── videos/                   # ヒーロー・サービス動画
└── CLAUDE.md
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

1. **ヘッダー** - ロゴ + ナビゲーション
2. **ヒーロー** - 動画カルーセル背景 + フロストガラス効果 + 説明文
3. **About** - ミッション + 3つの特徴
4. **Services** - 7つのサービス（動画付き、ターゲット別タグ）
5. **Why Choose Us** - 選ばれる3つの理由
6. **Brands** - 運営ブランド（リンク付き）
7. **Works** - 6つの事例 + 主な取引先一覧
8. **Board** - 経営陣2名（カラー写真、プロフィール全文）
9. **Company** - 会社情報テーブル
10. **Contact** - お問い合わせ（メールコピー + Instagram）
11. **Footer** - ロゴ + 社名 + ナビ + Instagram

## 技術詳細

### モバイルファースト
- CSSはモバイルベースで記述、`@media (min-width: 769px)` でデスクトップ対応
- ヒーロー動画カルーセルはデスクトップのみ（モバイルは1枚目のみ再生）

### 動画最適化
- FFmpegで圧縮: `ffmpeg -i input.mp4 -vf scale=-2:540 -crf 30 output.mp4`
- サービス動画は `preload="none"` + Intersection Observer で遅延読み込み
- 総サイズ: 27MB → 9.4MB（65%削減）

### キャッシュ対策
- CSS/JSにバージョンパラメータ: `style.css?v=20250224b`
- 更新時はバージョン番号を変更

### スパム対策
- メールアドレスはJavaScriptで構築（HTMLに平文で書かない）
- クリックでクリップボードにコピー

## 開発コマンド

```bash
# ローカルプレビュー
python3 -m http.server 8080

# ロゴ透過版作成（余白トリム）
magick logo.jpg -fuzz 25% -transparent "#3a3a3a" -trim +repage logo-transparent.png

# 動画圧縮
ffmpeg -i input.mp4 -vf scale=-2:540 -crf 30 -c:a copy output.mp4
```

## 外部リンク

| ブランド | URL |
|---------|-----|
| NRSR Soundsystem | https://soundsystem.norishirocks.com/ |
| Serendipity | https://www.instagram.com/serendipity.collective.tokyo/ |
| ホームパーティー検定 | https://homepartykentei.com/ |
| Instagram | https://www.instagram.com/otototabito/ |

## 変更履歴

### v4.0 - モバイルファースト化（2025-02-24）
- CSSをモバイルファーストに書き換え
- ヒーロー動画カルーセル（デスクトップのみ）
- 動画65%圧縮（27MB→9.4MB）
- サービス動画のlazy loading
- 経営陣セクション（2名、プロフィール全文）
- フッター簡素化
- メールスパム対策（クリップボードコピー）
- CSSキャッシュバスティング

### v3.0 - B2B向け強化（2024-02-24）
- ヒーローに実績数値追加（→後に削除）
- 「選ばれる理由」セクション新設
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
- [ ] OGP画像の設定
- [ ] Google Analyticsの導入
- [ ] ファビコンの設定
- [ ] 画像最適化（WebP対応）
