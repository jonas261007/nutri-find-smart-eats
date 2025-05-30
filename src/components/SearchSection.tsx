
import React, { useState, useRef } from 'react';
import { Search, Filter, Camera, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import FilterPanel from './FilterPanel';
import LabelReader from './LabelReader';
import { useApp } from '../contexts/AppContext';
import { toast } from '../components/ui/sonner';

const SearchSection = () => {
  const { filters, setFilters } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [showLabelReader, setShowLabelReader] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (query: string) => {
    setFilters({ ...filters, query });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione um arquivo de imagem válido');
      return;
    }

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Imagem muito grande. Máximo 5MB');
      return;
    }

    // Simular processamento da imagem
    toast.success(`Foto "${file.name}" enviada com sucesso!`);
    console.log('Foto enviada:', file.name, 'Tamanho:', (file.size / 1024).toFixed(1) + 'KB');
    
    // Aqui você poderia integrar com um serviço de análise de imagem
    // Por exemplo, enviar para uma API que identifica alimentos na foto
  };

  return (
    <section id="busca" className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 lg:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#706f18] mb-1 sm:mb-2">
          Encontre Alimentos Perfeitos para Sua Dieta
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm lg:text-base px-1">
          Use nossos filtros inteligentes e leitura de rótulos para fazer escolhas saudáveis
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
        {/* Barra de Pesquisa Principal */}
        <div className="relative">
          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
          <Input
            type="text"
            placeholder="Busque por alimentos, marcas ou ingredientes..."
            value={filters.query}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-8 sm:pl-10 pr-2 sm:pr-3 py-2 sm:py-3 text-xs sm:text-sm lg:text-base border-2 border-gray-200 focus:border-[#98a550] rounded-md sm:rounded-lg"
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:flex-wrap sm:justify-center">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white transition-all text-xs sm:text-sm"
          >
            <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Filtros Avançados</span>
            {(filters.allergies.length > 0 || filters.dietType || filters.includedIngredients.length > 0) && (
              <span className="bg-red-500 text-white rounded-full w-3 h-3 sm:w-4 sm:h-4 text-xs flex items-center justify-center">
                {filters.allergies.length + (filters.dietType ? 1 : 0) + filters.includedIngredients.length}
              </span>
            )}
          </Button>

          <Button
            onClick={() => setShowLabelReader(true)}
            className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-[#706f18] hover:bg-[#5a5a14] transition-all text-xs sm:text-sm"
          >
            <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Ler Rótulo</span>
          </Button>

          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white transition-all text-xs sm:text-sm"
          >
            <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Upload Foto</span>
          </Button>

          {/* Input oculto para upload de arquivo */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
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
