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
import { ChevronLeft, ChevronRight, Inbox, Loader } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { generateArtifacts, type Artifact } from '@/ai/flows/generate-artifacts-flow';

export function ArtifactJunkyardCard() {
  const [artifacts, setArtifacts] = React.useState<Artifact[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchArtifacts() {
      try {
        setLoading(true);
        const result = await generateArtifacts();
        setArtifacts(result);
      } catch (error) {
        console.error("Failed to fetch artifacts:", error);
        // Optionally set some error state to show in the UI
      } finally {
        setLoading(false);
      }
    }
    fetchArtifacts();
  }, []);

  const handlePrev = () => {
    if (artifacts.length === 0) return;
    setCurrentIndex(prev => (prev === 0 ? artifacts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (artifacts.length === 0) return;
    setCurrentIndex(prev => (prev === artifacts.length - 1 ? 0 : prev + 1));
  };

  const currentArtifact = artifacts[currentIndex];

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
          <Button variant="outline" size="icon" onClick={handlePrev} disabled={loading || artifacts.length === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center font-mono text-sm p-4 bg-muted rounded-md h-24 flex items-center justify-center">
             {loading ? (
                <Loader className="animate-spin" />
             ) : artifacts.length > 0 ? (
                <ScrollArea className="h-full w-full">
                  <code>
                      <pre>{currentArtifact.content}</pre>
                    </code>
                </ScrollArea>
             ) : (
                <p className="text-muted-foreground">No artifacts found.</p>
             )}
          </div>
          <Button variant="outline" size="icon" onClick={handleNext} disabled={loading || artifacts.length === 0}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
         <div className="text-xs text-center text-muted-foreground">
            {artifacts.length > 0 && !loading &&
              `Displaying artifact ${currentIndex + 1} of ${artifacts.length} (ID: ${currentArtifact.id})`
            }
          </div>
      </CardContent>
    </Card>
  );
}
