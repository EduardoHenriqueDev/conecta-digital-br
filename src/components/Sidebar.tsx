import { TrendingUp, Star, Mail } from 'lucide-react';

type SidebarArticle = {
  id?: string;
  title: string;
  views?: number;
  url?: string;
};

interface SidebarProps {
  trendingArticles: SidebarArticle[];
}

export default function Sidebar({ trendingArticles }: SidebarProps) {
  return (
    <aside className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-red-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mais Lidas</h3>
        </div>

        <div className="space-y-4">
          {trendingArticles.slice(0, 5).map((article, index) => {
            const views = typeof article.views === 'number' ? article.views : 0;
            return (
              <div
                key={article.id || article.url || article.title + index}
                className="flex space-x-3 group cursor-pointer"
              >
                <span className="text-3xl font-bold text-gray-200 dark:text-gray-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {views.toLocaleString('pt-BR')} visualizações
                  </p>
                </div>
              </div>
            );
          })}
          {trendingArticles.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">Sem dados.</p>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-6 shadow-lg text-white">
        <div className="flex items-center space-x-2 mb-3">
          <Star className="w-5 h-5" />
          <h3 className="text-xl font-bold">Artigos Premium</h3>
        </div>
        <p className="text-sm text-cyan-50 mb-4">
          Acesse análises exclusivas e conteúdo aprofundado dos nossos especialistas.
        </p>
        <button className="w-full px-4 py-2 bg-white text-cyan-600 font-semibold rounded-lg hover:bg-cyan-50 transition-colors">
          Saiba Mais
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Mail className="w-5 h-5 text-cyan-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Newsletter</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Receba as principais notícias de tecnologia direto no seu email.
        </p>
        <input
          type="email"
          placeholder="seu@email.com"
          className="w-full px-4 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors">
          Inscrever-se
        </button>
      </div>
    </aside>
  );
}
