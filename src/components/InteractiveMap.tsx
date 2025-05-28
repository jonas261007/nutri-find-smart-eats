
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Supplier } from '../types';
import { MapPin, Navigation, Upload, Camera } from 'lucide-react';
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
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [useStaticMap, setUseStaticMap] = useState(true);

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

      marker.getElement().addEventListener('click', () => {
        if (onSupplierClick) {
          onSupplierClick(supplier);
        }
      });
    });

    setShowTokenInput(false);
    setUseStaticMap(false);
  };

  const getSupplierCoordinates = (supplier: Supplier): [number, number] => {
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Foto enviada:', file.name);
      // Simular processamento da foto
      alert('Foto enviada com sucesso! Funcionalidade em desenvolvimento.');
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

  if (useStaticMap) {
    return (
      <div className="relative">
        {/* Mapa Estático */}
        <div className="w-full h-[400px] rounded-2xl shadow-lg bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 text-[#98a550] mx-auto" />
              <h3 className="text-xl font-semibold text-[#706f18]">Mapa Interativo</h3>
              <p className="text-gray-600 text-sm max-w-md">
                Clique nos fornecedores abaixo para ver detalhes ou ative o Mapbox para experiência completa
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                <Button
                  onClick={() => setShowTokenInput(true)}
                  variant="outline"
                  className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
                >
                  Ativar Mapbox
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
                    onClick={() => document.getElementById('photo-upload')?.click()}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Foto
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Marcadores estáticos simulados */}
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-[#98a550] rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-[#4285f4] rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-[#9c27b0] rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-[#706f18] rounded-full border-2 border-white shadow-lg"></div>
        </div>

        {/* Legenda */}
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
  }

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
            <div className="flex space-x-2">
              <Button type="submit" className="bg-[#706f18] hover:bg-[#5a5a14] flex-1">
                Ativar Mapa
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setShowTokenInput(false);
                  setUseStaticMap(true);
                }}
                className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
              >
                Cancelar
              </Button>
            </div>
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
