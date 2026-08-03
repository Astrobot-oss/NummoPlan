import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="flex">

        <Sidebar />

        <main className="flex-1 overflow-x-auto">

          <div className="mx-auto max-w-7xl p-6 lg:p-10">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}