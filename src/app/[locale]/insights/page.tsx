import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const placeholderInsights = [
  {
    title: "Q1 2026 Consumer Confidence Report",
    category: "Report",
    date: "March 2026",
    excerpt:
      "Comprehensive analysis of consumer confidence trends across Turkiye, with sector-specific breakdowns and forward-looking indicators.",
    tags: ["Consumer Confidence", "Turkiye", "Quarterly"],
  },
  {
    title: "AI in Market Research: 2026 Outlook",
    category: "Article",
    date: "February 2026",
    excerpt:
      "How artificial intelligence is transforming market research methodology, from data collection to insight generation.",
    tags: ["AI", "Methodology", "Trends"],
  },
  {
    title: "Fuzzy Cognitive Mapping for Brand Strategy",
    category: "Case Study",
    date: "January 2026",
    excerpt:
      "How a leading FMCG company used FuzzyOwl to model and optimize their brand positioning strategy in a competitive market.",
    tags: ["FuzzyOwl", "FMCG", "Strategy"],
  },
  {
    title: "Financial Sector Sentiment Analysis",
    category: "Report",
    date: "January 2026",
    excerpt:
      "Deep dive into banking and insurance sector sentiment indicators, risk perception trends, and credit demand outlook.",
    tags: ["Banking", "Finance", "FWBM"],
  },
  {
    title: "ESG Sentiment Tracking Methodology",
    category: "Article",
    date: "December 2025",
    excerpt:
      "Our approach to measuring and tracking ESG-related consumer and investor sentiment using field-verified data.",
    tags: ["ESG", "Methodology", "Investment"],
  },
  {
    title: "Retail Demand Forecasting with FWBM",
    category: "Case Study",
    date: "November 2025",
    excerpt:
      "How a major retailer integrated FWBM consumer indicators into their demand planning process, improving forecast accuracy by 23%.",
    tags: ["FWBM", "Retail", "Forecasting"],
  },
];

export default function InsightsPage() {
  return (
    <main className="section-page-surface">
      <div aria-hidden className="section-page-surface-glow" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Insights
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">
            Reports & Insights
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Research reports, case studies, and articles from OWL Intelligence.
          </p>
        </div>

        {/* Filter bar placeholder */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {["All", "Report", "Article", "Case Study"].map((cat) => (
            <Badge
              key={cat}
              variant={cat === "All" ? "default" : "outline"}
              className="cursor-pointer"
            >
              {cat}
            </Badge>
          ))}
        </div>

        {/* Insights grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {placeholderInsights.map((insight) => (
            <Card
              key={insight.title}
              className="flex flex-col border-border/50 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {insight.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {insight.date}
                  </span>
                </div>
                <CardTitle className="text-lg leading-snug">
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <p className="text-sm text-muted-foreground">
                  {insight.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-1">
                  {insight.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
