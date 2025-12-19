'use client';
import {
  ChevronRight,
  Folder,
  File,
  FolderGit,
  FileJson,
  FileLock,
  BrainCircuit,
  LayoutPanelLeft,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import React from 'react';

type FileNode = {
  name: string;
  icon?: React.ReactNode;
  children?: FileNode[];
  isOpen?: boolean;
};

const fileTree: FileNode[] = [
  {
    name: 'src',
    icon: <Folder className="h-4 w-4" />,
    isOpen: true,
    children: [
      {
        name: 'ai',
        icon: <BrainCircuit className="h-4 w-4" />,
        isOpen: true,
        children: [
          {
            name: 'flows',
            icon: <Folder className="h-4 w-4" />,
            isOpen: true,
            children: [
              { name: 'explain-dependencies.ts', icon: <File className="h-4 w-4" /> },
              { name: 'gemini-cli-assistance.ts', icon: <File className="h-4 w-4" /> },
              { name: 'supply-chain-analysis.ts', icon: <File className="h-4 w-4" /> },
            ],
          },
          { name: 'dev.ts', icon: <File className="h-4 w-4" /> },
          { name: 'genkit.ts', icon: <File className="h-4 w-4" /> },
        ],
      },
      {
        name: 'app',
        icon: <Folder className="h-4 w-4" />,
        isOpen: true,
        children: [
          { name: 'page.tsx', icon: <File className="h-4 w-4" /> },
          { name: 'layout.tsx', icon: <File className="h-4 w-4" /> },
          { name: 'globals.css', icon: <File className="h-4 w-4" /> },
        ],
      },
      {
        name: 'components',
        icon: <LayoutPanelLeft className="h-4 w-4" />,
        children: [
            {
                name: 'dashboard',
                icon: <Folder className="h-4 w-4" />,
                children: [
                    { name: 'dependency-graph.tsx', icon: <File className="h-4 w-4" /> },
                    { name: 'diff-analysis-card.tsx', icon: <File className="h-4 w-4" /> },
                    { name: 'duplicate-detection-card.tsx', icon: <File className="h-4 w-4" /> },
                    { name: 'file-explorer.tsx', icon: <File className="h-4 w-4" /> },
                    { name: 'file-salvage-card.tsx', icon: <File className="h-4 w-4" /> },
                    { name: 'find-replace-card.tsx', icon: <File className="h-4 w-4" /> },
                    { name: 'gemini-cli-card.tsx', icon: <File className="h-4 w-4" /> },
                    { name: 'smart-extraction-card.tsx', icon: <File className="h-4 w-4" /> },
                    { name: 'supply-chain-card.tsx', icon: <File className="h-4 w-4" /> },
                ]
            },
            {
                name: 'ui',
                icon: <Folder className="h-4 w-4" />,
            },
            { name: 'dashboard.tsx', icon: <File className="h-4 w-4" /> },
            { name: 'dashboard-header.tsx', icon: <File className="h-4 w-4" /> },
            { name: 'gemini-chat-assistant.tsx', icon: <File className="h-4 w-4" /> },
            { name: 'icons.tsx', icon: <File className="h-4 w-4" /> },
            { name: 'sidebar.tsx', icon: <File className="h-4 w-4" /> },
        ]
      },
      {
        name: 'hooks',
        icon: <Folder className="h-4 w-4" />,
        children: [
            { name: 'use-mobile.tsx', icon: <File className="h-4 w-4" /> },
            { name: 'use-toast.ts', icon: <File className="h-4 w-4" /> },
        ],
      },
      {
        name: 'lib',
        icon: <Folder className="h-4 w-4" />,
        children: [
            { name: 'placeholder-images.json', icon: <FileJson className="h-4 w-4" /> },
            { name: 'placeholder-images.ts', icon: <File className="h-4 w-4" /> },
            { name: 'utils.ts', icon: <File className="h-4 w-4" /> },
        ],
      },
    ],
  },
  {
    name: 'node_modules',
    icon: <FolderGit className="h-4 w-4 text-muted-foreground" />,
  },
  { name: 'package.json', icon: <FileJson className="h-4 w-4" /> },
  { name: 'package-lock.json', icon: <FileLock className="h-4 w-4" /> },
  { name: 'next.config.ts', icon: <File className="h-4 w-4" /> },
  { name: 'tailwind.config.ts', icon: <File className="h-4 w-4" /> },
  { name: 'tsconfig.json', icon: <FileJson className="h-4 w-4" /> },

];

function TreeNode({ node }: { node: FileNode }) {
  const isDirectory = !!node.children;
  const [isOpen, setIsOpen] = React.useState(node.isOpen || false);

  if (isDirectory) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer py-1 px-2 rounded-md hover:bg-muted">
            <ChevronRight
              className={cn(
                'h-4 w-4 transition-transform',
                isOpen && 'rotate-90'
              )}
            />
            {node.icon}
            <span>{node.name}</span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="pl-6 border-l border-dashed border-border ml-3">
            {node.children?.map((child, index) => (
              <TreeNode key={index} node={child} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div className="flex items-center gap-2 py-1 px-2 ml-4">
      <div className="ml-6 flex items-center gap-2">
        {node.icon}
        <span>{node.name}</span>
      </div>
    </div>
  );
}

export function FileExplorer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>File Explorer</CardTitle>
        <CardDescription>
          Browse the file tree of the current project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full rounded-md border p-2 font-mono text-sm">
          {fileTree.map((node, index) => (
            <TreeNode key={index} node={node} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
