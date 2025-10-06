import { Article } from '../lib/newsApi';

type Categories = 'hardware' | 'health' | 'ai' | 'dev';

export interface CategorizedArticles {
  hardware: Article[];
  health: Article[];
  ai: Article[];
  dev: Article[];
}

const KEYWORDS: Record<Categories, string[]> = {
  hardware: ['chip', 'processador', 'intel', 'amd', 'nvidia', 'gpu', 'cpu', 'placa-mãe', 'ssd', 'hardware', 'dispositivo', 'gadget', 'smartphone', 'iphone', 'android'],
  health: ['saúde', 'health', 'medic', 'hospital', 'biotec', 'biotech', 'wearable', 'diagnóstico', 'genoma', 'genetic'],
  ai: ['ia', 'ai', 'inteligência artificial', 'machine learning', 'ml', 'deep learning', 'modelo', 'openai', 'chatgpt', 'neur', 'llm'],
  dev: ['dev', 'programa', 'framework', 'javascript', 'typescript', 'python', 'golang', 'docker', 'kubernetes', 'api', 'react', 'node', 'cloud', 'aws', 'azure', 'git'],
};

export function categorizeArticles(articles: Article[]): CategorizedArticles {
  const result: CategorizedArticles = { hardware: [], health: [], ai: [], dev: [] };

  articles.forEach(a => {
    const text = `${a.title} ${a.description || ''}`.toLowerCase();
    const matched = (Object.keys(KEYWORDS) as Categories[]).find(cat =>
      KEYWORDS[cat].some(k => text.includes(k))
    );
    if (matched) {
      result[matched].push(a);
    } else {
      // fallback joga em dev (geral)
      result.dev.push(a);
    }
  });

  return result;
}
