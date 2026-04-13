import { SimpleChart } from "./chart/SimpleChart";
import { PartyTable } from "./PartyTable";
import type { AreaResults } from "@/domain/types";
import {
  areaLabelConfig,
  formatAreaName,
  toGermanNumber,
  toGermanPercent,
} from "@/domain/utils";

export const AreaResultsView = ({
  areaResults,
}: {
  areaResults: AreaResults;
}) => {
  const chartData = areaResults.secondVote.filter((vote) => vote.percent > 5);
  return (
    <div className="p-4 border border-gray-700 rounded-lg space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <span
            className={`text-xs bg-gray-100 px-2 py-1 rounded border ${areaLabelConfig[areaResults.areaType].className}`}
          >
            {areaLabelConfig[areaResults.areaType].label}
          </span>
          <h3 className="text-lg font-bold mt-1">
            {formatAreaName(areaResults)}
          </h3>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="p-3 bg-gray-200 rounded">
          Wahlberechtigte: {toGermanNumber(areaResults.turnout.eligible)}
        </div>
        <div className="p-3 bg-gray-200 rounded">
          Wahlbeteiligung: {toGermanNumber(areaResults.turnout.voters)} /{" "}
          {toGermanPercent(areaResults.turnout.percent)}
        </div>
      </div>
      <SimpleChart chartData={chartData} areaLabel={formatAreaName(areaResults)} />
      <PartyTable partyData={areaResults.secondVote} />
    </div>
  );
};
