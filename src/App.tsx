import { ExploreSection } from "./presentation/components/ExploreSection";

const App = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Wahlvergleich</h1>
        <p className="text-gray-400">
          Bundestagswahl 2025 — Ergebnisse vergleichen
        </p>
      </header>
      <ExploreSection />
    </div>
  );
};

export default App;
