import { useState, useEffect } from 'react';
import { supabase, Article } from '../lib/supabase';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*, categories(*)')
          .order('published_at', { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return { articles, loading, error };
}

export function useFeaturedArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data } = await supabase
          .from('articles')
          .select('*, categories(*)')
          .eq('is_featured', true)
          .order('published_at', { ascending: false })
          .limit(5);

        setArticles(data || []);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  return { articles, loading };
}

export function useTrendingArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const { data } = await supabase
          .from('articles')
          .select('*, categories(*)')
          .order('views', { ascending: false })
          .limit(10);

        setArticles(data || []);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, []);

  return { articles, loading };
}
