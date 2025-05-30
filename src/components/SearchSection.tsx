
import React, { useState } from 'react';
import { Search, Filter, Camera, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import FilterPanel from './FilterPanel';
import LabelReader from './LabelReader';
import { useApp } from '../contexts/AppContext';

const SearchSection = () => {
  const { filters, setFilters } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [showLabelReader, setShowLabelReader] = useState(false);

  const handleSearchChange = (query: string) => {
    setFilters({ ...filters, query });
  };

  return (
    <section id="busca" className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#706f18] mb-2 sm:mb-3">
          Encontre Alimentos Perfeitos para Sua Dieta
        </h2>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-2">
          Use nossos filtros inteligentes e leitura de rótulos para fazer escolhas saudáveis
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Barra de Pesquisa Principal */}
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <Input
            type="text"
            placeholder="Busque por alimentos, marcas ou ingredientes..."
            value={filters.query}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base lg:text-lg border-2 border-gray-200 focus:border-[#98a550] rounded-lg sm:rounded-xl"
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 justify-center">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white transition-all w-full sm:w-auto"
          >
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Filtros Avançados</span>
            {(filters.allergies.length > 0 || filters.dietType || filters.includedIngredients.length > 0) && (
              <span className="bg-red-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 text-xs flex items-center justify-center">
                {filters.allergies.length + (filters.dietType ? 1 : 0) + filters.includedIngredients.length}
              </span>
            )}
          </Button>

          <Button
            onClick={() => setShowLabelReader(true)}
            className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#706f18] hover:bg-[#5a5a14] transition-all w-full sm:w-auto"
          >
            <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Ler Rótulo</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white transition-all w-full sm:w-auto"
          >
            <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Upload Foto</span>
          </Button>
        </div>

        {/* Painel de Filtros */}
        {showFilters && (
          <div className="animate-fade-in">
            <FilterPanel />
          </div>
        )}

        {/* Leitor de Rótulos */}
        {showLabelReader && (
          <LabelReader onClose={() => setShowLabelReader(false)} />
        )}
      </div>
    </section>
  );
};

export default SearchSection;
