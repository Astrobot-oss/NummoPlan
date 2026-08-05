import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

import { InvestmentProvider } from "./context/InvestmentContext";
import { GoalProvider } from "./context/GoalContext";
import { DebtProvider } from "./context/DebtsContext";
import { BalanceProvider } from "./context/BalanceContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <InvestmentProvider>
        <GoalProvider>
          <DebtProvider>
            <BalanceProvider>

        <App />

            </BalanceProvider>
          </DebtProvider>
        </GoalProvider>
      </InvestmentProvider>
    </BrowserRouter>
  </StrictMode>
);