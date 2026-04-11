import { ResultsChart } from "./ResultsChart";
import { PartyTable } from "./PartyTable";

export const AreaPanel = () => {
  return (
    <div className="p-4 border border-gray-700 rounded-lg space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs bg-gray-700 px-2 py-1 rounded">Bundesland</span>
          <h3 className="text-lg font-bold mt-1">AreaPanel (area name)</h3>
        </div>
        <button className="text-gray-400">X</button>
      </div>
      <div className="flex gap-4">
        <div className="p-3 bg-gray-800 rounded">Wahlberechtigte: ---</div>
        <div className="p-3 bg-gray-800 rounded">Wahlbeteiligung: ---</div>
      </div>
      <ResultsChart />
      <PartyTable />
    </div>
  );
};
