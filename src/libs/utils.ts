/**
 * 获取飞书列的信息，A B C AA AB
 * @param length
 */
export const getColumns = (length: number) => {
  const columnBase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const result = [];
  let index = 0;

  while (index < length) {
    // 先转换成26进制，然后再通过26进制对应上面的小标取值
    const str = index
      .toString(26)
      .split("")
      .map((item, index, array) => {
        let letterIndex = parseInt(item, 26);
        //  非最后一位的值要减一，因为没有0位，所有要往前推一位
        if (index < array.length - 1) {
          letterIndex = letterIndex - 1;
        }
        return columnBase[letterIndex];
      })
      .join("");
    result.push(str);
    index++;
  }

  return result;
};

/**
 * 格式化表格原始数据
 * @param rawData 原始数据数组
 * @param format i18n 多语言模式，需要一个key列，raw 正常数据模式
 */
export function formatSheetData(
  rawData: ISheetRawData[],
  format: "i18n" | "raw" = "raw"
) {
  let data = rawData.map((data) => {
    // 第一行是表头
    const [tableHead, ...tableData] = data.values;

    const result = tableData.reduce((prev: any[], item: any) => {
      // 如果第一个单元格没有填写，该行数据会被忽略
      if (item[0]) {
        const row: Record<string, any> = {};
        tableHead.forEach((head: any, index: number) => {
          // 如果没有填写表头，这列的数据将会被忽略
          if (head) {
            row[head] = item[index];
          }
        });
        prev.push(row);
      }
      return prev;
    }, []);

    return { title: data.title, data: result };
  });
  if (format === "i18n") {
    // 输出结果
    const result: any = {};

    // 遍历所有的表格
    for (const sheet of data) {
      // 遍历表格中的每一行，找到key的那一列开始输出数据
      for (const row of sheet.data) {
        // 判断有没有key，没有key就算了
        if (!row.key) {
          continue;
        }

        const { key, ...others } = row;

        // 遍历语言字段
        for (const lang of Object.keys(others)) {
          if (!result[lang]) {
            result[lang] = {};
          }
          result[lang][key] = others[lang];
        }
      }
    }

    return result;
  }
  return data;
}
