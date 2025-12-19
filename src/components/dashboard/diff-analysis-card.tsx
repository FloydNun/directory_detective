import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { GitCompareArrows } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DiffAnalysisCard() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <GitCompareArrows className="h-4 w-4" />
          <span>File Differences</span>
        </CardTitle>
        <CardDescription>
          Compare file content and metadata side-by-side.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button size="sm" className="w-full">
          Analyze Diffs
        </Button>
      </CardContent>
    </Card>
  );
}
