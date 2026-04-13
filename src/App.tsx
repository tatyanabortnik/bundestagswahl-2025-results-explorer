import { ExploreSection } from "./presentation/components/ExploreSection";
import { useTheme } from "./presentation/hooks/useTheme";
import SwitchDualIcon from "./presentation/components/ui/switchDualIcon";

const App = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Wahlvergleich</h1>
          <p className="text-muted-foreground">
            Bundestagswahl 2025 — Ergebnisse vergleichen
          </p>
        </div>
        <div className="flex items-center space-x-2">
          
          <SwitchDualIcon
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      </header>
      <ExploreSection />
    </div>
  );
};

export default App;
