import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/lib/button-variants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BarChart3,
  LineChart,
  TrendingUp,
  Users,
  Zap,
  Shield,
} from "lucide-react";

const modules = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Consumer Confidence Index",
    description:
      "Weekly-updated consumer confidence tracking based on real field surveys across demographics and regions.",
  },
  {
    icon: <LineChart className="h-5 w-5" />,
    title: "Market Sentiment Dashboard",
    description:
      "Real-time visualization of market sentiment indicators with AI-powered trend detection and alerts.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Demographic Analysis",
    description:
      "Deep-dive analysis of consumer behavior segmented by age, income, geography, and purchasing patterns.",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Monet AI Assistant",
    description:
      "AI-powered analysis assistant that interprets data, generates insights, and answers questions in natural language.",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Custom Indicators",
    description:
      "Build and track custom composite indicators tailored to your business needs and sector dynamics.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "External Data Integration",
    description:
      "Seamless integration with external data sources for enriched, cross-referenced market intelligence.",
  },
];

export default function FWBMPage() {
  const ct = useTranslations("common");

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Product
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            FWBM
          </h1>
          <p className="mt-2 text-xl text-primary">
            Field-Weighted Barometer Model
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Real-time consumer and market sentiment intelligence powered by
            authentic field data. Weekly-updated dashboards, AI-powered analysis,
            and actionable insights for decision makers.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/products/fwbm/demo"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Explore Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              {ct("requestDemo")}
            </Link>
          </div>
        </div>

        {/* Modules */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold">Product Modules</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <Card
                key={mod.title}
                className="border-border/50 transition-all hover:border-primary/20 hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {mod.icon}
                  </div>
                  <CardTitle className="text-lg">{mod.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {mod.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold">Use Cases</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                sector: "Banking & Finance",
                description:
                  "Monitor consumer confidence for credit risk assessment, track economic sentiment for investment strategy, and predict market shifts before they happen.",
              },
              {
                sector: "FMCG & Retail",
                description:
                  "Track consumer spending intentions, monitor brand perception shifts, and forecast demand patterns across regions and demographics.",
              },
              {
                sector: "Policy & Governance",
                description:
                  "Measure public sentiment on economic conditions, evaluate policy impact in real-time, and support evidence-based governance decisions.",
              },
              {
                sector: "Investment & ESG",
                description:
                  "Access alternative data for investment decisions, track ESG-related sentiment indicators, and gain edge with field-verified market intelligence.",
              },
            ].map((uc) => (
              <div
                key={uc.sector}
                className="rounded-xl border border-border/50 p-6"
              >
                <h3 className="font-semibold">{uc.sector}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {uc.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-12">
            <h2 className="text-2xl font-bold">Ready to get started?</h2>
            <p className="mt-2 text-muted-foreground">
              Start your free trial or request a personalized demo.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                {ct("startTrial")}
              </Link>
              <Link
                href="/agent"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" })
                )}
              >
                Talk to Agent
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
