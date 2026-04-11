import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { ElectionDataProvider } from "./presentation/context/ElectionsDataProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ElectionDataProvider>
        <App />
      </ElectionDataProvider>
    </BrowserRouter>
  </StrictMode>,
);
