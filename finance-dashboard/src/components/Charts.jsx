import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

const BALANCE_TREND = [
  { month: 'Jan', balance: 28000 },
  { month: 'Feb', balance: 31000 },
  { month: 'Mar', balance: 29500 },
  { month: 'Apr', balance: 35000 },
  { month: 'May', balance: 38000 },
  { month: 'Jun', balance: 42000 },
  { month: 'Jul', balance: 40000 },
  { month: 'Aug', balance: 44500 },
  { month: 'Sep', balance: 47000 },
  { month: 'Oct', balance: 48500 },
  { month: 'Nov', balance: 49200 },
  { month: 'Dec', balance: 50000 },
]

const EXPENSE_BY_CATEGORY = [
  { name: 'Food', value: 6500 },
  { name: 'Shopping', value: 4200 },
  { name: 'Bills', value: 3800 },
  { name: 'Transport', value: 2800 },
  { name: 'Entertainment', value: 1700 },
]

const PIE_COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a']

function formatRupee(value) {
  return `₹${Number(value).toLocaleString('en-IN')}`
}

export default function Charts() {
  return (
    <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">Balance trend</h2>
        <p className="mb-4 text-sm text-gray-500">Monthly balance over the year</p>
        <div className="h-[min(320px,50vh)] w-full min-h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={BALANCE_TREND}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickFormatter={(v) => `${Math.round(v / 1000)}k`}
              />
              <Tooltip
                formatter={(value) => [formatRupee(value), 'Balance']}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                name="Balance"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 3, fill: '#2563eb' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">Expense distribution</h2>
        <p className="mb-4 text-sm text-gray-500">Breakdown by category</p>
        <div className="h-[min(320px,50vh)] w-full min-h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={EXPENSE_BY_CATEGORY}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={88}
                paddingAngle={2}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={{ stroke: '#94a3b8' }}
              >
                {EXPENSE_BY_CATEGORY.map((_, index) => (
                  <Cell
                    key={EXPENSE_BY_CATEGORY[index].name}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatRupee(value)}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-gray-700">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
