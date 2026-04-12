import { VOTES } from "@/domain/constants";
import type { PartyResult } from "@/domain/types";
import { toGermanNumber, toGermanPercent } from "@/domain/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ColoredBar } from "./Bars";

export const SingularChart = ({ chartData }: { chartData: PartyResult[] }) => {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <BarChart
        style={{
          width: "100%",
          maxHeight: "70vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={chartData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 30,
        }}
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
        formatter={(percent: number, _name, item) => {
          const row = item.payload as PartyResult;
          return [
            `${toGermanPercent(percent)} (${toGermanNumber(row.votes)} ${VOTES})`,
          ];
        }}
      />
      <Bar
        dataKey="percent"
        name="percent"
        shape={<ColoredBar />}
        radius={[10, 10, 0, 0]}
      />
      </BarChart>
    </div>
  );
};
