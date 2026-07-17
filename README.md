# lmc-obsonic
LMC OB-SONIC Official Website

## 毎年の基本情報を変更する方法

開催年・開催日・OPEN/START・会場・料金など、画面上に表示される基本情報は
`js/site-config.js` にまとめています。

翌年版へ更新するときは、まずこのファイルの各値を変更してください。

### 注意

検索結果やSNS共有に使われる以下の項目は、JavaScriptではなくHTMLに直接記載しています。
年度更新時には `index.html` と `entry/index.html` の `<head>` 内も変更してください。

- `<title>`
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`

## Current version

**Ver.1.2**  
`site-config.js` 本格導入。開催年、日付、OPEN／START、会場、料金、第何回かなどを一元管理します。

## Ver.1.3
出演者一覧を `data/bands.json` から自動生成します。詳しくは `BANDS-JSON-GUIDE.md` を参照してください。

## Ver.1.4
出演ガイドと会場常設機材一覧を全面リニューアルしました。

## Ver.1.4.2
上部へ戻るボタンのCSSを復旧し、スクロール表示判定を安定化しました。

## Ver.1.5
タイムテーブルを `data/timetable.json` から自動表示するようにしました。

## Ver.1.6
出演バンド紹介にメンバー一覧と任意リンクを追加しました。

## Ver.1.6.1
出演バンドカードを全面リニューアルしました。
