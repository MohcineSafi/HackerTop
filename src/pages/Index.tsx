
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ExternalLink, Clock, User, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import StoryCard from '@/components/StoryCard';
import StoryCardSkeleton from '@/components/StoryCardSkeleton';

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

interface HNResponse {
  hits: HNStory[];
  nbHits: number;
}

const fetchTopStories = async (): Promise<HNResponse> => {
  const response = await fetch(
    'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }
  return response.json();
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
  });

  const filteredStories = data?.hits?.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.author.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-orange-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">HN</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Hacker News</h1>
                  <p className="text-sm text-gray-600">Today's Top Stories</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Updated live</span>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search stories and authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/70 border-orange-200/50 focus:border-orange-400 focus:ring-orange-400/20"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Failed to load stories. Please try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {searchTerm && !isLoading && (
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredStories.length} result{filteredStories.length !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            // Show skeleton cards while loading
            Array.from({ length: 12 }).map((_, index) => (
              <StoryCardSkeleton key={index} />
            ))
          ) : (
            filteredStories.map((story) => (
              <StoryCard key={story.objectID} story={story} />
            ))
          )}
        </div>

        {!isLoading && filteredStories.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stories found matching your search.</p>
          </div>
        )}

        {!isLoading && !searchTerm && (
          <div className="text-center mt-12 py-8 border-t border-orange-200/50">
            <p className="text-gray-500">
              Showing top {data?.hits?.length || 0} stories from Hacker News
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
