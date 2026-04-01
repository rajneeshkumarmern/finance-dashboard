import { useEffect, useId, useMemo, useState } from 'react'

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

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `tx-${Date.now()}`
}

export default function TransactionTable({
  role,
  transactions,
  onAddTransaction,
}) {
  const isAdmin = role === 'admin'
  const formId = useId()
  const [categorySearch, setCategorySearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    if (!isAdmin) setShowAddForm(false)
  }, [isAdmin])

  const filteredTransactions = useMemo(() => {
    const q = categorySearch.trim().toLowerCase()
    return transactions.filter((tx) => {
      const matchesCategory = q === '' || tx.category.toLowerCase().includes(q)
      const matchesType =
        typeFilter === 'all' || tx.type === typeFilter
      return matchesCategory && matchesType
    })
  }, [transactions, categorySearch, typeFilter])

  const handleAddSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const date = form.date.value
    const amount = Number(form.amount.value)
    const category = form.category.value.trim()
    const type = form.type.value
    if (!date || !category || !Number.isFinite(amount) || amount <= 0) return

    onAddTransaction({
      id: newId(),
      date,
      amount,
      category,
      type,
    })
    form.reset()
    setShowAddForm(false)
  }

  return (
    <section className="mt-10 rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
          {isAdmin && (
            <button
              type="button"
              onClick={() => setShowAddForm((open) => !open)}
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:w-auto"
            >
              {showAddForm ? 'Cancel' : 'Add Transaction'}
            </button>
          )}

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

      {isAdmin && showAddForm && (
        <form
          id={formId}
          onSubmit={handleAddSubmit}
          className="mb-6 grid grid-cols-1 gap-3 rounded-lg border border-gray-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-6"
        >
          <div className="sm:col-span-1 lg:col-span-1">
            <label htmlFor={`${formId}-date`} className="mb-1 block text-xs font-medium text-gray-600">
              Date
            </label>
            <input
              id={`${formId}-date`}
              name="date"
              type="date"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
          <div className="sm:col-span-1 lg:col-span-1">
            <label htmlFor={`${formId}-amount`} className="mb-1 block text-xs font-medium text-gray-600">
              Amount (₹)
            </label>
            <input
              id={`${formId}-amount`}
              name="amount"
              type="number"
              min="1"
              step="1"
              required
              placeholder="0"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <label htmlFor={`${formId}-category`} className="mb-1 block text-xs font-medium text-gray-600">
              Category
            </label>
            <input
              id={`${formId}-category`}
              name="category"
              type="text"
              required
              placeholder="e.g. Food"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
          <div className="sm:col-span-1 lg:col-span-1">
            <label htmlFor={`${formId}-type`} className="mb-1 block text-xs font-medium text-gray-700">
              Type
            </label>
            <select
              id={`${formId}-type`}
              name="type"
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="flex items-end sm:col-span-2 lg:col-span-1">
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      )}

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
