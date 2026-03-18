"use client";

import { useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Play, RotateCcw, Plus } from "lucide-react";

interface Concept {
  id: string;
  name: string;
  value: number;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

const initialConcepts: Concept[] = [
  { id: "c1", name: "Brand Awareness", value: 0.7 },
  { id: "c2", name: "Customer Satisfaction", value: 0.6 },
  { id: "c3", name: "Repeat Purchase", value: 0.5 },
  { id: "c4", name: "Revenue", value: 0.4 },
  { id: "c5", name: "Marketing Spend", value: 0.8 },
];

const initialEdges: Edge[] = [
  { from: "c5", to: "c1", weight: 0.7 },
  { from: "c1", to: "c2", weight: 0.5 },
  { from: "c2", to: "c3", weight: 0.8 },
  { from: "c3", to: "c4", weight: 0.9 },
  { from: "c4", to: "c5", weight: 0.3 },
  { from: "c1", to: "c3", weight: 0.3 },
];

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-5 * (x - 0.5)));
}

export default function FuzzyOwlPlayground() {
  const [concepts, setConcepts] = useState<Concept[]>(initialConcepts);
  const [edges] = useState<Edge[]>(initialEdges);
  const [iterations, setIterations] = useState(0);
  const [history, setHistory] = useState<Concept[][]>([initialConcepts]);

  const simulate = useCallback(() => {
    setConcepts((prev) => {
      const newConcepts = prev.map((concept) => {
        const incomingEdges = edges.filter((e) => e.to === concept.id);
        if (incomingEdges.length === 0) return concept;

        let sum = 0;
        for (const edge of incomingEdges) {
          const source = prev.find((c) => c.id === edge.from);
          if (source) {
            sum += source.value * edge.weight;
          }
        }

        const newValue = sigmoid(sum / incomingEdges.length);
        return { ...concept, value: Math.round(newValue * 100) / 100 };
      });

      setHistory((h) => [...h, newConcepts]);
      setIterations((i) => i + 1);
      return newConcepts;
    });
  }, [edges]);

  function reset() {
    setConcepts(initialConcepts);
    setIterations(0);
    setHistory([initialConcepts]);
  }

  function updateConceptValue(id: string, value: number) {
    setConcepts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, value } : c))
    );
  }

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Playground
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            FuzzyOwl Mini Playground
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explore how Fuzzy Cognitive Maps work. Adjust concept values and
            simulate to see how changes propagate.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Concept controls */}
          <div className="lg:col-span-1">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Concepts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {concepts.map((concept) => (
                  <div key={concept.id}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{concept.name}</span>
                      <span className="text-muted-foreground">
                        {concept.value.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={concept.value}
                      onChange={(e) =>
                        updateConceptValue(concept.id, parseFloat(e.target.value))
                      }
                      className="mt-1 w-full accent-primary"
                    />
                  </div>
                ))}

                <div className="flex gap-2 pt-2">
                  <Button onClick={simulate} className="flex-1" size="sm">
                    <Play className="mr-2 h-3 w-3" />
                    Simulate
                  </Button>
                  <Button variant="outline" onClick={reset} size="sm">
                    <RotateCcw className="mr-2 h-3 w-3" />
                    Reset
                  </Button>
                </div>
                <p className="text-center text-xs text-muted-foreground">
                  Iterations: {iterations}
                </p>
              </CardContent>
            </Card>

            {/* Edges info */}
            <Card className="mt-4 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Relationships</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {edges.map((edge, i) => {
                  const from = concepts.find((c) => c.id === edge.from);
                  const to = concepts.find((c) => c.id === edge.to);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between text-xs"
                    >
                      <span>
                        {from?.name} → {to?.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {edge.weight > 0 ? "+" : ""}
                        {edge.weight}
                      </Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Concept Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-[400px] rounded-lg border border-border/30 bg-muted/20">
                  <svg
                    viewBox="0 0 600 400"
                    className="h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Edges */}
                    {edges.map((edge, i) => {
                      const positions: Record<string, { x: number; y: number }> = {
                        c1: { x: 300, y: 60 },
                        c2: { x: 500, y: 160 },
                        c3: { x: 420, y: 320 },
                        c4: { x: 180, y: 320 },
                        c5: { x: 100, y: 160 },
                      };
                      const from = positions[edge.from];
                      const to = positions[edge.to];
                      if (!from || !to) return null;
                      return (
                        <g key={i}>
                          <line
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke="currentColor"
                            strokeOpacity={0.2}
                            strokeWidth={Math.abs(edge.weight) * 3}
                            markerEnd="url(#arrow)"
                          />
                          <text
                            x={(from.x + to.x) / 2}
                            y={(from.y + to.y) / 2 - 8}
                            textAnchor="middle"
                            className="fill-muted-foreground text-[10px]"
                          >
                            {edge.weight > 0 ? "+" : ""}
                            {edge.weight}
                          </text>
                        </g>
                      );
                    })}
                    <defs>
                      <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="10"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                      >
                        <path
                          d="M 0 0 L 10 5 L 0 10 z"
                          fill="currentColor"
                          fillOpacity="0.3"
                        />
                      </marker>
                    </defs>
                    {/* Nodes */}
                    {concepts.map((concept) => {
                      const positions: Record<
                        string,
                        { x: number; y: number }
                      > = {
                        c1: { x: 300, y: 60 },
                        c2: { x: 500, y: 160 },
                        c3: { x: 420, y: 320 },
                        c4: { x: 180, y: 320 },
                        c5: { x: 100, y: 160 },
                      };
                      const pos = positions[concept.id];
                      if (!pos) return null;
                      const size = 30 + concept.value * 20;
                      return (
                        <g key={concept.id}>
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={size}
                            className="fill-primary/20 stroke-primary"
                            strokeWidth={2}
                          />
                          <text
                            x={pos.x}
                            y={pos.y - 4}
                            textAnchor="middle"
                            className="fill-foreground text-[11px] font-medium"
                          >
                            {concept.name}
                          </text>
                          <text
                            x={pos.x}
                            y={pos.y + 12}
                            textAnchor="middle"
                            className="fill-primary text-[12px] font-bold"
                          >
                            {concept.value.toFixed(2)}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Simulation History */}
            {history.length > 1 && (
              <Card className="mt-4 border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Simulation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 text-left font-medium">Step</th>
                          {concepts.map((c) => (
                            <th key={c.id} className="pb-2 text-right font-medium">
                              {c.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((snap, i) => (
                          <tr key={i} className="border-b border-border/30">
                            <td className="py-1.5 text-muted-foreground">
                              {i === 0 ? "Initial" : `Step ${i}`}
                            </td>
                            {snap.map((c) => (
                              <td key={c.id} className="py-1.5 text-right">
                                {c.value.toFixed(2)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            This is a simplified demonstration. The full FuzzyOwl platform
            supports custom concept creation, edge editing, multi-scenario
            comparison, and AI-enhanced analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
