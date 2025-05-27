
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
    <section id="busca" className="bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#706f18] mb-3">
          Encontre Alimentos Perfeitos para Sua Dieta
        </h2>
        <p className="text-gray-600 text-lg">
          Use nossos filtros inteligentes e leitura de rótulos para fazer escolhas saudáveis
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Barra de Pesquisa Principal */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Busque por alimentos, marcas ou ingredientes..."
            value={filters.query}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-[#98a550] rounded-xl"
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center space-x-2 px-6 py-3 border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white transition-all"
          >
            <Filter className="w-5 h-5" />
            <span>Filtros Avançados</span>
            {(filters.allergies.length > 0 || filters.dietType || filters.includedIngredients.length > 0) && (
              <span className="bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {filters.allergies.length + (filters.dietType ? 1 : 0) + filters.includedIngredients.length}
              </span>
            )}
          </Button>

          <Button
            onClick={() => setShowLabelReader(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-[#706f18] hover:bg-[#5a5a14] transition-all"
          >
            <Camera className="w-5 h-5" />
            <span>Ler Rótulo</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center space-x-2 px-6 py-3 border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white transition-all"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Foto</span>
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
