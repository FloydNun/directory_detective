import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  BarChart,
  Search,
  BrainCircuit,
  Bot,
  Settings,
  GitCompare,
  CopyCheck,
  FileScan,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from './icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

export function Sidebar() {
  return (
    <aside className="hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Icons.logo className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">Directory Detective</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <FileScan className="h-5 w-5" />
                <span className="sr-only">File Explorer</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">File Explorer</TooltipContent>
          </Tooltip>
           <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <GitCompare className="h-5 w-5" />
                <span className="sr-only">Difference Analysis</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Difference Analysis</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <CopyCheck className="h-5 w-5" />
                <span className="sr-only">Duplicate Detection</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Duplicate Detection</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <BarChart className="h-5 w-5" />
                <span className="sr-only">Visualization</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Visualization</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Find &amp; Replace</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Find &amp; Replace</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Bot className="h-5 w-5" />
                <span className="sr-only">Gemini AI</span>
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-2 h-4 w-4 shrink-0 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  <span className="sr-only">New</span>
                </Badge>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Gemini AI</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
           <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar?.imageUrl} alt="User Avatar" data-ai-hint={userAvatar?.imageHint} />
            <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </nav>
    </aside>
  );
}
