'use client';
import { BookText, Loader2, Sparkles, Wand2 } from 'lucide-react';
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
import {
  analyzeDependencies,
  AnalyzeDependenciesOutput,
} from '@/ai/flows/supply-chain-analysis';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Textarea } from '../ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function SupplyChainCard() {
  const [packages, setPackages] = useState('react, next, zod, genkit');
  const [goal, setGoal] = useState('Build a web app with AI features.');
  const [result, setResult] = useState<AnalyzeDependenciesOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAnalysis = () => {
    if (!packages.trim() || !goal.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input Required',
        description: 'Please provide packages and a goal.',
      });
      return;
    }
    setResult(null);
    startTransition(async () => {
      try {
        const pkgList = packages.split(',').map(p => p.trim()).filter(Boolean);
        const response = await analyzeDependencies({ packages: pkgList, goal });
        setResult(response);
      } catch (error) {
        console.error('Error with Supply Chain Analysis:', error);
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
          <BookText className="h-5 w-5" />
          <span>Dependency Manifest</span>
        </CardTitle>
        <CardDescription>
          Generate a manifest explaining your project's dependencies.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="packages-input">Packages (comma-separated)</Label>
            <Textarea
              id="packages-input"
              placeholder="e.g., react, next, tailwindcss"
              value={packages}
              onChange={e => setPackages(e.target.value)}
              disabled={isPending}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goal-input">Project Goal</Label>
            <Textarea
              id="goal-input"
              placeholder="e.g., Build a modern blog."
              value={goal}
              onChange={e => setGoal(e.target.value)}
              disabled={isPending}
               rows={3}
            />
          </div>
        </div>
        {result && (
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Manifest Generated</AlertTitle>
            <AlertDescription>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.manifest.map(item => (
                    <TableRow key={item.packageName}>
                      <TableCell className="font-medium font-mono text-xs">
                        {item.packageName}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAnalysis}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Generate Manifest
        </Button>
      </CardFooter>
    </Card>
  );
}
