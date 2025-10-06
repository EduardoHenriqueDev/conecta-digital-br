import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Eye } from 'lucide-react';
// Substitui import do Article (não usado com news API)
import type {} from 'react'; // mantém arquivo como módulo
// Tipagem flexível para suportar artigos do Supabase ou da API externa
type CarouselArticle = {
  title: string;
  image_url?: string;
  image?: string;
  excerpt?: string;
  description?: string;
  author?: string;
  published_at?: string;
  publishedAt?: string;
  views?: number;
};

interface HeroCarouselProps {
  articles: CarouselArticle[];
}

export default function HeroCarousel({ articles }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index quando mudar tamanho
  useEffect(() => {
    if (!articles.length) {
      setCurrentIndex(0);
      return;
    }
    if (currentIndex >= articles.length || !Number.isFinite(currentIndex)) {
      setCurrentIndex(0);
    }
  }, [articles.length]);

  useEffect(() => {
    if (articles.length <= 1) return; // não cria intervalo desnecessário
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (articles.length === 0) return 0;
        return (prev + 1) % articles.length;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [articles.length]);

  const goToPrevious = () => {
    if (!articles.length) return;
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const goToNext = () => {
    if (!articles.length) return;
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  if (articles.length === 0) return null;

  const currentArticle = articles[currentIndex];
  if (!currentArticle) return null;

  const image =
    currentArticle.image_url ||
    currentArticle.image ||
    'https://via.placeholder.com/1200x600?text=Sem+Imagem';
  const excerpt = currentArticle.excerpt || currentArticle.description || '';
  const published =
    currentArticle.published_at ||
    currentArticle.publishedAt ||
    new Date().toISOString();
  const views = currentArticle.views ?? 0;

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-2xl group">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out transform group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-4 mb-4">
            <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-semibold rounded-full">
              DESTAQUE
            </span>
            <div className="flex items-center space-x-4 text-gray-300 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(published).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{views.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {currentArticle.title}
          </h2>

          <p className="text-gray-200 text-base lg:text-lg mb-6 line-clamp-2">
            {excerpt}
          </p>

          <div className="flex items-center space-x-4">
            <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all hover:scale-105 transform">
              Ler Mais
            </button>
            <span className="text-gray-300 text-sm">
              Por {currentArticle.author || 'Desconhecido'}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
