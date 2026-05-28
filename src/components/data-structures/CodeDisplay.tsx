"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface CodeDisplayProps {
  code: string
  language: string
  title: string
}

export function CodeDisplay({ code, language, title }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          {title}
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="language-java">{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}
