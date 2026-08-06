import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Investments from "./pages/Investments";
import Debts from "./pages/Debts";
import Properties from "./pages/Properties";
import Settings from "./pages/Settings";
import InvestmentDetail from "./pages/InvestmentDetail";
import GoalDetail from "./pages/GoalDetail";
import DebtDetail from "./pages/DebtDetail";
import Balance from "./pages/Balance";
import { useAutoRefreshDate } from "./hooks/useAutoRefreshDate";
import { BalanceProvider } from "./context/BalanceContext"; // <-- Importa tu proveedor

export function App() {
  useAutoRefreshDate(); 

  return (
    <BalanceProvider> {/* <-- Envuélvelo aquí para proveer los datos a Balance.jsx */}
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/objetivos" element={<Goals />} />
          <Route path="/inversiones" element={<Investments />} />
          <Route path="/inversiones/:id" element={<InvestmentDetail />} />
          <Route path="/deudas" element={<Debts />} />
          <Route path="/inmuebles" element={<Properties />} />
          <Route path="/ajustes" element={<Settings />} />
          <Route path="/objetivos/:id" element={<GoalDetail />} />
          <Route path="/deudas/:id" element={<DebtDetail />} />
        </Routes>
      </MainLayout>
    </BalanceProvider>
  );
}

export default App;