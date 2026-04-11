import { parseCsv} from "./parseCsv";
import type { AreaResults, ElectionCsvRow } from "../domain/types";
import { mapParsedResults } from "../domain/mapParseResult";

export async function loadElectionData(): Promise<Map<string, AreaResults>> {
  const response = await fetch("/data/kerg2.csv");
  if (!response.ok) {
    throw new Error(`Failed to load CSV: ${response.status}`);
  }
  const text = await response.text();
  const rows = parseCsv<ElectionCsvRow>(text, { delimiter: ';', skipLines: 9 });
  return mapParsedResults(rows);
}
