
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

const IndexContent = () => {
  const { shoppingList } = useApp();
  const [showShoppingList, setShowShoppingList] = useState(false);

  const totalItems = shoppingList.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      <Header />
      
      {/* Botão flutuante da lista de compras */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            onClick={() => setShowShoppingList(true)}
            className="bg-[#706f18] hover:bg-[#5a5a14] rounded-full w-14 h-14 shadow-lg relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <Badge className="absolute -top-2 -right-2 bg-red-500 border-white border-2">
              {totalItems}
            </Badge>
          </Button>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 space-y-12">
        <SearchSection />
        <ResultsSection />
        <MapSection />
        <PartnershipsSection />
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
    <AppProvider>
      <IndexContent />
    </AppProvider>
  );
};

export default Index;
