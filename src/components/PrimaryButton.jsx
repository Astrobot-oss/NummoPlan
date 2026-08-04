export default function PrimaryButton({
  children,
  onClick,
  icon: Icon,
  className = "",
  disabled = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
  inline-flex
  min-h-11
  w-full
  items-center
  justify-center
  gap-2
  rounded-xl
  bg-orange-500
  px-4
  py-3
  text-sm
  font-medium
  text-white
  transition-colors
  hover:bg-orange-600
  focus:outline-none
  focus:ring-2
  focus:ring-orange-500
  focus:ring-offset-2
  disabled:cursor-not-allowed
  disabled:opacity-50
  sm:w-auto
  sm:px-5
  sm:text-base
  ${className}
`}
    >
      {Icon && <Icon size={18} />}

      {children}
    </button>
  );
}