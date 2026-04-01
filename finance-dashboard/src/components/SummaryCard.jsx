export default function SummaryCard({ title, value }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
        {value}
      </p>
    </div>
  )
}
