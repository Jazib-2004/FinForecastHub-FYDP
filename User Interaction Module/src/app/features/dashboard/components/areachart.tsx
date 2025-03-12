"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Forecasts, TransformedForecast } from "@/app/types/forecast";
import { transformForecastData } from "../transformforecast";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

interface AreaChartProps {
  forecasts?: Forecasts | null;
}

export function AreaChart1({ forecasts }: AreaChartProps) {
  const chartData = transformForecastData(forecasts ?? {});
  const dates = Object.keys(forecasts ?? {});
  const hasData = chartData.length > 0;

  // Dynamically get the metric name from the first data point
  const metricName = useMemo(
    () => (hasData ? chartData[0].metric : "average_price"),
    [chartData, hasData]
  );

  // Dynamic chart configuration
  const chartConfig = useMemo<ChartConfig>(
    () => ({
      [metricName]: {
        label: `${metricName} Trend`,
        color: "hsl(var(--primary))",
      },
    }),
    [metricName]
  );

  const startDate = hasData
    ? new Date(dates[0]).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const endDate = hasData
    ? new Date(dates[dates.length - 1]).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-0 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              Market Trend Analysis
            </CardTitle>
            <CardDescription className="mt-1 text-muted-foreground">
              {hasData
                ? `${metricName} forecast from ${startDate} to ${endDate}`
                : "Awaiting dataset analysis"}
            </CardDescription>
          </div>
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>

      <CardContent className="relative">
        {hasData ? (
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: 10, bottom: 0 }}
              className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <defs>
                <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickFormatter={(value: Date) =>
                  value.toLocaleDateString("en-US", { month: "short" })
                }
                padding={{ left: 20, right: 20 }}
              />

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--muted))"
                vertical={false}
              />

              <ChartTooltip
                cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
                content={({ active, payload }) => {
                  if (!active || !payload || payload.length === 0) return null;

                  const dataPoint = payload[0].payload; // Get full data point
                  return (
                    <div className="rounded-lg border bg-background px-3 py-2 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: payload[0].color }}
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {dataPoint.metric} {/* Dynamic metric name */}
                          </p>
                          <p className="text-sm">
                            $
                            {Number(dataPoint.value).toLocaleString(undefined, {
                              maximumFractionDigits: 0,
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(dataPoint.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#valueGradient)"
                fillOpacity={1}
                animationDuration={600}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="h-[300px] flex flex-col items-center justify-center gap-4">
            <div className="h-12 w-12 bg-muted rounded-full animate-pulse" />
            <p className="text-muted-foreground text-center">
              Analyzing market trends...
              <br />
              <span className="text-xs">This may take a moment</span>
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Current {metricName?.toLowerCase()} trend
          </span>
          <span className="text-right">
            {hasData ? "Updated today" : "Waiting for data"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
