import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { SearchCode } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function SmartExtractionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SearchCode className="h-5 w-5" />
          <span>Smart Extraction</span>
        </CardTitle>
        <CardDescription>
          Analyze dependencies and suggest required files for isolation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter artifact path to analyze..." />
        <Button className="w-full">Analyze Dependencies</Button>
      </CardContent>
    </Card>
  );
}
