'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FileText, CheckCircle2, AlertCircle, Clock, Download } from "lucide-react"
import { TransactionInfoBar } from "../transaction-info-bar"
import { AssetDetailsDialog } from '../asset-details-dialog'
import { useRouter } from 'next/navigation'

type Asset = {
  id: number
  name: string
  currentEmissions: number
  potentialReduction: number
  investmentRequired: number
  riskLevel: 'High' | 'Medium' | 'Low'
  roi: number
  decarbonizationPotential: 'High' | 'Medium' | 'Low'
}

type TransactionStatus = 'In Progress' | 'Awaiting Approval' | 'Completed'

type StepSixProps = {
  formData: any
  updateFormData: (data: any) => void
}

// Mock data for the assets (reused from previous steps)
const mockAssets: Asset[] = [
  {
    id: 1,
    name: "Kreuzberg Residential Complex",
    currentEmissions: 150,
    potentialReduction: 75,
    investmentRequired: 500000,
    riskLevel: 'Medium',
    roi: 7.8,
    decarbonizationPotential: 'High'
  },
  {
    id: 2,
    name: "Prenzlauer Berg Apartments",
    currentEmissions: 200,
    potentialReduction: 80,
    investmentRequired: 750000,
    riskLevel: 'Low',
    roi: 8.9,
    decarbonizationPotential: 'Medium'
  }
]

export function StepSix({ formData, updateFormData }: StepSixProps) {
  const router = useRouter()
  const [assets] = useState<Asset[]>(mockAssets)
  const [status, setStatus] = useState<TransactionStatus>('In Progress')
  const [selectedAssetForDialog, setSelectedAssetForDialog] = useState<number | null>(null)

  const totalInvestment = assets.reduce((sum, asset) => sum + asset.investmentRequired, 0)
  const averageROI = assets.reduce((sum, asset) => sum + asset.roi, 0) / assets.length
  const totalCarbonReduction = assets.reduce((sum, asset) => sum + asset.potentialReduction, 0)

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'In Progress':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'Awaiting Approval':
        return <AlertCircle className="h-5 w-5 text-blue-500" />
    }
  }

  const handleFinalize = () => {
    setStatus('Completed')
    updateFormData({
      ...formData,
      status: 'completed'
    })
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push('/')
    }, 500)
  }

  const handleGenerateReport = () => {
    // Mock function for generating report
    console.log('Generating transaction report...')
  }

  return (
    <div className="space-y-6">
      <TransactionInfoBar step={6} formData={formData} />
      
      {/* Transaction Status */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center mt-2 space-x-2">
                  {getStatusIcon(status)}
                  <span className={`font-medium ${
                    status === 'Completed' ? 'text-green-600' :
                    status === 'In Progress' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`}>
                    {status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" onClick={handleGenerateReport}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Summary
                </Button>
              </div>
            </div>

            {/* Transaction Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-muted rounded-lg">
                <Label>Total Investment</Label>
                <p className="text-2xl font-bold mt-2">
                  €{(totalInvestment / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Label>Average ROI</Label>
                <p className="text-2xl font-bold mt-2">
                  {averageROI.toFixed(1)}%
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <Label>Carbon Reduction</Label>
                <p className="text-2xl font-bold mt-2">
                  {totalCarbonReduction} tons/year
                </p>
              </div>
            </div>

            {/* Asset Summary Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Investment</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>Carbon Reduction</TableHead>
                  <TableHead>Risk Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">
                      <button
                        onClick={() => setSelectedAssetForDialog(asset.id)}
                        className="text-blue-600 hover:underline"
                      >
                        {asset.name}
                      </button>
                    </TableCell>
                    <TableCell>€{asset.investmentRequired.toLocaleString()}</TableCell>
                    <TableCell>{asset.roi}%</TableCell>
                    <TableCell>{asset.potentialReduction} tons/year</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-sm ${
                        asset.riskLevel === 'Low' 
                          ? 'bg-green-100 text-green-800' 
                          : asset.riskLevel === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {asset.riskLevel}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Asset Details Dialog */}
      <AssetDetailsDialog
        isOpen={selectedAssetForDialog !== null}
        onClose={() => setSelectedAssetForDialog(null)}
        assetId={selectedAssetForDialog || 0}
      />

      {/* Finalize Transaction */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="lg" className="w-full">
            Finalize Transaction
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Finalize Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to finalize this transaction? This action cannot be undone.
              All stakeholders will be notified and the transaction will be marked as completed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinalize}>
              Confirm Finalization
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 