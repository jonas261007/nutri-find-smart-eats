import React, { useState } from 'react';
import { MapPin, Clock, Phone, Star } from 'lucide-react';
import { Supplier } from '../types';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const MapSection = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');

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
        {/* Mapa Placeholder */}
        <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-[#98a550] rounded-full flex items-center justify-center mx-auto">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#706f18]">Mapa Interativo</h3>
            <p className="text-gray-600">
              Visualize todas as lojas e fornecedores em um mapa interativo
            </p>
            <Button className="bg-[#706f18] hover:bg-[#5a5a14]">
              Abrir Mapa Completo
            </Button>
          </div>
        </div>

        {/* Lista de Fornecedores */}
        <div className="space-y-4">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="p-6 hover:shadow-lg transition-all">
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
                  {supplier.phone}
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
                <Button variant="outline" className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white">
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
