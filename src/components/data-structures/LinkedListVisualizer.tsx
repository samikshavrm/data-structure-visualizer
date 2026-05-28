"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, ArrowRight, Code2 } from "lucide-react"
import { CodeDisplay } from "./CodeDisplay"

interface Node {
  value: number
  id: string
}

export function LinkedListVisualizer() {
  const [list, setList] = useState<Node[]>([
    { value: 10, id: "1" },
    { value: 20, id: "2" },
    { value: 30, id: "3" }
  ])
  const [inputValue, setInputValue] = useState("")
  const [showCode, setShowCode] = useState(false)

  const javaCode = `public class LinkedList {
    private class Node {
        int data;
        Node next;
        
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }
    
    private Node head;
    private int size;
    
    // Constructor
    public LinkedList() {
        this.head = null;
        this.size = 0;
    }
    
    // Add to end - O(n)
    public void add(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        size++;
    }
    
    // Add to beginning - O(1)
    public void addFirst(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
        size++;
    }
    
    // Remove first - O(1)
    public void removeFirst() {
        if (head != null) {
            head = head.next;
            size--;
        }
    }
    
    // Remove at index - O(n)
    public void removeAt(int index) {
        if (index < 0 || index >= size) return;
        if (index == 0) {
            removeFirst();
            return;
        }
        Node current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current.next;
        }
        current.next = current.next.next;
        size--;
    }
    
    // Search - O(n)
    public boolean contains(int data) {
        Node current = head;
        while (current != null) {
            if (current.data == data) {
                return true;
            }
            current = current.next;
        }
        return false;
    }
}`

  const handleAddToEnd = () => {
    if (inputValue && !isNaN(Number(inputValue))) {
      setList([...list, { value: Number(inputValue), id: Date.now().toString() }])
      setInputValue("")
    }
  }

  const handleAddToStart = () => {
    if (inputValue && !isNaN(Number(inputValue))) {
      setList([{ value: Number(inputValue), id: Date.now().toString() }, ...list])
      setInputValue("")
    }
  }

  const handleRemove = (id: string) => {
    setList(list.filter(node => node.id !== id))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Linked List Visualization
            <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)}>
              <Code2 className="h-4 w-4 mr-2" />
              {showCode ? "Hide" : "Show"} Code
            </Button>
          </CardTitle>
          <CardDescription>
            Dynamic size with O(1) insertion at head, but O(n) access time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2 min-h-[100px] items-center p-4 bg-muted/30 rounded-lg overflow-x-auto">
            <AnimatePresence mode="popLayout">
              {list.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0, x: -20 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0, opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg flex flex-col items-center justify-center text-white font-bold">
                      <span className="text-lg">{node.value}</span>
                      <span className="text-xs opacity-70">
                        {index === 0 ? "HEAD" : `Node ${index}`}
                      </span>
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemove(node.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  {index < list.length - 1 && (
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  )}
                  {index === list.length - 1 && (
                    <div className="w-12 h-12 rounded border-2 border-dashed border-muted-foreground flex items-center justify-center text-xs text-muted-foreground">
                      NULL
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Add Node</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Value"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddToEnd()}
                />
                <Button onClick={handleAddToStart} variant="secondary">
                  Add First
                </Button>
                <Button onClick={handleAddToEnd}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Last
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-medium">Size</p>
              <p className="text-2xl font-bold text-purple-600">{list.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Time Complexity</p>
              <div className="flex flex-col gap-1 mt-1">
                <Badge variant="outline">Access: O(n)</Badge>
                <Badge variant="outline">Search: O(n)</Badge>
                <Badge variant="outline">Insert Head: O(1)</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showCode && (
        <CodeDisplay 
          code={javaCode} 
          language="java"
          title="Java Linked List Implementation"
        />
      )}
    </div>
  )
}
