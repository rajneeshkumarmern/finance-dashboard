import { useMemo, useState } from 'react'

const TRANSACTIONS = [
  {
    id: '1',
    date: '2026-03-28',
    amount: 52000,
    category: 'Salary',
    type: 'income',
  },
  {
    id: '2',
    date: '2026-03-27',
    amount: 1200,
    category: 'Food',
    type: 'expense',
  },
  {
    id: '3',
    date: '2026-03-26',
    amount: 3500,
    category: 'Freelance',
    type: 'income',
  },
  {
    id: '4',
    date: '2026-03-25',
    amount: 899,
    category: 'Shopping',
    type: 'expense',
  },
  {
    id: '5',
    date: '2026-03-24',
    amount: 4500,
    category: 'Bills',
    type: 'expense',
  },
  {
    id: '6',
    date: '2026-03-22',
    amount: 800,
    category: 'Transport',
    type: 'expense',
  },
  {
    id: '7',
    date: '2026-03-20',
    amount: 15000,
    category: 'Bonus',
    type: 'income',
  },
  {
    id: '8',
    date: '2026-03-18',
    amount: 2200,
    category: 'Entertainment',
    type: 'expense',
  },
]

function formatRupee(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

function formatDisplayDate(isoDate) {
  return new Date(isoDate + 'T12:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function TransactionTable() {
  const [categorySearch, setCategorySearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredTransactions = useMemo(() => {
    const q = categorySearch.trim().toLowerCase()
    return TRANSACTIONS.filter((tx) => {
      const matchesCategory = q === '' || tx.category.toLowerCase().includes(q)
      const matchesType =
        typeFilter === 'all' || tx.type === typeFilter
      return matchesCategory && matchesType
    })
  }, [categorySearch, typeFilter])

  return (
    <section className="mt-10 rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
          <p className="mt-1 text-sm text-gray-500">
            Search by category and filter by type
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="category-search">
            Filter by category
          </label>
          <input
            id="category-search"
            type="search"
            placeholder="Search category…"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            className="w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none ring-slate-400/30 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 sm:min-w-[200px]"
          />

          <label className="sr-only" htmlFor="type-filter">
            Filter by type
          </label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 sm:w-40"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="-mx-6 overflow-x-auto border-t border-gray-200 sm:mx-0 sm:rounded-lg sm:border">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-slate-50">
              <th className="px-4 py-3 font-semibold text-gray-700 sm:px-5">
                Date
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700 sm:px-5">
                Amount
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700 sm:px-5">
                Category
              </th>
              <th className="px-4 py-3 font-semibold text-gray-700 sm:px-5">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-gray-500 sm:px-5"
                >
                  No transactions match your filters.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-slate-50/80"
                >
                  <td className="whitespace-nowrap px-4 py-3.5 text-gray-800 sm:px-5">
                    {formatDisplayDate(tx.date)}
                  </td>
                  <td
                    className={`whitespace-nowrap px-4 py-3.5 font-medium tabular-nums sm:px-5 ${
                      tx.type === 'income' ? 'text-emerald-700' : 'text-gray-900'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'}
                    {formatRupee(tx.amount)}
                  </td>
                  <td className="px-4 py-3.5 text-gray-800 sm:px-5">
                    {tx.category}
                  </td>
                  <td className="px-4 py-3.5 sm:px-5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        tx.type === 'income'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {tx.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
