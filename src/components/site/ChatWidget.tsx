import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { client } from "@/config/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_DISPLAY_MESSAGE: Message = {
  role: "assistant",
  content: client.chat.greeting,
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  // displayMessages includes the initial greeting (never sent to the API)
  const [displayMessages, setDisplayMessages] = useState<Message[]>([
    INITIAL_DISPLAY_MESSAGE,
  ]);
  // apiMessages only contains the actual conversation turns
  const [apiMessages, setApiMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = { role: "user", content: text };
    const nextApiMessages = [...apiMessages, userMsg];

    setDisplayMessages((prev) => [...prev, userMsg]);
    setApiMessages(nextApiMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextApiMessages }),
      });

      if (!response.ok) throw new Error("Request failed");

      const data = (await response.json()) as { message: string };
      const assistantMsg: Message = {
        role: "assistant",
        content: data.message,
      };

      setDisplayMessages((prev) => [...prev, assistantMsg]);
      setApiMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errMsg: Message = {
        role: "assistant",
        content:
          "Sorry, I'm having trouble connecting right now. Please call us directly at **(718) 474-1293** — we're available 24/7.",
      };
      setDisplayMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function renderContent(text: string) {
    // Bold **text** → <strong>
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  }

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat support"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[var(--navy)] px-5 py-3.5 text-white shadow-elevated transition-all hover:bg-[var(--ember)] hover:-translate-y-0.5 hover:shadow-2xl"
        >
          <MessageCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm font-semibold leading-none">Get Help</span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
          style={{ width: 360, height: 520 }}
          role="dialog"
          aria-label="Chat with Smiley's Waterworks"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between bg-[var(--ember)] px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white leading-tight">
                Smiley&rsquo;s Waterworks — 24/7 Support
              </p>
              <p className="mt-0.5 text-[0.65rem] text-white/75 uppercase tracking-[0.15em]">
                Typically replies in seconds
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/20 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[var(--navy-deep)] px-4 py-4 space-y-3">
            {displayMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--ember)] text-white rounded-br-sm"
                      : "bg-white/10 text-white/90 rounded-bl-sm"
                  }`}
                >
                  {renderContent(msg.content)}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce"
                      style={{ animationDelay: "160ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce"
                      style={{ animationDelay: "320ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input row */}
          <div className="flex shrink-0 items-center gap-2 border-t border-white/10 bg-[var(--navy)] px-3 py-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              disabled={isTyping}
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-[var(--ember)] focus:outline-none disabled:opacity-50 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--ember)] text-white transition hover:opacity-90 disabled:opacity-35"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
