import type { ElectionCsvRow } from "./types";
import { ELIGIBLE, PARTY, SYSTEM_GROUP, VOTERS } from "./constants";
import type { AreaResults } from "./types";

const parseGermanFloat = (value: string): number => {
  if (!value || value.trim() === "") return 0;
  return Number(value.replace(",", "."));
};

const areaKey = (row: ElectionCsvRow): string => {
  return `${row.gebietsart}-${row.gebietsname}`;
};

export const transformResults = (
  rows: ElectionCsvRow[],
): Map<string, AreaResults> => {
  const map = new Map<string, AreaResults>();

  for (const row of rows) {
    console.log(row);
    const key = areaKey(row);

    if (!map.has(key)) {
      map.set(key, {
        areaName: row.gebietsname,
        areaType: row.gebietsart,
        turnout: { eligible: 0, voters: 0, percent: 0 },
        secondVote: [],
      });
    }

    const area = map.get(key);

    if (row.gruppenart === SYSTEM_GROUP) {
      if (row.gruppenname === ELIGIBLE) {
        area.turnout.eligible = row.anzahl;
      } else if (row.gruppenname === VOTERS) {
        area.turnout.voters = row.anzahl;
        area.turnout.percent = parseGermanFloat(row.prozent);
      }
    }

    if (row.gruppenart === PARTY && row.stimme === 2) {
      const votes = row.anzahl;
      const percent = parseGermanFloat(row.prozent);
      if (votes > 0) {
        area.secondVote.push({ party: row.gruppenname, votes, percent });
      }
    }
  }

  for (const area of map.values()) {
    area.secondVote.sort((a, b) => b.percent - a.percent);
  }

  return map;
};
