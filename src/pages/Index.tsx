
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import ResultsSection from '../components/ResultsSection';
import MapSection from '../components/MapSection';
import PartnershipsSection from '../components/PartnershipsSection';
import Footer from '../components/Footer';
import ShoppingList from '../components/ShoppingList';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { AppProvider, useApp } from '../contexts/AppContext';
import { AuthProvider } from '../contexts/AuthContext';

const IndexContent = () => {
  const { shoppingList } = useApp();
  const [showShoppingList, setShowShoppingList] = useState(false);

  const totalItems = shoppingList.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      <Header />
      
      {/* Botão flutuante da lista de compras */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
          <Button
            onClick={() => setShowShoppingList(true)}
            className="bg-[#706f18] hover:bg-[#626218] rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg relative"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 border-white border-2 text-xs">
              {totalItems}
            </Badge>
          </Button>
        </div>
      )}

      {/* Main content com padding-top para compensar header fixo */}
      <main className="container mx-auto px-3 sm:px-4 pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 space-y-8 sm:space-y-12">
        <div id="busca">
          <SearchSection />
        </div>
        <div id="resultados">
          <ResultsSection />
        </div>
        <div id="mapa">
          <MapSection />
        </div>
        <div id="parcerias">
          <PartnershipsSection />
        </div>
      </main>
      
      <Footer />
      
      <ShoppingList 
        isOpen={showShoppingList} 
        onClose={() => setShowShoppingList(false)} 
      />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <IndexContent />
      </AppProvider>
    </AuthProvider>
  );
};

export default Index;
