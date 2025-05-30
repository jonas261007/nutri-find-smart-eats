
import React from 'react';
import { ShoppingCart, Trash2, Plus, Minus, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useApp } from '../contexts/AppContext';

interface ShoppingListProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingList = ({ isOpen, onClose }: ShoppingListProps) => {
  const { shoppingList, removeFromShoppingList, updateQuantity } = useApp();

  if (!isOpen) return null;

  const totalValue = shoppingList.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0
  );

  const totalItems = shoppingList.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <Card className="w-full max-w-xs sm:max-w-md lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden bg-white">
        <div className="p-4 sm:p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#98a550] rounded-full flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#706f18]">Lista de Compras</h3>
                <p className="text-gray-600 text-sm">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="p-1 sm:p-2">
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto max-h-60 sm:max-h-80 lg:max-h-96 p-4 sm:p-6">
          {shoppingList.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-base sm:text-lg font-medium text-gray-500 mb-2">Lista vazia</h4>
              <p className="text-sm sm:text-base text-gray-400">Adicione produtos para começar suas compras</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {shoppingList.map((item) => (
                <div key={item.id} className="flex items-center space-x-2 sm:space-x-4 p-3 sm:p-4 border rounded-lg hover:bg-gray-50">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#706f18] text-sm sm:text-base truncate">{item.product.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{item.supplier.name}</p>
                    <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                      <span className="font-bold text-[#706f18] text-sm sm:text-base">
                        R$ {item.product.price.toFixed(2)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {item.product.distance} km
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                      >
                        <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                      </Button>
                      
                      <span className="w-6 sm:w-8 text-center font-medium text-sm">{item.quantity}</span>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                      >
                        <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                      </Button>
                    </div>

                    <div className="text-center sm:text-right">
                      <p className="font-bold text-[#706f18] text-sm sm:text-base">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromShoppingList(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {shoppingList.length > 0 && (
          <div className="border-t p-4 sm:p-6">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-base sm:text-lg font-semibold text-[#706f18]">Total:</span>
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#706f18]">
                R$ {totalValue.toFixed(2)}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button 
                className="flex-1 bg-[#706f18] hover:bg-[#5a5a14] text-sm sm:text-base"
                onClick={() => {
                  // Aqui poderia integrar com um sistema de checkout
                  console.log('Finalizar compra:', shoppingList);
                }}
              >
                Finalizar Compra
              </Button>
              <Button 
                variant="outline" 
                className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white text-sm sm:text-base"
                onClick={() => {
                  // Compartilhar lista
                  const listText = shoppingList.map(item => 
                    `${item.quantity}x ${item.product.name} - ${item.supplier.name}`
                  ).join('\n');
                  
                  if (navigator.share) {
                    navigator.share({
                      title: 'Minha Lista de Compras - HealthyFood',
                      text: listText
                    });
                  } else {
                    navigator.clipboard.writeText(listText);
                    alert('Lista copiada para a área de transferência!');
                  }
                }}
              >
                Compartilhar
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ShoppingList;
