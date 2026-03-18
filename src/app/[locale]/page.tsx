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
import {
  ArrowRight,
  BarChart3,
  Brain,
  Building2,
  Globe,
  MessageSquare,
  ShoppingCart,
  Landmark,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const t = useTranslations("home");
  const st = useTranslations("solutions");
  const ct = useTranslations("common");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            AI-Powered Intelligence
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-2 text-2xl font-medium text-primary sm:text-3xl">
            {t("heroSubtitle")}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("heroDescription")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {t("exploreProducts")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/agent"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {t("talkToAgent")}
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="group relative overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t("fwbmTitle")}</CardTitle>
                <CardDescription className="text-base">
                  {t("fwbmDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Real-time Dashboards</Badge>
                  <Badge variant="outline">AI Analysis</Badge>
                  <Badge variant="outline">Weekly Updates</Badge>
                  <Badge variant="outline">Consumer Sentiment</Badge>
                </div>
                <Link
                  href="/products/fwbm"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "mt-6"
                  )}
                >
                  {ct("learnMore")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">
                  {t("fuzzyowlTitle")}
                </CardTitle>
                <CardDescription className="text-base">
                  {t("fuzzyowlDescription")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Fuzzy Cognitive Maps</Badge>
                  <Badge variant="outline">Scenario Analysis</Badge>
                  <Badge variant="outline">Decision Modeling</Badge>
                  <Badge variant="outline">Visualization</Badge>
                </div>
                <Link
                  href="/products/fuzzyowl"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "mt-6"
                  )}
                >
                  {ct("learnMore")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions by Sector */}
      <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("solutionsTitle")}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              {t("solutionsDescription")}
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SolutionCard
              icon={<Landmark className="h-5 w-5" />}
              title={st("banking")}
              description={st("bankingDesc")}
            />
            <SolutionCard
              icon={<ShoppingCart className="h-5 w-5" />}
              title={st("fmcg")}
              description={st("fmcgDesc")}
            />
            <SolutionCard
              icon={<Building2 className="h-5 w-5" />}
              title={st("public")}
              description={st("publicDesc")}
            />
            <SolutionCard
              icon={<TrendingUp className="h-5 w-5" />}
              title={st("investors")}
              description={st("investorsDesc")}
            />
            <SolutionCard
              icon={<GraduationCap className="h-5 w-5" />}
              title={st("research")}
              description={st("researchDesc")}
            />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/solutions"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" })
              )}
            >
              {ct("viewMore")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Globe className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            {t("techTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("techDescription")}
          </p>
          <Link
            href="/technology"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-8"
            )}
          >
            {ct("learnMore")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Agent CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <MessageSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl">{t("ctaTitle")}</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <Link
              href="/agent"
              className={cn(buttonVariants({ size: "lg" }), "mt-6")}
            >
              {t("ctaButton")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SolutionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border/50 transition-all hover:border-primary/20 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
