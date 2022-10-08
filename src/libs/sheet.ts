import axios from "axios";
import { getColumns } from "./utils";

const defaultOptions: Required<IOptions> = {
  sheetId: "",
  worksheets: [],
  accessToken: "",
  maxColumn: 100,
};

const http = axios.create({
  baseURL: "https://open.feishu.cn/open-apis/sheet/v2/spreadsheets",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getFeishuSheetData = async (
  options: IOptions
): Promise<ISheetRawData[]> => {
  const opts: Required<IOptions> = Object.assign({}, defaultOptions, options);
  const columnsArray = getColumns(opts.maxColumn);
  const requestHeaders = {
    Authorization: "Bearer " + opts.accessToken,
  };

  // 表格元数据
  const { data: metaInfo } = await http.get(`/${opts.sheetId}/metainfo`, {
    headers: requestHeaders,
  });

  if (metaInfo.code !== 0) {
    throw new Error(metaInfo.msg);
  }

  const metaInfoData = metaInfo.data;
  //  获取表格tab页面
  const ranges: Record<string, string> = {};
  opts.worksheets.forEach((title) => {
    const sheets = metaInfoData.sheets.filter(
      (item: any) => item.title === title
    );
    if (sheets.length) {
      const item = sheets[0];
      // 截取最大的列
      let columnEndIndex = item.columnCount - 1;
      if (columnEndIndex > opts.maxColumn - 1) {
        columnEndIndex = opts.maxColumn - 1;
      }
      ranges[
        `${item.sheetId}!A1:${columnsArray[columnEndIndex]}${item.rowCount}`
      ] = item.title;
    }
  });

  const { data: sheetData } = await http.get(
    `/${opts.sheetId}/values_batch_get`,
    {
      params: {
        ranges: Object.keys(ranges).join(","),
        valueInputOption: "ToString",
      },
      headers: requestHeaders,
    }
  );

  return sheetData.data.valueRanges.map((values: any) => {
    values.title = ranges[values.range];
    return values;
  });
};
