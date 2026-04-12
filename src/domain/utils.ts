import type { AreaResults, AreaType, PartyResult } from "./types";

export const toGermanNumber = (number: number) => {
  return Number.isFinite(number) ? number.toLocaleString("de-DE") : "";
};

export const toGermanPercent = (number: number) => {
  return Number.isFinite(number) ?
      `${number.toFixed(1).replace(".", ",")} %`
    : "";
};

export const formatAreaName = (area: AreaResults) => {
  return area.areaType === "Wahlkreis" ?
      `${area.areaNumber} ${area.areaName}`
    : area.areaName;
};

export const filterTopVotedParties = (partyResults: PartyResult[]) => {
  return partyResults.filter((result) => result.percent > 5);
};

export const areaLabelConfig: Record<
  AreaType,
  { label: string; className: string }
> = {
  Bund: { label: "Bundesgebiet", className: "border-blue-400 text-blue-400" },
  Land: {
    label: "Bundesland",
    className: "border-emerald-400 text-emerald-400",
  },
  Wahlkreis: {
    label: "Wahlkreis",
    className: "border-amber-400 text-amber-400",
  },
};
