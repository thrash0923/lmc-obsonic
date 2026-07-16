# site-config.js 更新ガイド（Ver.1.2）

毎年変更する基本情報は `js/site-config.js` の「毎年編集する項目」にまとめています。

## 通常変更する項目

- `year`：開催年
- `eventName`：イベント名
- `eventNumberText`：第何回か
- `dateDisplay`：日本語表示の日付
- `dateShort`：ヒーロー部分の短い日付
- `openTime`：開場時刻
- `startTime`：開演時刻
- `venueShort`：画面上で使う短い会場名
- `venueAbout`：ABOUT本文で使う会場表記
- `ticket`：料金

`fullTitle`、`scheduleDisplay`、`heroTitleHtml`などは自動生成されるため、通常は変更不要です。

## 自動反映される主な場所

### トップページ

- ナビゲーション左上のサイト名
- メインタイトルの開催年
- ヒーローの日付・会場・OPEN／START
- ABOUT内の「第何回」「会場」
- 開催概要のイベント名・日程・時間・会場・料金
- 出演者募集見出し
- 最終電車案内の日付
- フッターのサイト名

### ENTRYページ

- ナビゲーション左上のサイト名
- ヒーローのサイト名
- アクセシビリティ用ラベル
- フッターのサイト名

## HTML側で別途変更する項目

検索結果やSNS共有に使われるため、以下はJavaScriptで置き換えません。
年度更新時には `index.html` と `entry/index.html` の `<head>` 内も変更してください。

- `<title>`
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`

## 注意

タイムテーブル内の時刻や出演者カードの時刻は、出演順・進行表そのものなので、現段階では `site-config.js` の対象外です。今後のJSON化で別管理にします。
