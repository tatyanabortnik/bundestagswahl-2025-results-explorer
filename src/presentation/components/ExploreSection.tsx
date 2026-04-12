import { AreaSearch } from "./AreaSearch";
import { EmptyState } from "./EmptyState";
import { AreaPanel } from "./AreaPanel";
import { ViewModeTabs } from "./ViewModeTabs";
import { ComparisonView } from "./ComparisonView";
import { useElectionData } from "../context/ElectionDataContext";
import { useAreaSelection } from "../hooks/useAreaSelection";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

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

  console.log(area1Data)

  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorState />;

  const selectionCount = (area1Key ? 1 : 0) + (area2Key ? 1 : 0);
  const viewMode = "nebeneinander";

  return (
    <div className="space-y-6">
      {/* Search bar row */}
      <div className="grid grid-cols-2 gap-4">
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

      {selectionCount === 2 && <ViewModeTabs />}

      {selectionCount === 0 && <EmptyState />}

      {selectionCount === 1 && <AreaPanel areaResults={area1Data || area2Data} />}

      {area1Key && area2Key && viewMode === "nebeneinander" && (
        <div className="grid grid-cols-2 gap-4">
          <AreaPanel areaResults={area1Data}/>
          <AreaPanel areaResults={area2Data}/>
        </div>
      )}

      {selectionCount === 2 && viewMode === "vergleich" && <ComparisonView />}
    </div>
  );
};
