"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, Code2, ArrowRight } from "lucide-react"
import { CodeDisplay } from "./CodeDisplay"

export function QueueVisualizer() {
  const [queue, setQueue] = useState<number[]>([10, 20, 30, 40])
  const [inputValue, setInputValue] = useState("")
  const [showCode, setShowCode] = useState(false)

  const javaCode = `public class Queue {
    private int[] array;
    private int front;
    private int rear;
    private int size;
    private int capacity;
    
    // Constructor
    public Queue(int capacity) {
        this.capacity = capacity;
        array = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }
    
    // Enqueue (add to rear) - O(1)
    public void enqueue(int value) {
        if (isFull()) {
            throw new IllegalStateException("Queue is full");
        }
        rear = (rear + 1) % capacity;
        array[rear] = value;
        size++;
    }
    
    // Dequeue (remove from front) - O(1)
    public int dequeue() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        int value = array[front];
        front = (front + 1) % capacity;
        size--;
        return value;
    }
    
    // Peek front element - O(1)
    public int peek() {
        if (isEmpty()) {
            throw new NoSuchElementException("Queue is empty");
        }
        return array[front];
    }
    
    // Check if empty - O(1)
    public boolean isEmpty() {
        return size == 0;
    }
    
    // Check if full - O(1)
    public boolean isFull() {
        return size == capacity;
    }
    
    // Get size - O(1)
    public int size() {
        return size;
    }
}

// Usage Example
Queue queue = new Queue(10);
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
int frontValue = queue.dequeue(); // Returns 10`

  const handleEnqueue = () => {
    if (inputValue && !isNaN(Number(inputValue))) {
      setQueue([...queue, Number(inputValue)])
      setInputValue("")
    }
  }

  const handleDequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1))
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Queue Visualization (FIFO)
            <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)}>
              <Code2 className="h-4 w-4 mr-2" />
              {showCode ? "Hide" : "Show"} Code
            </Button>
          </CardTitle>
          <CardDescription>
            First In, First Out - Enqueue and Dequeue operations in O(1)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <div className="flex gap-2 min-h-[120px] items-center p-4 bg-muted/30 rounded-lg overflow-x-auto">
              <div className="flex flex-col items-center gap-2 mr-4">
                <Badge className="bg-green-600">FRONT</Badge>
                <ArrowRight className="h-6 w-6 text-green-600" />
              </div>
              <AnimatePresence mode="popLayout">
                {queue.map((value, index) => (
                  <motion.div
                    key={`${index}-${value}`}
                    initial={{ scale: 0, x: -50, opacity: 0 }}
                    animate={{ scale: 1, x: 0, opacity: 1 }}
                    exit={{ scale: 0, x: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg flex items-center justify-center text-white font-bold">
                      <span className="text-xl">{value}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="flex flex-col items-center gap-2 ml-4">
                <ArrowRight className="h-6 w-6 text-red-600" />
                <Badge className="bg-red-600">REAR</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Queue Operations</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Value to enqueue"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEnqueue()}
                />
                <Button onClick={handleEnqueue} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Enqueue
                </Button>
                <Button 
                  onClick={handleDequeue} 
                  variant="destructive"
                  disabled={queue.length === 0}
                >
                  <Minus className="h-4 w-4 mr-2" />
                  Dequeue
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-medium">Size</p>
              <p className="text-2xl font-bold text-teal-600">{queue.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Front Value</p>
              <p className="text-2xl font-bold text-green-600">
                {queue.length > 0 ? queue[0] : "-"}
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
          title="Java Queue Implementation"
        />
      )}
    </div>
  )
}
