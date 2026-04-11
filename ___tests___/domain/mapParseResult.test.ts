import { describe, it, expect } from "vitest";
import { mapParsedResults } from "../../src/domain/mapParseResult";
import type { ElectionCsvRow } from "../../src/domain/types";

const makeRow = (overrides: Partial<ElectionCsvRow>): ElectionCsvRow => ({
  gebietsart: "Bund",
  gebietsname: "Bundesgebiet",
  gruppenart: "Partei",
  gruppenname: "Grüne",
  gebietsnummer: 99,
  stimme: 2,
  anzahl: 0,
  prozent: "",
  ...overrides,
});

describe("mapParsedResults", () => {
  it("extracts turnout from System-Gruppe rows", () => {
    const rows: ElectionCsvRow[] = [
      makeRow({
        gruppenart: "System-Gruppe",
        gruppenname: "Wahlberechtigte",
        stimme: 1,
        anzahl: 61_000_000,
        prozent: "",
      }),
      makeRow({
        gruppenart: "System-Gruppe",
        gruppenname: "Wählende",
        stimme: 1,
        anzahl: 48_000_000,
        prozent: "78,7",
      }),
    ];

    const result = mapParsedResults(rows);
    const area = result.get("Bund-Bundesgebiet");

    expect(area).toBeDefined();
    expect(area!.turnout.eligible).toBe(61_000_000);
    expect(area!.turnout.voters).toBe(48_000_000);
    expect(area!.turnout.percent).toBe(78.7);
  });

  it("collects second-vote party results sorted by percent descending", () => {
    const rows: ElectionCsvRow[] = [
      makeRow({ gruppenname: "SPD", anzahl: 10_000, prozent: "20,5" }),
      makeRow({ gruppenname: "CDU", anzahl: 15_000, prozent: "30,1" }),
      makeRow({ gruppenname: "GRÜNE", anzahl: 5_000, prozent: "10,3" }),
    ];

    const result = mapParsedResults(rows);
    const area = result.get("Bund-Bundesgebiet")!;

    expect(area.secondVote).toHaveLength(3);
    expect(area.secondVote[0]).toEqual({
      party: "CDU",
      votes: 15_000,
      percent: 30.1,
    });
    expect(area.secondVote[1]).toEqual({
      party: "SPD",
      votes: 10_000,
      percent: 20.5,
    });
    expect(area.secondVote[2]).toEqual({
      party: "GRÜNE",
      votes: 5_000,
      percent: 10.3,
    });
  });

  it("excludes parties with zero votes", () => {
    const rows: ElectionCsvRow[] = [
      makeRow({ gruppenname: "SPD", anzahl: 10_000, prozent: "20,0" }),
      makeRow({ gruppenname: "Obscure", anzahl: 0, prozent: "0,0" }),
    ];

    const result = mapParsedResults(rows);
    const area = result.get("Bund-Bundesgebiet")!;

    expect(area.secondVote).toHaveLength(1);
    expect(area.secondVote[0].party).toBe("SPD");
  });

  it("ignores first-vote party rows", () => {
    const rows: ElectionCsvRow[] = [
      makeRow({
        gruppenname: "SPD",
        stimme: 1,
        anzahl: 10_000,
        prozent: "20,0",
      }),
      makeRow({
        gruppenname: "CDU",
        stimme: 2,
        anzahl: 15_000,
        prozent: "30,0",
      }),
    ];

    const result = mapParsedResults(rows);
    const area = result.get("Bund-Bundesgebiet")!;

    expect(area.secondVote).toHaveLength(1);
    expect(area.secondVote[0].party).toBe("CDU");
  });

  it("groups rows by area type and name", () => {
    const rows: ElectionCsvRow[] = [
      makeRow({
        gebietsart: "Land",
        gebietsname: "Bayern",
        gruppenname: "CSU",
        anzahl: 5_000,
        prozent: "40,0",
      }),
      makeRow({
        gebietsart: "Land",
        gebietsname: "Berlin",
        gruppenname: "SPD",
        anzahl: 3_000,
        prozent: "25,0",
      }),
    ];

    const result = mapParsedResults(rows);

    expect(result.size).toBe(2);
    expect(result.has("Land-Bayern")).toBe(true);
    expect(result.has("Land-Berlin")).toBe(true);
    expect(result.get("Land-Bayern")!.secondVote[0].party).toBe("CSU");
    expect(result.get("Land-Berlin")!.secondVote[0].party).toBe("SPD");
  });
});
