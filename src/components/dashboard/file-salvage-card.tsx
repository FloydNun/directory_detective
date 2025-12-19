import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FileSalvageCard() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Save className="h-4 w-4" />
          <span>File Salvage</span>
        </CardTitle>
        <CardDescription>
          Watch for file changes or duplicate directories.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button size="sm" className="w-full">
          Initiate Salvage
        </Button>
      </CardContent>
    </Card>
  );
}
