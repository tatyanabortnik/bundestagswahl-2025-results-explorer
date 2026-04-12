import { AreaSearch } from "./AreaSearch";
import { EmptyState } from "./EmptyState";
import { AreaResultsView } from "./AreaResultsView";
import { ViewModeTabs } from "./ViewModeTabs";
import { ComparisonChart } from "./chart/ComparisonChart";
import { useElectionData } from "../context/ElectionDataContext";
import { useAreaSelection } from "../hooks/useAreaSelection";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { useState } from "react";
import type { ViewMode } from "@/domain/types";
import { COMPARISON, SIDE_BY_SIDE } from "@/domain/constants";

export const ExploreSection = () => {
  const { status } = useElectionData();
  const {
    area1Key,
    area2Key,
    area1Data,
    area2Data,
    selectArea1,
    selectArea2,
    clearArea1,
    clearArea2,
  } = useAreaSelection();

  const [viewMode, setViewMode] = useState<ViewMode>(SIDE_BY_SIDE);

  if (status === "loading") return <LoadingState />;
  if (status === "error")
    return <ErrorState onRetry={() => window.location.reload()} />;

  const hasNone = !area1Key && !area2Key;
  const hasBoth = Boolean(area1Key) && Boolean(area2Key);
  const hasOne = Boolean(area1Key) !== Boolean(area2Key);

  return (
    <div className="space-y-6">
      {/* Search bar row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Gebiet 1</label>
          <AreaSearch
            selectedKey={area1Key}
            onSelect={selectArea1}
            onClear={clearArea1}
            placeholder="Erstes Gebiet suchen..."
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Gebiet 2</label>
          <AreaSearch
            selectedKey={area2Key}
            onSelect={selectArea2}
            onClear={clearArea2}
            placeholder="Zweites Gebiet suchen..."
          />
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Durchsuchen Sie das Bundesgebiet, alle 16 Bundesländer oder 299
        Wahlkreise
      </p>

      {hasNone && <EmptyState />}
      {hasBoth && (
        <ViewModeTabs currentMode={viewMode} onChange={setViewMode} />
      )}

      {hasOne && (area1Data || area2Data) && (
        <AreaResultsView areaResults={(area1Data || area2Data)!} />
      )}

      {hasBoth && area1Data && area2Data && viewMode === SIDE_BY_SIDE && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AreaResultsView areaResults={area1Data} />
          <AreaResultsView areaResults={area2Data} />
        </div>
      )}

      {hasBoth && area1Data && area2Data && viewMode === COMPARISON && (
        <ComparisonChart area1Data={area1Data} area2Data={area2Data} />
      )}
    </div>
  );
};
