import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DuplicateDetectionCard() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Copy className="h-4 w-4" />
          <span>Duplicate Files</span>
        </CardTitle>
        <CardDescription>
          Identify redundant files by name and hash values.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button size="sm" className="w-full">
          Find Duplicates
        </Button>
      </CardContent>
    </Card>
  );
}
