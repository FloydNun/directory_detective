import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, ChevronsRight } from 'lucide-react';

export function FindReplaceCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          <span>Mass Find &amp; Replace</span>
        </CardTitle>
        <CardDescription>
          Perform operations across multiple files.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="find-input">Find</Label>
          <Input id="find-input" placeholder="Enter text to find..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="replace-input">Replace</Label>
          <Input id="replace-input" placeholder="Enter replacement text..." />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Execute Replace
          <ChevronsRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
