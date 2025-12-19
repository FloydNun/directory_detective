'use client';
import {
  TooltipProvider,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import {
  FolderTree,
  GitCompareArrows,
  Copy,
  Save,
  SearchCode,
  Share2,
  GitBranchPlus,
  Package2,
} from 'lucide-react';
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export function Sidebar() {
  return (
      <SidebarPrimitive
        collapsible="icon"
        className="hidden border-r bg-background sm:flex"
      >
        <SidebarContent>
          <SidebarHeader className="flex h-9 w-9 items-center justify-center">
            <Link href="#" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Directory Detective</span>
            </Link>
          </SidebarHeader>

          <SidebarMenu className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <SidebarMenuItem>
              <SidebarMenuButton
                variant="outline"
                size="icon"
                className="h-9 w-9"
                tooltip="File Tree"
                isActive
              >
                <FolderTree className="h-5 w-5" />
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                tooltip="File Differences"
              >
                <GitCompareArrows className="h-5 w-5" />
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                tooltip="Duplicate Files"
              >
                <Copy className="h-5 w-5" />
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                tooltip="File Salvage"
              >
                <Save className="h-5 w-5" />
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                tooltip="Smart Extraction"
              >
                <SearchCode className="h-5 w-5" />
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                tooltip="Visualization"
              >
                <Share2 className="h-5 w-5" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarFooter className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <SidebarMenuItem>
              <SidebarMenuButton
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                tooltip="Gemini CLI"
              >
                <GitBranchPlus className="h-5 w-5" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarFooter>
        </SidebarContent>
      </SidebarPrimitive>
  );
}
