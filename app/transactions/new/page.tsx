import TransactionForm from "@/app/components/transaction-form"

export default function NewTransactionPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">New Transaction</h2>
      </div>
      
      <TransactionForm />
    </div>
  )
} 