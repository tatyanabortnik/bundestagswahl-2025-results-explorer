export type AreaType = "Bund" | "Land" | "Wahlkreis";
export type Gruppenart = "System-Gruppe" | "Partei";

export type ElectionCsvRow = {
  gebietsart: AreaType;
  gebietsname: string;
  gruppenart: Gruppenart;
  gruppenname: string;
  gebietsnummer: number;
  stimme: 1 | 2;
  anzahl: number;
  prozent: string;
};

export type PartyResult = {
  party: string;
  votes: number;
  percent: number;
};

export type AreaResults = {
  areaType: AreaType;
  areaName: string;
  areaNumber: number;
  turnout: {
    eligible: number;
    voters: number;
    percent: number;
  };
  secondVote: PartyResult[];
};
