import { describe, it, expect } from "vitest";
import { filterAreasByName } from "../../src/domain/utils";
import type { AreaResults, AreaType } from "../../src/domain/types";

const createArea = (
  areaType: AreaType,
  areaName: string,
  areaNumber = 0,
): AreaResults => ({
  areaType,
  areaName,
  areaNumber,
  turnout: { eligible: 0, voters: 0, percent: 0 },
  secondVote: [],
});

const entries: [string, AreaResults][] = [
  ["Bund-Bundesgebiet", createArea("Bund", "Bundesgebiet")],
  ["Land-Berlin", createArea("Land", "Berlin")],
  ["Land-Bayern", createArea("Land", "Bayern")],
  ["Wahlkreis-Berlin-Mitte", createArea("Wahlkreis", "Berlin-Mitte", 75)],
  ["Wahlkreis-München-Süd", createArea("Wahlkreis", "München-Süd", 220)],
];

describe("filterAreasByName", () => {
  it("matches case-insensitively on a substring of the area name", () => {
    const result = filterAreasByName(entries, "ber");
    const names = result.map(([, area]) => area.areaName);
    expect(names).toEqual(["Berlin", "Berlin-Mitte"]);
  });

  it("returns areas of any type that match, preserving input order", () => {
    const result = filterAreasByName(entries, "Be");
    const names = result.map(([, area]) => area.areaName);
    expect(names).toEqual(["Berlin", "Berlin-Mitte"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterAreasByName(entries, "Hamburg")).toEqual([]);
  });
});
