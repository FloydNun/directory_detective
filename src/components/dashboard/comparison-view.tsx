'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface ComparisonViewProps {
  files: string[];
  onBack: () => void;
}

const mockFileContents: { [key: string]: string } = {
  'src/app/page.tsx': `import { Dashboard } from '@/components/dashboard';

export default function Home() {
  return <Dashboard />;
}`,
  'src/app/layout.tsx': `import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Directory Detective',
  description: 'An advanced file analysis and management tool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}`,
  'package.json': `{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}`,
};

export function ComparisonView({ files, onBack }: ComparisonViewProps) {
  const gridCols = files.length > 2 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>Comparison View</CardTitle>
            <CardDescription>
              Comparing {files.length} items.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`grid flex-1 gap-4 ${gridCols}`}>
        {files.map(file => (
          <div key={file} className="flex flex-col gap-2">
            <div className="font-mono text-sm p-2 bg-muted rounded-md">{file}</div>
            <Card className="flex-1">
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <pre className="p-4 text-sm">
                    <code>
                      {mockFileContents[file] ||
                        `// No mock content for ${file}`}
                    </code>
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
