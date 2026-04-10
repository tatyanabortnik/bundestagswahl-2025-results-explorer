import Papa from "papaparse";
import type { AreaType } from "../domain/types";

export type ElectionCsvRow = {
  Gebietsart: AreaType;
  Gebietsnummer: string;
  Gebietsname: string;
  Gruppenart: "Partei" | "System-Gruppe";
  Gruppenname: string;
  Stimme: "1" | "2";
  Anzahl: string;
  Prozent: string;
};

interface ParseCsvOptions {
  delimiter?: string;
  skipLines?: number;
}

export function parseCsv<T = ElectionCsvRow>(
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
  });

  if (result.errors.length > 0) {
    throw new Error(
      `CSV parse error: ${result.errors[0].message} (row ${result.errors[0].row})`,
    );
  }

  return result.data;
}
