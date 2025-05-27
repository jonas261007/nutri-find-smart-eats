
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { useApp } from '../contexts/AppContext';

const FilterPanel = () => {
  const { filters, setFilters } = useApp();
  
  const commonAllergies = ['Glúten', 'Lactose', 'Nozes', 'Soja', 'Ovos', 'Peixe', 'Crustáceos'];
  const dietTypes = ['Vegana', 'Vegetariana', 'Keto', 'Low Carb', 'Paleo', 'Mediterrânea'];

  const toggleAllergy = (allergy: string) => {
    const newAllergies = filters.allergies.includes(allergy)
      ? filters.allergies.filter(a => a !== allergy)
      : [...filters.allergies, allergy];
    setFilters({ ...filters, allergies: newAllergies });
  };

  const setDietType = (diet: string) => {
    setFilters({ ...filters, dietType: diet === filters.dietType ? '' : diet });
  };

  const addIncludedIngredient = (ingredient: string) => {
    if (ingredient.trim() && !filters.includedIngredients.includes(ingredient.trim())) {
      setFilters({ 
        ...filters, 
        includedIngredients: [...filters.includedIngredients, ingredient.trim()] 
      });
    }
  };

  const removeIncludedIngredient = (ingredient: string) => {
    setFilters({ 
      ...filters, 
      includedIngredients: filters.includedIngredients.filter(i => i !== ingredient) 
    });
  };

  const addExcludedIngredient = (ingredient: string) => {
    if (ingredient.trim() && !filters.excludedIngredients.includes(ingredient.trim())) {
      setFilters({ 
        ...filters, 
        excludedIngredients: [...filters.excludedIngredients, ingredient.trim()] 
      });
    }
  };

  const removeExcludedIngredient = (ingredient: string) => {
    setFilters({ 
      ...filters, 
      excludedIngredients: filters.excludedIngredients.filter(i => i !== ingredient) 
    });
  };

  const clearAllFilters = () => {
    setFilters({
      query: filters.query, // Manter a busca por texto
      includedIngredients: [],
      excludedIngredients: [],
      allergies: [],
      dietType: '',
      priceRange: [0, 100],
      location: ''
    });
  };

  return (
    <div className="bg-[#fff5bb] rounded-xl p-6 border-2 border-[#98a550]">
      <h3 className="text-xl font-semibold text-[#706f18] mb-6">Filtros Personalizados</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Ingredientes para Incluir */}
        <div>
          <h4 className="font-medium text-[#706f18] mb-3">Deve Conter</h4>
          <div className="space-y-2">
            <Input
              placeholder="Digite um ingrediente e pressione Enter"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addIncludedIngredient(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className="border-[#98a550] focus:border-[#706f18]"
            />
            <div className="flex flex-wrap gap-2">
              {filters.includedIngredients.map(ingredient => (
                <Badge
                  key={ingredient}
                  className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                  onClick={() => removeIncludedIngredient(ingredient)}
                >
                  {ingredient}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Ingredientes para Excluir */}
        <div>
          <h4 className="font-medium text-[#706f18] mb-3">Não Deve Conter</h4>
          <div className="space-y-2">
            <Input
              placeholder="Digite um ingrediente e pressione Enter"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addExcludedIngredient(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              className="border-[#98a550] focus:border-[#706f18]"
            />
            <div className="flex flex-wrap gap-2">
              {filters.excludedIngredients.map(ingredient => (
                <Badge
                  key={ingredient}
                  className="bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer"
                  onClick={() => removeExcludedIngredient(ingredient)}
                >
                  {ingredient}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        </div>

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
              onChange={(e) => setFilters({
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
              onChange={(e) => setFilters({
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
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="border-[#98a550] focus:border-[#706f18]"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {filters.allergies.length + filters.includedIngredients.length + filters.excludedIngredients.length + (filters.dietType ? 1 : 0)} filtros ativos
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={clearAllFilters}>
            Limpar Filtros
          </Button>
          <Button className="bg-[#706f18] hover:bg-[#5a5a14]">
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
