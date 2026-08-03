export default function PageContainer({ children }) {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {children}
    </div>
  );
}