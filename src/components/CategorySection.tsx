import { Article, Category } from '../lib/supabase';
import ArticleCard from './ArticleCard';
import * as Icons from 'lucide-react';

interface CategorySectionProps {
  category: Category;
  articles: Article[];
}

export default function CategorySection({ category, articles }: CategorySectionProps) {
  const IconComponent = (Icons as any)[category.icon] || Icons.Folder;

  return (
    <section id={category.slug} className="py-12 scroll-mt-20">
      <div className="flex items-center space-x-3 mb-8">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${category.color}20` }}
        >
          <IconComponent className="w-6 h-6" style={{ color: category.color }} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {category.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{category.description}</p>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          Nenhum artigo disponível nesta categoria no momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <button
          className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-cyan-500 dark:hover:border-cyan-500 hover:text-cyan-500 font-semibold rounded-lg transition-all hover:scale-105"
        >
          Ver todos em {category.name}
        </button>
      </div>
    </section>
  );
}
