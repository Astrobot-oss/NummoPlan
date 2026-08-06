import { useState, useEffect } from "react";

export function useAutoRefreshDate() {
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  // 1. Temporizador para detectar el cambio de día si la pestaña está abierta a medianoche
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toDateString();
      if (today !== currentDate) {
        setCurrentDate(today);
        window.location.reload();
      }
    }, 60000); // Comprueba cada 1 minuto

    return () => clearInterval(interval);
  }, [currentDate]);

  // 2. Detector de visibilidad para cuando el usuario vuelve a abrir la pestaña al día siguiente
  useEffect(() => {
    if (!localStorage.getItem("app_last_date")) {
      localStorage.setItem("app_last_date", new Date().toDateString());
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const storedDate = localStorage.getItem("app_last_date");
        const today = new Date().toDateString();
        
        if (storedDate !== today) {
          localStorage.setItem("app_last_date", today);
          window.location.reload();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);
}