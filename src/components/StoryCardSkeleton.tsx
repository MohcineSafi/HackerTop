
import { Card, CardContent } from '@/components/ui/card';

const StoryCardSkeleton = () => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-orange-200/50">
      <CardContent className="p-6">
        <div className="space-y-4 animate-pulse">
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded-md"></div>
            <div className="h-5 bg-gray-200 rounded-md w-4/5"></div>
            <div className="h-5 bg-gray-200 rounded-md w-3/5"></div>
          </div>

          {/* Metadata skeleton */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>

          {/* Stats skeleton */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>

          {/* Button skeleton */}
          <div className="h-10 bg-gray-200 rounded-lg mt-4"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryCardSkeleton;
