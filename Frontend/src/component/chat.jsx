"use client"

import * as React from "react"
import { Button } from "./ui/Button"
import { Textarea } from "./ui/textarea"
import { ScrollArea } from "./ui/scroll-area"
import { Card } from "./ui/Card"
import { Loader2, Download, Send } from "lucide-react"

export default function VideoChat() {
  const [prompt, setPrompt] = React.useState("")
  const [messages, setMessages] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const scrollRef = React.useRef(null)

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      text: prompt,
      type: "user",
    }

    const botMessage = {
      id: (Date.now() + 1).toString(),
      text: "Generating video...",
      type: "bot",
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
    setLoading(true)
    setError("")
    setPrompt("")

    try {
      const response = await fetch("http://localhost:5000/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate video")
      }

      const blob = await response.blob()
      const videoUrl = URL.createObjectURL(blob)

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessage.id ? { ...msg, text: "Here's your generated video:", videoUrl } : msg,
        ),
      )
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === botMessage.id ? { ...msg, text: "Error: Failed to generate video" } : msg)),
      )
      setError(`Error generating video: ${err.message || "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (videoUrl) => {
    const a = document.createElement("a")
    a.href = videoUrl
    a.download = `generated-video-${Date.now()}.mp4`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="flex h-screen flex-col bg-background p-4">
      <header className="mb-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Video Generator</h1>
        <p className="text-muted-foreground">Generate custom videos using AI</p>
      </header>

      <Card className="flex-1 overflow-hidden bg-card/50 backdrop-blur">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] space-y-2 ${
                    message.type === "user"
                      ? "bg-black text-white rounded-xl p-3"
                      : "bg-gray-200 text-black rounded-xl p-3"
                  }`}
                >
                  <p>{message.text}</p>
                  {message.videoUrl && (
                    <div className="space-y-2">
                      <video src={message.videoUrl} controls className="w-full max-w-md rounded-md" />
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDownload(message.videoUrl)}
                        className="w-full"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Video
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </Card>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-2">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the video you want to generate..."
            className="min-h-[80px] flex-1 resize-none bg-card/50 backdrop-blur"
          />
          <Button type="submit" disabled={loading || !prompt.trim()} className="h-auto">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>

      {error && (
        <p className="mt-2 text-center text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
