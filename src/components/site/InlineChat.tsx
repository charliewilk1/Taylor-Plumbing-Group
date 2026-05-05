import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

export function InlineChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiMessages, setApiMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = { role: "user", content: text };
    const nextApiMessages = [...apiMessages, userMsg];

    setMessages((prev) => [...prev, userMsg]);
    setApiMessages(nextApiMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextApiMessages }),
      });

      if (!response.ok) throw new Error();

      const data = (await response.json()) as { message: string };
      const assistantMsg: Message = { role: "assistant", content: data.message };
      setMessages((prev) => [...prev, assistantMsg]);
      setApiMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Having trouble connecting right now. Call us directly at **(718) 474-1293** — we're available 24/7." },
      ]);
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

  return (
    <section className="bg-[var(--navy-deep)] py-16 lg:py-20">
      <div className="container-x mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
            Get an instant answer
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Describe your job or issue.
          </h2>
          <p className="mt-2 text-sm text-white/55">
            We'll point you in the right direction in seconds.
          </p>
        </div>

        {/* Conversation thread */}
        {messages.length > 0 && (
          <div className="mb-4 space-y-3 rounded-xl border border-white/10 bg-white/5 p-4 max-h-72 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--ember)] text-white rounded-br-sm"
                      : "bg-white/10 text-white/90 rounded-bl-sm"
                  }`}
                >
                  {renderContent(msg.content)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3">
                  <div className="flex items-center gap-1">
                    {[0, 160, 320].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input row */}
        <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 focus-within:border-[var(--ember)] transition-colors">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={messages.length === 0 ? "e.g. water main break outside my building in Brooklyn…" : "Follow up…"}
            disabled={isTyping}
            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="flex items-center gap-1.5 rounded-lg bg-[var(--ember)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-35 shrink-0"
          >
            Send <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="mt-3 text-center text-[0.65rem] uppercase tracking-[0.15em] text-white/25">
          Powered by AI · For emergencies call (718) 474-1293
        </p>
      </div>
    </section>
  );
}
