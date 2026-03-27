"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-variants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, BarChart3, Brain, RotateCcw } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: { label: string; fwbm: number; fuzzyowl: number }[];
}

const questions: Question[] = [
  {
    id: "need",
    text: "What is your primary intelligence need?",
    options: [
      { label: "Track consumer or market sentiment over time", fwbm: 3, fuzzyowl: 0 },
      { label: "Model complex systems and run scenarios", fwbm: 0, fuzzyowl: 3 },
      { label: "Both sentiment tracking and strategic modeling", fwbm: 2, fuzzyowl: 2 },
      { label: "Not sure yet", fwbm: 1, fuzzyowl: 1 },
    ],
  },
  {
    id: "data",
    text: "What kind of data do you primarily work with?",
    options: [
      { label: "Survey data, consumer indicators, time series", fwbm: 3, fuzzyowl: 0 },
      { label: "Expert opinions, causal relationships, strategy variables", fwbm: 0, fuzzyowl: 3 },
      { label: "A mix of quantitative and qualitative data", fwbm: 1, fuzzyowl: 2 },
    ],
  },
  {
    id: "sector",
    text: "Which sector are you in?",
    options: [
      { label: "Banking & Finance", fwbm: 3, fuzzyowl: 1 },
      { label: "FMCG / Retail / Telecom", fwbm: 3, fuzzyowl: 1 },
      { label: "Public sector / Government", fwbm: 2, fuzzyowl: 2 },
      { label: "Investment / ESG / Research", fwbm: 2, fuzzyowl: 2 },
    ],
  },
  {
    id: "output",
    text: "What output do you value most?",
    options: [
      { label: "Live dashboards with regular updates", fwbm: 3, fuzzyowl: 0 },
      { label: "Scenario simulation and what-if analysis", fwbm: 0, fuzzyowl: 3 },
      { label: "Comprehensive reports with AI insights", fwbm: 2, fuzzyowl: 1 },
    ],
  },
];

export default function ProductFinderPage() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ fwbm: 0, fuzzyowl: 0 });
  const [done, setDone] = useState(false);

  function selectOption(option: { fwbm: number; fuzzyowl: number }) {
    const newScores = {
      fwbm: scores.fwbm + option.fwbm,
      fuzzyowl: scores.fuzzyowl + option.fuzzyowl,
    };
    setScores(newScores);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setStep(0);
    setScores({ fwbm: 0, fuzzyowl: 0 });
    setDone(false);
  }

  const recommendation =
    scores.fwbm > scores.fuzzyowl
      ? "fwbm"
      : scores.fuzzyowl > scores.fwbm
        ? "fuzzyowl"
        : "both";

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Tool
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            Which OWL product fits your need?
          </h1>
          <p className="mt-2 text-muted-foreground">
            Answer a few questions and we&apos;ll recommend the right product.
          </p>
        </div>

        <div className="mt-10">
          {!done ? (
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {step + 1} / {questions.length}
                  </Badge>
                </div>
                <CardTitle className="text-xl">
                  {questions[step].text}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {questions[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selectOption(opt)}
                    className="w-full rounded-lg border border-border/50 p-4 text-left text-sm transition-all hover:border-primary/30 hover:bg-accent"
                  >
                    {opt.label}
                  </button>
                ))}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Our Recommendation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {recommendation === "fwbm" && (
                    <>
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                        <BarChart3 className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">FWBM</h3>
                      <p className="mt-2 text-muted-foreground">
                        Based on your answers, FWBM is the best fit. It provides
                        real-time consumer and market sentiment intelligence with
                        weekly-updated dashboards.
                      </p>
                      <Link
                        href="/products"
                        className={cn(buttonVariants({ size: "lg" }), "mt-6")}
                      >
                        Explore Products
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </>
                  )}
                  {recommendation === "fuzzyowl" && (
                    <>
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                        <Brain className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">FuzzyOwl</h3>
                      <p className="mt-2 text-muted-foreground">
                        Based on your answers, FuzzyOwl is the best fit. It
                        enables strategic scenario analysis with Fuzzy Cognitive
                        Mapping.
                      </p>
                      <Link
                        href="/products/fuzzyowl"
                        className={cn(buttonVariants({ size: "lg" }), "mt-6")}
                      >
                        Explore FuzzyOwl
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </>
                  )}
                  {recommendation === "both" && (
                    <>
                      <h3 className="text-2xl font-bold">FWBM + FuzzyOwl</h3>
                      <p className="mt-2 text-muted-foreground">
                        Your needs span both sentiment intelligence and strategic
                        modeling. We recommend exploring both products.
                      </p>
                      <div className="mt-6 flex justify-center gap-4">
                        <a
                          href="https://fwbm.com.tr"
                          target="_blank"
                          rel="noreferrer"
                          className={cn(buttonVariants())}
                        >
                          FWBM
                        </a>
                        <Link
                          href="/products/fuzzyowl"
                          className={cn(buttonVariants({ variant: "outline" }))}
                        >
                          FuzzyOwl
                        </Link>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              <div className="text-center">
                <Button variant="ghost" onClick={reset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
