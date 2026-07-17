# 出演バンド JSON 更新ガイド Ver.1.6.1

## 1組分の例

```json
{
  "visible": true,
  "entry": "ENTRY 1",
  "name": "DrxZERO",
  "description": "88～90期生による激速短バンド。\n今年もJOEは席を外しております。",
  "members": [
    {"part": "Vo.", "name": "尾崎"},
    {"part": "Gt.", "name": "桑江"},
    {"part": "Ba.", "name": "ドバス"},
    {"part": "Dr.", "name": "ケーヨ"}
  ],
  "startTime": "16:00",
  "performanceTime": "16:00～16:15",
  "image": ""
}
```

### 項目
- `visible`：表示する場合は `true`
- `entry`：出演順
- `name`：バンド名
- `description`：紹介文。改行は `\n`
- `members`：パートと名前
- `startTime`：画像上のSTAGE表示
- `performanceTime`：カード下部の出演予定時間
- `image`：画像のパス。画像なしは空欄
