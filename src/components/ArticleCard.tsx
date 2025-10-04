import { Clock, Eye, TrendingUp } from 'lucide-react';
import { Article } from '../lib/supabase';

interface ArticleCardProps {
  article: Article;
  size?: 'small' | 'medium' | 'large';
}

export default function ArticleCard({ article, size = 'medium' }: ArticleCardProps) {
  const sizeClasses = {
    small: 'h-64',
    medium: 'h-80',
    large: 'h-96',
  };

  return (
    <article className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className={`relative ${sizeClasses[size]} overflow-hidden`}>
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {article.is_trending && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>TRENDING</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
          <div className="flex items-center space-x-3 mb-2">
            <span
              className="px-2 py-1 text-xs font-semibold rounded-md"
              style={{
                backgroundColor: article.categories?.color || '#3B82F6',
                color: 'white',
              }}
            >
              {article.categories?.name || 'Tech'}
            </span>
            <div className="flex items-center space-x-3 text-gray-300 text-xs">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>
                  {new Date(article.published_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{article.views.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>

          <h3 className="text-white font-bold text-lg lg:text-xl mb-2 line-clamp-2 leading-tight">
            {article.title}
          </h3>

          <p className="text-gray-200 text-sm line-clamp-2 mb-3">{article.excerpt}</p>

          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-xs">Por {article.author}</span>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
              Ler mais →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
