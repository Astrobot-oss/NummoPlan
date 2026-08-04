import { useState } from "react";
import Sidebar from "../components/navigation/Sidebar";
import MobileHeader from "../components/navigation/MobileHeader";
import MobileSidebar from "../components/navigation/MobileSidebar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navegación escritorio */}
      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          {/* Navegación móvil */}
          <MobileHeader
            onOpenMenu={() => setSidebarOpen(true)}
          />

          <MobileSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="mx-auto max-w-7xl p-4 pt-20 md:p-6 lg:p-10 lg:pt-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}