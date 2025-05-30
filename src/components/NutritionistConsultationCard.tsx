import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Star, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
const NutritionistConsultationCard = () => {
  const navigate = useNavigate();
  return <section className="py-8 sm:py-12">
      <Card className="bg-gradient-to-r from-[#706f18] to-[#98a550] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        
        <CardHeader className="relative z-10 text-center pb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          
          <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
            Transforme sua Alimentação
          </CardTitle>
          
          <CardDescription className="text-white text-opacity-90 text-base sm:text-lg max-w-2xl mx-auto">
            Agende uma consulta com nossos nutricionistas especialistas e conquiste seus objetivos de saúde
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10 text-center space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-300" />
              </div>
              <h3 className="font-semibold mb-1">Profissionais Qualificados</h3>
              <p className="text-sm text-white text-opacity-80">Nutricionistas com CRN ativo e especialização</p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-yellow-300" />
              </div>
              <h3 className="font-semibold mb-1">Agendamento Fácil</h3>
              <p className="text-sm text-white text-opacity-80">Escolha data e horário que funciona para você</p>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-yellow-300" />
              </div>
              <h3 className="font-semibold mb-1">Atendimento Personalizado</h3>
              <p className="text-sm text-white text-opacity-80">Plano alimentar exclusivo para seus objetivos</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Button onClick={() => navigate('/nutricionistas')} size="lg" className="bg-white text-[#706f18] hover:bg-gray-300 font-semibold">
              Ver Nutricionistas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button onClick={() => navigate('/nutricionistas')} size="lg" variant="outline" className="bg-white text-[#706f18] hover:bg-gray-300 font-semibold">
              <Calendar className="w-4 h-4 mr-2" />
              Agendar Consulta
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>;
};
export default NutritionistConsultationCard;