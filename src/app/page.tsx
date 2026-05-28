import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Layers, Zap, BookOpen, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-4 bg-blue-600">Interactive Learning Platform</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Master Data Structures with Java
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Interactive visualizations that bring data structures to life. See how arrays, linked lists, stacks, queues, trees, and graphs work with real Java code examples.
          </p>
          <Link href="/data-structures">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-blue-200 dark:border-blue-900">
            <CardHeader>
              <Code2 className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Java Implementation</CardTitle>
              <CardDescription>
                Complete Java code for each data structure with best practices
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-purple-200 dark:border-purple-900">
            <CardHeader>
              <Layers className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle className="text-lg">Visual Animations</CardTitle>
              <CardDescription>
                Watch operations happen in real-time with smooth animations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-pink-200 dark:border-pink-900">
            <CardHeader>
              <Zap className="h-10 w-10 text-pink-600 mb-2" />
              <CardTitle className="text-lg">Complexity Analysis</CardTitle>
              <CardDescription>
                Understand Big O notation for every operation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-green-200 dark:border-green-900">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle className="text-lg">Interactive Learning</CardTitle>
              <CardDescription>
                Add, remove, and search elements to learn by doing
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Data Structures Cards */}
        <h2 className="text-3xl font-bold text-center mb-8">Explore Data Structures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link href="/data-structures">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Array
                  <Badge variant="secondary">O(1) Access</Badge>
                </CardTitle>
                <CardDescription>
                  Fixed-size sequential collection with constant-time random access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {[10, 25, 5, 40].map((val, i) => (
                    <div key={i} className="w-12 h-12 rounded bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                      {val}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/data-structures">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-t-4 border-t-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Linked List
                  <Badge variant="secondary">O(1) Insert</Badge>
                </CardTitle>
                <CardDescription>
                  Dynamic collection with efficient insertion and deletion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {[10, 20, 30].map((val, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center font-bold text-sm">
                        {val}
                      </div>
                      {i < 2 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/data-structures">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-t-4 border-t-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Stack
                  <Badge variant="secondary">LIFO</Badge>
                </CardTitle>
                <CardDescription>
                  Last In, First Out structure for backtracking and undo operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col-reverse gap-1">
                  {[30, 20, 10].map((val, i) => (
                    <div key={i} className="h-8 rounded bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center font-bold text-sm">
                      {val}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/data-structures">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-t-4 border-t-teal-500">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Queue
                  <Badge variant="secondary">FIFO</Badge>
                </CardTitle>
                <CardDescription>
                  First In, First Out for scheduling and buffering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {[10, 20, 30, 40].map((val, i) => (
                    <div key={i} className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center font-bold text-xs">
                      {val}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/data-structures">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-t-4 border-t-green-500">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Binary Tree
                  <Badge variant="secondary">O(log n)</Badge>
                </CardTitle>
                <CardDescription>
                  Hierarchical structure with efficient search and sorting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xs">
                    50
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-400 text-white flex items-center justify-center font-bold text-xs">
                      30
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-400 text-white flex items-center justify-center font-bold text-xs">
                      70
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/data-structures">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-t-4 border-t-violet-500">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Graph
                  <Badge variant="secondary">O(V+E)</Badge>
                </CardTitle>
                <CardDescription>
                  Network of connected nodes for complex relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-20">
                  <div className="absolute top-2 left-8 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xs">
                    0
                  </div>
                  <div className="absolute top-2 right-8 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div className="absolute bottom-2 left-8 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div className="absolute bottom-2 right-8 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Master Data Structures?</CardTitle>
              <CardDescription className="text-blue-100">
                Start visualizing and understanding data structures with interactive Java examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/data-structures">
                <Button size="lg" variant="secondary" className="text-lg">
                  Launch Visualizer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}