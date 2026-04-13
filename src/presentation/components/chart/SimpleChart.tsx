import { VOTES } from "@/domain/constants";
import type { PartyResult } from "@/domain/types";
import { toGermanNumber, toGermanPercent } from "@/domain/utils";
import { Bar } from "recharts";
import { ColoredBar } from "./Bars";
import { ChartWrapper } from "./ChartWrapper";

type SimpleChartProps = {
  chartData: PartyResult[];
  areaLabel: string;
};

export const SimpleChart = ({ chartData, areaLabel }: SimpleChartProps) => (
  <ChartWrapper
    data={chartData}
    ariaLabel={`Zweitstimmen-Ergebnisse für ${areaLabel}`}
    tooltipFormatter={(percent: number, _name, item) => {
      const row = item.payload as PartyResult;
      return [
        `${toGermanPercent(percent)} (${toGermanNumber(row.votes)} ${VOTES})`,
      ];
    }}
  >
    <Bar
      dataKey="percent"
      name="percent"
      shape={<ColoredBar />}
      radius={[10, 10, 0, 0]}
    />
  </ChartWrapper>
);
