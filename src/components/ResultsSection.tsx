
import React, { useState } from 'react';
import { Star, MapPin, ShoppingCart, AlertTriangle, TrendingDown, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useApp } from '../contexts/AppContext';

// Dados simulados de múltiplos fornecedores para cada produto
const supplierPrices = {
  1: [
    { supplier: 'Mundo Verde', price: 15.99, distance: 0.8, inStock: true },
    { supplier: 'Natural Life', price: 17.50, distance: 1.5, inStock: true },
    { supplier: 'Bio Market', price: 14.90, distance: 2.3, inStock: false }
  ],
  2: [
    { supplier: 'Natureza Viva', price: 8.50, distance: 1.2, inStock: true },
    { supplier: 'Supermercado Saudável', price: 9.20, distance: 0.5, inStock: true },
    { supplier: 'Loja Natural', price: 7.99, distance: 3.1, inStock: true }
  ],
  3: [
    { supplier: 'Padaria Saudável', price: 12.90, distance: 2.1, inStock: false },
    { supplier: 'Vida Integral', price: 11.50, distance: 1.8, inStock: true },
    { supplier: 'Bio Pães', price: 13.40, distance: 1.2, inStock: true }
  ]
};

const ResultsSection = () => {
  const { filteredProducts, addToShoppingList, clearSupplierFilter } = useApp();
  const [sortBy, setSortBy] = useState<'price' | 'distance' | 'rating'>('price');
  const [showPriceComparison, setShowPriceComparison] = useState<number | null>(null);

  // Check if there's an active supplier filter
  const hasSupplierFilter = filteredProducts.length > 0 && 
    new Set(filteredProducts.map(p => p.supplier)).size === 1;
  const activeSupplier = hasSupplierFilter ? filteredProducts[0]?.supplier : null;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const getBestPrice = (productId: number) => {
    const prices = supplierPrices[productId as keyof typeof supplierPrices] || [];
    return Math.min(...prices.filter(p => p.inStock).map(p => p.price));
  };

  const handleAddToCart = (product: any, supplierData?: any) => {
    const supplier = supplierData || {
      id: 1,
      name: product.supplier,
      address: 'Endereço padrão',
      phone: '(81) 9999-9999',
      rating: 4.5,
      distance: product.distance,
      type: 'loja_natural' as const,
      hours: '08:00 - 20:00'
    };
    
    addToShoppingList(product, supplier);
  };

  if (sortedProducts.length === 0) {
    return (
      <section id="resultados" className="text-center py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-500">
            {activeSupplier 
              ? `Nenhum produto encontrado para ${activeSupplier}`
              : 'Tente ajustar seus filtros para encontrar mais opções'
            }
          </p>
          {activeSupplier && (
            <Button 
              onClick={clearSupplierFilter}
              className="mt-4 bg-[#706f18] hover:bg-[#5a5a14]"
            >
              Ver Todos os Produtos
            </Button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="resultados" className="space-y-4 sm:space-y-6 overflow-hidden">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#706f18]">
            {activeSupplier ? `Produtos - ${activeSupplier}` : 'Produtos Encontrados'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {sortedProducts.length} opções disponíveis
            {activeSupplier && (
              <Button 
                onClick={clearSupplierFilter}
                variant="link"
                className="ml-2 text-[#98a550] hover:text-[#706f18] p-0 h-auto text-sm"
              >
                • Ver todos os fornecedores
              </Button>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 w-full overflow-x-auto">
          <Button
            variant={sortBy === 'price' ? 'default' : 'outline'}
            onClick={() => setSortBy('price')}
            className={`flex-1 sm:flex-none text-xs sm:text-sm whitespace-nowrap ${
              sortBy === 'price' 
                ? 'bg-[#706f18] hover:bg-[#5a5a14]' 
                : 'border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white'
            }`}
          >
            <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Menor Preço
          </Button>
          <Button
            variant={sortBy === 'distance' ? 'default' : 'outline'}
            onClick={() => setSortBy('distance')}
            className={`flex-1 sm:flex-none text-xs sm:text-sm whitespace-nowrap ${
              sortBy === 'distance' 
                ? 'bg-[#706f18] hover:bg-[#5a5a14]' 
                : 'border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white'
            }`}
          >
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Mais Próximo
          </Button>
          <Button
            variant={sortBy === 'rating' ? 'default' : 'outline'}
            onClick={() => setSortBy('rating')}
            className={`flex-1 sm:flex-none text-xs sm:text-sm whitespace-nowrap ${
              sortBy === 'rating' 
                ? 'bg-[#706f18] hover:bg-[#5a5a14]' 
                : 'border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white'
            }`}
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Melhor Avaliado
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sortedProducts.map((product) => {
          const bestPrice = getBestPrice(product.id);
          const priceData = supplierPrices[product.id as keyof typeof supplierPrices] || [];
          const isShowingComparison = showPriceComparison === product.id;

          return (
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
                {bestPrice < product.price && (
                  <Badge className="absolute top-2 left-2 bg-green-500">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    Melhor Preço: R$ {bestPrice.toFixed(2)}
                  </Badge>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-[#706f18] line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[#706f18]">
                      R$ {product.price.toFixed(2)}
                    </span>
                    {bestPrice < product.price && (
                      <p className="text-sm text-green-600 font-medium">
                        Economia: R$ {(product.price - bestPrice).toFixed(2)}
                      </p>
                    )}
                  </div>
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

                {/* Comparação de Preços */}
                {isShowingComparison && priceData.length > 0 && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Comparação de Preços:</h4>
                    <div className="space-y-1">
                      {priceData
                        .sort((a, b) => a.price - b.price)
                        .map((supplier, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className={supplier.inStock ? 'text-gray-700' : 'text-gray-400'}>
                              {supplier.supplier} ({supplier.distance}km)
                              {!supplier.inStock && ' - Indisponível'}
                            </span>
                            <span className={`font-medium ${index === 0 && supplier.inStock ? 'text-green-600' : 'text-gray-700'}`}>
                              R$ {supplier.price.toFixed(2)}
                              {index === 0 && supplier.inStock && (
                                <Badge className="ml-1 bg-green-500 text-xs">Melhor</Badge>
                              )}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-[#706f18] hover:bg-[#5a5a14]"
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? 'Adicionar' : 'Indisponível'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
                    onClick={() => setShowPriceComparison(
                      isShowingComparison ? null : product.id
                    )}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default ResultsSection;
