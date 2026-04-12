import type { AreaResults } from "@/domain/types";
import { formatAreaName } from "@/domain/utils";

export const ComparisonView = ({
  area1Data,
  area2Data,
}: {
  area1Data: AreaResults;
  area2Data: AreaResults;
}) => {
  return (
    <>
      <h3 className="text-lg font-bold mt-1">Vergleich der Wahlergebnisse</h3>
      <p className="text-sm text-gray-500">
        {`${formatAreaName(area1Data)} vs. ${formatAreaName(area2Data)}`}
      </p>
    </>
  );
};
