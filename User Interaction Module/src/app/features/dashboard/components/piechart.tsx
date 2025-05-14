"use client";

import * as React from "react";
import { TrendingUp, ChartPie } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Forecasts } from "@/app/types/forecast";
import { Skeleton } from "@/components/ui/skeleton";
import { TransformedForecast } from "@/app/types/forecast";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

interface PieChartProps {
  forecasts?: Forecasts | null;
}

export function PieChart1({ forecasts }: PieChartProps) {
  const { chartData, total, metricName } = React.useMemo(() => {
    if (!forecasts) return { chartData: [], total: 0, metricName: "metric" };

    // Transform data to handle dynamic metrics
    const transformed = Object.entries(forecasts).map(([date, data]) => {
      const [metric, value] = Object.entries(data)[0];
      return {
        date: new Date(date),
        monthYear: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        metric,
        value,
      };
    });

    const sorted = transformed.sort((a, b) => b.value - a.value);
    const top5 = sorted.slice(0, 5).map((item, index) => ({
      ...item,
      fill: colors[index % colors.length],
    }));

    const total = top5.reduce((acc, curr) => acc + curr.value, 0);
    const metricName = top5[0]?.metric || "metric";

    return { chartData: top5, total, metricName };
  }, [forecasts]);

  // Dynamic chart configuration
  const chartConfig = React.useMemo<ChartConfig>(
    () => ({
      [metricName]: {
        label: `${metricName} Distribution`,
        color: colors[0],
      },
    }),
    [metricName]
  );

  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-0 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              Top Performers
            </CardTitle>
            <CardDescription className="mt-1 text-muted-foreground">
              {chartData.length > 0
                ? `5 highest ${metricName.toLowerCase()} months`
                : "Awaiting dataset analysis"}
            </CardDescription>
          </div>
          <ChartPie className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>

      <CardContent className="relative">
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <PieChart className="mx-auto aspect-square max-h-[250px]">
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="monthYear"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                stroke="hsl(var(--background))"
                strokeWidth={4}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <foreignObject
                          x={viewBox.cx ?? 0 - 60}
                          y={viewBox.cy ?? 0 - 30}
                          width={120}
                          height={60}
                          className="text-center"
                        >
                          <div className="flex flex-col items-center justify-center space-y-1">
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                              {total.toLocaleString(undefined, {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                              })}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Top 5 Total
                            </span>
                          </div>
                        </foreignObject>
                      );
                    }
                  }}
                />
              </Pie>

              <ChartTooltip
                content={({ active, payload }) => (
                  <div className="rounded-lg border bg-background px-3 py-2 shadow-sm">
                    {payload?.map((item) => {
                      const dataPoint = item.payload?.payload;
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-2"
                        >
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {dataPoint?.metric}:{" "}
                              {Number(item.value).toLocaleString(undefined, {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="h-[300px] flex flex-col items-center justify-center gap-4">
            <div className="h-12 w-12 bg-muted rounded-full animate-pulse" />
            <p className="text-muted-foreground text-center">
              Analyzing distribution...
              <br />
              <span className="text-xs">This may take a moment</span>
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {chartData.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
            ))}
          </div>
          <span className="text-right">
            {chartData.length > 0 ? "Updated today" : "Waiting for data"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
