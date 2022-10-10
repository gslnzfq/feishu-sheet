# 飞书表格数据读取工具

该工具支持使用 accessToken，sheetId，worksheets 获取飞书表格的数据并转成比较友好的格式；

适用于将飞书表格作为数据库的场景。

## 使用说明

1、作为依赖安装在项目中

```bash
npm install feishu-sheet-api --save
# or
yarn add feishu-sheet-api --save
```

2、代码中使用

```typescript
import { getFeishuSheetData, formatSheetData } from "feishu-sheet-api";

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

3、返回的数据

```typescript
// 原始数据，一般不使用这个数据，除非高级自定义展示
declare interface ISheetRawData {
  majorDimension: string; // 飞书返回
  range: string; // 飞书返回
  title: string; // 表格tab的名称
  revision: number; // 飞书返回
  values: any[][]; // 表格二维数组
}
// 格式化之后的数据
declare interface ISheetFormattedData {
  title: string; // 表格tab的名称
  data: Record<string, any>[]; // 一维数组，元素是普通对象
}
```

## 参数说明

| 名称          | 类型       | 必填  | 说明                 | 默认值 |
|-------------|----------|-----|--------------------|-----|
| accessToken | string   | 是   | 飞书登录后的 accessToken | 无   |
| sheetId     | string   | 是   | 表格 id              |     |
| worksheets  | string[] | 是   | 表格 tab 列表          |     |
| maxColumn   | number   | 否   | 获取的最大列             | 100 |

参数取值说明

![img.png](https://cdn.jsdelivr.net/gh/gslnzfq/asseets@main/uPic/img.png)

① 划线的部分（不包括#之后的内容）是 sheetId；  
② 框选的部分是 worksheets，字符串数组；

使用问题欢迎在github进行反馈：<https://github.com/gslnzfq/feishu-sheet/issues>。
