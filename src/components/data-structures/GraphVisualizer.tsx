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

interface GraphNode {
  id: number
  x: number
  y: number
}

interface GraphEdge {
  from: number
  to: number
}

export function GraphVisualizer() {
  const [nodes, setNodes] = useState<GraphNode[]>([
    { id: 0, x: 150, y: 100 },
    { id: 1, x: 350, y: 100 },
    { id: 2, x: 150, y: 250 },
    { id: 3, x: 350, y: 250 },
    { id: 4, x: 250, y: 175 }
  ])
  const [edges, setEdges] = useState<GraphEdge[]>([
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 0, to: 4 },
    { from: 4, to: 3 }
  ])
  const [fromNode, setFromNode] = useState("")
  const [toNode, setToNode] = useState("")
  const [showCode, setShowCode] = useState(false)

  const javaCode = `public class Graph {
    private int V; // Number of vertices
    private LinkedList<Integer>[] adjacencyList;
    
    // Constructor
    public Graph(int vertices) {
        V = vertices;
        adjacencyList = new LinkedList[V];
        for (int i = 0; i < V; i++) {
            adjacencyList[i] = new LinkedList<>();
        }
    }
    
    // Add edge - O(1)
    public void addEdge(int source, int destination) {
        adjacencyList[source].add(destination);
        // For undirected graph, add reverse edge
        adjacencyList[destination].add(source);
    }
    
    // BFS Traversal - O(V + E)
    public void BFS(int startVertex) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[startVertex] = true;
        queue.add(startVertex);
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            System.out.print(vertex + " ");
            
            for (int adj : adjacencyList[vertex]) {
                if (!visited[adj]) {
                    visited[adj] = true;
                    queue.add(adj);
                }
            }
        }
    }
    
    // DFS Traversal - O(V + E)
    public void DFS(int startVertex) {
        boolean[] visited = new boolean[V];
        DFSUtil(startVertex, visited);
    }
    
    private void DFSUtil(int vertex, boolean[] visited) {
        visited[vertex] = true;
        System.out.print(vertex + " ");
        
        for (int adj : adjacencyList[vertex]) {
            if (!visited[adj]) {
                DFSUtil(adj, visited);
            }
        }
    }
    
    // Check if path exists - O(V + E)
    public boolean hasPath(int source, int destination) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[source] = true;
        queue.add(source);
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            if (vertex == destination) return true;
            
            for (int adj : adjacencyList[vertex]) {
                if (!visited[adj]) {
                    visited[adj] = true;
                    queue.add(adj);
                }
            }
        }
        return false;
    }
    
    // Get degree of vertex - O(1)
    public int getDegree(int vertex) {
        return adjacencyList[vertex].size();
    }
}

// Usage Example
Graph graph = new Graph(5);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.BFS(0); // Breadth First Search
graph.DFS(0); // Depth First Search`

  const handleAddEdge = () => {
    const from = Number(fromNode)
    const to = Number(toNode)
    
    if (!isNaN(from) && !isNaN(to) && from >= 0 && to >= 0 && from < nodes.length && to < nodes.length) {
      const edgeExists = edges.some(e => (e.from === from && e.to === to) || (e.from === to && e.to === from))
      if (!edgeExists) {
        setEdges([...edges, { from, to }])
      }
      setFromNode("")
      setToNode("")
    }
  }

  const handleAddNode = () => {
    const newId = nodes.length
    const x = 100 + Math.random() * 300
    const y = 80 + Math.random() * 200
    setNodes([...nodes, { id: newId, x, y }])
  }

  const handleRemoveNode = (id: number) => {
    setNodes(nodes.filter(n => n.id !== id))
    setEdges(edges.filter(e => e.from !== id && e.to !== id))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Graph Visualization
            <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)}>
              <Code2 className="h-4 w-4 mr-2" />
              {showCode ? "Hide" : "Show"} Code
            </Button>
          </CardTitle>
          <CardDescription>
            Connected nodes with edges - BFS/DFS traversal in O(V + E)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[350px] bg-muted/30 rounded-lg p-4 relative">
            <svg width="500" height="350" className="overflow-visible">
              <defs>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              
              <AnimatePresence>
                {edges.map((edge, idx) => {
                  const fromNode = nodes.find(n => n.id === edge.from)
                  const toNode = nodes.find(n => n.id === edge.to)
                  if (!fromNode || !toNode) return null
                  
                  return (
                    <motion.line
                      key={`edge-${idx}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-purple-400"
                    />
                  )
                })}
              </AnimatePresence>
              
              <AnimatePresence>
                {nodes.map((node) => (
                  <g key={`node-${node.id}`}>
                    <motion.circle
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      cx={node.x}
                      cy={node.y}
                      r="30"
                      fill="url(#purpleGradient)"
                      className="cursor-pointer hover:opacity-80"
                      onClick={() => handleRemoveNode(node.id)}
                    />
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-white font-bold text-lg pointer-events-none"
                    >
                      {node.id}
                    </text>
                  </g>
                ))}
              </AnimatePresence>
            </svg>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Add Edge</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="From"
                    value={fromNode}
                    onChange={(e) => setFromNode(e.target.value)}
                    className="w-20"
                  />
                  <Input
                    type="number"
                    placeholder="To"
                    value={toNode}
                    onChange={(e) => setToNode(e.target.value)}
                    className="w-20"
                  />
                  <Button onClick={handleAddEdge} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Manage Nodes</Label>
                <Button onClick={handleAddNode} className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Node
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-medium">Vertices</p>
              <p className="text-2xl font-bold text-purple-600">{nodes.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Edges</p>
              <p className="text-2xl font-bold text-purple-600">{edges.length}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Traversal</p>
              <div className="flex flex-col gap-1">
                <Badge variant="outline" className="text-xs">BFS: O(V+E)</Badge>
                <Badge variant="outline" className="text-xs">DFS: O(V+E)</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showCode && (
        <CodeDisplay 
          code={javaCode} 
          language="java"
          title="Java Graph Implementation"
        />
      )}
    </div>
  )
}
