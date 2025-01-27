// app/components/estate-details-dialog.tsx
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, ChevronRight, Building2, DoorOpen, Users, Calendar, Euro } from "lucide-react"
import Image from "next/image"

type TenantProfile = {
  tenant_type: string
  lease_start: string
  lease_duration: number
  tenant_history: string[]
  payment_history: {
    on_time_payments: number
    late_payments: number
    total_payments: number
  }
  special_requirements: string[]
}

type LeaseTerms = {
  monthly_rent: number
  security_deposit: number
  payment_terms: string
  lease_start_date: string
  lease_end_date: string
  renewal_options: string
  included_utilities: string[]
  special_conditions: string[]
}

type Estate = {
  id: string
  unit_number: string
  type: 'apartment' | 'commercial'
  size: number
  current_rent: number
  occupancy_status: 'occupied' | 'vacant'
  tenant_profile: TenantProfile
  lease_terms: LeaseTerms
  turnover_costs: number
  unit_condition: 'excellent' | 'good' | 'needs repair'
  name: string
  image: string
}

// Mock data for a single estate
const mockEstateData: Estate = {
  id: "e1",
  unit_number: "101",
  type: "apartment",
  size: 85.5,
  current_rent: 1450,
  occupancy_status: "occupied",
  tenant_profile: {
    tenant_type: "Family",
    lease_start: "2022-06-01",
    lease_duration: 24,
    tenant_history: [
      "Previous 2-year lease completed successfully",
      "No major incidents reported",
      "Regular maintenance requests handled promptly"
    ],
    payment_history: {
      on_time_payments: 22,
      late_payments: 1,
      total_payments: 23
    },
    special_requirements: [
      "Pet-friendly accommodation",
      "Additional storage space"
    ]
  },
  lease_terms: {
    monthly_rent: 1450,
    security_deposit: 4350,
    payment_terms: "Due by 3rd of each month",
    lease_start_date: "2022-06-01",
    lease_end_date: "2024-05-31",
    renewal_options: "Option to renew for 2 years with 3% increase",
    included_utilities: [
      "Water",
      "Building maintenance",
      "Garbage collection"
    ],
    special_conditions: [
      "No short-term subletting",
      "Annual property inspection required"
    ]
  },
  turnover_costs: 2800,
  unit_condition: "excellent",
  name: "Estate A",
  image: "/mfh_estate_interior.jpg"
}

interface EstateDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  estateId: string
}

export function EstateDetailsDialog({
  isOpen,
  onClose,
  estateId
}: EstateDetailsDialogProps) {
  // In a real application, we would fetch the estate data based on the estateId
  const estate = mockEstateData

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-green-100 text-green-800'
      case 'good':
        return 'bg-blue-100 text-blue-800'
      case 'needs repair':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getOccupancyColor = (status: string) => {
    return status === 'occupied' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto fixed z-[120]">
        <DialogHeader>
          <div className="flex items-center text-sm text-muted-foreground">
            <Home className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
            <span>Transaction</span>
            <ChevronRight className="h-4 w-4" />
            <span>Asset</span>
            <ChevronRight className="h-4 w-4" />
            <span>Building</span>
            <ChevronRight className="h-4 w-4" />
            <span>Unit {estate.unit_number}</span>
          </div>
          <DialogTitle className="text-xl font-semibold pt-2">
            Unit {estate.unit_number} - {estate.type.charAt(0).toUpperCase() + estate.type.slice(1)}
          </DialogTitle>
        </DialogHeader>

        {/* Add image at the top */}
        <div className="relative w-full h-[300px] mb-6">
          <Image
            src={estate.image}
            alt={estate.name}
            fill
            quality={100}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{estate.size} m²</div>
                <p className="text-sm text-muted-foreground">Unit Size</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">€{estate.current_rent.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Current Rent</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Badge className={getOccupancyColor(estate.occupancy_status)}>
                  {estate.occupancy_status.charAt(0).toUpperCase() + estate.occupancy_status.slice(1)}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">Status</p>
              </CardContent>
            </Card>
          </div>

          {/* Unit Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DoorOpen className="h-5 w-5" />
                Unit Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Unit Type</p>
                  <p className="text-lg font-semibold capitalize">{estate.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Unit Condition</p>
                  <Badge className={getConditionColor(estate.unit_condition)}>
                    {estate.unit_condition.charAt(0).toUpperCase() + estate.unit_condition.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Turnover Costs</p>
                  <p className="text-lg font-semibold">€{estate.turnover_costs.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price per m²</p>
                  <p className="text-lg font-semibold">
                    €{(estate.current_rent / estate.size).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tenant Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Tenant Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tenant Type</p>
                    <p className="text-lg font-semibold">{estate.tenant_profile.tenant_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lease Duration</p>
                    <p className="text-lg font-semibold">{estate.tenant_profile.lease_duration} months</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Payment History</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-lg font-semibold text-green-700">
                        {estate.tenant_profile.payment_history.on_time_payments}
                      </p>
                      <p className="text-sm text-green-600">On Time</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-lg font-semibold text-red-700">
                        {estate.tenant_profile.payment_history.late_payments}
                      </p>
                      <p className="text-sm text-red-600">Late</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-lg font-semibold text-gray-700">
                        {estate.tenant_profile.payment_history.total_payments}
                      </p>
                      <p className="text-sm text-gray-600">Total</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Tenant History</p>
                  <ul className="space-y-2">
                    {estate.tenant_profile.tenant_history.map((history, index) => (
                      <li key={index} className="text-sm">• {history}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lease Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Lease Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Rent</p>
                    <p className="text-lg font-semibold">€{estate.lease_terms.monthly_rent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Security Deposit</p>
                    <p className="text-lg font-semibold">€{estate.lease_terms.security_deposit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lease Start</p>
                    <p className="text-lg font-semibold">{estate.lease_terms.lease_start_date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Lease End</p>
                    <p className="text-lg font-semibold">{estate.lease_terms.lease_end_date}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Included Utilities</p>
                  <div className="flex flex-wrap gap-2">
                    {estate.lease_terms.included_utilities.map((utility, index) => (
                      <Badge key={index} variant="secondary">{utility}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Special Conditions</p>
                  <ul className="space-y-2">
                    {estate.lease_terms.special_conditions.map((condition, index) => (
                      <li key={index} className="text-sm">• {condition}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Renewal Options</p>
                  <p className="text-lg">{estate.lease_terms.renewal_options}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}