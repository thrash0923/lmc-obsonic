# site-config.js 更新ガイド

毎年変更する基本情報は `js/site-config.js` の「毎年編集する項目」にまとめています。

## 通常変更する項目

- `year`：開催年
- `eventNumberText`：第何回か
- `dateDisplay`：日本語表示の日付
- `dateShort`：ヒーロー部分の短い日付
- `openTime`：開場時刻
- `startTime`：開演時刻
- `venueShort`：会場の短い名称
- `ticket`：料金

`fullTitle` や `scheduleDisplay` などは自動生成されるため、通常は変更不要です。

## HTML側で別途変更する項目

検索結果やSNS共有に使われるため、以下はJavaScriptで置き換えません。
年度更新時には `index.html` と `entry/index.html` の `<head>` 内も変更してください。

- `<title>`
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`
