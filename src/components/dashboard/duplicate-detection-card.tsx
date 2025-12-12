import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CopyCheck } from 'lucide-react';

export function DuplicateDetectionCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
         <CopyCheck className="h-4 w-4"/>
          Duplicates Found
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-headline">2,401</div>
        <p className="text-xs text-muted-foreground">
          Based on name and hash values
        </p>
      </CardContent>
    </Card>
  );
}
