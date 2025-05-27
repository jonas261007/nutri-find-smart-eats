
import React from 'react';
import { X } from 'lucide-react';
import { SearchFilters } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

interface FilterPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const commonAllergies = ['Glúten', 'Lactose', 'Nozes', 'Soja', 'Ovos', 'Peixe', 'Crustáceos'];
  const dietTypes = ['Vegana', 'Vegetariana', 'Keto', 'Low Carb', 'Paleo', 'Mediterrânea'];

  const toggleAllergy = (allergy: string) => {
    const newAllergies = filters.allergies.includes(allergy)
      ? filters.allergies.filter(a => a !== allergy)
      : [...filters.allergies, allergy];
    onFilterChange({ ...filters, allergies: newAllergies });
  };

  const setDietType = (diet: string) => {
    onFilterChange({ ...filters, dietType: diet === filters.dietType ? '' : diet });
  };

  return (
    <div className="bg-[#fff5bb] rounded-xl p-6 border-2 border-[#98a550]">
      <h3 className="text-xl font-semibold text-[#706f18] mb-6">Filtros Personalizados</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Alergias e Restrições */}
        <div>
          <h4 className="font-medium text-[#706f18] mb-3">Alergias e Intolerâncias</h4>
          <div className="flex flex-wrap gap-2">
            {commonAllergies.map(allergy => (
              <Badge
                key={allergy}
                variant={filters.allergies.includes(allergy) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  filters.allergies.includes(allergy)
                    ? 'bg-[#706f18] hover:bg-[#5a5a14]'
                    : 'border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white'
                }`}
                onClick={() => toggleAllergy(allergy)}
              >
                {allergy}
                {filters.allergies.includes(allergy) && (
                  <X className="w-3 h-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tipo de Dieta */}
        <div>
          <h4 className="font-medium text-[#706f18] mb-3">Tipo de Dieta</h4>
          <div className="flex flex-wrap gap-2">
            {dietTypes.map(diet => (
              <Badge
                key={diet}
                variant={filters.dietType === diet ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  filters.dietType === diet
                    ? 'bg-[#706f18] hover:bg-[#5a5a14]'
                    : 'border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white'
                }`}
                onClick={() => setDietType(diet)}
              >
                {diet}
              </Badge>
            ))}
          </div>
        </div>

        {/* Faixa de Preço */}
        <div>
          <h4 className="font-medium text-[#706f18] mb-3">Faixa de Preço</h4>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">R$</span>
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => onFilterChange({
                ...filters,
                priceRange: [Number(e.target.value), filters.priceRange[1]]
              })}
              className="w-20"
            />
            <span className="text-gray-400">até</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => onFilterChange({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)]
              })}
              className="w-20"
            />
          </div>
        </div>

        {/* Localização */}
        <div>
          <h4 className="font-medium text-[#706f18] mb-3">Localização</h4>
          <Input
            type="text"
            placeholder="CEP ou bairro"
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="border-[#98a550] focus:border-[#706f18]"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="outline" onClick={() => onFilterChange({
          query: '',
          includedIngredients: [],
          excludedIngredients: [],
          allergies: [],
          dietType: '',
          priceRange: [0, 100],
          location: ''
        })}>
          Limpar Filtros
        </Button>
        <Button className="bg-[#706f18] hover:bg-[#5a5a14]">
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
