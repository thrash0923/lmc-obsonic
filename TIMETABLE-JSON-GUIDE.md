# TIMETABLE JSON 更新ガイド

タイムテーブルは `data/timetable.json` で管理します。

## 1行分の例

```json
{
  "time": "16:00",
  "title": "MONKEY RANGE",
  "note": "15分枠",
  "visible": true
}
```

## 項目

- `time`：時間
- `title`：内容・出演者名
- `note`：備考
- `visible`：表示する場合は `true`、非表示は `false`

JSON内で上にある行から順番に表示されます。

出演者が決まったら、該当する `ENTRY` 行の `title` をバンド名へ変更し、
`visible` を `true` にしてください。

JSONでは最後の項目の後ろにカンマを付けないでください。
