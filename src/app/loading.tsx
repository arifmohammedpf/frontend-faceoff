
import { Loader } from "@/components/ui/loader";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh]">
      <Loader className="mb-4" size="lg" />
      <p className="text-muted-foreground">Loading, please wait...</p>
    </div>
  );
}