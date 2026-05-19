"use client";

import { ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { findUsStrings } from "@/data/find-us-strings";

export function FallbackInsecure() {
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-4 py-10">
      <Card className="p-6 text-center">
        <ShieldAlert className="mx-auto size-10 text-amber-600" />
        <h1 className="mt-3 text-xl font-bold">{findUsStrings.insecureHeading}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{findUsStrings.insecureBody}</p>
      </Card>
    </div>
  );
}
