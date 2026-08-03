import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { InvestmentProvider } from "./context/InvestmentContext";
import { GoalProvider } from "./context/GoalContext";
import { DebtProvider } from "./context/DebtsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <InvestmentProvider>
        <GoalProvider>
          <DebtProvider>
            <App />
          </DebtProvider>
        </GoalProvider>
      </InvestmentProvider>
    </BrowserRouter>
  </StrictMode>
);