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
      image: 'https://cdn.awsli.com.br/600x1000/2660/2660278/produto/246573849/fcf651a30134978ae8c4032e323bf608-ivpbwd6p6e.png',
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
      image: 'https://receitasdepesos.com.br/wp-content/uploads/2023/08/copo-de-leite-de-amendoa-sem-lactose-e-acucar.jpg',
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
      image: 'https://guiadacozinha.com.br/wp-content/uploads/2019/10/pao-integral-sem-gluten-e-sem-lactose-52408.jpg',
      supplier: 'Vida Integral',
      rating: 4.9,
      ingredients: ['farinha de arroz', 'fécula de batata', 'ovos', 'fermento'],
      allergens: ['ovos'],
      nutrition: { calories: 265, protein: 8.2, carbs: 49.1, fat: 4.3 },
      distance: 1.8,
      inStock: true
    },
    {
      id: 4,
      name: 'Açaí Natural',
      price: 6.99,
      image: 'https://minhasreceitinhas.com.br/wp-content/uploads/2025/01/sorvete-de-acai-natural-1200x959.jpg',
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
      image: 'https://vovonaoca.com.br/wp-content/webp-express/webp-images/uploads/2025/01/Receita-de-granola-caseira-saudavel-e-sem-acucar-672x352.jpg.webp',
      supplier: 'Natural Life',
      rating: 4.5,
      ingredients: ['aveia', 'castanhas', 'mel', 'canela'],
      allergens: ['nozes'],
      nutrition: { calories: 471, protein: 13.8, carbs: 44.7, fat: 28.1 },
      distance: 2.3,
      inStock: true
    },
    {
      id: 6,
      name: 'Whey Protein Vegano',
      price: 89.90,
      image: 'https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2024/06/whey-protein-vegano-opcoes-aspect-ratio-512-320.jpg',
      supplier: 'Bio Market',
      rating: 4.8,
      ingredients: ['proteína de ervilha', 'proteína de arroz', 'cacau'],
      allergens: [],
      nutrition: { calories: 120, protein: 25.0, carbs: 3.0, fat: 1.5 },
      distance: 2.1,
      inStock: true
    },
    {
      id: 7,
      name: 'Azeite Extra Virgem Orgânico',
      price: 24.99,
      image: 'https://img.freepik.com/fotos-premium/azeite-de-oliva-extra-virgem-organico-em-uma-mesa_419307-487.jpg',
      supplier: 'Mundo Verde',
      rating: 4.9,
      ingredients: ['azeitonas orgânicas'],
      allergens: [],
      nutrition: { calories: 884, protein: 0.0, carbs: 0.0, fat: 100.0 },
      distance: 0.8,
      inStock: true
    },
    {
      id: 8,
      name: 'Chia Orgânica',
      price: 13.50,
      image: 'https://images.tcdn.com.br/img/editor/up/909151/Chia.jpg',
      supplier: 'Natureza Viva',
      rating: 4.7,
      ingredients: ['sementes de chia orgânica'],
      allergens: [],
      nutrition: { calories: 486, protein: 16.5, carbs: 42.1, fat: 30.7 },
      distance: 1.2,
      inStock: true
    },
    {
      id: 9,
      name: 'Pasta de Amendoim Natural',
      price: 16.90,
      image: 'https://static.itdg.com.br/images/640-440/4882817c735988159e73b84c665c0b13/shutterstock-253837162-1-.jpg',
      supplier: 'Natural Life',
      rating: 4.6,
      ingredients: ['amendoim', 'sal marinho'],
      allergens: ['amendoim'],
      nutrition: { calories: 588, protein: 25.8, carbs: 16.1, fat: 50.4 },
      distance: 2.3,
      inStock: true
    },
    {
      id: 10,
      name: 'Leite de Coco',
      price: 7.99,
      image: 'https://image.tuasaude.com/media/article/cf/fo/beneficios-do-leite-de-coco_29853.jpg',
      supplier: 'Bio Market',
      rating: 4.4,
      ingredients: ['coco', 'água'],
      allergens: [],
      nutrition: { calories: 230, protein: 2.3, carbs: 5.5, fat: 23.8 },
      distance: 2.1,
      inStock: true
    },
    {
      id: 11,
      name: 'Arroz Integral Orgânico',
      price: 9.90,
      image: 'https://jasminealimentos.com/wp-content/uploads/2016/12/iStock-502608156.jpg',
      supplier: 'Vida Integral',
      rating: 4.3,
      ingredients: ['arroz integral orgânico'],
      allergens: [],
      nutrition: { calories: 370, protein: 7.9, carbs: 77.2, fat: 2.9 },
      distance: 1.8,
      inStock: true
    },
    {
      id: 12,
      name: 'Mel Orgânico',
      price: 19.90,
      image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=200&fit=crop',
      supplier: 'Mundo Verde',
      rating: 4.8,
      ingredients: ['mel orgânico'],
      allergens: [],
      nutrition: { calories: 304, protein: 0.3, carbs: 82.4, fat: 0.0 },
      distance: 0.8,
      inStock: true
    },
    {
      id: 13,
      name: 'Castanha do Brasil',
      price: 22.50,
      image: 'https://feed.continente.pt/media/anxa3u00/castanha-do-brasil.jpg?anchor=center&mode=crop&width=1200&height=630&rnd=133761706538430000',
      supplier: 'Frutas do Norte',
      rating: 4.7,
      ingredients: ['castanha do brasil'],
      allergens: ['nozes'],
      nutrition: { calories: 656, protein: 14.3, carbs: 12.3, fat: 66.4 },
      distance: 1.5,
      inStock: true
    },
    {
      id: 14,
      name: 'Suco Verde Detox',
      price: 8.90,
      image: 'https://receitadaboa.com.br/wp-content/uploads/2024/09/Suco-verde.jpg',
      supplier: 'Natureza Viva',
      rating: 4.5,
      ingredients: ['couve', 'maçã', 'limão', 'gengibre'],
      allergens: [],
      nutrition: { calories: 45, protein: 1.2, carbs: 11.0, fat: 0.2 },
      distance: 1.2,
      inStock: true
    },
    {
      id: 15,
      name: 'Aveia em Flocos Orgânica',
      price: 11.90,
      image: 'https://bemintegral.com.br/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-24-at-12.38.55.jpeg',
      supplier: 'Bio Market',
      rating: 4.6,
      ingredients: ['aveia orgânica'],
      allergens: ['glúten'],
      nutrition: { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
      distance: 2.1,
      inStock: true
    },
    {
      id: 16,
      name: 'Iogurte Grego Natural',
      price: 12.50,
      image: 'https://static.wixstatic.com/media/132e86_1806deb8ce234911bab7d850d77a0e0e~mv2.jpg/v1/fill/w_652,h_408,al_c,q_80/IogurteGregoCaseiro1.jpg',
      supplier: 'Natural Life',
      rating: 4.8,
      ingredients: ['leite', 'fermentos láticos'],
      allergens: ['lactose'],
      nutrition: { calories: 97, protein: 9.0, carbs: 4.0, fat: 5.0 },
      distance: 2.3,
      inStock: true
    },
    {
      id: 17,
      name: 'Açúcar de Coco',
      price: 14.90,
      image: 'https://sophiederam.com/wp-content/uploads/2022/01/acucar-de-coco.jpg',
      supplier: 'Vida Integral',
      rating: 4.4,
      ingredients: ['açúcar de coco'],
      allergens: [],
      nutrition: { calories: 375, protein: 1.1, carbs: 92.1, fat: 0.4 },
      distance: 1.8,
      inStock: true
    },
    {
      id: 18,
      name: 'Banana Chips Sem Açúcar',
      price: 9.50,
      image: 'https://receitadaboa.com.br/wp-content/uploads/2024/03/Batata-doce-chips.jpg',
      supplier: 'Frutas do Norte',
      rating: 4.3,
      ingredients: ['banana', 'óleo de coco'],
      allergens: [],
      nutrition: { calories: 519, protein: 2.3, carbs: 58.4, fat: 33.6 },
      distance: 1.5,
      inStock: true
    },
    {
      id: 19,
      name: 'Proteína de Ervilha',
      price: 79.90,
      image: 'https://www.gsuplementos.com.br/upload/growth-layout-personalizado/produto/125/pea-protein-04.jpg',
      supplier: 'Mundo Verde',
      rating: 4.5,
      ingredients: ['proteína isolada de ervilha'],
      allergens: [],
      nutrition: { calories: 110, protein: 24.0, carbs: 1.0, fat: 0.5 },
      distance: 0.8,
      inStock: true
    },
    {
      id: 20,
      name: 'Óleo de Coco Extra Virgem',
      price: 18.90,
      image: 'https://cdn.sistemawbuy.com.br/arquivos/f101ef5b9be464a6c8854310ae5f5327/produtos/65bb1eef69eee/12e618946342f000bf143220e136479c-65bb296bdb183.jpg',
      supplier: 'Natural Life',
      rating: 4.7,
      ingredients: ['óleo de coco extra virgem'],
      allergens: [],
      nutrition: { calories: 862, protein: 0.0, carbs: 0.0, fat: 100.0 },
      distance: 2.3,
      inStock: true
    },
    {
      id: 21,
      name: 'Macarrão de Lentilha',
      price: 13.90,
      image: 'https://receitasgalo.com.br/images/receitas/165/galo-imagem-receitas-sopa-de-lentilha-com-macarrao-1-xl.jpg',
      supplier: 'Bio Market',
      rating: 4.6,
      ingredients: ['farinha de lentilha'],
      allergens: [],
      nutrition: { calories: 348, protein: 25.0, carbs: 58.0, fat: 2.0 },
      distance: 2.1,
      inStock: true
    },
    {
      id: 22,
      name: 'Kombucha Gengibre',
      price: 11.90,
      image: 'https://s2.glbimg.com/---wDnXVlZ1to7nBcOY_P4bVT-k=/smart/e.glbimg.com/og/ed/f/original/2020/10/02/receita-kombucha-cha-verde.png',
      supplier: 'Natureza Viva',
      rating: 4.4,
      ingredients: ['chá verde', 'gengibre', 'açúcar de cana', 'cultura de kombucha'],
      allergens: [],
      nutrition: { calories: 30, protein: 0.0, carbs: 7.0, fat: 0.0 },
      distance: 1.2,
      inStock: true
    },
    {
      id: 23,
      name: 'Farinha de Amêndoas',
      price: 28.90,
      image: 'https://images.tcdn.com.br/img/img_prod/1002447/farinha_de_amendoas_150g_1385_1_07269bd9761cb2ae67119d24e1ccca87.jpg',
      supplier: 'Vida Integral',
      rating: 4.8,
      ingredients: ['amêndoas moídas'],
      allergens: ['nozes'],
      nutrition: { calories: 578, protein: 21.2, carbs: 19.7, fat: 49.9 },
      distance: 1.8,
      inStock: true
    },
    {
      id: 24,
      name: 'Spirulina em Pó',
      price: 45.90,
      image: 'https://conteudo.imguol.com.br/c/entretenimento/46/2021/04/29/spirulina-1619728120015_v2_900x506.jpg',
      supplier: 'Mundo Verde',
      rating: 4.5,
      ingredients: ['spirulina'],
      allergens: [],
      nutrition: { calories: 290, protein: 57.5, carbs: 23.9, fat: 7.7 },
      distance: 0.8,
      inStock: true
    },
    {
      id: 25,
      name: 'Biscoito de Arroz Integral',
      price: 7.50,
      image: 'https://static.itdg.com.br/images/640-auto/c2db50e65514d7ccebf9ddddb5e0224c/shutterstock-513197422-1-.jpg',
      supplier: 'Natural Life',
      rating: 4.2,
      ingredients: ['arroz integral', 'sal marinho'],
      allergens: [],
      nutrition: { calories: 387, protein: 7.5, carbs: 81.5, fat: 2.8 },
      distance: 2.3,
      inStock: true
    },
    {
      id: 26,
      name: 'Leite de Aveia',
      price: 9.90,
      image: 'https://www.tendaatacado.com.br/dicas/wp-content/uploads/2023/03/topo-como-fazer-leite-de-aveia.jpg',
      supplier: 'Bio Market',
      rating: 4.3,
      ingredients: ['aveia', 'água', 'sal'],
      allergens: ['glúten'],
      nutrition: { calories: 47, protein: 1.0, carbs: 6.7, fat: 1.5 },
      distance: 2.1,
      inStock: true
    },
    {
      id: 27,
      name: 'Goji Berry',
      price: 35.90,
      image: 'https://saude.abril.com.br/wp-content/uploads/2016/10/saude-goji-berry-beneficios-66549.jpg?crop=1&resize=1212,909',
      supplier: 'Frutas do Norte',
      rating: 4.6,
      ingredients: ['goji berry'],
      allergens: [],
      nutrition: { calories: 349, protein: 14.3, carbs: 77.1, fat: 0.4 },
      distance: 1.5,
      inStock: true
    },
    {
      id: 28,
      name: 'Chá Verde Orgânico',
      price: 12.90,
      image: 'https://a-static.mlcdn.com.br/1500x1500/cha-verde-organico-10-saches-kampo-de-ervas/delhi/15989504640/07fda9ce5b17d6c7f27a5e6b8bf90a93.jpeg',
      supplier: 'Natureza Viva',
      rating: 4.7,
      ingredients: ['folhas de chá verde orgânico'],
      allergens: [],
      nutrition: { calories: 1, protein: 0.2, carbs: 0.0, fat: 0.0 },
      distance: 1.2,
      inStock: true
    },
    {
      id: 29,
      name: 'Cookies Sem Glúten',
      price: 15.90,
      image: 'https://www.receitasdemae.com.br/wp-content/uploads/2015/01/Cookies-de-chocolate-sem-gl%C3%BAten.jpg',
      supplier: 'Vida Integral',
      rating: 4.4,
      ingredients: ['farinha de arroz', 'açúcar demerara', 'óleo de coco', 'ovos'],
      allergens: ['ovos'],
      nutrition: { calories: 465, protein: 6.5, carbs: 65.2, fat: 19.8 },
      distance: 1.8,
      inStock: true
    },
    {
      id: 30,
      name: 'Mix de Nuts Premium',
      price: 32.90,
      image: 'https://dcdn-us.mitiendanube.com/stores/141/495/products/mix-nuts1-c63d22cf5b4728c19015122826731482-640-0.jpg',
      supplier: 'Mundo Verde',
      rating: 4.8,
      ingredients: ['castanha do pará', 'amêndoas', 'nozes', 'avelãs'],
      allergens: ['nozes'],
      nutrition: { calories: 607, protein: 15.2, carbs: 13.7, fat: 54.1 },
      distance: 0.8,
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
