import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Landmark,
  ShoppingCart,
  Building2,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

const sectors = [
  {
    key: "banking",
    descKey: "bankingDesc",
    icon: <Landmark className="h-6 w-6" />,
    products: ["FWBM", "FuzzyOwl"],
  },
  {
    key: "fmcg",
    descKey: "fmcgDesc",
    icon: <ShoppingCart className="h-6 w-6" />,
    products: ["FWBM"],
  },
  {
    key: "public",
    descKey: "publicDesc",
    icon: <Building2 className="h-6 w-6" />,
    products: ["FWBM", "FuzzyOwl"],
  },
  {
    key: "investors",
    descKey: "investorsDesc",
    icon: <TrendingUp className="h-6 w-6" />,
    products: ["FWBM"],
  },
  {
    key: "research",
    descKey: "researchDesc",
    icon: <GraduationCap className="h-6 w-6" />,
    products: ["FWBM", "FuzzyOwl"],
  },
];

export default function SolutionsPage() {
  const t = useTranslations("solutions");

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Solutions
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">
            Intelligence Solutions by Sector
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Tailored intelligence products for your industry. Our solutions
            combine real field data with AI-powered analysis to deliver
            actionable insights.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <Card
              key={sector.key}
              className="flex flex-col border-border/50 transition-all hover:border-primary/20 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {sector.icon}
                </div>
                <CardTitle className="text-xl">
                  {t(sector.key as any)}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <p className="text-sm text-muted-foreground">
                  {t(sector.descKey as any)}
                </p>
                <div className="mt-4 flex gap-2">
                  {sector.products.map((p) => (
                    <Badge key={p} variant="outline">
                      {p}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
