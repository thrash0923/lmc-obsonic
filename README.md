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
