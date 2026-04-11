import { AreaSearch } from "./AreaSearch";
import { EmptyState } from "./EmptyState";
import { AreaPanel } from "./AreaPanel";
import { ViewModeTabs } from "./ViewModeTabs";
import { ComparisonView } from "./ComparisonView";
import { useElectionData } from "../context/ElectionDataContext";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

export const ExploreSection = () => {
  const { status } = useElectionData();

  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorState />;

  const selectionCount = 2;
  const viewMode = "vergleich"; // or "vergleich"

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <>
        {/* Search bar row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Gebiet 1</label>
            <AreaSearch />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Gebiet 2</label>
            <AreaSearch />
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Durchsuchen Sie das Bundesgebiet, alle 16 Bundesländer oder 299
          Wahlkreise
        </p>

        {selectionCount === 2 && <ViewModeTabs />}

        {selectionCount === 0 && <EmptyState />}

        {selectionCount === 1 && <AreaPanel />}

        {selectionCount === 2 && viewMode === "nebeneinander" && (
          <div className="grid grid-cols-2 gap-4">
            <AreaPanel />
            <AreaPanel />
          </div>
        )}

        {selectionCount === 2 && viewMode === "vergleich" && <ComparisonView />}
      </>
    </div>
  );
};
