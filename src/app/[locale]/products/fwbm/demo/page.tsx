"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  Minus,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const indicators = [
  {
    id: "cci",
    name: "Consumer Confidence Index",
    value: 72.4,
    change: 2.3,
    trend: "up",
    data: [
      { month: "Oct", value: 65.2 },
      { month: "Nov", value: 67.8 },
      { month: "Dec", value: 69.1 },
      { month: "Jan", value: 70.5 },
      { month: "Feb", value: 71.2 },
      { month: "Mar", value: 72.4 },
    ],
  },
  {
    id: "ie",
    name: "Inflation Expectations",
    value: 38.7,
    change: -1.2,
    trend: "down",
    data: [
      { month: "Oct", value: 42.1 },
      { month: "Nov", value: 41.3 },
      { month: "Dec", value: 40.5 },
      { month: "Jan", value: 39.8 },
      { month: "Feb", value: 39.2 },
      { month: "Mar", value: 38.7 },
    ],
  },
  {
    id: "si",
    name: "Spending Intention Index",
    value: 55.1,
    change: 0.8,
    trend: "up",
    data: [
      { month: "Oct", value: 51.2 },
      { month: "Nov", value: 52.4 },
      { month: "Dec", value: 53.0 },
      { month: "Jan", value: 54.1 },
      { month: "Feb", value: 54.6 },
      { month: "Mar", value: 55.1 },
    ],
  },
  {
    id: "es",
    name: "Economic Sentiment",
    value: 48.3,
    change: 0.0,
    trend: "flat",
    data: [
      { month: "Oct", value: 47.5 },
      { month: "Nov", value: 48.1 },
      { month: "Dec", value: 47.9 },
      { month: "Jan", value: 48.0 },
      { month: "Feb", value: 48.2 },
      { month: "Mar", value: 48.3 },
    ],
  },
];

const demographicData = [
  { group: "18-24", confidence: 68, spending: 62 },
  { group: "25-34", confidence: 74, spending: 58 },
  { group: "35-44", confidence: 71, spending: 53 },
  { group: "45-54", confidence: 69, spending: 49 },
  { group: "55-64", confidence: 73, spending: 45 },
  { group: "65+", confidence: 76, spending: 42 },
];

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <ArrowUp className="h-4 w-4 text-green-500" />;
  if (trend === "down") return <ArrowDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

export default function FWBMDemoPage() {
  const [selected, setSelected] = useState("cci");
  const selectedIndicator = indicators.find((i) => i.id === selected)!;

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Demo
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            FWBM Demo Explorer
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explore sample indicators and dashboards. Data shown is
            illustrative.
          </p>
        </div>

        {/* Indicator Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {indicators.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setSelected(ind.id)}
              className={`rounded-xl border p-4 text-left transition-all ${
                selected === ind.id
                  ? "border-primary bg-primary/5"
                  : "border-border/50 hover:border-primary/20"
              }`}
            >
              <p className="text-xs text-muted-foreground">{ind.name}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold">{ind.value}</span>
                <span
                  className={`flex items-center gap-0.5 text-xs ${
                    ind.trend === "up"
                      ? "text-green-500"
                      : ind.trend === "down"
                        ? "text-red-500"
                        : "text-muted-foreground"
                  }`}
                >
                  <TrendIcon trend={ind.trend} />
                  {ind.change > 0 ? "+" : ""}
                  {ind.change}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Charts */}
        <Tabs defaultValue="trend" className="mt-10">
          <TabsList>
            <TabsTrigger value="trend">Trend</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>

          <TabsContent value="trend">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedIndicator.name} — 6 Month Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedIndicator.data}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">
                  Confidence & Spending by Age Group
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={demographicData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="group" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar
                        dataKey="confidence"
                        fill="hsl(var(--primary))"
                        name="Confidence"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="spending"
                        fill="hsl(var(--muted-foreground))"
                        name="Spending Intent"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            This is sample data for demonstration purposes. The full FWBM
            platform includes live weekly data, custom indicators, AI analysis,
            and much more.
          </p>
        </div>
      </div>
    </div>
  );
}
