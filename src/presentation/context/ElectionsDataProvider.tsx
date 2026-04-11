import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { loadElectionData } from "../../data/loadElectionData";
import { ElectionDataContext } from "./ElectionDataContext";
import type { ElectionDataState } from "./ElectionDataContext";

export function ElectionDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ElectionDataState>({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    loadElectionData()
      .then((data) => setState({ status: "loaded", data, error: null }))
      .catch((err) =>
        setState({ status: "error", data: null, error: String(err) }),
      );
  }, []);

  return <ElectionDataContext value={state}>{children}</ElectionDataContext>;
}
