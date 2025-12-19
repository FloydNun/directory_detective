import { DashboardHeader } from '@/components/dashboard-header';
import { Sidebar } from '@/components/sidebar';
import { FileExplorer } from './dashboard/file-explorer';
import { DependencyGraph } from './dashboard/dependency-graph';
import { FindReplaceCard } from './dashboard/find-replace-card';
import { FileSalvageCard } from './dashboard/file-salvage-card';
import { GeminiCliCard } from './dashboard/gemini-cli-card';
import { SmartExtractionCard } from './dashboard/smart-extraction-card';
import { DuplicateDetectionCard } from './dashboard/duplicate-detection-card';
import { DiffAnalysisCard } from './dashboard/diff-analysis-card';
import { SupplyChainCard } from './dashboard/supply-chain-card';
import { SidebarProvider } from '@/components/ui/sidebar';

export function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <div className="flex flex-1 flex-col gap-4 p-4 sm:p-0">
              <DashboardHeader />
              <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                    <DuplicateDetectionCard />
                    <DiffAnalysisCard />
                    <FindReplaceCard />
                    <FileSalvageCard />
                  </div>
                  <div className="grid gap-4">
                    <FileExplorer />
                    <SupplyChainCard />
                  </div>
                </div>
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
                  <SmartExtractionCard />
                  <GeminiCliCard />
                  <DependencyGraph />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
