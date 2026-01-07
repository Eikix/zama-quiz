import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jsiwryphisanlinymmgx.supabase.co';
const supabaseAnonKey = 'sb_publishable_pHL3xVqNYbBa_NhB0HrPgw_bZUgIz3n';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  total: number;
  percentage: number;
  created_at: string;
}

export async function submitScore(username: string, score: number, total: number): Promise<boolean> {
  const percentage = Math.round((score / total) * 10000) / 100;
  
  const { error } = await supabase
    .from('leaderboard')
    .insert({ username, score, total, percentage });
  
  return !error;
}

export async function getLeaderboard(limit = 20, offset = 0): Promise<{ entries: LeaderboardEntry[]; hasMore: boolean }> {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('percentage', { ascending: false })
    .order('created_at', { ascending: true })
    .range(offset, offset + limit - 1);
  
  if (error) {
    console.error('Failed to fetch leaderboard:', error);
    return { entries: [], hasMore: false };
  }
  
  return { 
    entries: data || [], 
    hasMore: (data?.length || 0) === limit 
  };
}
