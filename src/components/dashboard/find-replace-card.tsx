import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FindReplaceCard() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Search className="h-4 w-4" />
          <span>Mass Find & Replace</span>
        </CardTitle>
        <CardDescription>
          Perform find/replace across multiple files at once.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button size="sm" className="w-full">
          Open Tool
        </Button>
      </CardContent>
    </Card>
  );
}
