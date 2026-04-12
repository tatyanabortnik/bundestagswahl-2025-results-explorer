import type { AreaResults, PartyResult } from "@/domain/types";
import {
  filterTopVotedParties,
  formatAreaName,
  toGermanNumber,
  toGermanPercent,
} from "@/domain/utils";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { ColoredBar, FadedColoredBar } from "./Bars";

type ComparisonRow = {
  party: string;
  area1Percent: number;
  area2Percent: number;
  area1Votes: number;
  area2Votes: number;
};

const buildComparisonData = (
  resultsArea1: PartyResult[],
  resultsArea2: PartyResult[],
): ComparisonRow[] => {
  const area2ByParty = new Map(resultsArea2.map((res) => [res.party, res]));

  const overlap = resultsArea1.filter((r) => area2ByParty.has(r.party));

  return overlap.map((result) => {
    const area2 = area2ByParty.get(result.party)!;
    return {
      party: result.party,
      area1Percent: result.percent,
      area1Votes: result.votes,
      area2Percent: area2.percent,
      area2Votes: area2.votes,
    };
  });
};

export const ComparisonChart = ({
  area1Data,
  area2Data,
}: {
  area1Data: AreaResults;
  area2Data: AreaResults;
}) => {
  const topPartiesArea1 = filterTopVotedParties(area1Data.secondVote);
  const topPartiesArea2 = filterTopVotedParties(area2Data.secondVote);

  const area1Label = formatAreaName(area1Data);
  const area2Label = formatAreaName(area2Data);

  const comparisonData = buildComparisonData(topPartiesArea1, topPartiesArea2);

  const seriesLabels: Record<string, string> = {
    area1Percent: area1Label,
    area2Percent: area2Label,
  };

  return (
    <>
      <h3 className="text-lg font-bold mt-1">
        Vergleich der Wahlergebnisse &gt; 5 %
      </h3>{" "}
      <p className="text-sm text-gray-500">
        {`${area1Label} vs. ${area2Label}`}
      </p>
      <div className="mx-auto w-full max-w-3xl">
        <BarChart
          style={{
            width: "100%",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={comparisonData}
          margin={{ top: 5, right: 0, left: 0, bottom: 30 }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="party"
          angle={-35}
          textAnchor="end"
          interval={0}
          height={60}
        />
        <YAxis width="auto" />
        <Tooltip
          formatter={(percent: number, name: string, item) => {
            const row = item.payload as ComparisonRow;
            const votes =
              name === "area1Percent" ? row.area1Votes : row.area2Votes;
            return [
              `${toGermanPercent(percent)} (${toGermanNumber(votes)} Stimmen)`,
              seriesLabels[name],
            ];
          }}
        />
        <Bar
          dataKey="area1Percent"
          name="area1Percent"
          shape={<ColoredBar />}
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="area2Percent"
          name="area2Percent"
          shape={<FadedColoredBar />}
          radius={[10, 10, 0, 0]}
        />
        </BarChart>
      </div>
    </>
  );
};
