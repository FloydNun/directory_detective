'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface ComparisonViewProps {
  files: string[];
  onBack: () => void;
}

export function ComparisonView({ files, onBack }: ComparisonViewProps) {
  const gridCols = `grid-cols-${files.length}`;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>Comparison View</CardTitle>
            <CardDescription>
              Comparing {files.length} items.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`grid flex-1 gap-4 ${gridCols}`}>
        {files.map(file => (
          <div key={file} className="flex flex-col gap-2">
            <div className="font-mono text-sm p-2 bg-muted rounded-md">{file}</div>
            <Card className="flex-1">
              <CardContent className="p-4">
                <ScrollArea className="h-[400px]">
                  <p className="text-sm text-muted-foreground">
                    File content will be shown here.
                  </p>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
