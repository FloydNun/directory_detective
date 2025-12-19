'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Book } from 'lucide-react';
import { useState } from 'react';

export function NotebookAssistantCard() {
  const [activeTab, setActiveTab] = useState('resource-finder');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          <span>Notebook Assistant</span>
        </CardTitle>
        <CardDescription>
          Your AI-powered guide for Vertex AI and Google Cloud.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code-generator">Code Generator</TabsTrigger>
            <TabsTrigger value="resource-finder">Resource Finder</TabsTrigger>
          </TabsList>
          <TabsContent value="code-generator" className="mt-4 space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Describe what code you need:</p>
              <Textarea
                placeholder="e.g., 'A Python function to call a Gemini model'"
                rows={4}
              />
            </div>
            <Button className="w-full">Generate Code</Button>
          </TabsContent>
          <TabsContent value="resource-finder" className="mt-4 space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Describe the task you want to accomplish:
              </p>
              <Textarea
                placeholder="e.g., 'How to fine-tune a model in Vertex AI'"
                rows={4}
              />
            </div>
            <Button className="w-full">Find Resources</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
