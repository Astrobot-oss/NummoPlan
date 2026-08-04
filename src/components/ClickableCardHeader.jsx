import { useNavigate } from "react-router-dom";

export default function ClickableCardHeader({
  to,
  children,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className="group cursor-pointer rounded-2xl p-3 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
    >
      <div className="flex items-start justify-between">
        {children}
      </div>
    </div>
  );
}