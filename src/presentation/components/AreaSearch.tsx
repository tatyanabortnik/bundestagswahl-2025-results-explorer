import { useState } from "react";
import { Search, X, Flag, MapPin, Users } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/presentation/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/presentation/components/ui/command";
import type { AreaType } from "@/domain/types";
import { useElectionData } from "../context/ElectionDataContext";
import { areaLabelConfig, formatAreaName } from "@/domain/utils";

type AreaSearchProps = {
  selectedKey: string | undefined;
  onSelect: (key: string) => void;
  onClear: () => void;
  placeholder?: string;
};

const getAreaIcon = (type: AreaType) => {
  switch (type) {
    case "Bund":
      return <Flag className="size-4" />;
    case "Land":
      return <MapPin className="size-4" />;
    case "Wahlkreis":
      return <Users className="size-4" />;
  }
};

export const AreaSearch = ({
  selectedKey,
  onSelect,
  onClear,
  placeholder = "Gebiet suchen...",
}: AreaSearchProps) => {
  const { data: electionMap } = useElectionData();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const electionEntries = electionMap ? Array.from(electionMap.entries()) : [];

  const selectedItem = selectedKey ? electionMap?.get(selectedKey) : undefined;

  const filteredEntries =
    query ?
      electionEntries.filter(([, area]) =>
        area.areaName.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={
            selectedItem ?
              `Ausgewählt: ${formatAreaName(selectedItem)}, ${areaLabelConfig[selectedItem.areaType].label}`
            : placeholder
          }
          aria-expanded={open}
          className="flex w-full items-center gap-2 rounded-lg border border-gray-700  px-3 py-2 text-sm text-left"
        >
          <Search
            className="size-4 shrink-0 text-gray-400"
            aria-hidden="true"
          />
          {selectedItem ?
            <div className="flex flex-1 items-center gap-2 min-w-0">
              {getAreaIcon(selectedItem.areaType)}
              <span className="truncate">{formatAreaName(selectedItem)}</span>
              <span
                className={`ml-auto shrink-0 rounded border bg-gray-100 px-1.5 py-0.5 text-xs ${areaLabelConfig[selectedItem.areaType].className}`}
              >
                {areaLabelConfig[selectedItem.areaType].label}
              </span>
              <span
                role="button"
                tabIndex={0}
                aria-label="Auswahl löschen"
                className="inline-flex shrink-0 items-center justify-center text-gray-400 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onClear();
                  }
                }}
              >
                <X className="size-4" aria-hidden="true" />
              </span>
            </div>
          : <span className="text-gray-500">{placeholder}</span>}
        </button>
      </PopoverTrigger>
      {open && (
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={placeholder}
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>Keine Ergebnisse</CommandEmpty>
              <CommandGroup>
                {filteredEntries.map(([key, area]) => {
                  const { areaType } = area;
                  return (
                    <CommandItem
                      key={key}
                      value={key}
                      onSelect={(value) => {
                        onSelect(value);
                        setOpen(false);
                        setQuery("");
                      }}
                    >
                      {getAreaIcon(areaType)}
                      <span>{formatAreaName(area)}</span>
                      <CommandShortcut
                        className={`text-xs border rounded p-1 ${areaLabelConfig[areaType].className}`}
                      >
                        {areaLabelConfig[areaType].label}
                      </CommandShortcut>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
};
