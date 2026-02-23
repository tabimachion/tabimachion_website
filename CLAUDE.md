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
│   ├── team/                 # チームメンバー写真
│   └── works/                # 事例写真
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
- ImageMagickで作成
- コマンド: `magick logo.jpg -negate -fuzz 20% -transparent "#c5c5c5" logo-transparent.png`

### 使用箇所
| 箇所 | ファイル | 処理 |
|------|---------|------|
| ヘッダー | logo-transparent.png | そのまま |
| ヒーロー | logo-transparent.png | そのまま |
| フッター | logo.jpg | `filter: invert(1)` |

## ページ構成

1. **ヘッダー** - ロゴ + ナビゲーション
2. **ヒーロー** - キャッチコピー + 実績数値（200+, 50+, 10年）
3. **About** - ミッション + 3つの特徴
4. **Services** - 6つのサービス（ターゲット別タグ付き）
5. **Why Choose Us** - 選ばれる3つの理由
6. **Brands** - 運営ブランド（NRSR Soundsystem, Serendipity）
7. **Works** - 6つの事例 + 主な取引先一覧
8. **Team** - 8名のメンバー（写真グレースケール→hover時カラー）
9. **Company** - 会社情報テーブル
10. **Contact** - お問い合わせ
11. **Footer** - ロゴ + ナビゲーション + コピーライト

## 開発コマンド

```bash
# ローカルプレビュー
python3 -m http.server 8080

# ロゴ透過版作成
magick logo.jpg -negate -fuzz 20% -transparent "#c5c5c5" logo-transparent.png
```

## 変更履歴

### v3.0 - B2B向け強化（2024-02-24）
- ヒーローに実績数値追加（200+ / 50+ / 10年）
- 「選ばれる理由」セクション新設
- サービス説明を具体化、ターゲット別タグ追加
- 事例説明を成果ベースに変更
- メタ情報をSEO/B2B向けに最適化
- お問い合わせに「2営業日以内に返信」追加

### v2.0 - ミニマルデザイン（2024-02-24）
- イラスト全削除、タイポグラフィ重視に方針転換
- Shippori Mincho導入
- 透過ロゴ作成・適用
- チーム写真のグレースケール効果

### v1.0 - 初期構築（2024-02-24）
- Notionサイトからの移行
- 基本HTML/CSS構造作成
- 既存サイトから画像ダウンロード

## 今後の課題

- [ ] GitHub Pagesへのデプロイ
- [ ] OGP画像の設定
- [ ] Google Analyticsの導入
- [ ] ファビコンの設定
- [ ] 画像最適化（WebP対応）
