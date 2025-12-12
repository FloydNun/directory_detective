'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const data = [
  { name: 'page.tsx', dependencies: 5, size: 2.3 },
  { name: 'layout.tsx', dependencies: 3, size: 1.1 },
  { name: 'dashboard.tsx', dependencies: 8, size: 5.8 },
  { name: 'sidebar.tsx', dependencies: 2, size: 2.1 },
  { name: 'utils.ts', dependencies: 10, size: 0.5 },
  { name: 'globals.css', dependencies: 1, size: 1.5 },
];

export function DependencyGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dependency Visualization</CardTitle>
        <CardDescription>
          Visual representation of file dependencies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar dataKey="dependencies" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
