import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    sections: [
      {
        title: 'Conteúdo',
        links: ['Hardware', 'Inteligência Artificial', 'HealthTech', 'Programação'],
      },
      {
        title: 'Institucional',
        links: ['Sobre Nós', 'Equipe', 'Contato', 'Carreiras'],
      },
      {
        title: 'Legal',
        links: ['Privacidade', 'Termos de Uso', 'Cookies', 'Transparência'],
      },
    ],
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">TP</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">TechPulse Brasil</h3>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Seu portal premium de notícias de tecnologia. Cobertura aprofundada, análises exclusivas e as últimas tendências do mundo tech.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {footerLinks.sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} TechPulse Brasil. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            Desenvolvido com tecnologia de ponta
          </p>
        </div>
      </div>
    </footer>
  );
}
