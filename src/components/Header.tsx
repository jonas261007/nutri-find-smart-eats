
import React from 'react';
import { Search, MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-[#706f18] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#98a550] rounded-full flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">HealthyFood</h1>
              <p className="text-green-200 text-sm">Alimentos saudáveis para sua dieta</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#busca" className="hover:text-green-200 transition-colors">Buscar</a>
            <a href="#resultados" className="hover:text-green-200 transition-colors">Produtos</a>
            <a href="#mapa" className="hover:text-green-200 transition-colors">Localização</a>
            <a href="#parcerias" className="hover:text-green-200 transition-colors">Academias</a>
          </nav>

          <div className="flex items-center space-x-2 text-green-200">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Recife, PE</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
