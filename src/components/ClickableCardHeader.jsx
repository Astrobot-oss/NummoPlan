import { useNavigate } from "react-router-dom";

export default function ClickableCardHeader({
  to,
  children,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className="group cursor-pointer rounded-2xl p-3 transition hover:bg-slate-50"
    >
      <div className="flex items-start justify-between">
        {children}
      </div>
    </div>
  );
}