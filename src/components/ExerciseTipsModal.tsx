
import React from 'react';
import { X, Zap, Heart, Target, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface ExerciseTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExerciseTipsModal: React.FC<ExerciseTipsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const allTips = [
    {
      diet: 'Dieta Vegana',
      tip: 'Combine exercícios de força com cardio para otimizar a absorção de proteínas vegetais',
      exercises: ['Musculação', 'Corrida', 'Crossfit'],
      duration: '45-60 min',
      frequency: '4-5x por semana',
      icon: <Heart className="w-5 h-5" />
    },
    {
      diet: 'Dieta Keto',
      tip: 'Exercícios de baixa intensidade são ideais para manter a cetose',
      exercises: ['Caminhada', 'Yoga', 'Pilates'],
      duration: '30-45 min',
      frequency: '5-6x por semana',
      icon: <Zap className="w-5 h-5" />
    },
    {
      diet: 'Low Carb',
      tip: 'Treinos de alta intensidade intervalada (HIIT) maximizam a queima de gordura',
      exercises: ['HIIT', 'Spinning', 'Funcional'],
      duration: '20-30 min',
      frequency: '3-4x por semana',
      icon: <Target className="w-5 h-5" />
    },
    {
      diet: 'Dieta Mediterrânea',
      tip: 'Exercícios variados e moderados complementam perfeitamente este estilo alimentar',
      exercises: ['Natação', 'Ciclismo', 'Dança'],
      duration: '40-50 min',
      frequency: '4-5x por semana',
      icon: <Heart className="w-5 h-5" />
    },
    {
      diet: 'Jejum Intermitente',
      tip: 'Exercite-se durante o período de jejum para maximizar a queima de gordura',
      exercises: ['Cardio leve', 'Yoga', 'Caminhada'],
      duration: '20-40 min',
      frequency: '5-7x por semana',
      icon: <Clock className="w-5 h-5" />
    },
    {
      diet: 'Dieta Flexitariana',
      tip: 'Variedade de exercícios para complementar a flexibilidade alimentar',
      exercises: ['Pilates', 'Corrida', 'Musculação'],
      duration: '45-60 min',
      frequency: '4-6x por semana',
      icon: <Zap className="w-5 h-5" />
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#706f18]">
              Guia Completo de Exercícios por Dieta
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-gray-600 mt-2">
            Descubra os exercícios ideais para cada tipo de dieta
          </p>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {allTips.map((tip, index) => (
              <Card key={index} className="p-6 border-2 border-[#98a550] bg-gradient-to-br from-white to-green-50">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#98a550] rounded-full flex items-center justify-center text-white">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#706f18] text-lg">
                      {tip.diet}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {tip.tip}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-2">Exercícios recomendados:</p>
                    <div className="flex flex-wrap gap-1">
                      {tip.exercises.map((exercise, exerciseIndex) => (
                        <Badge 
                          key={exerciseIndex} 
                          variant="outline" 
                          className="text-xs border-[#98a550] text-[#98a550]"
                        >
                          {exercise}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Duração</p>
                      <p className="font-medium text-[#706f18]">{tip.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Frequência</p>
                      <p className="font-medium text-[#706f18]">{tip.frequency}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-[#fff5bb] to-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-[#706f18] mb-3">
              Dicas Gerais para Todos os Tipos de Dieta
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Sempre faça aquecimento antes dos exercícios</li>
              <li>• Mantenha-se hidratado durante toda a atividade</li>
              <li>• Respeite os sinais do seu corpo e descanse quando necessário</li>
              <li>• Combine diferentes tipos de exercício para resultados melhores</li>
              <li>• Consulte um profissional antes de iniciar qualquer rotina</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseTipsModal;
