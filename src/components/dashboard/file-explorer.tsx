'use client';
import {
  ChevronRight,
  Folder,
  File,
  FolderGit,
  FileJson,
  FileLock,
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
};

const fileTree: FileNode[] = [
  {
    name: 'src',
    icon: <Folder className="h-4 w-4" />,
    children: [
      {
        name: 'app',
        icon: <Folder className="h-4 w-4" />,
        children: [
          { name: 'page.tsx', icon: <File className="h-4 w-4" /> },
          { name: 'layout.tsx', icon: <File className="h-4 w-4" /> },
          { name: 'globals.css', icon: <File className="h-4 w-4" /> },
        ],
      },
      {
        name: 'components',
        icon: <Folder className="h-4 w-4" />,
        children: [
          { name: 'dashboard.tsx', icon: <File className="h-4 w-4" /> },
          { name: 'sidebar.tsx', icon: <File className="h-4 w-4" /> },
        ],
      },
      {
        name: 'lib',
        icon: <Folder className="h-4 w-4" />,
        children: [{ name: 'utils.ts', icon: <File className="h-4 w-4" /> }],
      },
    ],
  },
  {
    name: 'node_modules',
    icon: <FolderGit className="h-4 w-4 text-red-500" />,
    children: [
      { name: 'react', icon: <File className="h-4 w-4" /> },
      { name: 'next', icon: <File className="h-4 w-4" /> },
    ],
  },
  { name: 'package.json', icon: <FileJson className="h-4 w-4" /> },
  { name: 'package-lock.json', icon: <FileLock className="h-4 w-4" /> },
];

function TreeNode({ node }: { node: FileNode }) {
  const isDirectory = !!node.children;
  const [isOpen, setIsOpen] = React.useState(isDirectory && node.name === 'src');

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
      {node.icon}
      <span>{node.name}</span>
    </div>
  );
}

export function FileExplorer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>File Explorer</CardTitle>
        <CardDescription>
          Browse the file tree of a scanned directory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 w-full rounded-md border p-2 font-mono text-sm">
          {fileTree.map((node, index) => (
            <TreeNode key={index} node={node} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
