const FALLBACK_API_KEY = "089ac3113871e7dc1df10c06722ba27f";
const fromImportMeta =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GNEWS_API_KEY) || undefined;
const fromProcess =
  (typeof process !== 'undefined' && (process as any).env?.VITE_GNEWS_API_KEY) || undefined;
const GNEWS_API_KEY = fromImportMeta || fromProcess || FALLBACK_API_KEY;

let cache: { data: Article[]; ts: number } | null = null;
const CACHE_TTL_MS = 1000 * 60; // 1 minuto

interface FetchOptions {
  signal?: AbortSignal;
}

export interface Article {
  title: string;
  description?: string;
  url: string;
  image?: string;
  publishedAt?: string;
  source?: { name?: string };
  category?: string; // preenchido posteriormente pela categorização
}

export async function fetchTechNews(options: FetchOptions = {}): Promise<Article[]> {
  if (cache && Date.now() - cache.ts < CACHE_TTL_MS) {
    return cache.data;
  }

  const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=pt&country=br&max=10&apikey=${GNEWS_API_KEY}`;

  try {
    const response = await fetch(url, { signal: options.signal });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    const articles: Article[] = (data.articles || []).map((a: any) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.image,
      publishedAt: a.publishedAt,
      source: a.source
    }));
    cache = { data: articles, ts: Date.now() };
    return articles;
  } catch (error) {
    if ((error as any).name === 'AbortError') {
      throw error;
    }
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
}