'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

// Mock data for transactions (same as dashboard)
const transactions = [
  {
    id: 1,
    name: "Berlin Portfolio Acquisition",
    type: "Acquisition",
    value: 1250000,
    assets: 2,
    status: "In Progress",
    date: "2024-03-15"
  },
  {
    id: 2,
    name: "Hamburg Office Complex",
    type: "Due Diligence",
    value: 3500000,
    assets: 1,
    status: "Initiated",
    date: "2024-03-10"
  },
  {
    id: 3,
    name: "Munich Residential Development",
    type: "Development",
    value: 2800000,
    assets: 3,
    status: "Completed",
    date: "2024-03-01"
  }
]

export default function TransactionsPage() {
  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <div className="flex items-center space-x-2">
          <Link href="/transactions/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Transaction
            </Button>
          </Link>
        </div>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Assets</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    <Link 
                      href={`/transactions/${transaction.id}`}
                      className="hover:underline"
                    >
                      {transaction.name}
                    </Link>
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>€{(transaction.value / 1000000).toFixed(1)}M</TableCell>
                  <TableCell>{transaction.assets}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-50 text-green-700' 
                        : transaction.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 