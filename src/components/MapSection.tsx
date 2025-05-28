
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Star, Navigation, Loader2 } from 'lucide-react';
import { Supplier } from '../types';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useGeolocation } from '../hooks/useGeolocation';
import { useApp } from '../contexts/AppContext';
import InteractiveMap from './InteractiveMap';

const MapSection = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const { location, loading: geoLoading, error: geoError, getCurrentLocation } = useGeolocation();
  const { userLocation, setUserLocation } = useApp();

  useEffect(() => {
    if (location) {
      setUserLocation(location);
    }
  }, [location, setUserLocation]);

  const suppliers: Supplier[] = [
    {
      id: 1,
      name: 'Mundo Verde',
      address: 'Rua da Aurora, 123 - Boa Vista',
      phone: '(81) 3456-7890',
      rating: 4.8,
      distance: 0.8,
      type: 'loja_natural',
      hours: '08:00 - 20:00'
    },
    {
      id: 2,
      name: 'Natureza Viva',
      address: 'Av. Agamenon Magalhães, 456 - Derby',
      phone: '(81) 2345-6789',
      rating: 4.6,
      distance: 1.2,
      type: 'mercado',
      hours: '07:00 - 22:00'
    },
    {
      id: 3,
      name: 'Padaria Saudável',
      address: 'Rua do Hospício, 789 - Boa Vista',
      phone: '(81) 4567-8901',
      rating: 4.9,
      distance: 2.1,
      type: 'mercado',
      hours: '06:00 - 18:00'
    },
    {
      id: 4,
      name: 'Bio Market',
      address: 'Rua da Imperatriz, 321 - Graças',
      phone: '(81) 5678-9012',
      rating: 4.7,
      distance: 1.5,
      type: 'loja_natural',
      hours: '09:00 - 19:00'
    },
    {
      id: 5,
      name: 'Farmácia Natural',
      address: 'Av. Boa Viagem, 987 - Boa Viagem',
      phone: '(81) 6789-0123',
      rating: 4.5,
      distance: 3.2,
      type: 'farmacia',
      hours: '08:00 - 22:00'
    }
  ];

  const filterTypes = [
    { key: 'todos', label: 'Todos', count: suppliers.length },
    { key: 'mercado', label: 'Mercados', count: suppliers.filter(s => s.type === 'mercado').length },
    { key: 'loja_natural', label: 'Lojas Naturais', count: suppliers.filter(s => s.type === 'loja_natural').length },
    { key: 'farmacia', label: 'Farmácias', count: suppliers.filter(s => s.type === 'farmacia').length }
  ];

  const filteredSuppliers = selectedFilter === 'todos' 
    ? suppliers 
    : suppliers.filter(s => s.type === selectedFilter);

  const getDirections = (supplier: Supplier) => {
    const address = encodeURIComponent(supplier.address + ', Recife, PE');
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(url, '_blank');
  };

  const callSupplier = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleSupplierMapClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    // Scroll para a lista de fornecedores
    const supplierCard = document.getElementById(`supplier-${supplier.id}`);
    if (supplierCard) {
      supplierCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="mapa" className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#706f18] mb-3">
          Lojas e Fornecedores Próximos
        </h2>
        <p className="text-gray-600 text-lg">
          Encontre os melhores locais para comprar seus alimentos saudáveis
        </p>
      </div>

      {/* Geolocalização */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-[#98a550]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Navigation className="w-5 h-5 text-[#98a550]" />
            <div>
              <h4 className="font-medium text-[#706f18]">Sua Localização</h4>
              <p className="text-sm text-gray-600">
                {userLocation 
                  ? `Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}`
                  : 'Localização não detectada'
                }
              </p>
            </div>
          </div>
          
          <Button
            onClick={getCurrentLocation}
            disabled={geoLoading}
            variant="outline"
            className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
          >
            {geoLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Localizando...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                Usar Minha Localização
              </>
            )}
          </Button>
        </div>
        
        {geoError && (
          <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
            {geoError}
          </div>
        )}
      </div>

      {/* Filtros de Tipo */}
      <div className="flex flex-wrap justify-center gap-3">
        {filterTypes.map((filter) => (
          <Button
            key={filter.key}
            variant={selectedFilter === filter.key ? 'default' : 'outline'}
            onClick={() => setSelectedFilter(filter.key)}
            className={`transition-all ${
              selectedFilter === filter.key
                ? 'bg-[#706f18] hover:bg-[#5a5a14]'
                : 'border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white'
            }`}
          >
            {filter.label} ({filter.count})
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Mapa Interativo Real */}
        <div>
          <InteractiveMap 
            suppliers={filteredSuppliers}
            userLocation={userLocation}
            onSupplierClick={handleSupplierMapClick}
          />
        </div>

        {/* Lista de Fornecedores */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[#706f18]">
              {filteredSuppliers.length} estabelecimentos encontrados
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
            >
              Ordenar por distância
            </Button>
          </div>

          {filteredSuppliers
            .sort((a, b) => a.distance - b.distance)
            .map((supplier) => (
            <Card 
              key={supplier.id} 
              id={`supplier-${supplier.id}`}
              className={`p-6 hover:shadow-lg transition-all ${
                selectedSupplier?.id === supplier.id ? 'ring-2 ring-[#98a550] bg-green-50' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#706f18]">{supplier.name}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{supplier.rating}</span>
                    <Badge variant="outline" className="ml-2 text-xs border-[#98a550] text-[#98a550]">
                      {supplier.distance} km
                    </Badge>
                  </div>
                </div>
                <Badge className={`${
                  supplier.type === 'loja_natural' ? 'bg-green-500' :
                  supplier.type === 'mercado' ? 'bg-blue-500' : 'bg-purple-500'
                }`}>
                  {supplier.type === 'loja_natural' ? 'Loja Natural' :
                   supplier.type === 'mercado' ? 'Mercado' : 'Farmácia'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {supplier.address}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <button 
                    onClick={() => callSupplier(supplier.phone)}
                    className="hover:text-[#706f18] hover:underline transition-colors"
                  >
                    {supplier.phone}
                  </button>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {supplier.hours}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 bg-[#706f18] hover:bg-[#5a5a14]">
                  Ver Produtos
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
                  onClick={() => getDirections(supplier)}
                >
                  <Navigation className="w-4 h-4 mr-1" />
                  Direções
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MapSection;
