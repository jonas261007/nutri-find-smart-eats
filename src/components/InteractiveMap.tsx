
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Supplier } from '../types';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface InteractiveMapProps {
  suppliers: Supplier[];
  userLocation: { lat: number; lng: number } | null;
  onSupplierClick?: (supplier: Supplier) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ suppliers, userLocation, onSupplierClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    // Centro inicial (Recife, PE)
    const center: [number, number] = userLocation 
      ? [userLocation.lng, userLocation.lat] 
      : [-34.8688, -8.0476];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: userLocation ? 13 : 11,
    });

    // Adicionar controles de navegação
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Adicionar marcador da localização do usuário
    if (userLocation) {
      const userMarker = new mapboxgl.Marker({ color: '#706f18' })
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2"><strong>Sua Localização</strong></div>'))
        .addTo(map.current);
    }

    // Adicionar marcadores das lojas
    suppliers.forEach((supplier) => {
      // Coordenadas aproximadas baseadas nos endereços (em uma implementação real, você usaria geocoding)
      const coords = getSupplierCoordinates(supplier);
      
      const markerColor = supplier.type === 'loja_natural' ? '#98a550' : 
                         supplier.type === 'mercado' ? '#4285f4' : '#9c27b0';

      const marker = new mapboxgl.Marker({ color: markerColor })
        .setLngLat(coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-3 max-w-xs">
              <h3 class="font-semibold text-[#706f18] mb-2">${supplier.name}</h3>
              <p class="text-sm text-gray-600 mb-2">${supplier.address}</p>
              <div class="flex items-center text-sm text-gray-600 mb-2">
                <span class="text-yellow-500 mr-1">★</span>
                ${supplier.rating} • ${supplier.distance} km
              </div>
              <div class="flex space-x-2">
                <button 
                  onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(supplier.address + ', Recife, PE')}', '_blank')"
                  class="bg-[#706f18] text-white px-3 py-1 rounded text-xs hover:bg-[#5a5a14]"
                >
                  Direções
                </button>
              </div>
            </div>
          `)
        )
        .addTo(map.current);

      // Evento de clique no marcador
      marker.getElement().addEventListener('click', () => {
        if (onSupplierClick) {
          onSupplierClick(supplier);
        }
      });
    });

    setShowTokenInput(false);
  };

  // Função para obter coordenadas aproximadas das lojas (simulado)
  const getSupplierCoordinates = (supplier: Supplier): [number, number] => {
    // Em uma implementação real, você usaria uma API de geocoding
    const baseCoords: { [key: string]: [number, number] } = {
      'Mundo Verde': [-34.8720, -8.0476],
      'Natureza Viva': [-34.8650, -8.0500],
      'Padaria Saudável': [-34.8700, -8.0450],
      'Bio Market': [-34.8680, -8.0520],
      'Farmácia Natural': [-34.8600, -8.0400]
    };
    
    return baseCoords[supplier.name] || [-34.8688, -8.0476];
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      initializeMap();
    }
  };

  useEffect(() => {
    if (mapboxToken && !map.current) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, suppliers, userLocation]);

  if (showTokenInput) {
    return (
      <div className="bg-white rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <MapPin className="w-16 h-16 text-[#98a550] mx-auto" />
          <h3 className="text-xl font-semibold text-[#706f18]">Configure o Mapbox</h3>
          <p className="text-gray-600 text-sm">
            Para usar o mapa interativo, você precisa de um token público do Mapbox.
            Acesse <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-[#706f18] underline">mapbox.com</a> para obter sua chave gratuita.
          </p>
          
          <form onSubmit={handleTokenSubmit} className="space-y-3">
            <div>
              <Label htmlFor="mapbox-token">Token Público do Mapbox</Label>
              <Input
                id="mapbox-token"
                type="text"
                placeholder="pk.eyJ1..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="bg-[#706f18] hover:bg-[#5a5a14] w-full">
              Ativar Mapa
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={mapContainer} className="w-full h-[400px] rounded-2xl shadow-lg" />
      <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-md">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-[#706f18] rounded-full"></div>
          <span>Sua localização</span>
        </div>
        <div className="flex items-center space-x-2 text-sm mt-1">
          <div className="w-3 h-3 bg-[#98a550] rounded-full"></div>
          <span>Lojas Naturais</span>
        </div>
        <div className="flex items-center space-x-2 text-sm mt-1">
          <div className="w-3 h-3 bg-[#4285f4] rounded-full"></div>
          <span>Mercados</span>
        </div>
        <div className="flex items-center space-x-2 text-sm mt-1">
          <div className="w-3 h-3 bg-[#9c27b0] rounded-full"></div>
          <span>Farmácias</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
