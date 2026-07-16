# Ver.1.3 出演者一覧の更新方法

出演者一覧は `data/bands.json` から自動表示されます。

## 1組分の例

```json
{
  "entry": "ENTRY 1",
  "name": "MONKEY RANGE",
  "time": "16:00",
  "description": "大阪芸大軽音OBによるロックンロールバンド。",
  "image": "images/bands/monkey-range.jpg"
}
```

## 各項目

- `entry`：出演順表示
- `name`：出演者名・バンド名
- `time`：出演時刻
- `description`：紹介文
- `image`：画像の場所。画像がない場合は空欄 `""`

複数組を掲載する場合は、カンマで区切って追加します。
JSONでは最後の項目の後ろにカンマを付けないでください。
