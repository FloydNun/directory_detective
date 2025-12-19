import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { File, Folder, ChevronRight, FileCode } from 'lucide-react';

const projectStructure = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'app',
        type: 'folder',
        children: [
          { name: 'globals.css', type: 'file' },
          { name: 'layout.tsx', type: 'file' },
          { name: 'page.tsx', type: 'file' },
        ],
      },
      {
        name: 'components',
        type: 'folder',
        children: [
          {
            name: 'dashboard',
            type: 'folder',
            children: [
              { name: 'diff-analysis-card.tsx', type: 'file' },
              { name: 'duplicate-detection-card.tsx', type: 'file' },
              { name: 'file-explorer.tsx', type: 'file' },
              { name: 'file-salvage-card.tsx', type: 'file' },
              { name: 'find-replace-card.tsx', type: 'file' },
              { name: 'gemini-cli-card.tsx', type: 'file' },
              { name: 'smart-extraction-card.tsx', type: 'file' },
              { name: 'supply-chain-card.tsx', type: 'file' },
              { name: 'dependency-graph.tsx', type: 'file' },
            ],
          },
          { name: 'dashboard-header.tsx', type: 'file' },
          { name: 'sidebar.tsx', type: 'file' },
        ],
      },
       {
        name: 'ai',
        type: 'folder',
        children: [
          {
            name: 'flows',
            type: 'folder',
            children: [{ name: 'supply-chain-analysis.ts', type: 'file' }],
          },
          { name: 'genkit.ts', type: 'file' },
        ],
      },
    ],
  },
  { name: 'package.json', type: 'file' },
  { name: 'tailwind.config.ts', type: 'file' },
];

const FileTree = ({ items }: { items: any[] }) => {
  return (
    <ul className="space-y-1">
      {items.map(item => (
        <li key={item.name}>
          <div className="flex items-center text-sm">
            <ChevronRight className="h-4 w-4 mr-1 flex-shrink-0" />
            {item.type === 'folder' ? (
              <Folder className="h-4 w-4 mr-2 text-mustard" />
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
            <div className="pl-6">
              <FileTree items={item.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export function FileExplorer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>File Explorer</CardTitle>
        <CardDescription>
          Browse and visualize your project's file structure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FileTree items={projectStructure} />
      </CardContent>
    </Card>
  );
}
