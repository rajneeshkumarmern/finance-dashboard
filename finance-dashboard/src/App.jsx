import SummaryCard from './components/SummaryCard.jsx'
import Charts from './components/Charts.jsx'
import TransactionTable from './components/TransactionTable.jsx'

const summaryItems = [
  { title: 'Total Balance', value: '₹50,000' },
  { title: 'Income', value: '₹70,000' },
  { title: 'Expenses', value: '₹20,000' },
]

function App() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Finance Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {summaryItems.map((item) => (
            <SummaryCard key={item.title} title={item.title} value={item.value} />
          ))}
        </div>

        <Charts />

        <TransactionTable />
      </div>
    </div>
  )
}

export default App
