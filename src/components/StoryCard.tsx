
import { ExternalLink, User, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HNStory {
  objectID: string;
  title: string;
  author: string;
  url: string;
  points: number;
  num_comments: number;
  created_at: string;
  _tags: string[];
}

interface StoryCardProps {
  story: HNStory;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getDomainFromUrl = (url: string) => {
    if (!url) return 'news.ycombinator.com';
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'news.ycombinator.com';
    }
  };

  const handleReadMore = () => {
    const targetUrl = story.url || `https://news.ycombinator.com/item?id=${story.objectID}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-orange-200/50 hover:border-orange-300">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors line-clamp-3">
            {story.title}
          </h2>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatTimeAgo(story.created_at)}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-orange-600 font-medium">
                {story.points} points
              </span>
              <div className="flex items-center gap-1 text-gray-500">
                <MessageSquare className="w-4 h-4" />
                <span>{story.num_comments}</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-400">
              {getDomainFromUrl(story.url)}
            </div>
          </div>

          {/* Read More Button */}
          <button
            onClick={handleReadMore}
            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] font-medium"
          >
            <span>Read More</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
