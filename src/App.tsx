import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroCarousel from './components/HeroCarousel';
import CategorySection from './components/CategorySection';
import Sidebar from './components/Sidebar';
import { useArticles, useFeaturedArticles, useTrendingArticles } from './hooks/useArticles';
import { useCategories } from './hooks/useCategories';

function App() {
  const { articles } = useArticles();
  const { articles: featuredArticles } = useFeaturedArticles();
  const { articles: trendingArticles } = useTrendingArticles();
  const { categories } = useCategories();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />

        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HeroCarousel articles={featuredArticles} />

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-16">
                {categories.map((category) => {
                  const categoryArticles = articles.filter(
                    (article) => article.category_id === category.id
                  );
                  return (
                    <CategorySection
                      key={category.id}
                      category={category}
                      articles={categoryArticles}
                    />
                  );
                })}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Sidebar trendingArticles={trendingArticles} />
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
