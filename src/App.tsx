import { useEffect, useState } from "react";
import { parseCsv, type ElectionCsvRow } from "./data/parseCsv";

function App() {
  const [data, setData] = useState<ElectionCsvRow[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/kerg2.csv");
        const text = await res.text();
        const parsed = parseCsv(text, { delimiter: ";", skipLines: 9 });
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
            <td>{row.Gebietsart}</td>
            <td>{row.Gebietsnummer}</td>
            <td>{row.Gebietsname}</td>
            <td>{row.Gruppenname}</td>
            <td>{row.Stimme}</td>
            <td>{row.Anzahl}</td>
            <td>{row.Prozent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
