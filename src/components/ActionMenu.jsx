import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

export default function ActionMenu({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
  onClick={(e) => {
    e.stopPropagation();
    setOpen(!open);
  }}
  className="cursor-pointer rounded-xl p-2 transition hover:bg-slate-100"
>
        <MoreVertical size={20} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-44 rounded-2xl border border-slate-200 bg-white py-2 shadow-lg">

          {items.map((item) => (
            <button
              key={item.label}
              onClick={(e) => {
  e.stopPropagation();
  setOpen(false);
  item.onClick();
}}
              className={`block w-full cursor-pointer px-4 py-2 text-left text-sm transition hover:bg-slate-50 ${
  item.danger
    ? "text-red-600"
    : "text-slate-700"
}`}
            >
              {item.label}
            </button>
          ))}

        </div>
      )}
    </div>
  );
}