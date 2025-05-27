
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  supplier: string;
  rating: number;
  ingredients: string[];
  allergens: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  distance: number;
  inStock: boolean;
}

export interface SearchFilters {
  query: string;
  includedIngredients: string[];
  excludedIngredients: string[];
  allergies: string[];
  dietType: string;
  priceRange: [number, number];
  location: string;
}

export interface Supplier {
  id: number;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: number;
  type: 'mercado' | 'loja_natural' | 'farmacia';
  hours: string;
}

export interface Gym {
  id: number;
  name: string;
  address: string;
  distance: number;
  rating: number;
  promotion: string;
  image: string;
}
