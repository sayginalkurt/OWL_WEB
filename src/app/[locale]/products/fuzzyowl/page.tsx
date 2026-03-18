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
  Brain,
  GitBranch,
  Eye,
  FileBarChart,
  Lightbulb,
  Network,
} from "lucide-react";

const features = [
  {
    icon: <Network className="h-5 w-5" />,
    title: "Fuzzy Cognitive Maps",
    description:
      "Model complex systems as interconnected concepts with weighted causal relationships. Capture expert knowledge in a structured, computable format.",
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "Scenario Simulation",
    description:
      "Run what-if scenarios by adjusting concept values and observing how changes propagate through the system. Compare outcomes side by side.",
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: "Interactive Visualization",
    description:
      "Explore your cognitive maps with interactive graph visualizations. Drag, zoom, and highlight pathways to understand complex relationships.",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "AI-Enhanced Analysis",
    description:
      "Leverage AI to suggest missing relationships, identify feedback loops, and optimize your cognitive map structure.",
  },
  {
    icon: <FileBarChart className="h-5 w-5" />,
    title: "Deliverable Reports",
    description:
      "Generate comprehensive reports with scenario comparisons, sensitivity analyses, and strategic recommendations.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Expert Knowledge Capture",
    description:
      "Structured methodology for eliciting and encoding domain expertise into quantifiable models for decision support.",
  },
];

export default function FuzzyOwlPage() {
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
            FuzzyOwl
          </h1>
          <p className="mt-2 text-xl text-primary">
            Fuzzy Cognitive Mapping for Strategic Decision-Making
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Model complex systems, simulate strategic decisions, and visualize
            outcomes with our Fuzzy Cognitive Mapping platform. Turn expert
            knowledge into actionable, data-driven strategy.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/products/fuzzyowl/playground"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Try Playground
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

        {/* How FCM Works */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold">
            How Fuzzy Cognitive Mapping Works
          </h2>
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Define Concepts",
                  desc: "Identify the key factors, variables, and concepts that influence your strategic question.",
                },
                {
                  step: "2",
                  title: "Map Relationships",
                  desc: "Draw causal connections between concepts with fuzzy weights (-1 to +1) representing influence strength and direction.",
                },
                {
                  step: "3",
                  title: "Run Simulations",
                  desc: "Activate scenarios by changing concept values and observe how effects propagate through the entire system.",
                },
                {
                  step: "4",
                  title: "Analyze & Decide",
                  desc: "Compare scenario outcomes, identify leverage points, and make data-informed strategic decisions.",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold">
            Platform Features
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.title}
                className="border-border/50 transition-all hover:border-primary/20 hover:shadow-md"
              >
                <CardHeader className="pb-3">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {f.icon}
                  </div>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {f.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-12">
            <h2 className="text-2xl font-bold">
              Ready to model your next strategic decision?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Start with our interactive playground or contact us for a
              guided demo.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/products/fuzzyowl/playground"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Open Playground
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" })
                )}
              >
                {ct("requestDemo")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
