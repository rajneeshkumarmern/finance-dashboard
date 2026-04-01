import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

/** Sample monthly income vs expense (₹) */
const INCOME_VS_EXPENSE = [
  { month: 'Jan', income: 52000, expense: 18000 },
  { month: 'Feb', income: 52000, expense: 19500 },
  { month: 'Mar', income: 54000, expense: 17200 },
  { month: 'Apr', income: 52000, expense: 21000 },
  { month: 'May', income: 55000, expense: 18800 },
  { month: 'Jun', income: 58000, expense: 20500 },
  { month: 'Jul', income: 52000, expense: 19200 },
  { month: 'Aug', income: 52000, expense: 22100 },
  { month: 'Sep', income: 56000, expense: 19800 },
  { month: 'Oct', income: 52000, expense: 18400 },
  { month: 'Nov', income: 52000, expense: 20100 },
  { month: 'Dec', income: 62000, expense: 21500 },
]

/** Sample category totals for pie chart */
const CATEGORY_BREAKDOWN = [
  { name: 'Food', value: 12400 },
  { name: 'Shopping', value: 8200 },
  { name: 'Bills', value: 9600 },
  { name: 'Transport', value: 5100 },
  { name: 'Entertainment', value: 4300 },
  { name: 'Health', value: 3400 },
]

const PIE_COLORS = [
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#ea580c',
  '#16a34a',
  '#0891b2',
]

function formatRupee(value) {
  return `₹${Number(value).toLocaleString('en-IN')}`
}

const tooltipStyle = {
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
}

export default function Charts() {
  return (
    <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">
          Income vs expense
        </h2>
        <p className="mb-4 text-sm text-gray-500">Monthly comparison</p>
        <div className="h-[min(320px,50vh)] w-full min-h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={INCOME_VS_EXPENSE}
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
                formatter={(value, name) => [
                  formatRupee(value),
                  name === 'income' ? 'Income' : 'Expense',
                ]}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={tooltipStyle}
              />
              <Legend
                verticalAlign="top"
                height={28}
                formatter={(value) => (
                  <span className="text-sm text-gray-700">
                    {value === 'income' ? 'Income' : 'Expense'}
                  </span>
                )}
              />
              <Line
                type="monotone"
                dataKey="income"
                name="income"
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 3, fill: '#059669' }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                name="expense"
                stroke="#e11d48"
                strokeWidth={2}
                dot={{ r: 3, fill: '#e11d48' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">
          Category breakdown
        </h2>
        <p className="mb-4 text-sm text-gray-500">Spending by category</p>
        <div className="h-[min(320px,50vh)] w-full min-h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CATEGORY_BREAKDOWN}
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
                {CATEGORY_BREAKDOWN.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatRupee(value)}
                contentStyle={tooltipStyle}
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
