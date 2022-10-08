# 飞书表格数据读取工具

该工具支持使用 accessToken，sheetId，worksheets 获取飞书表格的数据并转成比较友好的格式；

## 使用方式

1、作为依赖安装在项目中

```bash
npm install feishu-sheet --save;
# or
yarn add feishu-sheet --save
```

2、代码中使用

```typescript
import { getFeishuSheetData, formatSheetData } from "feishu-sheet";

getFeishuSheetData({
  accessToken: "xxx",
  sheetId: "xxx",
  worksheets: ["xxx"],
  maxColumn: 100,
})
  .then((resp) => {
    require("fs").writeFileSync(
      "data.json",
      JSON.stringify(formatSheetData(resp))
    );
  })
  .catch((err) => {
    console.log(err.message);
  });
```

**参数说明**

| 名称          | 类型       | 说明          | 默认值 |
|-------------|----------|-------------|-----|
| accessToken | string   | 飞书授权的 token | 无   |
| sheetId     | string   | 表格 id       |     |
| worksheets  | string[] | 表格 tab 列表   |     |
| maxColumn   | number   | 获取的最大列      | 100 |
