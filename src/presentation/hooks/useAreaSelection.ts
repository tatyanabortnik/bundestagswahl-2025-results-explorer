import { useSearchParams } from "react-router";
import { useElectionData } from "../context/ElectionDataContext";

export function useAreaSelection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useElectionData();

  const area1Key = searchParams.get("area1") ?? undefined;
  const area2Key = searchParams.get("area2") ?? undefined;

  const area1Data = area1Key && data ? data.get(area1Key) : undefined;
  const area2Data = area2Key && data ? data.get(area2Key) : undefined;

  const setArea = (slot: "area1" | "area2", areaKey?: string) =>
    setSearchParams((prev) => {
      console.log(prev);
      const newSearchParams = Object.fromEntries(prev);
      console.log(newSearchParams);
      if (areaKey) {
        newSearchParams[slot] = areaKey;
      } else {
        delete newSearchParams[slot];
      }
      return newSearchParams;
    });

  const selectArea1 = (key: string) => setArea("area1", key);
  const selectArea2 = (key: string) => setArea("area2", key);
  const clearArea1 = () => setArea("area1");
  const clearArea2 = () => setArea("area2");

  return {
    area1Key,
    area2Key,
    area1Data,
    area2Data,
    selectArea1,
    selectArea2,
    clearArea1,
    clearArea2,
  };
}
