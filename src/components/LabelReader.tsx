
import React, { useState, useRef } from 'react';
import { Camera, Upload, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

interface LabelReaderProps {
  onClose: () => void;
}

const LabelReader = ({ onClose }: LabelReaderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeLabel();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeLabel = () => {
    setAnalyzing(true);
    // Simulação de análise de rótulo
    setTimeout(() => {
      setResults({
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
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#706f18]">Leitor de Rótulos</h3>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload de Imagem */}
            <div>
              <div className="border-2 border-dashed border-[#98a550] rounded-xl p-8 text-center">
                {selectedImage ? (
                  <img src={selectedImage} alt="Rótulo" className="max-w-full h-auto rounded-lg mx-auto" />
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-[#98a550] rounded-full flex items-center justify-center mx-auto">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600">Adicione uma foto do rótulo nutricional</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex space-x-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-[#706f18] hover:bg-[#5a5a14]"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Escolher Foto
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Usar Câmera
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Resultados da Análise */}
            <div>
              {analyzing && (
                <div className="text-center py-12">
                  <div className="animate-spin w-12 h-12 border-4 border-[#98a550] border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Analisando rótulo...</p>
                </div>
              )}

              {results && (
                <div className="space-y-4">
                  <div className="bg-[#fff5bb] rounded-lg p-4">
                    <h4 className="font-semibold text-[#706f18] mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Score de Saúde: {results.healthScore}/10
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#98a550] h-2 rounded-full" 
                        style={{ width: `${results.healthScore * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#706f18] mb-2">Ingredientes</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.ingredients.map((ingredient: string, index: number) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#706f18] mb-2 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                      Alertas
                    </h4>
                    {results.warnings.map((warning: string, index: number) => (
                      <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-2">
                        <span className="text-orange-800 text-sm">{warning}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#706f18] mb-2">Informações Nutricionais</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="font-medium">Calorias:</span> {results.nutrition.calories} kcal
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="font-medium">Proteínas:</span> {results.nutrition.protein}g
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="font-medium">Carboidratos:</span> {results.nutrition.carbs}g
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="font-medium">Gorduras:</span> {results.nutrition.fat}g
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LabelReader;
