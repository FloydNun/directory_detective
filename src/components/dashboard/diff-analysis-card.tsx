import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GitCompare } from 'lucide-react';

export function DiffAnalysisCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
         <GitCompare className="h-4 w-4"/>
          Files to Compare
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-headline">89</div>
        <p className="text-xs text-muted-foreground">
          Pending side-by-side analysis
        </p>
      </CardContent>
    </Card>
  );
}
