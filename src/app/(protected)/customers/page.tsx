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
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, MoreVertical, ArrowUpDown, Clock, CheckCircle2, AlertCircle, Circle, Package, Eye, Plus } from 'lucide-react'
interface CommandProps {
  children: React.ReactNode;
  // ...any other props...
}

export function Command({ children }: CommandProps) {
  return <div>{children}</div>;
}

interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

export function CommandInput(props: CommandInputProps) {
  return <input {...props} />;
}
interface CommandGroupProps {
  children: React.ReactNode;
  heading?: string;
  className?: string;
}

export function CommandGroup({ children, heading, className }: CommandGroupProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      {heading && <div className="text-xs text-zinc-500 px-2">{heading}</div>}
      <div>{children}</div>
    </div>
  );
}
interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelect?: () => void;
  children?: React.ReactNode;
}

export function CommandItem({ children, onSelect, ...props }: CommandItemProps) {
  return (
    <div {...props} onClick={onSelect}>
      {children}
    </div>
  );
}

interface CommandEmptyProps {
  children?: React.ReactNode;
  className?: string;
}

export function CommandEmpty({ children = "No results found.", className }: CommandEmptyProps) {
  return <div className={`text-sm text-zinc-500 p-2 ${className}`}>{children}</div>;
}
interface Product {
  id: string
  name: string
  description: string
  inStock: number
  available: number
  cost: number
  price: number
}

const products: Product[] = [
  {
    id: "PROD-001",
    name: "Sample Product 1",
    description: "This is a sample product description",
    inStock: 150,
    available: 100,
    cost: 10.00,
    price: 19.99
  },
  {
    id: "PROD-002",
    name: "Sample Product 2",
    description: "Another sample product description",
    inStock: 75,
    available: 50,
    cost: 15.00,
    price: 29.99
  },
  // Add more sample products as needed
]

export default function ProductDashboard() {
  const [stockFilter, setStockFilter] = React.useState<string[]>([])
  const [sortField, setSortField] = React.useState<string>('name')
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
  const [selectedColumns, setSelectedColumns] = React.useState({
    name: true,
    description: true,
    inStock: true,
    available: true,
    cost: true,
    price: true
  })

  return (
    <div className="space-y-6 mt-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">Customers</h1>
        <p className="text-sm text-zinc-500">Here's a list of your Customers</p>
      </div>

      <div className="flex items-center gap-2">
        <Input 
          placeholder="Filter Customers..." 
          className="max-w-xs bg-zinc-900/50 border-zinc-800 text-zinc-400 text-sm placeholder:text-zinc-500"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:bg-zinc-800/50">
              <Package className="h-4 w-4 mr-2" />
              Stock Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] bg-zinc-950 border-zinc-800 p-0">
            <Command>
              <CommandInput placeholder="Filter stock..." className="h-9 text-zinc-400 border-none focus:ring-0" />
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {['In Stock', 'Low Stock', 'Out of Stock'].map((status) => (
                  <CommandItem
                    key={status}
                    onSelect={() => {
                      setStockFilter(prev => 
                        prev.includes(status) 
                          ? prev.filter(s => s !== status)
                          : [...prev, status]
                      )
                    }}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-400 aria-selected:bg-zinc-900 aria-selected:text-zinc-50"
                  >
                    <Checkbox 
                      checked={stockFilter.includes(status)}
                      className="border-zinc-700"
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
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] bg-zinc-950 border-zinc-800">
            <DropdownMenuLabel className="text-zinc-400">Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem 
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
              onClick={() => {
                setSortField('name')
                setSortDirection('asc')
              }}
            >
              Name (A to Z)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
              onClick={() => {
                setSortField('name')
                setSortDirection('desc')
              }}
            >
              Name (Z to A)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
              onClick={() => {
                setSortField('inStock')
                setSortDirection('desc')
              }}
            >
              Stock (High to Low)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
              onClick={() => {
                setSortField('inStock')
                setSortDirection('asc')
              }}
            >
              Stock (Low to High)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
              onClick={() => {
                setSortField('price')
                setSortDirection('desc')
              }}
            >
              Price (High to Low)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
              onClick={() => {
                setSortField('price')
                setSortDirection('asc')
              }}
            >
              Price (Low to High)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" className="text-zinc-400 hover:bg-zinc-800/50">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>

        {stockFilter.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-zinc-400 hover:bg-zinc-800/50"
            onClick={() => {
              setStockFilter([])
            }}
          >
            Reset
          </Button>
        )}
        <div className="flex-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:bg-zinc-800/50">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] bg-zinc-950 border-zinc-800">
            <DropdownMenuLabel className="text-zinc-400">Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuCheckboxItem 
              checked={selectedColumns.name}
              onCheckedChange={(checked) => 
                setSelectedColumns({...selectedColumns, name: checked})
              }
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
            >
              Name
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
              checked={selectedColumns.description}
              onCheckedChange={(checked) => 
                setSelectedColumns({...selectedColumns, description: checked})
              }
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
            >
              Description
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
              checked={selectedColumns.inStock}
              onCheckedChange={(checked) => 
                setSelectedColumns({...selectedColumns, inStock: checked})
              }
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
            >
              In Stock
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
              checked={selectedColumns.available}
              onCheckedChange={(checked) => 
                setSelectedColumns({...selectedColumns, available: checked})
              }
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
            >
              Available
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
              checked={selectedColumns.cost}
              onCheckedChange={(checked) => 
                setSelectedColumns({...selectedColumns, cost: checked})
              }
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
            >
              Cost
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem 
              checked={selectedColumns.price}
              onCheckedChange={(checked) => 
                setSelectedColumns({...selectedColumns, price: checked})
              }
              className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50"
            >
              Price
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-950">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-zinc-900/50 border-zinc-800">
              <TableHead className="w-[30px] text-zinc-400">
                <Checkbox className="border-zinc-700" />
              </TableHead>
              <TableHead className="w-[100px] text-zinc-400">ID</TableHead>
              {selectedColumns.name && (
                <TableHead className="text-zinc-400">
                  <div className="flex items-center gap-2">
                    Name
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              )}
              {selectedColumns.description && (
                <TableHead className="text-zinc-400">
                  <div className="flex items-center gap-2">
                    Description
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              )}
              {selectedColumns.inStock && (
                <TableHead className="w-[100px] text-zinc-400">
                  <div className="flex items-center gap-2">
                    In Stock
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              )}
              {selectedColumns.available && (
                <TableHead className="w-[100px] text-zinc-400">
                  <div className="flex items-center gap-2">
                    Available
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              )}
              {selectedColumns.cost && (
                <TableHead className="w-[100px] text-zinc-400">
                  <div className="flex items-center gap-2">
                    Cost
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              )}
              {selectedColumns.price && (
                <TableHead className="w-[100px] text-zinc-400">
                  <div className="flex items-center gap-2">
                    Price
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
              )}
              <TableHead className="w-[30px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="border-zinc-800 hover:bg-zinc-900/50">
                <TableCell>
                  <Checkbox className="border-zinc-700" />
                </TableCell>
                <TableCell className="font-medium text-zinc-400">{product.id}</TableCell>
                {selectedColumns.name && (
                  <TableCell>
                    <div className="text-sm text-zinc-300">{product.name}</div>
                  </TableCell>
                )}
                {selectedColumns.description && (
                  <TableCell>
                    <div className="text-sm text-zinc-400">{product.description}</div>
                  </TableCell>
                )}
                {selectedColumns.inStock && (
                  <TableCell>
                    <div className="text-sm text-zinc-400">{product.inStock}</div>
                  </TableCell>
                )}
                {selectedColumns.available && (
                  <TableCell>
                    <div className="text-sm text-zinc-400">{product.available}</div>
                  </TableCell>
                )}
                {selectedColumns.cost && (
                  <TableCell>
                    <div className="text-sm text-zinc-400">${product.cost.toFixed(2)}</div>
                  </TableCell>
                )}
                {selectedColumns.price && (
                  <TableCell>
                    <div className="text-sm text-zinc-400">${product.price.toFixed(2)}</div>
                  </TableCell>
                )}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-900">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px] bg-zinc-950 border-zinc-800">
                      <DropdownMenuItem className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50">Delete</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-zinc-800" />
                      <DropdownMenuItem className="text-zinc-400 focus:bg-zinc-900 focus:text-zinc-50">
                        View Details
                        <span className="ml-auto">→</span>
                      </DropdownMenuItem>
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

