'use client';
import { useState, useTransition, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2, Sparkles } from 'lucide-react';
import { geminiCliAssistance } from '@/ai/flows/gemini-cli-assistance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function GeminiChatAssistant() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setConversation((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      try {
        const result = await geminiCliAssistance({ userMessage: input });
        if (result && result.response) {
          const assistantMessage: Message = {
            role: 'assistant',
            content: result.response,
          };
          setConversation((prev) => [...prev, assistantMessage]);
        } else {
          throw new Error('Invalid response from AI assistant.');
        }
      } catch (error) {
        console.error('Error with Gemini CLI Assistance:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not get a response from the AI assistant.',
        });
        setConversation((prev) => prev.slice(0, -1)); // Remove user message on error
      }
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [conversation]);

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="p-6 border-b">
        <SheetTitle className="flex items-center gap-2 text-2xl font-headline">
          <Bot className="h-7 w-7 text-primary" />
          Mechanic Research Advisor
        </SheetTitle>
        <SheetDescription>
          Your AI partner for tool modification and feature creation.
        </SheetDescription>
      </SheetHeader>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-6 space-y-6">
            {conversation.length === 0 && (
                <div className="text-center text-muted-foreground p-8 rounded-lg border border-dashed">
                    <Sparkles className="mx-auto h-12 w-12 mb-4 text-accent" />
                    <h3 className="text-lg font-semibold text-foreground">Start the Conversation</h3>
                    <p>Ask me how to modify your tools or add new features!</p>
                </div>
            )}
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-4',
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.role === 'assistant' && (
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-sm md:max-w-md rounded-lg p-3 text-sm',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted rounded-bl-none'
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isPending && (
              <div className="flex items-start gap-4 justify-start">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your mechanic advisor..."
            disabled={isPending}
            className="flex-1"
          />
          <Button type="submit" disabled={isPending || !input.trim()} size="icon">
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
