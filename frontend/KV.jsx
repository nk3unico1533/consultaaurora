export default function KV({ label, value }) {
  return (
    <div className="flex justify-between py-1 text-sm border-b last:border-b-0">
      <div className="text-gray-600">{label}</div>
      <div className="font-medium text-gray-800">{value ?? 'N/A'}</div>
    </div>
  );
}
