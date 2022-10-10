const { getFeishuSheetData, formatSheetData } = require("../dist");

// 获取数据
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
