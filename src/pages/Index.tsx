
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import ResultsSection from '../components/ResultsSection';
import MapSection from '../components/MapSection';
import PartnershipsSection from '../components/PartnershipsSection';
import Footer from '../components/Footer';
import { Product, SearchFilters } from '../types';

const Index = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    includedIngredients: [],
    excludedIngredients: [],
    allergies: [],
    dietType: '',
    priceRange: [0, 100],
    location: ''
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Quinoa Orgânica',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop',
      supplier: 'Mundo Verde',
      rating: 4.8,
      ingredients: ['quinoa orgânica'],
      allergens: [],
      nutrition: { calories: 368, protein: 14.1, carbs: 64.2, fat: 6.1 },
      distance: 0.8,
      inStock: true
    },
    {
      id: 2,
      name: 'Leite de Amêndoas Zero Lactose',
      price: 8.50,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop',
      supplier: 'Natureza Viva',
      rating: 4.6,
      ingredients: ['amêndoas', 'água', 'sal marinho'],
      allergens: ['nozes'],
      nutrition: { calories: 17, protein: 0.6, carbs: 0.3, fat: 1.5 },
      distance: 1.2,
      inStock: true
    },
    {
      id: 3,
      name: 'Pão Integral Sem Glúten',
      price: 12.90,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop',
      supplier: 'Padaria Saudável',
      rating: 4.9,
      ingredients: ['farinha de arroz', 'fécula de batata', 'ovos', 'fermento'],
      allergens: ['ovos'],
      nutrition: { calories: 265, protein: 8.2, carbs: 49.1, fat: 4.3 },
      distance: 2.1,
      inStock: false
    }
  ]);

  const handleFilterChange = (newFilters: SearchFilters) => {
    setSearchFilters(newFilters);
    // Aqui seria implementada a lógica de filtro real
    console.log('Filtros atualizados:', newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-12">
        <SearchSection 
          filters={searchFilters} 
          onFilterChange={handleFilterChange} 
        />
        <ResultsSection products={products} />
        <MapSection />
        <PartnershipsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
