'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepOne } from './steps/step-one'
import { StepTwo } from './steps/step-two'
import { StepThree } from './steps/step-three'
import { StepFour } from './steps/step-four'
import { StepFive } from './steps/step-five'
import { StepSix } from './steps/step-six'

type Step = {
  id: number
  title: string
  description: string
}

const steps: Step[] = [
  {
    id: 1,
    title: "Initiate Transaction",
    description: "Define transaction type and details"
  },
  {
    id: 2,
    title: "Select Assets",
    description: "Add and screen assets"
  },
  {
    id: 3,
    title: "Due Diligence",
    description: "Manage documents and performance data"
  },
  {
    id: 4,
    title: "Risk Assessment",
    description: "Evaluate risks and ROI"
  },
  {
    id: 5,
    title: "Transaction Details",
    description: "Confirm final details"
  },
  {
    id: 6,
    title: "Close Transaction",
    description: "Review and finalize"
  }
]

export default function TransactionForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Transaction Initiation
    transactionType: '',
    template: '',
    transactionName: '',
    budget: '',
    transactionDate: '',
    
    // Step 2: Asset Screening
    region: '',
    assetType: '',
    targetBudget: '',
    performanceCriteria: {},
    selectedAssets: [],
    
    // Step 3: Due Diligence
    documents: [],
    tasks: [],
    
    // Step 4: Risk Assessment
    riskIndicators: {},
    decarbonizationPotential: '',
    roiEstimate: '',
    
    // Step 5: Transaction Details
    paymentMethod: '',
    closingDate: '',
    stakeholders: [],
    
    // Step 6: Closing
    status: 'draft'
  })

  const updateFormData = (newData: any) => {
    setFormData(newData)
  }

  const handleNavigation = () => {
    if (currentStep === 6) {
      // Update form data and redirect to dashboard
      updateFormData({
        ...formData,
        status: 'completed'
      })
      setTimeout(() => {
        router.push('/')
      }, 500)
    } else {
      setCurrentStep(prev => Math.min(6, prev + 1))
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne formData={formData} updateFormData={updateFormData} />
      case 2:
        return <StepTwo formData={formData} updateFormData={updateFormData} />
      case 3:
        return <StepThree formData={formData} updateFormData={updateFormData} />
      case 4:
        return <StepFour formData={formData} updateFormData={updateFormData} />
      case 5:
        return <StepFive formData={formData} updateFormData={updateFormData} />
      case 6:
        return <StepSix formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div 
              key={step.id}
              className={`flex flex-col items-center ${
                step.id === currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step.id === currentStep ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'
              }`}>
                {step.id}
              </div>
              <div className="text-sm mt-2">{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{steps[currentStep - 1].title}</h2>
        <p className="text-gray-600 mb-6">{steps[currentStep - 1].description}</p>
        
        {renderStep()}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNavigation}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {currentStep === 6 ? 'Save' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
} 