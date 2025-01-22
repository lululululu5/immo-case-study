'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  FileIcon, 
  Trash2Icon, 
  PencilIcon, 
  EyeIcon, 
  DownloadIcon,
  BellIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ClockIcon
} from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

type Document = {
  id: string
  name: string
  type: string
  uploadDate: string
  size: number
  taskId?: string
  downloadUrl?: string
}

type Task = {
  name: string
  status: string
  assignedTo: string
  dueDate: string | null
  id: string
}

type Asset = {
  id: number
  name: string
  documents: Document[]
  tasks: Task[]
}

type StepThreeProps = {
  formData: any
  updateFormData: (data: any) => void
}

const documentTypes = ["Legal", "Financial", "Technical"]
const taskStatuses = ["Not Started", "In Progress", "Completed"]
const defaultTasks = [
  { name: "Legal review", status: "Not Started", assignedTo: "", dueDate: null },
  { name: "Environmental and sustainability review", status: "Not Started", assignedTo: "", dueDate: null },
  { name: "Financials review", status: "Not Started", assignedTo: "", dueDate: null }
]

// Mock data for selected assets with one completed example
const selectedAssets: Asset[] = [
  {
    id: 1,
    name: "Kreuzberg Residential Complex",
    documents: [
      {
        id: "doc1",
        name: "Legal Due Diligence Report.pdf",
        type: "Legal",
        uploadDate: "2024-03-15T10:00:00Z",
        size: 2500000,
        taskId: "legal-review",
        downloadUrl: "/mock-files/legal-report.pdf"
      }
    ],
    tasks: [
      { 
        id: "legal-review",
        name: "Legal review", 
        status: "Completed", 
        assignedTo: "john.doe@example.com", 
        dueDate: "2024-03-15T00:00:00Z" 
      },
      { 
        id: "environmental-review",
        name: "Environmental and sustainability review", 
        status: "In Progress", 
        assignedTo: "emma.smith@example.com", 
        dueDate: "2024-03-20T00:00:00Z" 
      },
      { 
        id: "financial-review",
        name: "Financials review", 
        status: "Not Started", 
        assignedTo: "", 
        dueDate: null 
      }
    ]
  },
  {
    id: 2,
    name: "Prenzlauer Berg Apartments",
    documents: [],
    tasks: [
      { 
        id: "legal-review-2",
        name: "Legal review", 
        status: "Not Started", 
        assignedTo: "", 
        dueDate: null 
      },
      { 
        id: "environmental-review-2",
        name: "Environmental and sustainability review", 
        status: "Not Started", 
        assignedTo: "", 
        dueDate: null 
      },
      { 
        id: "financial-review-2",
        name: "Financials review", 
        status: "Not Started", 
        assignedTo: "", 
        dueDate: null 
      }
    ]
  }
]

export function StepThree({ formData, updateFormData }: StepThreeProps) {
  const [assets, setAssets] = useState<Asset[]>(selectedAssets)
  const [selectedTask, setSelectedTask] = useState<string>("")
  const { toast } = useToast()
  const calculateProgress = (asset: Asset) => {
    const completed = asset.tasks.filter(task => task.status === 'Completed').length
    return (completed / asset.tasks.length) * 100
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />
      case 'In Progress':
        return <ClockIcon className="h-4 w-4 text-yellow-600" />
      case 'Not Started':
        return <AlertCircleIcon className="h-4 w-4 text-gray-400" />
      default:
        return null
    }
  }

  const handleFileUpload = (assetId: number, files: FileList | null) => {
    if (!files || !selectedTask) return

    const newDocuments: Document[] = Array.from(files).map(file => ({
      id: Math.random().toString(),
      name: file.name,
      type: documentTypes[0],
      uploadDate: new Date().toISOString(),
      size: file.size,
      taskId: selectedTask
    }))

    setAssets(prevAssets => prevAssets.map(asset => 
      asset.id === assetId 
        ? { ...asset, documents: [...asset.documents, ...newDocuments] }
        : asset
    ))

    // Update task status to In Progress if it was Not Started
    setAssets(prevAssets => prevAssets.map(asset => 
      asset.id === assetId 
        ? {
            ...asset,
            tasks: asset.tasks.map(task => 
              task.id === selectedTask && task.status === 'Not Started'
                ? { ...task, status: 'In Progress' }
                : task
            )
          }
        : asset
    ))
  }

  const handleSendReminder = (email: string, taskName: string) => {
    toast({
      title: "Reminder Sent",
      description: `Email sent to ${email} for task: ${taskName}`,
    })
  }

  const handleDownload = (doc: Document) => {
    if (doc.downloadUrl) {
      // In a real app, this would trigger a file download
      toast({
        title: "Downloading Document",
        description: `Downloading ${doc.name}`,
      })
    }
  }

  const handleTaskUpdate = (assetId: number, taskIndex: number, field: keyof Task, value: string) => {
    setAssets(prevAssets => prevAssets.map(asset => 
      asset.id === assetId 
        ? {
            ...asset,
            tasks: asset.tasks.map((task, idx) => 
              idx === taskIndex ? { ...task, [field]: value } : task
            )
          }
        : asset
    ))
  }

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full">
        {assets.map(asset => {
          const progress = calculateProgress(asset)
          
          return (
            <AccordionItem key={asset.id} value={asset.id.toString()}>
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center space-x-4">
                    <span>{asset.name}</span>
                    <div className="flex items-center space-x-2">
                      {asset.tasks.map(task => (
                        <span key={task.id} title={task.name}>
                          {getStatusIcon(task.status)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Progress value={progress} className="w-[100px]" />
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="space-y-6 pt-4">
                {/* Document Upload Dialog */}
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Upload Document</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload Due Diligence Document</DialogTitle>
                        <DialogDescription>
                          Select the related task and upload your document
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Related Task</Label>
                          <Select onValueChange={setSelectedTask} value={selectedTask}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a task" />
                            </SelectTrigger>
                            <SelectContent>
                              {asset.tasks.map(task => (
                                <SelectItem key={task.id} value={task.id}>
                                  {task.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div 
                          className="border-2 border-dashed rounded-lg p-6 text-center"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault()
                            handleFileUpload(asset.id, e.dataTransfer.files)
                          }}
                        >
                          <Input
                            type="file"
                            multiple
                            className="hidden"
                            id={`file-upload-${asset.id}`}
                            onChange={(e) => handleFileUpload(asset.id, e.target.files)}
                          />
                          <Label
                            htmlFor={`file-upload-${asset.id}`}
                            className="cursor-pointer text-blue-600 hover:text-blue-800"
                          >
                            Drop files here or click to upload
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">
                            Supported files: PDF, DOC, DOCX, XLS, XLSX
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Document List */}
                {asset.documents.length > 0 && (
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Related Task</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {asset.documents.map(doc => (
                        <TableRow key={doc.id}>
                          <TableCell className="flex items-center">
                            <FileIcon className="h-4 w-4 mr-2" />
                            {doc.name}
                          </TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>
                            {asset.tasks.find(task => task.id === doc.taskId)?.name}
                          </TableCell>
                          <TableCell>{format(new Date(doc.uploadDate), 'PP')}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDownload(doc)}
                              >
                                <DownloadIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2Icon className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}

                {/* Tasks Section */}
                <div>
                  <Label className="mb-2 block">Due Diligence Tasks</Label>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {asset.tasks.map((task, index) => (
                        <TableRow key={task.id}>
                          <TableCell className="flex items-center">
                            {getStatusIcon(task.status)}
                            <span className="ml-2">{task.name}</span>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={task.status}
                              onValueChange={(value) => 
                                handleTaskUpdate(asset.id, index, 'status', value)
                              }
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {taskStatuses.map(status => (
                                  <SelectItem 
                                    key={status} 
                                    value={status}
                                    className={cn(
                                      status === 'Completed' && 'text-green-600',
                                      status === 'In Progress' && 'text-yellow-600',
                                      status === 'Not Started' && 'text-gray-600'
                                    )}
                                  >
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="flex items-center space-x-2">
                            <Input
                              type="email"
                              placeholder="Assign to email"
                              value={task.assignedTo}
                              onChange={(e) => 
                                handleTaskUpdate(asset.id, index, 'assignedTo', e.target.value)
                              }
                            />
                            {task.assignedTo && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleSendReminder(task.assignedTo, task.name)}
                              >
                                <BellIcon className="h-4 w-4" />
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-[140px] justify-start text-left font-normal">
                                  {task.dueDate ? format(new Date(task.dueDate), 'PP') : 'Set date'}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={task.dueDate ? new Date(task.dueDate) : undefined}
                                  onSelect={(date) => 
                                    handleTaskUpdate(asset.id, index, 'dueDate', date?.toISOString() || '')
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </TableCell>
                          <TableCell>
                            {task.status !== 'Completed' && (
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSelectedTask(task.id)
                                  document.getElementById(`file-upload-${asset.id}`)?.click()
                                }}
                              >
                                Upload Document
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}