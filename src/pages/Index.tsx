
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
        <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-40">
          <Button
            onClick={() => setShowShoppingList(true)}
            className="bg-[#706f18] hover:bg-[#626218] rounded-full w-10 h-10 sm:w-12 sm:h-12 shadow-lg relative"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <Badge className="absolute -top-1 -right-1 bg-red-500 border-white border-2 text-xs min-w-[1rem] h-4 flex items-center justify-center px-1">
              {totalItems}
            </Badge>
          </Button>
        </div>
      )}

      {/* Main content com padding-top para compensar header fixo */}
      <main className="container mx-auto px-2 sm:px-3 pt-16 sm:pt-20 pb-4 sm:pb-6 space-y-6 sm:space-y-8">
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
