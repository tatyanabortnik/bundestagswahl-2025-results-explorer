import { Rectangle, type RectangleProps } from "recharts";
import { FALLBACK_COLOR, PARTY_COLORS } from "./style";

type PartyPayload = { party?: string };
type ColoredBarProps = RectangleProps & { payload?: PartyPayload };

export const ColoredBar = (props: ColoredBarProps) => {
    const fill = PARTY_COLORS[props.payload?.party ?? ""] ?? FALLBACK_COLOR;
    return <Rectangle {...props} fill={fill} />;
  };
  
  export const FadedColoredBar = (props: ColoredBarProps) => {
    const fill = PARTY_COLORS[props.payload?.party ?? ""] ?? FALLBACK_COLOR;
    return <Rectangle {...props} fill={fill} fillOpacity={0.5} />;
  };