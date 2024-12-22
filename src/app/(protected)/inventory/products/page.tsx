'use client'

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, MoreVertical, ArrowUpDown, Clock, CheckCircle2, AlertCircle, Circle } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

interface Task {
  id: string
  type: 'Documentation' | 'Bug' | 'Feature'
  title: string
  status: 'In Progress' | 'Backlog' | 'Todo' | 'Done' | 'Canceled'
  priority: 'Low' | 'Medium' | 'High'
}

const tasks: Task[] = [
  {
    id: "TASK-8782",
    type: "Documentation",
    title: "You can't compress the program without quantifying the open-source SSD...",
    status: "In Progress",
    priority: "Medium"
  },
  {
    id: "TASK-7878",
    type: "Documentation",
    title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "Backlog",
    priority: "Medium"
  },
  {
    id: "TASK-7839",
    type: "Bug",
    title: "We need to bypass the neural TCP card!",
    status: "Todo",
    priority: "High"
  },
  {
    id: "TASK-5562",
    type: "Feature",
    title: "The SAS interface is down, bypass the open-source pixel so we can back ...",
    status: "Backlog",
    priority: "Medium"
  },
  {
    id: "TASK-8686",
    type: "Feature",
    title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: "Canceled",
    priority: "Medium"
  },
  {
    id: "TASK-1280",
    type: "Bug",
    title: "Use the digital TLS panel, then you can transmit the haptic system!",
    status: "Done",
    priority: "High"
  },
  {
    id: "TASK-7262",
    type: "Feature",
    title: "The UTF8 application is down, parse the neural bandwidth so we can back...",
    status: "Done",
    priority: "High"
  },
  {
    id: "TASK-1138",
    type: "Feature",
    title: "Generating the driver won't do anything, we need to quantify the 1080p S...",
    status: "In Progress",
    priority: "Medium"
  },
  {
    id: "TASK-7184",
    type: "Feature",
    title: "We need to program the back-end THX pixel!",
    status: "Todo",
    priority: "Low"
  },
  {
    id: "TASK-5160",
    type: "Documentation",
    title: "Calculating the bus won't do anything, we need to navigate the back-end ...",
    status: "In Progress",
    priority: "High"
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Done': return <CheckCircle2 className="w-4 h-4 text-zinc-500" />;
    case 'In Progress': return <Clock className="w-4 h-4 text-zinc-500" />;
    case 'Todo': return <Circle className="w-4 h-4 text-zinc-500" />;
    case 'Backlog': return <AlertCircle className="w-4 h-4 text-zinc-500" />;
    case 'Canceled': return <AlertCircle className="w-4 h-4 text-zinc-500" />;
    default: return <Circle className="w-4 h-4 text-zinc-500" />;
  }
};

export default function TaskDashboard() {
  const [statusFilter, setStatusFilter] = React.useState<string[]>([])
  const [priorityFilter, setPriorityFilter] = React.useState<string[]>([])
  const [selectedColumns, setSelectedColumns] = React.useState({
    title: true,
    status: true,
    priority: true
  })

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-zinc-50">Welcome back!</h1>
        <p className="text-sm text-zinc-500">Here's a list of your tasks for this month!</p>
      </div>

      <div className="flex items-center gap-2">
        <Input 
          placeholder="Filter tasks..." 
          className="max-w-xs bg-zinc-900/50 border-zinc-800 text-zinc-400 text-sm placeholder:text-zinc-500"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:bg-zinc-800/50">
              <Clock className="h-4 w-4 mr-2" />
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-900 border-zinc-800 p-0">
            <Command>
              <CommandInput placeholder="Filter status..." className="text-zinc-400" />
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {['Backlog', 'Todo', 'In Progress', 'Done', 'Canceled'].map((status) => (
                  <CommandItem
                    key={status}
                    onSelect={() => {
                      setStatusFilter(prev => 
                        prev.includes(status) 
                          ? prev.filter(s => s !== status)
                          : [...prev, status]
                      )
                    }}
                    className="text-zinc-400"
                  >
                    <Checkbox 
                      checked={statusFilter.includes(status)}
                      className="border-zinc-700 mr-2"
                    />
                    {status}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:bg-zinc-800/50">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Priority
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-900 border-zinc-800 p-0">
            <Command>
              <CommandInput placeholder="Filter priority..." className="text-zinc-400" />
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {['Low', 'Medium', 'High'].map((priority) => (
                  <CommandItem
                    key={priority}
                    onSelect={() => {
                      setPriorityFilter(prev => 
                        prev.includes(priority) 
                          ? prev.filter(p => p !== priority)
                          : [...prev, priority]
                      )
                    }}
                    className="text-zinc-400"
                  >
                    <Checkbox 
                      checked={priorityFilter.includes(priority)}
                      className="border-zinc-700 mr-2"
                    />
                    {priority}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </DropdownMenuContent>
        </DropdownMenu>

        {(statusFilter.length > 0 || priorityFilter.length > 0) && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-zinc-400 hover:bg-zinc-800/50"
            onClick={() => {
              setStatusFilter([])
              setPriorityFilter([])
            }}
          >
            Reset
          </Button>
        )}
        <div className="flex-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:bg-zinc-800/50">
              <MoreVertical className="h-4 w-4 mr-2" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
            <DropdownMenuLabel className="text-zinc-400">Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuCheckboxItem 
              checked={selectedColumns.title}
              onCheckedChange={(checked) => 
                setSelectedColumns({...selectedColumns, title: checked})
              }
              className="text-zinc-400"
            >
              Title
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
              checked={selectedColumns.status}
              onCheckedChange={(checked) => 
                setSelectedColumns({...selectedColumns, status: checked})
              }
              className="text-zinc-400"
            >
              Status
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
              checked={selectedColumns.priority}
              onCheckedChange={(checked) => 
                setSelectedColumns({...selectedColumns, priority: checked})
              }
              className="text-zinc-400"
            >
              Priority
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md bg-zinc-900/50 border border-zinc-800">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-zinc-800">
              <TableHead className="w-[30px]">
                <Checkbox className="border-zinc-700" />
              </TableHead>
              {selectedColumns.title && (
                <TableHead>
                  <div className="flex items-center gap-2 text-zinc-400">
                    Title
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              )}
              {selectedColumns.status && (
                <TableHead>
                  <div className="flex items-center gap-2 text-zinc-400">
                    Status
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              )}
              {selectedColumns.priority && (
                <TableHead>
                  <div className="flex items-center gap-2 text-zinc-400">
                    Priority
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              )}
              <TableHead className="w-[30px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="border-zinc-800 hover:bg-zinc-800/50">
                <TableCell>
                  <Checkbox className="border-zinc-700" />
                </TableCell>
                {selectedColumns.title && (
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">{task.id}</span>
                        <Badge className="bg-zinc-800/50 text-zinc-400 border-0 rounded-sm px-2 py-0.5 text-xs">{task.type}</Badge>
                      </div>
                      <div className="text-sm text-zinc-300">{task.title}</div>
                    </div>
                  </TableCell>
                )}
                {selectedColumns.status && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <span className="text-sm text-zinc-400">{task.status}</span>
                    </div>
                  </TableCell>
                )}
                {selectedColumns.priority && (
                  <TableCell>
                    <Badge className="bg-zinc-800/50 text-zinc-400 border-0">{task.priority}</Badge>
                  </TableCell>
                )}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 text-zinc-400">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                      <DropdownMenuItem className="text-zinc-400">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-zinc-400">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-500">
          0 of 100 row(s) selected.
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">Rows per page</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-[70px] bg-zinc-900/50 border-zinc-800 text-zinc-400">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="10" className="text-zinc-400">10</SelectItem>
                <SelectItem value="20" className="text-zinc-400">20</SelectItem>
                <SelectItem value="50" className="text-zinc-400">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">Page 1 of 10</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:bg-zinc-800/50">
                <ChevronFirst className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:bg-zinc-800/50">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:bg-zinc-800/50">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:bg-zinc-800/50">
                <ChevronLast className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

