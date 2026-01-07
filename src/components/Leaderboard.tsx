import { useEffect, useState, useRef, useCallback } from 'react';
import { getLeaderboard, type LeaderboardEntry } from '../lib/supabase';

interface LeaderboardProps {
  currentUserScore?: { score: number; total: number };
  highlightUsername?: string;
}

const PAGE_SIZE = 20;

export function Leaderboard({ currentUserScore, highlightUsername }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    
    async function loadInitial() {
      setLoading(true);
      const { entries: data, hasMore: more } = await getLeaderboard(PAGE_SIZE, 0);
      if (!cancelled) {
        setEntries(data);
        setHasMore(more);
        setLoading(false);
      }
    }
    
    loadInitial();
    
    return () => { cancelled = true; };
  }, []);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    const { entries: data, hasMore: more } = await getLeaderboard(PAGE_SIZE, entries.length);
    setEntries(prev => [...prev, ...data]);
    setHasMore(more);
    setLoadingMore(false);
  }, [entries.length, hasMore, loadingMore]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const getMedal = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  if (loading) {
    return (
      <div className="bg-stone-800 rounded-2xl p-6 border border-stone-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>🏆</span> Leaderboard
        </h3>
        <div className="text-gray-400 text-center py-8">Loading...</div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bg-stone-800 rounded-2xl p-6 border border-stone-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>🏆</span> Leaderboard
        </h3>
        <div className="text-gray-400 text-center py-8">
          No scores yet. Be the first!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-800 rounded-2xl p-6 border border-stone-700 flex flex-col max-h-[500px]">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 flex-shrink-0">
        <span>🏆</span> Leaderboard
      </h3>
      
      <div 
        ref={scrollContainerRef}
        className="space-y-2 overflow-y-auto flex-1 pr-2"
      >
        {entries.map((entry, index) => {
          const isHighlighted = highlightUsername && entry.username === highlightUsername;
          
          return (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-3 rounded-lg ${
                isHighlighted
                  ? 'bg-orange-900/40 border border-orange-500/50'
                  : 'bg-stone-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 text-center font-medium">
                  {getMedal(index)}
                </span>
                <span className={`font-medium ${isHighlighted ? 'text-orange-300' : 'text-white'}`}>
                  {entry.username}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">
                  {entry.score}/{entry.total}
                </span>
                <span className={`font-semibold ${
                  entry.percentage >= 80 ? 'text-green-400' :
                  entry.percentage >= 60 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {entry.percentage}%
                </span>
              </div>
            </div>
          );
        })}
        
        {loadingMore && (
          <div className="text-gray-400 text-center py-4">Loading more...</div>
        )}
        
        {!hasMore && entries.length > PAGE_SIZE && (
          <div className="text-gray-500 text-center py-2 text-sm">End of leaderboard</div>
        )}
      </div>

      {currentUserScore && (
        <div className="mt-4 pt-4 border-t border-stone-600 text-center text-gray-400 text-sm flex-shrink-0">
          Your score: {currentUserScore.score}/{currentUserScore.total} ({Math.round((currentUserScore.score / currentUserScore.total) * 100)}%)
        </div>
      )}
    </div>
  );
}
