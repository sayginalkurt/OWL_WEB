import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/lib/button-variants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const t = useTranslations("home");
  const ct = useTranslations("common");

  return (
    <main className="section-page-surface">
      <div aria-hidden className="section-page-surface-glow" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">{t("heroTitle")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("heroDescription")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* FWBM */}
          <Card className="flex flex-col border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <BarChart3 className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-3xl">{t("fwbmTitle")}</CardTitle>
              <CardDescription className="text-base">
                {t("fwbmDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-end">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Real-time Dashboards</Badge>
                <Badge variant="outline">AI Analysis</Badge>
                <Badge variant="outline">Weekly Updates</Badge>
                <Badge variant="outline">Consumer Sentiment</Badge>
                <Badge variant="outline">Market Intelligence</Badge>
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/products/fwbm"
                  className={cn(buttonVariants())}
                >
                  {ct("learnMore")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/products/fwbm/demo"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  {ct("requestDemo")}
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* FuzzyOwl */}
          <Card className="flex flex-col border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
            <CardHeader>
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Brain className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-3xl">{t("fuzzyowlTitle")}</CardTitle>
              <CardDescription className="text-base">
                {t("fuzzyowlDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-end">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Fuzzy Cognitive Maps</Badge>
                <Badge variant="outline">Scenario Analysis</Badge>
                <Badge variant="outline">Decision Modeling</Badge>
                <Badge variant="outline">Visualization</Badge>
                <Badge variant="outline">AI-Enhanced</Badge>
              </div>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/products/fuzzyowl"
                  className={cn(buttonVariants())}
                >
                  {ct("learnMore")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/products/fuzzyowl/playground"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Try Playground
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
