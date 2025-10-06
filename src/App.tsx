import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroCarousel from './components/HeroCarousel';
import Sidebar from './components/Sidebar';
import { useArticles } from './hooks/useArticles';
import { useMemo } from 'react';
import { categorizeArticles } from './utils/categorizeArticles';

function App() {
  const { articles, loading, error } = useArticles();
  const categorized = useMemo(() => categorizeArticles(articles), [articles]);

  const categoryMeta = [
    { key: 'hardware', title: 'Hardware & Gadgets', icon: '🛠️', gradient: 'from-orange-500 to-amber-600' },
    { key: 'health', title: 'Tech na Saúde', icon: '🧬', gradient: 'from-pink-500 to-rose-600' },
    { key: 'ai', title: 'Inteligência Artificial', icon: '🤖', gradient: 'from-violet-500 to-indigo-600' },
    { key: 'dev', title: 'Programação & Dev', icon: '💻', gradient: 'from-cyan-500 to-blue-600' },
  ] as const;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
            {/* Hero com os 3 primeiros artigos */}
            <HeroCarousel articles={articles.slice(0, 3)} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Coluna principal */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <span>📰</span> Últimas notícias de tecnologia
                  </h2>
                  {error && (
                    <p className="text-red-600 dark:text-red-400">
                      Falha ao carregar notícias. Tente novamente mais tarde.
                    </p>
                  )}
                  {loading && !error && (
                    <p className="text-gray-600 dark:text-gray-300 animate-pulse">
                      Carregando notícias...
                    </p>
                  )}
                  {!loading && !error && articles.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-400">
                      Nenhuma notícia disponível.
                    </p>
                  )}
                </div>

                {/* Seções por categoria */}
                {categoryMeta.map(cat => {
                  const list = (categorized as any)[cat.key] as typeof articles;
                  if (!list.length) return null;
                  return (
                    <section key={cat.key} className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${cat.gradient} text-white text-sm font-semibold shadow`}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.title}</span>
                        </div>
                        <div className="h-px flex-1 bg-gradient-to-r from-gray-300/60 to-transparent dark:from-gray-700/60" />
                      </div>
                      <div className="grid gap-6 sm:grid-cols-2">
                        {list.slice(0, 6).map(a => (
                          <article
                            key={a.url}
                            className="group relative rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-800/60 backdrop-blur border border-gray-200/60 dark:border-gray-700/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                          >
                            {a.image && (
                              <div className="aspect-video overflow-hidden">
                                <img
                                  src={a.image}
                                  alt={a.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            )}
                            <div className="p-4 flex flex-col gap-3">
                              <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                {a.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                {a.description || 'Sem descrição disponível.'}
                              </p>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-500">
                                  {cat.title}
                                </span>
                                <a
                                  href={a.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-cyan-600 dark:text-cyan-400 text-sm font-medium hover:underline"
                                >
                                  Ler →
                                </a>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <Sidebar
                    trendingArticles={articles.slice(0, 5).map(a => ({
                      title: a.title,
                      views: 0,
                      url: a.url
                    }))}
                  />
                  {/* Bloco adicional moderno */}
                  <div className="rounded-2xl p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 text-white shadow-lg border border-gray-700/40">
                    <h4 className="text-lg font-semibold mb-2">Radar de Tendências</h4>
                    <p className="text-sm text-gray-300 mb-4">
                      Resumo das áreas com maior volume de notícias agora.
                    </p>
                    <ul className="space-y-2 text-sm">
                      {categoryMeta.map(cat => {
                        const count = (categorized as any)[cat.key]?.length || 0;
                        return (
                          <li key={cat.key} className="flex justify-between">
                            <span className="flex items-center gap-2">
                              <span>{cat.icon}</span>
                              {cat.title}
                            </span>
                            <span className="text-gray-400">{count}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;