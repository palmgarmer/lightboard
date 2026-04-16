import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col px-4 py-10 sm:px-6">
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle>Modern Next.js Starter</CardTitle>
          <CardDescription>
            App Router + TypeScript + Tailwind + shadcn/ui with dark mode ready.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use this as a starting point for a modular frontend architecture.
          </p>
        </CardContent>
        <CardFooter>
          <Button>
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
