import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/data/kerg2.csv");
        const text = await res.text();

        console.log(text);
      } catch (e) {
        if (e instanceof Error) console.error(e.message);
      }
    }

    fetchData();
  }, []);

  return <div>Hello</div>;
}

export default App;
