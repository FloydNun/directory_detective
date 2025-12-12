'use client';
import { BrainCircuit, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState, useTransition } from 'react';
import { explainDependencies } from '@/ai/flows/explain-dependencies';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function SmartExtractionCard() {
  const [filePath, setFilePath] = useState('src/app/page.tsx');
  const [result, setResult] = useState<{ explanation: string; requiredFiles: string[] } | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAnalysis = () => {
    if (!filePath.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input Required',
        description: 'Please provide a file or directory path.',
      });
      return;
    }
    setResult(null);
    startTransition(async () => {
      try {
        const response = await explainDependencies({ filePath });
        setResult(response);
      } catch (error) {
        console.error('Error with Smart Extraction:', error);
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'Could not analyze dependencies.',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5" />
          <span>Smart Extraction</span>
        </CardTitle>
        <CardDescription>
          Analyze dependencies to run artifacts in isolation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="file-path-input">File or Directory Path</Label>
          <Input
            id="file-path-input"
            placeholder="e.g., src/components/dashboard.tsx"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            disabled={isPending}
          />
        </div>
        {result && (
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Analysis Complete</AlertTitle>
            <AlertDescription>
              <p className="mb-2">{result.explanation}</p>
              <h4 className="font-semibold mt-2">Required Files:</h4>
              <ul className="list-disc pl-5 font-mono text-xs">
                {result.requiredFiles.map((file) => (
                  <li key={file}>{file}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAnalysis} disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Analyze Dependencies
        </Button>
      </CardFooter>
    </Card>
  );
}
