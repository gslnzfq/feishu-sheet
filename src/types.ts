export interface ISheetRawData {
  majorDimension: string; // 飞书返回
  range: string; // 飞书返回
  title: string; // 表格tab的名称
  revision: number; // 飞书返回
  values: any[][]; // 表格二维数组
}

export interface ISheetFormattedData {
  title: string; // 表格tab的名称
  data: Record<string, any>[]; // 一维数组，元素是普通对象
}

export interface IOptions {
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
