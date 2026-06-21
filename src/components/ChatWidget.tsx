'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronDown } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'What equipment is included?',
  'How much does it cost?',
  'How do I book a session?',
  'Is the kitchen available 24/7?',
];

const GREETING = "Hi there! 👋 Welcome to Norwood Commercial Kitchen. I'm here to help with any questions about our kitchen hire, pricing or booking. What can I help you with today?";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [greetingText, setGreetingText] = useState('');
  const greetedRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-open after 5s, once per session */
  useEffect(() => {
    if (sessionStorage.getItem('chat-greeted')) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem('chat-greeted', '1');
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  /* Typewriter greeting when chat first opens */
  useEffect(() => {
    if (!open || greetedRef.current || messages.length > 0) return;
    greetedRef.current = true;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setGreetingText(GREETING.slice(0, i));
      if (i >= GREETING.length) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [open, messages.length]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const updated: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(updated);
    setInput('');
    setLoading(true);
    setStreamingText('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          full += chunk;
          setStreamingText(full);
        }
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: full }]);
      setStreamingText('');
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again or call us on 0475 517 995.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = messages.length === 0 && !streamingText;

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-[9998]">
        <AnimatePresence>
          {!open && (
            <motion.button
              key="fab"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              onClick={() => setOpen(true)}
              className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 active:scale-95"
              aria-label="Open chat"
            >
              {/* Chat bubble icon */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="absolute bottom-0 right-0 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
              style={{ height: 520 }}
            >
              {/* Header */}
              <div className="bg-red-600 px-4 py-3.5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">NCK Assistant</p>
                    <p className="text-red-200 text-xs">Ask me anything about the kitchen</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-1"
                  aria-label="Close chat"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {isEmpty && (
                  <div className="flex flex-col pt-2 pb-2">
                    {/* Greeting bubble with typewriter */}
                    {greetingText && (
                      <div className="flex justify-start mb-4">
                        <div className="max-w-[85%] bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm leading-relaxed">
                          {greetingText}
                          {greetingText.length < GREETING.length && (
                            <span className="inline-block w-0.5 h-3.5 bg-gray-500 ml-0.5 animate-pulse align-middle" />
                          )}
                        </div>
                      </div>
                    )}
                    {/* Show suggestions only after greeting finishes */}
                    {greetingText.length >= GREETING.length && (
                      <div className="flex flex-col gap-2">
                        {SUGGESTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => send(s)}
                            className="text-left text-xs text-gray-700 bg-gray-50 hover:bg-red-50 hover:text-red-700 border border-gray-200 hover:border-red-200 rounded-xl px-3 py-2.5 transition-colors duration-150"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                    {/* Fallback if chat opened manually before typewriter starts */}
                    {!greetingText && (
                      <div className="flex flex-col items-center text-center pt-4 pb-2">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-3">
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                          </svg>
                        </div>
                        <p className="text-gray-900 font-semibold text-sm mb-1">Hi there! 👋</p>
                        <p className="text-gray-500 text-xs leading-relaxed mb-5">
                          I can answer questions about pricing, equipment, booking and more.
                        </p>
                        <div className="flex flex-col gap-2 w-full">
                          {SUGGESTIONS.map((s) => (
                            <button
                              key={s}
                              onClick={() => send(s)}
                              className="text-left text-xs text-gray-700 bg-gray-50 hover:bg-red-50 hover:text-red-700 border border-gray-200 hover:border-red-200 rounded-xl px-3 py-2.5 transition-colors duration-150"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-red-600 text-white rounded-tr-sm'
                          : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {/* Streaming response */}
                {streamingText && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm leading-relaxed">
                      {streamingText}
                    </div>
                  </div>
                )}

                {/* Typing indicator */}
                {loading && !streamingText && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="px-3 pb-3 pt-2 border-t border-gray-100 flex-shrink-0">
                <form
                  onSubmit={(e) => { e.preventDefault(); send(input); }}
                  className="flex items-center gap-2 bg-gray-50 rounded-xl border border-gray-200 px-3 py-2 focus-within:border-red-400 transition-colors"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question…"
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="w-7 h-7 bg-red-600 disabled:bg-gray-200 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label="Send"
                  >
                    <Send className="w-3.5 h-3.5 text-white disabled:text-gray-400" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
