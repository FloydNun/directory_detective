'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

// Mock data for artifacts
const mockArtifacts = [
  { id: 'art-001', type: 'code-snippet', content: 'function hello() { console.log("Hello World!"); }' },
  { id: 'art-002', type: 'text', content: 'This is a sample text artifact.' },
  { id: 'art-003', type: 'image-prompt', content: 'A photo of a futuristic city at sunset, cinematic lighting.' },
  { id: 'art-004', type: 'code-snippet', content: 'const x = 10;' },
  { id: 'art-005', type: 'text', content: 'Another piece of text for the junkyard.' },
];


export function ArtifactJunkyardCard() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? mockArtifacts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === mockArtifacts.length - 1 ? 0 : prev + 1));
  };
  
  const currentArtifact = mockArtifacts[currentIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Inbox className="h-5 w-5" />
          <span>Artifact Junkyard</span>
        </CardTitle>
        <CardDescription>
          A movie-reel of your generated artifacts. Stitch them together to create something new.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" onClick={handlePrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center font-mono text-sm p-4 bg-muted rounded-md h-24 overflow-y-auto">
             <ScrollArea className="h-full">
               <code>
                  <pre>{currentArtifact.content}</pre>
                </code>
             </ScrollArea>
          </div>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
         <div className="text-xs text-center text-muted-foreground">
            Displaying artifact {currentIndex + 1} of {mockArtifacts.length} (ID: {currentArtifact.id})
          </div>
      </CardContent>
    </Card>
  );
}
