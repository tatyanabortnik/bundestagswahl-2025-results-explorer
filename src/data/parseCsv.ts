import Papa from "papaparse";

interface ParseCsvOptions {
  delimiter?: string;
  skipLines?: number;
}

export function parseCsv<T>(
  csvString: string,
  options: ParseCsvOptions = {},
): T[] {
  const { delimiter, skipLines } = options;

  const result = Papa.parse<T>(csvString, {
    header: true,
    skipEmptyLines: true,
    skipFirstNLines: skipLines,
    dynamicTyping: true,
    delimiter: delimiter,
    transformHeader: (header: string) => header.toLowerCase(),
  });

  if (result.errors.length > 0) {
    throw new Error(
      `CSV parse error: ${result.errors[0].message} (row ${result.errors[0].row})`,
    );
  }

  return result.data;
}
