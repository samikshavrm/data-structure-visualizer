"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, Code2 } from "lucide-react"
import { CodeDisplay } from "./CodeDisplay"

export function StackVisualizer() {
  const [stack, setStack] = useState<number[]>([10, 20, 30])
  const [inputValue, setInputValue] = useState("")
  const [showCode, setShowCode] = useState(false)

  const javaCode = `public class Stack {
    private int[] array;
    private int top;
    private int capacity;
    
    // Constructor
    public Stack(int size) {
        array = new int[size];
        capacity = size;
        top = -1;
    }
    
    // Push element - O(1)
    public void push(int value) {
        if (isFull()) {
            throw new StackOverflowError("Stack is full");
        }
        array[++top] = value;
    }
    
    // Pop element - O(1)
    public int pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return array[top--];
    }
    
    // Peek top element - O(1)
    public int peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return array[top];
    }
    
    // Check if empty - O(1)
    public boolean isEmpty() {
        return top == -1;
    }
    
    // Check if full - O(1)
    public boolean isFull() {
        return top == capacity - 1;
    }
    
    // Get size - O(1)
    public int size() {
        return top + 1;
    }
}

// Usage Example
Stack stack = new Stack(10);
stack.push(10);
stack.push(20);
stack.push(30);
int topValue = stack.pop();  // Returns 30
int peekValue = stack.peek(); // Returns 20`

  const handlePush = () => {
    if (inputValue && !isNaN(Number(inputValue))) {
      setStack([...stack, Number(inputValue)])
      setInputValue("")
    }
  }

  const handlePop = () => {
    if (stack.length > 0) {
      setStack(stack.slice(0, -1))
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Stack Visualization (LIFO)
            <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)}>
              <Code2 className="h-4 w-4 mr-2" />
              {showCode ? "Hide" : "Show"} Code
            </Button>
          </CardTitle>
          <CardDescription>
            Last In, First Out - Push and Pop operations in O(1)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col-reverse gap-2 min-h-[300px] items-center justify-end p-4 bg-muted/30 rounded-lg relative">
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-b-lg" />
            <AnimatePresence mode="popLayout">
              {stack.map((value, index) => (
                <motion.div
                  key={`${index}-${value}`}
                  initial={{ scale: 0, y: 50, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0, y: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-48"
                >
                  <div className="h-16 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 shadow-lg flex items-center justify-center text-white font-bold relative">
                    <span className="text-xl">{value}</span>
                    {index === stack.length - 1 && (
                      <Badge className="absolute -top-2 -right-2 bg-green-500">TOP</Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Stack Operations</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Value to push"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePush()}
                />
                <Button onClick={handlePush} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Push
                </Button>
                <Button 
                  onClick={handlePop} 
                  variant="destructive"
                  disabled={stack.length === 0}
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Pop
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-medium">Size</p>
              <p className="text-2xl font-bold text-orange-600">{stack.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Top Value</p>
              <p className="text-2xl font-bold text-red-600">
                {stack.length > 0 ? stack[stack.length - 1] : "-"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Complexity</p>
              <Badge variant="outline" className="mt-1">All: O(1)</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {showCode && (
        <CodeDisplay 
          code={javaCode} 
          language="java"
          title="Java Stack Implementation"
        />
      )}
    </div>
  )
}
