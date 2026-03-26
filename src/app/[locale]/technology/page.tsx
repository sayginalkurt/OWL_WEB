import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Database,
  Brain,
  BarChart3,
  Shield,
  Cpu,
  Globe,
} from "lucide-react";

const pillars = [
  {
    icon: <Database className="h-6 w-6" />,
    title: "Authentic Field Data",
    description:
      "Our foundation is real-world field research — structured surveys, interviews, and observational data collected across Turkiye and beyond. Unlike scraped or synthetic data, our datasets reflect verified human behavior and sentiment.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Proprietary Methodology",
    description:
      "The Field-Weighted Barometer Model (FWBM) uses a proprietary weighting methodology that adjusts for demographic representation, regional variation, and temporal consistency — ensuring statistically robust, commercially relevant indicators.",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI-Powered Analysis",
    description:
      "Our AI layer (Monet) interprets complex datasets, detects emerging trends, generates natural-language insights, and powers our interactive agent — making intelligence accessible to decision-makers at every level.",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Fuzzy Cognitive Mapping",
    description:
      "FuzzyOwl applies Fuzzy Cognitive Map (FCM) theory to model complex causal systems. This mathematical framework captures expert knowledge as weighted directed graphs and supports scenario simulation for strategic planning.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Data Integrity & Governance",
    description:
      "We maintain rigorous data governance — from collection protocols and quality assurance to secure storage and compliant processing. Our data pipeline is designed for auditability and transparency.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Multi-Language Intelligence",
    description:
      "Our platform operates natively in English and Turkish, with content, analysis, and AI interactions available in both languages — supporting cross-market intelligence for international stakeholders.",
  },
];

export default function TechnologyPage() {
  return (
    <main className="section-page-surface">
      <div aria-hidden className="section-page-surface-glow" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Technology
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">
            Technology & AI
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Our technology stack combines rigorous field research methodology
            with advanced AI to deliver intelligence products that are grounded,
            transparent, and commercially valuable.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="border-border/50 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {pillar.icon}
                </div>
                <CardTitle className="text-xl">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Methodology section */}
        <div className="mt-20 rounded-2xl border border-border/50 bg-muted/30 p-8 sm:p-12">
          <h2 className="text-2xl font-bold">Our Research Methodology</h2>
          <p className="mt-4 text-muted-foreground">
            OWL Intelligence products are built on a multi-stage research
            process that ensures data quality, statistical validity, and
            commercial relevance at every step.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Design",
                desc: "Survey and research design with sampling strategy",
              },
              {
                step: "02",
                title: "Collect",
                desc: "Field data collection with quality controls",
              },
              {
                step: "03",
                title: "Process",
                desc: "Cleaning, weighting, and statistical analysis",
              },
              {
                step: "04",
                title: "Deliver",
                desc: "AI-enhanced insights and interactive dashboards",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-lg border border-border/50 bg-background p-4">
                <div className="text-2xl font-bold text-primary">{s.step}</div>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
