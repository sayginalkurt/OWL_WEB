import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Handshake } from "lucide-react";

export default function InvestorsPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Partners
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">
            Investors & Partners
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            The organizations supporting OWL Intelligence's mission.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          <Card className="border-border/50">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building className="h-5 w-5" />
              </div>
              <CardTitle>Investors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Investor information to be provided. OWL Intelligence is backed
                by investors who believe in the power of authentic field data
                combined with AI technology.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Handshake className="h-5 w-5" />
              </div>
              <CardTitle>Strategic Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Partner information to be provided. We work with leading
                organizations in finance, technology, and research to deliver
                comprehensive intelligence solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
