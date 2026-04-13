import type { ComponentProps, ReactNode } from "react";
import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

export type TooltipFormatter = (
  value: number,
  name: string,
  item: { payload: unknown },
) => ReactNode | [ReactNode, ReactNode];

type ChartWrapperProps<T> = {
  data: T[];
  tooltipFormatter: TooltipFormatter;
  children: ReactNode;
  ariaLabel: string;
};

export const ChartWrapper = <T,>({
  data,
  tooltipFormatter,
  children,
  ariaLabel,
}: ChartWrapperProps<T>) => (
  <div
    className="mx-auto w-full max-w-3xl"
    role="img"
    aria-label={ariaLabel}
  >
    <BarChart
      style={{
        width: "100%",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
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
        formatter={
          tooltipFormatter as ComponentProps<typeof Tooltip>["formatter"]
        }
      />
      {children}
    </BarChart>
  </div>
);
