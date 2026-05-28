"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrayVisualizer } from "@/components/data-structures/ArrayVisualizer"
import { LinkedListVisualizer } from "@/components/data-structures/LinkedListVisualizer"
import { StackVisualizer } from "@/components/data-structures/StackVisualizer"
import { QueueVisualizer } from "@/components/data-structures/QueueVisualizer"
import { TreeVisualizer } from "@/components/data-structures/TreeVisualizer"
import { GraphVisualizer } from "@/components/data-structures/GraphVisualizer"
import { Badge } from "@/components/ui/badge"

export default function DataStructuresPage() {
  const [activeTab, setActiveTab] = useState("array")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Java Data Structures Visualizer
          </h1>
          <p className="text-muted-foreground text-lg">
            Interactive visualizations to understand data structures with Java implementations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="array" className="flex flex-col gap-1">
              <span>Array</span>
              <Badge variant="secondary" className="text-xs">O(1)</Badge>
            </TabsTrigger>
            <TabsTrigger value="linkedlist" className="flex flex-col gap-1">
              <span>Linked List</span>
              <Badge variant="secondary" className="text-xs">O(n)</Badge>
            </TabsTrigger>
            <TabsTrigger value="stack" className="flex flex-col gap-1">
              <span>Stack</span>
              <Badge variant="secondary" className="text-xs">O(1)</Badge>
            </TabsTrigger>
            <TabsTrigger value="queue" className="flex flex-col gap-1">
              <span>Queue</span>
              <Badge variant="secondary" className="text-xs">O(1)</Badge>
            </TabsTrigger>
            <TabsTrigger value="tree" className="flex flex-col gap-1">
              <span>Tree</span>
              <Badge variant="secondary" className="text-xs">O(log n)</Badge>
            </TabsTrigger>
            <TabsTrigger value="graph" className="flex flex-col gap-1">
              <span>Graph</span>
              <Badge variant="secondary" className="text-xs">O(V+E)</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="array">
            <ArrayVisualizer />
          </TabsContent>
          
          <TabsContent value="linkedlist">
            <LinkedListVisualizer />
          </TabsContent>
          
          <TabsContent value="stack">
            <StackVisualizer />
          </TabsContent>
          
          <TabsContent value="queue">
            <QueueVisualizer />
          </TabsContent>
          
          <TabsContent value="tree">
            <TreeVisualizer />
          </TabsContent>
          
          <TabsContent value="graph">
            <GraphVisualizer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
