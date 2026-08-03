export default function PrimaryButton({
  children,
  onClick,
  icon: Icon,
}) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        bg-orange-500
        hover:bg-orange-600
        px-5
        py-3
        text-white
        font-medium
        transition-colors
      "
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}