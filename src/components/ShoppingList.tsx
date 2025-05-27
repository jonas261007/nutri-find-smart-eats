
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#98a550] rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#706f18]">Lista de Compras</h3>
                <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto max-h-96 p-6">
          {shoppingList.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-500 mb-2">Lista vazia</h4>
              <p className="text-gray-400">Adicione produtos para começar suas compras</p>
            </div>
          ) : (
            <div className="space-y-4">
              {shoppingList.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-[#706f18]">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">{item.supplier.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-bold text-[#706f18]">
                        R$ {item.product.price.toFixed(2)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {item.product.distance} km
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-[#706f18]">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromShoppingList(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {shoppingList.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-[#706f18]">Total:</span>
              <span className="text-2xl font-bold text-[#706f18]">
                R$ {totalValue.toFixed(2)}
              </span>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                className="flex-1 bg-[#706f18] hover:bg-[#5a5a14]"
                onClick={() => {
                  // Aqui poderia integrar com um sistema de checkout
                  console.log('Finalizar compra:', shoppingList);
                }}
              >
                Finalizar Compra
              </Button>
              <Button 
                variant="outline" 
                className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
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
