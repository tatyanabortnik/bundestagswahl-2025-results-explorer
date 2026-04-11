import { createContext, useContext } from "react";
import type { AreaResults } from "../../domain/types";

export interface ElectionDataState {
  status: "loading" | "error" | "loaded";
  data: Map<string, AreaResults> | null;
  error: string | null;
}

export const ElectionDataContext = createContext<ElectionDataState>({
  status: "loading",
  data: null,
  error: null,
});

export function useElectionData(): ElectionDataState {
  return useContext(ElectionDataContext);
}
