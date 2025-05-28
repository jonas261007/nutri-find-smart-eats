import React, { useState, useEffect } from 'react';
import { MapPin, ShoppingCart, Phone, Star, Navigation } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useApp } from '../contexts/AppContext';
import { Supplier } from '../types';
import { useNavigate } from 'react-router-dom';
import InteractiveMap from './InteractiveMap';
const MapSection = () => {
  const {
    userLocation,
    setUserLocation
  } = useApp();
  const {
    filterBySupplier
  } = useApp();
  const navigate = useNavigate();
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([{
    id: 1,
    name: 'Mundo Verde',
    address: 'Av. Boa Viagem, 1234',
    phone: '(81) 9999-9999',
    rating: 4.5,
    location: {
      lat: -8.11111,
      lng: -34.87833
    },
    distance: 0.8,
    type: 'loja_natural',
    hours: '08:00 - 20:00'
  }, {
    id: 2,
    name: 'Natureza Viva',
    address: 'Rua da Aurora, 567',
    phone: '(81) 8888-8888',
    rating: 4.2,
    location: {
      lat: -8.05389,
      lng: -34.88194
    },
    distance: 1.2,
    type: 'loja_natural',
    hours: '09:00 - 21:00'
  }, {
    id: 3,
    name: 'Bio Market',
    address: 'Av. Caxangá, 789',
    phone: '(81) 7777-7777',
    rating: 4.0,
    location: {
      lat: -8.06639,
      lng: -34.90583
    },
    distance: 2.1,
    type: 'mercado',
    hours: '07:00 - 22:00'
  }, {
    id: 4,
    name: 'Academia Boa Forma',
    address: 'Rua Setúbal, 1010',
    phone: '(81) 6666-6666',
    rating: 4.7,
    location: {
      lat: -8.12222,
      lng: -34.90000
    },
    distance: 1.5,
    type: 'academia',
    hours: '06:00 - 23:00'
  }, {
    id: 5,
    name: 'Vida Leve Produtos Naturais',
    address: 'Av. Domingos Ferreira, 1515',
    phone: '(81) 5555-5555',
    rating: 4.3,
    location: {
      lat: -8.13333,
      lng: -34.89500
    },
    distance: 2.3,
    type: 'loja_natural',
    hours: '08:30 - 19:30'
  }]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>(suppliers);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, error => {
        console.error("Erro ao obter a localização:", error);
      });
    } else {
      console.log("Geolocalização não suportada neste navegador.");
    }
  }, [setUserLocation]);
  useEffect(() => {
    // Filtrar fornecedores mostrando lojas naturais e academias
    const filtered = suppliers.filter(supplier => supplier.type === 'loja_natural' || supplier.type === 'academia');
    setFilteredSuppliers(filtered);
  }, [suppliers]);
  const handleSupplierClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
  };
  const handleViewProducts = (supplierName: string) => {
    filterBySupplier(supplierName);
    // Scroll to results section
    setTimeout(() => {
      const element = document.getElementById('resultados');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }, 100);
  };
  const handleNavigateToSupplier = (supplier: Supplier) => {
    // Abrir Google Maps para direções
    const encodedAddress = encodeURIComponent(supplier.address + ', Recife, PE');
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };
  const getSupplierTypeLabel = (type: string) => {
    switch (type) {
      case 'loja_natural':
        return 'Loja Natural';
      case 'mercado':
        return 'Mercado';
      case 'farmacia':
        return 'Farmácia';
      case 'academia':
        return 'Academia';
      default:
        return 'Estabelecimento';
    }
  };
  return <section id="mapa" className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-[#706f18]">
          Encontre um Fornecedor Perto de Você
        </h2>
        <p className="text-gray-600">
          Explore os fornecedores de alimentos saudáveis e academias na sua região
        </p>
      </div>

      {/* Mapa Interativo */}
      <InteractiveMap suppliers={filteredSuppliers} userLocation={userLocation} onSupplierClick={handleSupplierClick} />

      {/* Lista de Fornecedores */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map(supplier => <Card key={supplier.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative">
              <div className="absolute top-2 left-2 bg-white bg-opacity-80 rounded-md p-1 px-2 text-sm text-gray-700 py-px">
                {getSupplierTypeLabel(supplier.type)}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#706f18] line-clamp-2">
                {supplier.name}
              </h3>
              <div className="flex items-center space-x-1 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{supplier.rating}</span>
                <span className="text-sm text-gray-500">• {supplier.distance} km</span>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                <MapPin className="w-3 h-3 inline mr-1" />
                {supplier.address}
              </p>
              <p className="text-gray-600 text-sm">
                <Phone className="w-3 h-3 inline mr-1" />
                {supplier.phone}
              </p>
              <p className="text-gray-600 text-sm">
                Horário: {supplier.hours}
              </p>

              <div className="flex space-x-2 mt-4">
                <Button className="flex-1 bg-[#706f18] hover:bg-[#5a5a14]" onClick={() => handleViewProducts(supplier.name)}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ver Produtos
                </Button>
                <Button variant="outline" className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white" onClick={() => handleNavigateToSupplier(supplier)}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Direções
                </Button>
              </div>
            </div>
          </Card>)}
      </div>
    </section>;
};
export default MapSection;