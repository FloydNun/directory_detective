import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Eye, Copy, FolderSync } from 'lucide-react';

export function FileSalvageCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderSync className="h-5 w-5" />
          <span>File Salvage</span>
        </CardTitle>
        <CardDescription>
          Watch for changes and mirror directories.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <Label className="flex items-center gap-2"><Eye className="h-4 w-4"/> Watch for changes</Label>
            <p className="text-xs text-muted-foreground">
              Automatically scan on file changes.
            </p>
          </div>
          <Switch />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full">
          <Copy className="mr-2 h-4 w-4" />
          Mirror Directory
        </Button>
      </CardFooter>
    </Card>
  );
}
