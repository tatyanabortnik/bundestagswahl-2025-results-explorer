import { describe, expect, it } from "vitest";
import { toGermanNumber, toGermanPercent } from "../../src/domain/utils";

describe("toGermanNumber", () => {
  it("formats a number with German thousand separators", () => {
    expect(toGermanNumber(1234567)).toBe("1.234.567");
  });
});

describe("toGermanPercent", () => {
  it("formats a number as a German percent string with one decimal", () => {
    expect(toGermanPercent(12.34)).toBe("12,3 %");
  });
});
