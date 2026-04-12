import type { PartyResult } from "@/domain/types";
import { toGermanNumber } from "@/domain/utils";
import {
  BarChart,
  Bar,
  Rectangle,
  type RectangleProps,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const FIELD_LABELS: Record<string, string> = {
  votes: "Stimmen",
  percent: "Anteil",
};

//TODO: add colors to chartData in AreaPanel
const PARTY_COLORS: Record<string, string> = {
  CDU: "#000000",
  CSU: "#0570C3",
  SPD: "#E3000F",
  "GRÜNE": "#1FA12C",
  FDP: "#FFED00",
  AfD: "#009EE0",
  "DIE LINKE": "#BE3075",
  "Die Linke": "#BE3075",
  BSW: "#792350",
  "FREIE WÄHLER": "#F39200",
  Tierschutzpartei: "#006666",
  "Volt": "#502379",
};

const FALLBACK_COLOR = "#8884d8";

type ColoredBarProps = RectangleProps & { payload?: PartyResult };

const ColoredBar = (props: ColoredBarProps) => {
  const fill = PARTY_COLORS[props.payload?.party ?? ""] ?? FALLBACK_COLOR;
  return <Rectangle {...props} fill={fill} />;
};

export const ResultsChart = ({ chartData }: { chartData: PartyResult[] }) => {
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={chartData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="party" />
      <YAxis width="auto" />
      <Tooltip
        includeHidden
        formatter={(value, name) => [
          name === "percent"
            ? `${toGermanNumber(value as number)} %`
            : toGermanNumber(value as number),
          FIELD_LABELS[name as string] ?? name,
        ]}
      />
      <Legend formatter={(name) => FIELD_LABELS[name] ?? name} />
      <Bar
        dataKey="votes"
        name="votes"
        shape={<ColoredBar />}
        activeBar={{ fill: "pink", stroke: "blue" }}
        radius={[10, 10, 0, 0]}
      />
      <Bar dataKey="percent" name="percent" hide legendType="none" />
    </BarChart>
  );
};
