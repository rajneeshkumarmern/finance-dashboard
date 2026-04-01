import { useMemo } from 'react'

function formatRupee(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`
}

function buildInsights(transactions) {
  const expenses = transactions.filter((t) => t.type === 'expense')
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0)

  const byCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + t.amount
    return acc
  }, {})

  const ranked = Object.entries(byCategory).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1]
    return a[0].localeCompare(b[0])
  })
  const [topCategory, topAmount] = ranked[0] ?? [null, 0]

  let observation
  if (totalExpenses === 0) {
    observation =
      'No expenses recorded yet. When you add expense entries, this section will summarize your top category and spending mix.'
  } else if (topCategory === null) {
    observation =
      'Expense transactions are present but category totals could not be derived.'
  } else {
    const share = Math.round((topAmount / totalExpenses) * 100)
    const expenseCount = expenses.length
    observation = `${topCategory} is ${share}% of recorded expenses (${expenseCount} expense ${
      expenseCount === 1 ? 'entry' : 'entries'
    }). Tightening that category usually moves the needle fastest on total outflow.`
  }

  return { totalExpenses, topCategory, topAmount, observation }
}

export default function Insights({ transactions }) {
  const { totalExpenses, topCategory, topAmount, observation } = useMemo(
    () => buildInsights(transactions),
    [transactions],
  )

  return (
    <section className="mt-10 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">Insights</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-gray-500">Highest spending category</p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-gray-900">
            {topCategory != null ? (
              <>
                {topCategory}
                <span className="font-normal text-gray-600">
                  {' '}
                  · {formatRupee(topAmount)}
                </span>
              </>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Total expenses</p>
          <p className="mt-1 text-xl font-semibold tracking-tight text-gray-900 tabular-nums">
            {formatRupee(totalExpenses)}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-gray-700">
        {observation}
      </div>
    </section>
  )
}
