import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="space-y-6 max-w-md px-6">
        <div className="flex justify-center">
          <AlertCircle className="h-24 w-24 text-blue-500/90" />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
        
        <p className="text-muted-foreground text-lg">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>
        
        <div className="pt-4">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-900/20 to-transparent -z-10" />
    </div>
  );
}