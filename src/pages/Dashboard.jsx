import Header from "../components/Header";
import StatCard from "../components/StatCard";
import PageContainer from "../components/PageContainer";
import SmallStatCard from "../components/SmallStatCard";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  return (
  <PageContainer>

    <Header />

    <StatCard
      title="Patrimonio Neto"
      value="0 €"
    />

    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

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

    <div className="mt-6">

      <ChartCard />

    </div>

  </PageContainer>
);
}