import { useState } from 'react'
import SummaryCard from './components/SummaryCard.jsx'
import Charts from './components/Charts.jsx'
import Insights from './components/Insights.jsx'
import TransactionTable from './components/TransactionTable.jsx'

const summaryItems = [
  { title: 'Total Balance', value: '₹50,000' },
  { title: 'Income', value: '₹70,000' },
  { title: 'Expenses', value: '₹20,000' },
]

const INITIAL_TRANSACTIONS = [
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

function App() {
  const [role, setRole] = useState('viewer')
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS)

  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev])
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Finance Dashboard
          </h1>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <span className="whitespace-nowrap">Role</span>
            <select
              id="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {summaryItems.map((item) => (
            <SummaryCard key={item.title} title={item.title} value={item.value} />
          ))}
        </div>

        <Charts />

        <Insights transactions={transactions} />

        <TransactionTable
          role={role}
          transactions={transactions}
          onAddTransaction={addTransaction}
        />
      </div>
    </div>
  )
}

export default App
