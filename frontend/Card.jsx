export default function Card({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      {title && <div className="font-medium text-gray-700 mb-2">{title}</div>}
      <div>{children}</div>
    </div>
  );
}
