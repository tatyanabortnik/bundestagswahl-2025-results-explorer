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
    <div className="p-4 border border-border rounded-lg space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <span
            className={`text-xs bg-muted px-2 py-1 rounded border ${areaLabelConfig[areaResults.areaType].className}`}
          >
            {areaLabelConfig[areaResults.areaType].label}
          </span>
          <h1 className="text-lg font-bold mt-1">
            {formatAreaName(areaResults)}
          </h1>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="p-3 bg-muted rounded">
          Wahlberechtigte: {toGermanNumber(areaResults.turnout.eligible)}
        </div>
        <div className="p-3 bg-muted rounded">
          Wahlbeteiligung: {toGermanNumber(areaResults.turnout.voters)} /{" "}
          {toGermanPercent(areaResults.turnout.percent)}
        </div>
      </div>
      <SimpleChart chartData={chartData} areaLabel={formatAreaName(areaResults)} />
      <PartyTable partyData={areaResults.secondVote} />
    </div>
  );
};
