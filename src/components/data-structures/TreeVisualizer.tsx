"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Code2 } from "lucide-react"
import { CodeDisplay } from "./CodeDisplay"

interface TreeNode {
  value: number
  left?: TreeNode
  right?: TreeNode
}

export function TreeVisualizer() {
  const [tree, setTree] = useState<TreeNode>({
    value: 50,
    left: {
      value: 30,
      left: { value: 20 },
      right: { value: 40 }
    },
    right: {
      value: 70,
      left: { value: 60 },
      right: { value: 80 }
    }
  })
  const [inputValue, setInputValue] = useState("")
  const [showCode, setShowCode] = useState(false)

  const javaCode = `public class BinarySearchTree {
    private class Node {
        int data;
        Node left, right;
        
        Node(int data) {
            this.data = data;
            left = right = null;
        }
    }
    
    private Node root;
    
    // Constructor
    public BinarySearchTree() {
        root = null;
    }
    
    // Insert - O(log n) average, O(n) worst
    public void insert(int data) {
        root = insertRec(root, data);
    }
    
    private Node insertRec(Node root, int data) {
        if (root == null) {
            root = new Node(data);
            return root;
        }
        
        if (data < root.data) {
            root.left = insertRec(root.left, data);
        } else if (data > root.data) {
            root.right = insertRec(root.right, data);
        }
        
        return root;
    }
    
    // Search - O(log n) average, O(n) worst
    public boolean search(int data) {
        return searchRec(root, data);
    }
    
    private boolean searchRec(Node root, int data) {
        if (root == null) return false;
        if (root.data == data) return true;
        
        if (data < root.data) {
            return searchRec(root.left, data);
        }
        return searchRec(root.right, data);
    }
    
    // Delete - O(log n) average
    public void delete(int data) {
        root = deleteRec(root, data);
    }
    
    private Node deleteRec(Node root, int data) {
        if (root == null) return root;
        
        if (data < root.data) {
            root.left = deleteRec(root.left, data);
        } else if (data > root.data) {
            root.right = deleteRec(root.right, data);
        } else {
            // Node with one or no child
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            
            // Node with two children
            root.data = minValue(root.right);
            root.right = deleteRec(root.right, root.data);
        }
        return root;
    }
    
    private int minValue(Node root) {
        int minv = root.data;
        while (root.left != null) {
            minv = root.left.data;
            root = root.left;
        }
        return minv;
    }
    
    // Inorder Traversal - O(n)
    public void inorder() {
        inorderRec(root);
    }
    
    private void inorderRec(Node root) {
        if (root != null) {
            inorderRec(root.left);
            System.out.print(root.data + " ");
            inorderRec(root.right);
        }
    }
}`

  const insertNode = (root: TreeNode | undefined, value: number): TreeNode => {
    if (!root) {
      return { value }
    }
    
    if (value < root.value) {
      return { ...root, left: insertNode(root.left, value) }
    } else if (value > root.value) {
      return { ...root, right: insertNode(root.right, value) }
    }
    return root
  }

  const handleInsert = () => {
    if (inputValue && !isNaN(Number(inputValue))) {
      setTree(insertNode(tree, Number(inputValue)))
      setInputValue("")
    }
  }

  const handleClear = () => {
    setTree({ value: 50 })
  }

  const renderTree = (node: TreeNode | undefined, x: number, y: number, offset: number): JSX.Element | null => {
    if (!node) return null

    return (
      <g key={`${x}-${y}-${node.value}`}>
        {node.left && (
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            x1={x}
            y1={y}
            x2={x - offset}
            y2={y + 80}
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground"
          />
        )}
        {node.right && (
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            x1={x}
            y1={y}
            x2={x + offset}
            y2={y + 80}
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground"
          />
        )}
        
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          cx={x}
          cy={y}
          r="25"
          className="fill-gradient-to-br from-green-500 to-emerald-600"
          fill="url(#greenGradient)"
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-bold text-sm"
        >
          {node.value}
        </text>
        
        {renderTree(node.left, x - offset, y + 80, offset / 2)}
        {renderTree(node.right, x + offset, y + 80, offset / 2)}
      </g>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Binary Search Tree
            <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)}>
              <Code2 className="h-4 w-4 mr-2" />
              {showCode ? "Hide" : "Show"} Code
            </Button>
          </CardTitle>
          <CardDescription>
            Sorted binary tree with O(log n) search, insert, and delete (average case)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[400px] bg-muted/30 rounded-lg p-4 overflow-auto">
            <svg width="100%" height="400" className="overflow-visible">
              <defs>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <AnimatePresence>
                {renderTree(tree, 250, 40, 80)}
              </AnimatePresence>
            </svg>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Insert Value</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Value to insert"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleInsert()}
                />
                <Button onClick={handleInsert} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Insert
                </Button>
                <Button onClick={handleClear} variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-medium">Properties</p>
              <div className="flex flex-col gap-1 mt-1">
                <Badge variant="outline">Left {"<"} Root</Badge>
                <Badge variant="outline">Right {">"} Root</Badge>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Time Complexity</p>
              <div className="flex flex-col gap-1 mt-1">
                <Badge variant="outline">Search: O(log n)</Badge>
                <Badge variant="outline">Insert: O(log n)</Badge>
                <Badge variant="outline">Delete: O(log n)</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showCode && (
        <CodeDisplay 
          code={javaCode} 
          language="java"
          title="Java Binary Search Tree Implementation"
        />
      )}
    </div>
  )
}
