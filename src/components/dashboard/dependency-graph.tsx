import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Share2 } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from 'recharts';

const chartData = [
  { component: 'Sidebar', dependencies: 5 },
  { component: 'Dashboard', dependencies: 8 },
  { component: 'FileExplorer', dependencies: 3 },
  { component: 'GeminiCLI', dependencies: 2 },
  { component: 'SupplyChain', dependencies: 4 },
];

const chartConfig = {
  dependencies: {
    label: 'Dependencies',
    color: 'hsl(var(--primary))',
  },
};

export function DependencyGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          <span>Visualization</span>
        </CardTitle>
        <CardDescription>
          Interactive dependency graph of your components.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="component"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="dependencies"
              fill="var(--color-dependencies)"
              radius={4}
              activeBar={<Rectangle fill="hsl(var(--accent))" />}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
