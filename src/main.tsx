import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n/i18n"; 
import App from "./App";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>

  </StrictMode>
);