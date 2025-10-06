import { useEffect, useState } from "react";
import { fetchTechNews, Article } from "../lib/newsApi";

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const news = await fetchTechNews({ signal: controller.signal });
        setArticles(news);
      } catch (e: any) {
        if (e.name !== 'AbortError') {
          setError("Erro ao carregar notícias");
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  return { articles, loading, error };
}