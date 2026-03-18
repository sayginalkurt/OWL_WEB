import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";

const founders = [
  {
    name: "Founder 1",
    role: "Co-Founder & CEO",
    bio: "Background and expertise to be provided. Leading OWL Intelligence's vision and commercial strategy.",
  },
  {
    name: "Founder 2",
    role: "Co-Founder & CTO",
    bio: "Background and expertise to be provided. Leading OWL Intelligence's technology and product development.",
  },
];

export default function FoundersPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Team
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">Founders</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            The team behind OWL Intelligence.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {founders.map((founder) => (
            <Card
              key={founder.name}
              className="border-border/50"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardTitle>{founder.name}</CardTitle>
                <p className="text-sm text-primary">{founder.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-muted-foreground">
                  {founder.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
