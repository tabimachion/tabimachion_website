# 旅と街と音楽と株式会社 - コーポレートサイト

音楽を活用した施設のコミュニティ開発支援を行う会社のコーポレートサイトです。

## 開発

```bash
# ローカルサーバー起動
python3 -m http.server 8080
# → http://localhost:8080 でアクセス
```

## デプロイ

GitHub Pages で公開：
1. リポジトリの Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / (root)
4. Save

## 構成

```
/
├── index.html          # メインページ
├── css/
│   └── style.css       # スタイルシート
├── js/
│   └── main.js         # JavaScript
├── images/             # 画像
│   ├── team/           # チームメンバー
│   └── works/          # 事例
└── README.md
```

## お問い合わせフォーム

Googleフォームを埋め込む場合：
1. Google Forms でフォーム作成
2. 「送信」→ 埋め込み用HTMLを取得
3. `index.html` の `.contact-placeholder` を iframe で置換
