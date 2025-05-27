
interface OCRResult {
  ingredients: string[];
  allergens: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sodium: number;
  };
  warnings: string[];
  healthScore: number;
}

export const analyzeLabel = async (imageFile: File): Promise<OCRResult> => {
  // Simula o processamento OCR
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Resultados simulados baseados no tipo de imagem
  const mockResults: OCRResult[] = [
    {
      ingredients: ['Farinha de trigo', 'Açúcar', 'Óleo de palma', 'Sal', 'Fermento'],
      allergens: ['Glúten'],
      nutrition: {
        calories: 450,
        protein: 8.2,
        carbs: 62.1,
        fat: 18.5,
        sodium: 380
      },
      warnings: ['Contém glúten', 'Alto teor de sódio'],
      healthScore: 6.2
    },
    {
      ingredients: ['Leite', 'Açúcar', 'Chocolate', 'Conservantes'],
      allergens: ['Lactose'],
      nutrition: {
        calories: 390,
        protein: 7.8,
        carbs: 55.3,
        fat: 15.2,
        sodium: 120
      },
      warnings: ['Contém lactose', 'Alto teor de açúcar'],
      healthScore: 5.8
    },
    {
      ingredients: ['Aveia integral', 'Mel', 'Castanhas', 'Passas'],
      allergens: ['Nozes'],
      nutrition: {
        calories: 380,
        protein: 12.5,
        carbs: 68.1,
        fat: 8.9,
        sodium: 15
      },
      warnings: ['Contém nozes'],
      healthScore: 8.5
    }
  ];

  return mockResults[Math.floor(Math.random() * mockResults.length)];
};

export const processImageFromCamera = async (): Promise<OCRResult> => {
  // Simula captura da câmera
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    ingredients: ['Água', 'Açúcar', 'Ácido cítrico', 'Corante natural'],
    allergens: [],
    nutrition: {
      calories: 42,
      protein: 0,
      carbs: 10.5,
      fat: 0,
      sodium: 8
    },
    warnings: ['Alto teor de açúcar'],
    healthScore: 7.2
  };
};
