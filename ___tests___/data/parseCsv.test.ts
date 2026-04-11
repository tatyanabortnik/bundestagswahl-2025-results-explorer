import { describe, it, expect } from "vitest";
import { parseCsv } from "../../src/data/parseCsv";
import type { ElectionCsvRow } from "../../src/domain/types";
import fs from "node:fs/promises";

const fixturePath = new URL(
  "./fixtures/kerg2-fixture.csv",
  import.meta.url,
).pathname;
const csv = await fs.readFile(fixturePath, "utf-8");

describe("parseCsv", () => {
  it("parses the fixture CSV with skipLines and semicolon delimiter", () => {
    const result = parseCsv<ElectionCsvRow>(csv, {
      delimiter: ";",
      skipLines: 9,
    });

    expect(result).toHaveLength(9);
    expect(result[0]).toMatchObject({
      gebietsart: "Bund",
      gebietsname: "Bundesgebiet",
      gruppenname: "Wahlberechtigte",
    });
  });

  it("lowercases headers", () => {
    const result = parseCsv<ElectionCsvRow>(csv, {
      delimiter: ";",
      skipLines: 9,
    });

    const keys = Object.keys(result[0]);
    expect(keys).toContain("gebietsart");
    expect(keys).toContain("gebietsname");
    expect(keys).not.toContain("Gebietsart");
  });
});
