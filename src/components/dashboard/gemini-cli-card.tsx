import { Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { GeminiChatAssistant } from '../gemini-chat-assistant';

export function GeminiCliCard() {
  return (
    <Sheet>
      <Card className="bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute top-0 right-0 h-24 w-24 bg-primary/20 rounded-bl-full"></div>
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            <span>Mechanic Advisor</span>
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            AI-powered assistance for modifying your tools.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Chat with Gemini to analyze, modify, and extend the features of your
            tooling, just like having an expert mechanic by your side.
          </p>
        </CardContent>
        <CardContent>
          <SheetTrigger asChild>
            <Button
              variant="secondary"
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Open Assistant
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </SheetTrigger>
        </CardContent>
      </Card>
      <SheetContent className="w-full sm:max-w-xl p-0">
        <GeminiChatAssistant />
      </SheetContent>
    </Sheet>
  );
}
