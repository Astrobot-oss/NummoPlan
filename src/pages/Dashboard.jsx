import Header from "../components/Header";
import StatCard from "../components/StatCard";
import PageContainer from "../components/PageContainer";
import SmallStatCard from "../components/SmallStatCard";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  return (
    <PageContainer>

      <Header />

      <>
  <StatCard
    title="Patrimonio Neto"
    value="0 €"
    
  />

  <div className="grid grid-cols-3 gap-6 mt-6">
    <SmallStatCard
      title="Objetivos"
      value="0 %"
    />

    <SmallStatCard
      title="Inversiones"
      value="0 €"
    />

    <SmallStatCard
      title="Deudas"
      value="0 €"
    />
  </div>
</>
<ChartCard />

    </PageContainer>
  );
}