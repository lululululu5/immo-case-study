'use client'

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  FileDown,
  Link as LinkIcon,
  FileText,
  Building2,
  DoorOpen,
  Home,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AssetUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onAssetAdd: (asset: any) => void
}

// Add type for asset preview
type AssetPreview = {
  id: number
  name: string
  location: string
  type: string
  decarbonization: string
  decarbonization_score: number
  portfolio_value: number
  roi: number
  liquidity_rating: string
  source: string
  matching_score: number
}

export function AssetUploadDialog({
  isOpen,
  onClose,
  onAssetAdd
}: AssetUploadDialogProps) {
  const [selectedTab, setSelectedTab] = useState("structure")
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [propertyUrl, setPropertyUrl] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewAssets, setPreviewAssets] = useState<AssetPreview[]>([])
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(true)

  // Mock preview asset
  const mockPreviewAsset: AssetPreview = {
    id: 1,
    name: "Kreuzberg Residential Complex",
    location: "Berlin, Germany",
    type: "Multi Family Home",
    decarbonization: "High",
    decarbonization_score: 85.5,
    portfolio_value: 2500000,
    roi: 9.2,
    liquidity_rating: "high",
    source: "Upload",
    matching_score: 89
  }

  const handleDownloadTemplate = () => {
    // Mock function - in real implementation would download a CSV template
    console.log("Downloading template...")
  }

  const handleUrlSubmit = () => {
    setUploadStatus('processing')
    setTimeout(() => {
      setUploadStatus('success')
      setPreviewAssets([mockPreviewAsset])
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadStatus('processing')
      setTimeout(() => {
        setUploadStatus('success')
        setPreviewAssets([mockPreviewAsset])
      }, 2000)
    }
  }

  const handleAddAssets = () => {
    // Create a new mock asset with manual source
    const newAsset = {
      id: Date.now(), // Use timestamp as unique ID
      name: "Moabit Apartments",
      location: "Berlin, Germany",
      type: "Multi Family Home",
      decarbonization: "Medium",
      decarbonization_score: 75.5,
      portfolio_value: 2100000,
      roi: 8.7,
      liquidity_rating: "medium",
      source: "Manual",
      matching_score: 82
    }
    onAssetAdd(newAsset)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto fixed z-[200]">
        <DialogHeader>
          <DialogTitle>Upload Asset</DialogTitle>
          <DialogDescription>
            Add a new asset to your portfolio by providing the required information
          </DialogDescription>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="template">Template</TabsTrigger>
            <TabsTrigger value="url">URL Import</TabsTrigger>
            <TabsTrigger value="pdf">PDF Upload</TabsTrigger>
          </TabsList>

          {/* Data Structure Tab */}
          <TabsContent value="structure">
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Data Structure Requirements</AlertTitle>
                <AlertDescription>
                  Please ensure your data follows this hierarchical structure for successful import
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      Asset Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Field</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Required</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Name or identifier of the asset</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Portfolio Value</TableCell>
                          <TableCell>Decimal</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Total value of the asset in euros</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Decarbonization Score</TableCell>
                          <TableCell>Decimal</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Environmental rating (0-100)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Performance Metrics</TableCell>
                          <TableCell>Object</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            Contains: Current Occupancy Rate (%), Average Lease Term (years), Operating Expenses (€), Net Operating Income (€)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Future Potential</TableCell>
                          <TableCell>Object</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            Contains: Estimated Value Increase (%), Renovation Potential Assessment, Market Outlook Analysis
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Liquidity Rating</TableCell>
                          <TableCell>Enum</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>One of: low, medium, high</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Building Level
                    </CardTitle>
                    <CardDescription>Information about individual buildings within the asset</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Field</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Required</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Name or identifier of the building</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell>Enum</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Building type: Residential or Commercial</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Construction Year</TableCell>
                          <TableCell>Integer</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Year the building was constructed</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Energy Efficiency Rating</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Energy rating (A-G)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Sustainability Certification</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>No</TableCell>
                          <TableCell>e.g., LEED, DGNB certification level</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Historical Performance</TableCell>
                          <TableCell>Object</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            Contains: Last Year Income (€), Maintenance History (list of events), Occupancy Trend (% over time)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Maintenance Cost</TableCell>
                          <TableCell>Decimal</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Annual maintenance costs in euros</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Tenancy Mix</TableCell>
                          <TableCell>Object</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            Contains: Number of Residential Units, Number of Commercial Units, Average Lease Term (years)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Cap Rate</TableCell>
                          <TableCell>Decimal</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Capitalization rate as percentage</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Vacancy Rate</TableCell>
                          <TableCell>Decimal</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Current vacancy rate as percentage</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Location</TableCell>
                          <TableCell>Object</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            Contains: Address, City, Postal Code, Geographic Coordinates, Market Trends, Walkability Score, Transportation Access, Crime Rate Level
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DoorOpen className="h-5 w-5" />
                      Estate Level
                    </CardTitle>
                    <CardDescription>Details about individual units within buildings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Field</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Required</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Unit Number</TableCell>
                          <TableCell>String</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Unique identifier for the unit within the building</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell>Enum</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Unit type: Apartment or Commercial</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Size</TableCell>
                          <TableCell>Decimal</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Unit size in square meters</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Current Rent</TableCell>
                          <TableCell>Decimal</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Monthly rent in euros</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Occupancy Status</TableCell>
                          <TableCell>Enum</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Either 'occupied' or 'vacant'</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Tenant Profile</TableCell>
                          <TableCell>Object</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            Contains: Tenant Type, Lease Start Date, Lease Duration, Tenant History, Payment Records, Special Requirements
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Lease Terms</TableCell>
                          <TableCell>Object</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>
                            Contains: Monthly Rent (€), Security Deposit (€), Payment Terms, Lease Dates, Renewal Options, Included Utilities, Special Conditions
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Turnover Costs</TableCell>
                          <TableCell>Decimal</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Estimated costs for unit turnover and preparation for new tenants (€)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Unit Condition</TableCell>
                          <TableCell>Enum</TableCell>
                          <TableCell>Yes</TableCell>
                          <TableCell>Current condition: Excellent, Good, or Needs Repair</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Template Tab */}
          <TabsContent value="template">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Download Template</CardTitle>
                  <CardDescription>
                    Use our template to ensure your data is formatted correctly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleDownloadTemplate} className="w-full">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload CSV</CardTitle>
                  <CardDescription>
                    Upload your filled CSV template
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="csvUpload">CSV File</Label>
                    <Input
                      id="csvUpload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                    />
                  </div>
                  {uploadStatus === 'processing' && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Processing</AlertTitle>
                      <AlertDescription>
                        Validating and processing CSV data...
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* URL Import Tab */}
          <TabsContent value="url">
            <Card>
              <CardHeader>
                <CardTitle>Import from URL</CardTitle>
                <CardDescription>
                  Provide a link to the property listing and we'll extract the information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyUrl">Property URL</Label>
                  <Input
                    id="propertyUrl"
                    placeholder="https://example.com/property-listing"
                    value={propertyUrl}
                    onChange={(e) => setPropertyUrl(e.target.value)}
                  />
                </div>
                {uploadStatus === 'processing' && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Processing</AlertTitle>
                    <AlertDescription>
                      Extracting information from the provided URL...
                    </AlertDescription>
                  </Alert>
                )}
                {uploadStatus === 'success' && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Asset information successfully extracted and added
                    </AlertDescription>
                  </Alert>
                )}
                <Button 
                  onClick={handleUrlSubmit} 
                  disabled={!propertyUrl || uploadStatus === 'processing'}
                  className="w-full"
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Import from URL
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PDF Upload Tab */}
          <TabsContent value="pdf">
            <Card>
              <CardHeader>
                <CardTitle>Upload PDF</CardTitle>
                <CardDescription>
                  Upload a PDF document containing property information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pdfUpload">PDF Document</Label>
                  <Input
                    id="pdfUpload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                  />
                </div>
                {uploadStatus === 'processing' && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Processing</AlertTitle>
                    <AlertDescription>
                      Extracting information from the PDF...
                    </AlertDescription>
                  </Alert>
                )}
                {uploadStatus === 'success' && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>
                      Asset information successfully extracted and added
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Collapsible Preview Card */}
        <div className="sticky bottom-0 bg-background border-t mt-4">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Preview Assets</h3>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                  {previewAssets.length || 1} Assets
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                className="text-muted-foreground"
              >
                {isPreviewExpanded ? 'Collapse' : 'Expand'}
              </Button>
            </div>

            {isPreviewExpanded && (
              <div className="bg-background rounded-lg border p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Portfolio Value</TableHead>
                      <TableHead>ROI</TableHead>
                      <TableHead>Decarbonization</TableHead>
                      <TableHead>Liquidity</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Matching Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(previewAssets.length ? previewAssets : [mockPreviewAsset]).map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium">{asset.name}</TableCell>
                        <TableCell>{asset.location}</TableCell>
                        <TableCell>{asset.type}</TableCell>
                        <TableCell>€{asset.portfolio_value.toLocaleString()}</TableCell>
                        <TableCell>{asset.roi}%</TableCell>
                        <TableCell>{asset.decarbonization}</TableCell>
                        <TableCell>{asset.liquidity_rating.charAt(0).toUpperCase() + asset.liquidity_rating.slice(1)}</TableCell>
                        <TableCell>{asset.source}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-sm ${
                            asset.matching_score >= 85 
                              ? 'bg-green-100 text-green-800' 
                              : asset.matching_score >= 70
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {asset.matching_score}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddAssets}
                    disabled={uploadStatus === 'processing'}
                  >
                    Add Assets to Portfolio
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 