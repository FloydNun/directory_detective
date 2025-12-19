'use client';
import { BookText, Sparkles } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Label } from '../ui/label';

const mockedResult = {
  manifest: [
    {
      packageName: 'react',
      description:
        'A JavaScript library for building user interfaces, forming the foundation of the app\'s components.',
    },
    {
      packageName: 'next',
      description:
        'A React framework that provides structure and features like server-side rendering and routing for the web app.',
    },
    {
      packageName: 'zod',
      description:
        'A TypeScript-first schema declaration and validation library, used to ensure data structures for AI models are correct.',
    },
    {
      packageName: 'genkit',
      description:
        'The core framework for building and running the AI flows that power the generative features of the application.',
    },
  ],
};

export function SupplyChainCard() {
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
              defaultValue="react, next, zod, genkit"
              rows={3}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="goal-input">Project Goal</Label>
            <Textarea
              id="goal-input"
              placeholder="e.g., Build a modern blog."
              defaultValue="Build a web app with AI features."
              rows={3}
              disabled
            />
          </div>
        </div>
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
                {mockedResult.manifest.map(item => (
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
      </CardContent>
    </Card>
  );
}
