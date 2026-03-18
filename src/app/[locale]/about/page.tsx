import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";
import { ArrowRight, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            About
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">
            About OWL Intelligence
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Building AI-powered intelligence products grounded in authentic
            field data.
          </p>
        </div>

        <div className="mt-12 space-y-8 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            OWL Intelligence is a UK-based technology company developing
            commercial AI products that transform real-world field data into
            actionable business intelligence. We operate at the intersection of
            rigorous research methodology and modern artificial intelligence.
          </p>
          <p className="leading-relaxed">
            Our flagship product, FWBM (Field-Weighted Barometer Model),
            delivers weekly-updated consumer and market sentiment indicators
            built on authentic field surveys. Our second product, FuzzyOwl,
            brings Fuzzy Cognitive Mapping to strategic decision-making,
            enabling organizations to model complex systems and simulate
            scenarios.
          </p>
          <p className="leading-relaxed">
            We believe that the most valuable intelligence comes from verified
            human data — not scraped feeds or synthetic estimates. Our
            technology stack is designed to preserve this authenticity while
            making the insights accessible, interactive, and commercially
            actionable.
          </p>
        </div>

        {/* Presence */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border/50 p-6">
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="h-5 w-5" />
              <h3 className="font-semibold">United Kingdom</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Headquarters and corporate operations. Company registered in
              England & Wales.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 p-6">
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="h-5 w-5" />
              <h3 className="font-semibold">Turkiye</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Field research operations, data collection infrastructure, and
              market intelligence teams.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/about/founders"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Meet the Founders
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/about/investors"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Investors & Partners
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
