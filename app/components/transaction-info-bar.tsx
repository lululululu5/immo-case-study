'use client'

import { format } from "date-fns"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface TransactionInfoBarProps {
  step: number
  formData: any
}

interface StepData {
  type: string
  status: string
  dateInitiated: string
  dateClosed: string
  budget: string
  totalValue: string
  expectedROI: string
  transactionRisk: string
  strategicGoal: string
  marketConditions: string
  dueDiligenceStatus?: string
  documentCount?: string
  complianceStatus?: string
  riskFactors?: string
  sustainabilityScore?: string
  approvalStatus?: string
  stakeholderCount?: string
  nextApprover?: string
  completionProgress?: string
  closingDate?: string
}

export function TransactionInfoBar({ step, formData }: TransactionInfoBarProps) {
  // Mock data that builds up progressively
  const mockData = {
    // Step 1 data - matches the form fields from step-one.tsx
    step1: {
      type: formData.transactionType || 'Not set',
      status: 'Pending',
      dateInitiated: formData.transactionDate ? format(new Date(formData.transactionDate), 'PP') : 'Not set',
      dateClosed: 'Not available',
      budget: formData.budget ? `€${parseInt(formData.budget).toLocaleString()}` : 'Not set',
      totalValue: 'Not available',
      expectedROI: 'Not available',
      transactionRisk: 'Not available',
      strategicGoal: formData.strategic_goal_alignment || 'Not set',
      marketConditions: 'Not available'
    },
    // Step 2 data - calculated from selected assets in step-two.tsx
    step2: {
      totalValue: formData.selectedAssets?.length > 0 
        ? `€${formData.selectedAssets.reduce((sum: number, asset: any) => sum + asset.portfolio_value, 0).toLocaleString()}`
        : 'Not set',
      expectedROI: formData.selectedAssets?.length > 0
        ? `${(formData.selectedAssets.reduce((sum: number, asset: any) => sum + asset.roi, 0) / formData.selectedAssets.length).toFixed(1)}%`
        : 'Not set',
      assetCount: formData.selectedAssets?.length || 0,
      transactionRisk: formData.selectedAssets?.length > 0 ? 'Medium' : 'Not available',
      marketConditions: formData.region ? `Focus on ${formData.region} market` : 'Not available'
    },
    // Step 3 adds due diligence status
    step3: {
      dueDiligenceStatus: '35% Complete',
      documentCount: '12',
      complianceStatus: 'In Progress'
    },
    // Step 4 adds risk assessment
    step4: {
      transactionRisk: 'Medium',
      riskFactors: 'Market Volatility, Location Risk',
      sustainabilityScore: '78/100'
    },
    // Step 5 adds stakeholder info
    step5: {
      approvalStatus: 'Pending',
      stakeholderCount: '5',
      nextApprover: 'Investment Committee'
    },
    // Step 6 adds final status
    step6: {
      status: 'Ready for Closing',
      completionProgress: '95%',
      closingDate: format(new Date(), 'PP')
    }
  }

  // Function to get current step data
  const getCurrentData = () => {
    let data = { ...mockData.step1 } as StepData
    if (step >= 2) {
      // For step 2 and above, we want to override some step1 values with step2 values
      data = { 
        ...data, 
        ...mockData.step2,
        // Keep the original type and dateInitiated from step1
        type: mockData.step1.type,
        dateInitiated: mockData.step1.dateInitiated,
        budget: mockData.step1.budget,
        strategicGoal: mockData.step1.strategicGoal
      }
    }
    if (step >= 3) data = { ...data, ...mockData.step3 }
    if (step >= 4) data = { ...data, ...mockData.step4 }
    if (step >= 5) data = { ...data, ...mockData.step5 }
    if (step >= 6) data = { ...data, ...mockData.step6 }
    return data
  }

  const currentData = getCurrentData()

  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline">
          <h3 className="text-lg font-semibold">Transaction Information</h3>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-4 text-sm pt-2">
            {/* Basic Information */}
            <div>
              <span className="text-muted-foreground">Type:</span>
              <span className="ml-2 font-medium">{currentData.type}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <span className="ml-2 font-medium">{currentData.status}</span>
            </div>
            
            {/* Dates */}
            <div>
              <span className="text-muted-foreground">Date Initiated:</span>
              <span className="ml-2 font-medium">{currentData.dateInitiated}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Date Closed:</span>
              <span className="ml-2 font-medium text-muted-foreground">{currentData.dateClosed}</span>
            </div>
            
            {/* Financial Information */}
            <div>
              <span className="text-muted-foreground">Budget:</span>
              <span className="ml-2 font-medium">{currentData.budget}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Total Value:</span>
              <span className="ml-2 font-medium">{currentData.totalValue}</span>
            </div>
            
            {/* Risk and Returns */}
            <div>
              <span className="text-muted-foreground">Expected ROI:</span>
              <span className="ml-2 font-medium">{currentData.expectedROI}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Transaction Risk:</span>
              <span className="ml-2 font-medium">{currentData.transactionRisk}</span>
            </div>

            {step >= 3 && (
              <>
                <div>
                  <span className="text-muted-foreground">Due Diligence:</span>
                  <span className="ml-2 font-medium">{currentData.dueDiligenceStatus}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Documents:</span>
                  <span className="ml-2 font-medium">{currentData.documentCount}</span>
                </div>
              </>
            )}

            {step >= 4 && (
              <>
                <div>
                  <span className="text-muted-foreground">Risk Factors:</span>
                  <span className="ml-2 font-medium">{currentData.riskFactors}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Sustainability:</span>
                  <span className="ml-2 font-medium">{currentData.sustainabilityScore}</span>
                </div>
              </>
            )}

            {step >= 5 && (
              <>
                <div>
                  <span className="text-muted-foreground">Approval Status:</span>
                  <span className="ml-2 font-medium">{currentData.approvalStatus}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Next Approver:</span>
                  <span className="ml-2 font-medium">{currentData.nextApprover}</span>
                </div>
              </>
            )}
            
            {/* Strategic Information */}
            <div className="col-span-2">
              <span className="text-muted-foreground">Strategic Goal:</span>
              <span className="ml-2 font-medium">{currentData.strategicGoal}</span>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Market Conditions:</span>
              <span className="ml-2 font-medium text-muted-foreground">{currentData.marketConditions}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
} 