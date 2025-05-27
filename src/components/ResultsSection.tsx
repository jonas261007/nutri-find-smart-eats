
import React, { useState } from 'react';
import { Star, MapPin, ShoppingCart, AlertTriangle, CheckCircle } from 'lucide-react';
import { Product } from '../types';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface ResultsSectionProps {
  products: Product[];
}

const ResultsSection = ({ products }: ResultsSectionProps) => {
  const [sortBy, setSortBy] = useState<'price' | 'distance' | 'rating'>('price');

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'distance':
        return a.distance - b.distance;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <section id="resultados" className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#706f18]">Produtos Encontrados</h2>
          <p className="text-gray-600">{products.length} opções disponíveis</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={sortBy === 'price' ? 'default' : 'outline'}
            onClick={() => setSortBy('price')}
            className={sortBy === 'price' ? 'bg-[#706f18] hover:bg-[#5a5a14]' : 'border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white'}
          >
            Menor Preço
          </Button>
          <Button
            variant={sortBy === 'distance' ? 'default' : 'outline'}
            onClick={() => setSortBy('distance')}
            className={sortBy === 'distance' ? 'bg-[#706f18] hover:bg-[#5a5a14]' : 'border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white'}
          >
            Mais Próximo
          </Button>
          <Button
            variant={sortBy === 'rating' ? 'default' : 'outline'}
            onClick={() => setSortBy('rating')}
            className={sortBy === 'rating' ? 'bg-[#706f18] hover:bg-[#5a5a14]' : 'border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white'}
          >
            Melhor Avaliado
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <Badge variant="secondary" className="bg-red-500 text-white">
                    Fora de Estoque
                  </Badge>
                </div>
              )}
              {sortBy === 'price' && product.price === Math.min(...products.map(p => p.price)) && (
                <Badge className="absolute top-2 left-2 bg-green-500">
                  Melhor Preço!
                </Badge>
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-[#706f18] line-clamp-2">
                  {product.name}
                </h3>
                <span className="text-2xl font-bold text-[#706f18]">
                  R$ {product.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{product.supplier}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {product.distance} km de distância
                </p>
                
                {product.allergens.length > 0 && (
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-orange-600">
                      Contém: {product.allergens.join(', ')}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mb-3">
                  {product.ingredients.slice(0, 3).map((ingredient, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-[#98a550] text-[#98a550]">
                      {ingredient}
                    </Badge>
                  ))}
                  {product.ingredients.length > 3 && (
                    <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
                      +{product.ingredients.length - 3} mais
                    </Badge>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-3 text-xs grid grid-cols-2 gap-2">
                  <div>Calorias: {product.nutrition.calories}</div>
                  <div>Proteína: {product.nutrition.protein}g</div>
                  <div>Carboidratos: {product.nutrition.carbs}g</div>
                  <div>Gordura: {product.nutrition.fat}g</div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-[#706f18] hover:bg-[#5a5a14]"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? 'Adicionar' : 'Indisponível'}
                </Button>
                <Button variant="outline" className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ResultsSection;
