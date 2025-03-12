import { Skeleton } from "@/components/ui/skeleton";

export default function LandingLoaderPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="relative w-full h-screen">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Main content skeleton */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8">
          {/* Title skeleton */}
          <div className="space-y-4 text-center max-w-6xl">
            <Skeleton className="h-16 w-[500px] mx-auto bg-[#B0976A]/30 animate-pulse" />
            <Skeleton className="h-16 w-[400px] mx-auto bg-[#B0976A]/30 animate-pulse" />
            <div className="space-y-2">
              <Skeleton className="h-12 w-[600px] mx-auto bg-[#B0976A]/30 animate-pulse" />
              <Skeleton className="h-12 w-[550px] mx-auto bg-[#B0976A]/30 animate-pulse" />
            </div>
          </div>

          {/* Market appraisal banner skeleton */}
          <div className="w-full absolute bottom-0 bg-[#1B392F]/80 py-6">
            <div className="text-center">
              <Skeleton className="h-6 w-[300px] mx-auto bg-[#B0976A]/30 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Navigation skeleton */}
        <div className="absolute top-4 w-full px-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-12 w-48 bg-[#B0976A]/30 animate-pulse" />
            <div className="flex gap-4">
              <Skeleton className="h-8 w-24 bg-[#B0976A]/30 animate-pulse" />
              <Skeleton className="h-8 w-8 rounded-full bg-[#B0976A]/30 animate-pulse" />
              <Skeleton className="h-8 w-8 rounded-full bg-[#B0976A]/30 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}