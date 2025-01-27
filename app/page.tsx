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
import { PlusCircle, ArrowUpRight, Building2, Euro } from "lucide-react"
import Link from "next/link"

// Mock data for transactions
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
  },
  {
    id: 4,
    name: "Kreuzberg-Prenzlauer Portfolio",
    type: "Acquisition",
    value: 1250000,
    assets: 2,
    status: "Completed",
    date: new Date().toISOString().split('T')[0] // Today's date
  }
]

export default function Home() {
  const totalValue = transactions.reduce((sum, t) => sum + t.value, 0)
  const totalAssets = transactions.reduce((sum, t) => sum + t.assets, 0)
  const activeTransactions = transactions.filter(t => t.status !== 'Completed').length

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Link href="/transactions/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Transaction
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transaction Value
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{(totalValue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">
              Across all transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Assets
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAssets}</div>
            <p className="text-xs text-muted-foreground">
              In all transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Transactions
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTransactions}</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
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
