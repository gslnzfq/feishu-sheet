declare interface ISheetRawData {
  majorDimension: string;
  range: string;
  title: string;
  revision: number;
  values: any[][];
}

declare interface IOptions {
  /**
   * 需要查询的表格ID
   */
  sheetId: string;
  /**
   * 需要查询的表格tab
   */
  worksheets: string[];
  /**
   * 请求数据的accessToken
   */
  accessToken: string;
  /**
   * 需要读取的最大列，默认是100
   */
  maxColumn?: number;
}
