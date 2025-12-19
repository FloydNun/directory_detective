import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { GitBranchPlus, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function GeminiCliCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranchPlus className="h-5 w-5" />
          <span>Gemini CLI</span>
        </CardTitle>
        <CardDescription>
          Interact with the Gemini CLI for advanced modifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-64">
          <div className="flex-grow bg-muted rounded-md p-4 text-sm font-mono overflow-auto">
            <p className="text-muted-foreground">
              [SYSTEM] Gemini ready. Enter a command.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Input placeholder="e.g., add a new component..." />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
