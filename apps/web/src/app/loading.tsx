import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section Skeleton */}
      <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
