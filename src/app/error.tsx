"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-muted-foreground mb-6">{error.message || "An unexpected error occurred."}</p>
      <div className="flex space-x-4">
        <Button variant="default" onClick={reset} className="cursor-pointer">
          Try Again
        </Button>
        <Link href="/">
          <Button variant="outline" className="cursor-pointer">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
}