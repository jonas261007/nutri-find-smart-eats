import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, SearchFilters, Supplier, Gym } from '../types';

interface ShoppingListItem {
  id: number;
  product: Product;
  quantity: number;
  supplier: Supplier;
}

interface AppContextType {
  // Filters
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  
  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;
  filteredProducts: Product[];
  
  // Shopping List
  shoppingList: ShoppingListItem[];
  addToShoppingList: (product: Product, supplier: Supplier, quantity?: number) => void;
  removeFromShoppingList: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  
  // Location
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  
  // Loading states
  isLoadingProducts: boolean;
  setIsLoadingProducts: (loading: boolean) => void;
  isLoadingLocation: boolean;
  setIsLoadingLocation: (loading: boolean) => void;
  
  // Supplier filtering
  filterBySupplier: (supplierName: string) => void;
  clearSupplierFilter: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    includedIngredients: [],
    excludedIngredients: [],
    allergies: [],
    dietType: '',
    priceRange: [0, 100],
    location: ''
  });

  const [supplierFilter, setSupplierFilter] = useState<string>('');

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Quinoa Orgânica',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop',
      supplier: 'Mundo Verde',
      rating: 4.8,
      ingredients: ['quinoa orgânica'],
      allergens: [],
      nutrition: { calories: 368, protein: 14.1, carbs: 64.2, fat: 6.1 },
      distance: 0.8,
      inStock: true
    },
    {
      id: 2,
      name: 'Leite de Amêndoas Zero Lactose',
      price: 8.50,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=200&fit=crop',
      supplier: 'Natureza Viva',
      rating: 4.6,
      ingredients: ['amêndoas', 'água', 'sal marinho'],
      allergens: ['nozes'],
      nutrition: { calories: 17, protein: 0.6, carbs: 0.3, fat: 1.5 },
      distance: 1.2,
      inStock: true
    },
    {
      id: 3,
      name: 'Pão Integral Sem Glúten',
      price: 12.90,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop',
      supplier: 'Padaria Saudável',
      rating: 4.9,
      ingredients: ['farinha de arroz', 'fécula de batata', 'ovos', 'fermento'],
      allergens: ['ovos'],
      nutrition: { calories: 265, protein: 8.2, carbs: 49.1, fat: 4.3 },
      distance: 2.1,
      inStock: false
    },
    {
      id: 4,
      name: 'Açaí Natural',
      price: 6.99,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop',
      supplier: 'Frutas do Norte',
      rating: 4.7,
      ingredients: ['açaí', 'água'],
      allergens: [],
      nutrition: { calories: 60, protein: 1.0, carbs: 13.0, fat: 1.5 },
      distance: 1.5,
      inStock: true
    },
    {
      id: 5,
      name: 'Granola Sem Açúcar',
      price: 18.90,
      image: 'https://images.unsplash.com/photo-1517518503027-f90bd60eeee0?w=300&h=200&fit=crop',
      supplier: 'Natural Life',
      rating: 4.5,
      ingredients: ['aveia', 'castanhas', 'mel', 'canela'],
      allergens: ['nozes'],
      nutrition: { calories: 471, protein: 13.8, carbs: 44.7, fat: 28.1 },
      distance: 2.3,
      inStock: true
    }
  ]);

  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Filter products based on current filters and supplier filter
  const filteredProducts = products.filter(product => {
    // Supplier filter (if active)
    if (supplierFilter && product.supplier !== supplierFilter) {
      return false;
    }

    // Text search
    if (filters.query && !product.name.toLowerCase().includes(filters.query.toLowerCase())) {
      return false;
    }

    // Included ingredients
    if (filters.includedIngredients.length > 0) {
      const hasIncluded = filters.includedIngredients.some(ingredient =>
        product.ingredients.some(productIngredient =>
          productIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
      if (!hasIncluded) return false;
    }

    // Excluded ingredients
    if (filters.excludedIngredients.length > 0) {
      const hasExcluded = filters.excludedIngredients.some(ingredient =>
        product.ingredients.some(productIngredient =>
          productIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
      if (hasExcluded) return false;
    }

    // Allergies
    if (filters.allergies.length > 0) {
      const hasAllergen = filters.allergies.some(allergy =>
        product.allergens.some(allergen =>
          allergen.toLowerCase().includes(allergy.toLowerCase())
        )
      );
      if (hasAllergen) return false;
    }

    // Price range
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    return true;
  });

  const filterBySupplier = (supplierName: string) => {
    setSupplierFilter(supplierName);
    // Scroll to results section
    setTimeout(() => {
      const element = document.getElementById('resultados');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const clearSupplierFilter = () => {
    setSupplierFilter('');
  };

  const addToShoppingList = (product: Product, supplier: Supplier, quantity = 1) => {
    const existingItem = shoppingList.find(item => 
      item.product.id === product.id && item.supplier.id === supplier.id
    );

    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + quantity);
    } else {
      const newItem: ShoppingListItem = {
        id: Date.now(),
        product,
        supplier,
        quantity
      };
      setShoppingList([...shoppingList, newItem]);
    }
  };

  const removeFromShoppingList = (id: number) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromShoppingList(id);
      return;
    }
    setShoppingList(shoppingList.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  return (
    <AppContext.Provider value={{
      filters,
      setFilters,
      products,
      setProducts,
      filteredProducts,
      shoppingList,
      addToShoppingList,
      removeFromShoppingList,
      updateQuantity,
      userLocation,
      setUserLocation,
      isLoadingProducts,
      setIsLoadingProducts,
      isLoadingLocation,
      setIsLoadingLocation,
      filterBySupplier,
      clearSupplierFilter
    }}>
      {children}
    </AppContext.Provider>
  );
};
