import { useEffect, useState } from "react";
import { parseCsv } from "./data/parseCsv";
import { transformResults } from "./domain/mapParseResult";
import type { ElectionCsvRow } from "./domain/types";

function App() {
  const [data, setData] = useState<ElectionCsvRow[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/kerg2.csv");
        if (!res.ok) {
          throw new Error(`Failed to load CSV: ${res.status}`);
        }
        const text = await res.text();
        const parsed = parseCsv<ElectionCsvRow>(text, {
          delimiter: ";",
          skipLines: 9,
        });
        const transformed = transformResults(parsed);
        console.log(transformed);
        setData(parsed);
      } catch (e) {
        if (e instanceof Error) console.error(e.message);
        setError(e.message);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <table className="relative">
      <thead className="sticky top-0 right-0 left-0 bg-amber-600">
        <tr>
          <th>Gebietsart</th>
          <th>Gebietsnummer</th>
          <th>Gebietsname</th>
          <th>Gruppenname</th>
          <th>Stimme</th>
          <th>Anzahl</th>
          <th>Prozent</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row.gebietsart}</td>
            <td>{row.gebietsnummer}</td>
            <td>{row.gebietsname}</td>
            <td>{row.gruppenname}</td>
            <td>{row.stimme}</td>
            <td>{row.anzahl}</td>
            <td>{row.prozent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
