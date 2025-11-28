import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Coach() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Ready to crush it today? I noticed your pull-up volume has increased by 12% this week. Should we focus on muscle-up transitions or weighted pull-ups today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", content: "That sounds like a solid plan. For muscle-up transitions, let's incorporate 'Explosive High Pull-ups' and 'Bar Dips'. Aim for 3 sets of 5 reps each with 3 minutes rest." }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] max-w-4xl mx-auto border border-border rounded-xl overflow-hidden bg-card shadow-2xl">
      {/* Header */}
      <div className="bg-sidebar border-b border-border p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary))]">
          <Bot className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-lg tracking-wide">Coach AI</h2>
          <p className="text-xs text-primary flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Online
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4 space-y-4">
        <div className="space-y-6 pb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.role === 'ai' ? (
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center mt-1 border border-primary/20">
                   <Bot className="w-4 h-4 text-primary" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center mt-1">
                  <div className="w-full h-full rounded overflow-hidden bg-muted flex items-center justify-center text-xs font-bold">ME</div>
                </div>
              )}
              
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                  : 'bg-secondary/50 border border-border text-foreground rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-sidebar border-t border-border">
        {/* Suggested Prompts */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
          {["Fix my form", "Generate Split", "Why am I plateauing?", "Warmup Routine"].map(prompt => (
            <button key={prompt} className="whitespace-nowrap px-3 py-1.5 rounded-full border border-border bg-background/50 text-xs font-medium hover:bg-primary/10 hover:border-primary hover:text-primary transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {prompt}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Coach AI..." 
            className="bg-background border-border focus:border-primary"
          />
          <Button onClick={handleSend} size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
