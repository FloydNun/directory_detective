'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { Folder, ChevronRight, FileCode, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ComparisonView } from './comparison-view';

const projectStructure = [
  {
    name: 'src',
    type: 'folder',
    path: 'src',
    children: [
      {
        name: 'app',
        type: 'folder',
        path: 'src/app',
        children: [
          { name: 'globals.css', type: 'file', path: 'src/app/globals.css' },
          { name: 'layout.tsx', type: 'file', path: 'src/app/layout.tsx' },
          { name: 'page.tsx', type: 'file', path: 'src/app/page.tsx' },
        ],
      },
      {
        name: 'components',
        type: 'folder',
        path: 'src/components',
        children: [
          {
            name: 'dashboard',
            type: 'folder',
            path: 'src/components/dashboard',
            children: [
              { name: 'diff-analysis-card.tsx', type: 'file', path: 'src/components/dashboard/diff-analysis-card.tsx' },
              { name: 'duplicate-detection-card.tsx', type: 'file', path: 'src/components/dashboard/duplicate-detection-card.tsx' },
              { name: 'file-explorer.tsx', type: 'file', path: 'src/components/dashboard/file-explorer.tsx' },
              { name: 'file-salvage-card.tsx', type: 'file', path: 'src/components/dashboard/file-salvage-card.tsx' },
              { name: 'find-replace-card.tsx', type: 'file', path: 'src/components/dashboard/find-replace-card.tsx' },
              { name: 'gemini-cli-card.tsx', type: 'file', path: 'src/components/dashboard/gemini-cli-card.tsx' },
              { name: 'smart-extraction-card.tsx', type: 'file', path: 'src/components/dashboard/smart-extraction-card.tsx' },
              { name: 'supply-chain-card.tsx', type: 'file', path: 'src/components/dashboard/supply-chain-card.tsx' },
              { name: 'dependency-graph.tsx', type: 'file', path: 'src/components/dashboard/dependency-graph.tsx' },
            ],
          },
          { name: 'dashboard-header.tsx', type: 'file', path: 'src/components/dashboard-header.tsx' },
          { name: 'sidebar.tsx', type: 'file', path: 'src/components/sidebar.tsx' },
        ],
      },
       {
        name: 'ai',
        type: 'folder',
        path: 'src/ai',
        children: [
          {
            name: 'flows',
            type: 'folder',
            path: 'src/ai/flows',
            children: [{ name: 'supply-chain-analysis.ts', type: 'file', path: 'src/ai/flows/supply-chain-analysis.ts' }],
          },
          { name: 'genkit.ts', type: 'file', path: 'src/ai/genkit.ts' },
        ],
      },
    ],
  },
  { name: 'package.json', type: 'file', path: 'package.json' },
  { name: 'tailwind.config.ts', type: 'file', path: 'tailwind.config.ts' },
];

const FileTree = ({ items, selectedFiles, onSelectFile }: { items: any[], selectedFiles: string[], onSelectFile: (path: string) => void }) => {
  return (
    <ul className="space-y-1">
      {items.map(item => (
        <li key={item.path}>
          <div className="flex items-center text-sm hover:bg-muted/50 rounded-md cursor-pointer" onClick={() => onSelectFile(item.path)}>
            {selectedFiles.includes(item.path) ? <CheckSquare className="h-4 w-4 mr-1 text-primary"/> : <Square className="h-4 w-4 mr-1"/>}
            {item.type === 'folder' ? (
              <Folder className="h-4 w-4 mr-2 text-primary" />
            ) : (
              <FileCode className="h-4 w-4 mr-2 text-muted-foreground" />
            )}
            <span
              className={
                item.type === 'folder'
                  ? 'font-medium'
                  : 'text-muted-foreground'
              }
            >
              {item.name}
            </span>
          </div>
          {item.children && (
            <div className="pl-6 border-l ml-3.5">
              <FileTree items={item.children} selectedFiles={selectedFiles} onSelectFile={onSelectFile} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export function FileExplorer() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [comparing, setComparing] = useState(false);

  const handleSelectFile = (path: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(path)) {
        return prev.filter(p => p !== path);
      }
      if (prev.length < 4) {
        return [...prev, path];
      }
      return prev;
    });
  };

  const handleCompareClick = () => {
    if (selectedFiles.length > 1) {
      setComparing(true);
    }
  }

  if (comparing) {
    return <ComparisonView files={selectedFiles} onBack={() => setComparing(false)} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Explorer</CardTitle>
        <CardDescription>
          Select up to 4 files/directories to compare.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FileTree items={projectStructure} selectedFiles={selectedFiles} onSelectFile={handleSelectFile} />
        <Button onClick={handleCompareClick} disabled={selectedFiles.length < 2} className="mt-4 w-full">
          Compare {selectedFiles.length > 0 && `(${selectedFiles.length})`} Selections
        </Button>
      </CardContent>
    </Card>
  );
}
