"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Search, Code2 } from "lucide-react"
import { CodeDisplay } from "./CodeDisplay"

export function ArrayVisualizer() {
  const [array, setArray] = useState<number[]>([10, 25, 5, 40, 15])
  const [inputValue, setInputValue] = useState("")
  const [inputIndex, setInputIndex] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null)
  const [showCode, setShowCode] = useState(false)
  const [currentOperation, setCurrentOperation] = useState("none")

  const javaCode = `public class ArrayExample {
    private int[] array;
    private int size;
    
    // Constructor
    public ArrayExample(int capacity) {
        array = new int[capacity];
        size = 0;
    }
    
    // Add element at end - O(1)
    public void add(int value) {
        if (size < array.length) {
            array[size] = value;
            size++;
        }
    }
    
    // Insert at specific index - O(n)
    public void insertAt(int index, int value) {
        if (index < 0 || index > size) return;
        for (int i = size; i > index; i--) {
            array[i] = array[i - 1];
        }
        array[index] = value;
        size++;
    }
    
    // Remove at index - O(n)
    public void removeAt(int index) {
        if (index < 0 || index >= size) return;
        for (int i = index; i < size - 1; i++) {
            array[i] = array[i + 1];
        }
        size--;
    }
    
    // Search for value - O(n)
    public int search(int value) {
        for (int i = 0; i < size; i++) {
            if (array[i] == value) {
                return i;
            }
        }
        return -1; // Not found
    }
    
    // Access by index - O(1)
    public int get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException();
        }
        return array[index];
    }
}`

  const handleAdd = () => {
    if (inputValue && !isNaN(Number(inputValue))) {
      setCurrentOperation("add")
      setArray([...array, Number(inputValue)])
      setInputValue("")
      setTimeout(() => setCurrentOperation("none"), 500)
    }
  }

  const handleInsert = () => {
    const idx = Number(inputIndex)
    if (inputValue && inputIndex && !isNaN(Number(inputValue)) && idx >= 0 && idx <= array.length) {
      setCurrentOperation("insert")
      const newArray = [...array]
      newArray.splice(idx, 0, Number(inputValue))
      setArray(newArray)
      setInputValue("")
      setInputIndex("")
      setTimeout(() => setCurrentOperation("none"), 500)
    }
  }

  const handleRemove = (index: number) => {
    setCurrentOperation("remove")
    setHighlightIndex(index)
    setTimeout(() => {
      const newArray = array.filter((_, i) => i !== index)
      setArray(newArray)
      setHighlightIndex(null)
      setCurrentOperation("none")
    }, 300)
  }

  const handleSearch = () => {
    if (searchValue && !isNaN(Number(searchValue))) {
      setCurrentOperation("search")
      const idx = array.findIndex(val => val === Number(searchValue))
      if (idx !== -1) {
        setHighlightIndex(idx)
        setTimeout(() => {
          setHighlightIndex(null)
          setCurrentOperation("none")
        }, 2000)
      } else {
        setCurrentOperation("none")
      }
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Array Visualization
            <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)}>
              <Code2 className="h-4 w-4 mr-2" />
              {showCode ? "Hide" : "Show"} Code
            </Button>
          </CardTitle>
          <CardDescription>
            Arrays provide O(1) access time but O(n) insertion/deletion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2 min-h-[80px] items-center justify-center p-4 bg-muted/30 rounded-lg">
            <AnimatePresence mode="popLayout">
              {array.map((value, index) => (
                <motion.div
                  key={`${index}-${value}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    backgroundColor: highlightIndex === index ? "#22c55e" : "#3b82f6"
                  }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="w-16 h-16 rounded-lg shadow-lg flex flex-col items-center justify-center text-white font-bold">
                    <span className="text-lg">{value}</span>
                    <span className="text-xs opacity-70">[{index}]</span>
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemove(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Add to End</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                  />
                  <Button onClick={handleAdd}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Insert at Index</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Index"
                    value={inputIndex}
                    onChange={(e) => setInputIndex(e.target.value)}
                    className="w-20"
                  />
                  <Button onClick={handleInsert}>Insert</Button>
                </div>
              </div>
            </div>

            <div>
              <Label>Search Value</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-medium">Size</p>
              <p className="text-2xl font-bold text-blue-600">{array.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Time Complexity</p>
              <div className="flex flex-col gap-1 mt-1">
                <Badge variant="outline">Access: O(1)</Badge>
                <Badge variant="outline">Search: O(n)</Badge>
                <Badge variant="outline">Insert: O(n)</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showCode && (
        <CodeDisplay 
          code={javaCode} 
          language="java"
          title="Java Array Implementation"
        />
      )}
    </div>
  )
}
