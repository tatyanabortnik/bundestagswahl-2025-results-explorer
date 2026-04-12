import { COMPARISON, SIDE_BY_SIDE } from "@/domain/constants";
import type { ViewMode } from "@/domain/types";
import { Button } from "./ui/button";

const MODES: ViewMode[] = [SIDE_BY_SIDE, COMPARISON];

export const ViewModeTabs = ({
  currentMode,
  onChange,
}: {
  currentMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) => {
  return (
    <div className="flex gap-2 p-1 rounded-lg w-fit">
      {MODES.map((mode) => (
        <Button
          key={mode}
          variant={currentMode === mode ? "default" : "ghost"}
          onClick={() => onChange(mode)}
        >
          {mode}
        </Button>
      ))}
    </div>
  );
};
