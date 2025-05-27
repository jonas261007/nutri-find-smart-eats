
import React, { useState, useRef } from 'react';
import { Camera, Upload, X, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { analyzeLabel, processImageFromCamera } from '../services/ocrService';
import { useApp } from '../contexts/AppContext';

interface LabelReaderProps {
  onClose: () => void;
}

interface AnalysisResult {
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

const LabelReader = ({ onClose }: LabelReaderProps) => {
  const { filters } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione um arquivo de imagem válido');
      return;
    }

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Imagem muito grande. Máximo 5MB');
      return;
    }

    setError(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      analyzeImage(file);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (file: File) => {
    setAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeLabel(file);
      setResults(result);
    } catch (err) {
      setError('Erro ao analisar a imagem. Tente novamente.');
      console.error('Erro na análise OCR:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCameraCapture = async () => {
    setAnalyzing(true);
    setError(null);
    
    try {
      const result = await processImageFromCamera();
      setResults(result);
      setSelectedImage('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A');
    } catch (err) {
      setError('Erro ao capturar imagem da câmera. Tente novamente.');
      console.error('Erro na captura da câmera:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getHealthScoreBadge = (score: number) => {
    if (score >= 8) return 'Muito Saudável';
    if (score >= 6) return 'Moderado';
    return 'Pouco Saudável';
  };

  const hasUserAllergies = (allergens: string[]) => {
    return filters.allergies.some(userAllergy =>
      allergens.some(allergen =>
        allergen.toLowerCase().includes(userAllergy.toLowerCase())
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#706f18]">Leitor de Rótulos Inteligente</h3>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upload de Imagem */}
            <div>
              <div className="border-2 border-dashed border-[#98a550] rounded-xl p-8 text-center">
                {selectedImage ? (
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Rótulo" 
                      className="max-w-full max-h-64 object-contain rounded-lg mx-auto" 
                    />
                    {analyzing && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <div className="text-center text-white">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                          <p>Analisando rótulo...</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-[#98a550] rounded-full flex items-center justify-center mx-auto">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Adicione uma foto do rótulo nutricional</p>
                      <p className="text-sm text-gray-500 mt-1">Formatos aceitos: JPEG, PNG • Máximo 5MB</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex space-x-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 bg-[#706f18] hover:bg-[#5a5a14]"
                  disabled={analyzing}
                >
                  {analyzing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 mr-2" />
                  )}
                  Escolher Foto
                </Button>
                <Button
                  onClick={handleCameraCapture}
                  variant="outline"
                  className="flex-1 border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
                  disabled={analyzing}
                >
                  {analyzing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4 mr-2" />
                  )}
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
                  <Loader2 className="w-12 h-12 animate-spin text-[#98a550] mx-auto mb-4" />
                  <p className="text-gray-600">Processando imagem com tecnologia OCR...</p>
                  <p className="text-sm text-gray-500 mt-1">Isso pode levar alguns segundos</p>
                </div>
              )}

              {results && (
                <div className="space-y-6">
                  {/* Score de Saúde */}
                  <div className="bg-[#fff5bb] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-[#706f18] flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Score de Saúde
                      </h4>
                      <Badge className={`${getHealthScoreColor(results.healthScore)} border-0`}>
                        {getHealthScoreBadge(results.healthScore)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${
                            results.healthScore >= 8 ? 'bg-green-500' :
                            results.healthScore >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${results.healthScore * 10}%` }}
                        />
                      </div>
                      <span className="font-bold text-lg text-[#706f18]">
                        {results.healthScore}/10
                      </span>
                    </div>
                  </div>

                  {/* Ingredientes */}
                  <div>
                    <h4 className="font-semibold text-[#706f18] mb-3">Ingredientes Identificados</h4>
                    <div className="flex flex-wrap gap-2">
                      {results.ingredients.map((ingredient, index) => (
                        <Badge key={index} variant="outline" className="border-[#98a550] text-[#98a550]">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Alergênios */}
                  {results.allergens.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-[#706f18] mb-3 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                        Alergênios Detectados
                      </h4>
                      <div className="space-y-2">
                        {results.allergens.map((allergen, index) => (
                          <div 
                            key={index} 
                            className={`border rounded-lg p-3 ${
                              hasUserAllergies([allergen]) 
                                ? 'bg-red-50 border-red-200' 
                                : 'bg-orange-50 border-orange-200'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className={`w-4 h-4 ${
                                hasUserAllergies([allergen]) ? 'text-red-600' : 'text-orange-600'
                              }`} />
                              <span className={
                                hasUserAllergies([allergen]) ? 'text-red-800 font-medium' : 'text-orange-800'
                              }>
                                {allergen}
                              </span>
                              {hasUserAllergies([allergen]) && (
                                <Badge variant="destructive" className="ml-auto">
                                  ⚠️ Seu Alergênio!
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Avisos */}
                  {results.warnings.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-[#706f18] mb-3">Alertas Nutricionais</h4>
                      {results.warnings.map((warning, index) => (
                        <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-2">
                          <span className="text-yellow-800 text-sm">{warning}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Informações Nutricionais */}
                  <div>
                    <h4 className="font-semibold text-[#706f18] mb-3">Informações Nutricionais (por 100g)</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium">Calorias:</span> {results.nutrition.calories} kcal
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium">Proteínas:</span> {results.nutrition.protein}g
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium">Carboidratos:</span> {results.nutrition.carbs}g
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium">Gorduras:</span> {results.nutrition.fat}g
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                        <span className="font-medium">Sódio:</span> {results.nutrition.sodium}mg
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex space-x-3 pt-4 border-t">
                    <Button 
                      className="flex-1 bg-[#706f18] hover:bg-[#5a5a14]"
                      onClick={() => {
                        // Aqui poderia salvar o produto analisado
                        console.log('Produto analisado salvo:', results);
                      }}
                    >
                      Salvar Análise
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
                      onClick={() => {
                        setSelectedImage(null);
                        setResults(null);
                        setError(null);
                      }}
                    >
                      Nova Análise
                    </Button>
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
