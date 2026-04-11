import { useElectionData } from "./presentation/context/ElectionDataContext";

function App() {
  const { status, data, error } = useElectionData();
  console.log(status, data, error);

  return <div>Hello</div>;
}

export default App;
