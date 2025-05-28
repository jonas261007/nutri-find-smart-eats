
import React, { useState } from 'react';
import { Star, MapPin, Zap, Users, Calendar } from 'lucide-react';
import { Gym } from '../types';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import GymScheduler from './GymScheduler';
import ExerciseTipsModal from './ExerciseTipsModal';

const PartnershipsSection = () => {
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [showExerciseTips, setShowExerciseTips] = useState(false);

  const gyms: Gym[] = [
    {
      id: 1,
      name: 'Academia Fitness Plus',
      address: 'Rua dos Esportes, 100 - Centro',
      distance: 0.5,
      rating: 4.9,
      promotion: '20% OFF no primeiro mês para usuários NutriFind',
      image: 'https://media.istockphoto.com/id/1679800838/pt/foto/close-up-of-feet-sportman-runner-running-on-treadmill-in-fitness-club-cardio-workout-healthy.jpg?s=612x612&w=0&k=20&c=olUbpbeN9jnIlQ7BXkharvuYwJYhZgUBSLHHxLKvN9I='
    },
    {
      id: 2,
      name: 'BodyShape Academia',
      address: 'Av. da Saúde, 250 - Vila Nova',
      distance: 1.1,
      rating: 4.7,
      promotion: 'Avaliação física gratuita + plano personalizado',
      image: 'https://s2-ge.glbimg.com/K2qGf0TpNYFJlZw3fD4hoIFwL9Q=/0x0:1254x836/984x0/smart/filters:strip_icc()/s.glbimg.com/es/ge/f/original/2020/02/13/academia_amigos.jpg'
    },
    {
      id: 3,
      name: 'Studio Wellness',
      address: 'Rua Harmonia, 75 - Jardim América',
      distance: 1.8,
      rating: 4.8,
      promotion: 'Aulas de yoga e pilates inclusas no plano básico',
      image: 'https://vitat.com.br/wp-content/uploads/2021/09/shutterstock_721502398_easy-resi.jpg'
    }
  ];

  const workoutTips = [
    {
      diet: 'Dieta Vegana',
      tip: 'Combine exercícios de força com cardio para otimizar a absorção de proteínas vegetais',
      exercises: ['Musculação', 'Corrida', 'Crossfit']
    },
    {
      diet: 'Dieta Keto',
      tip: 'Exercícios de baixa intensidade são ideais para manter a cetose',
      exercises: ['Caminhada', 'Yoga', 'Pilates']
    },
    {
      diet: 'Low Carb',
      tip: 'Treinos de alta intensidade intervalada (HIIT) maximizam a queima de gordura',
      exercises: ['HIIT', 'Spinning', 'Funcional']
    }
  ];

  const getDirections = (gym: Gym) => {
    const address = encodeURIComponent(gym.address + ', Recife, PE');
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(url, '_blank');
  };

  return (
    <section id="parcerias" className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#706f18] mb-3">
          Academias Parceiras
        </h2>
        <p className="text-gray-600 text-lg">
          Complete sua jornada saudável com exercícios e promoções exclusivas
        </p>
      </div>

      {/* Academias */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gyms.map((gym) => (
          <Card key={gym.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="relative">
              <img 
                src={gym.image} 
                alt={gym.name} 
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-[#706f18]">
                <Zap className="w-3 h-3 mr-1" />
                Parceiro
              </Badge>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-[#706f18]">
                  {gym.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{gym.rating}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {gym.address}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {gym.distance} km de distância
                </div>
              </div>

              <div className="bg-[#fff5bb] rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-[#706f18] mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Promoção Exclusiva
                </h4>
                <p className="text-sm text-gray-700">{gym.promotion}</p>
              </div>

              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-[#706f18] hover:bg-[#5a5a14]"
                  onClick={() => setSelectedGym(gym)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Visita
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
                  onClick={() => getDirections(gym)}
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Dicas de Exercícios */}
      <div className="bg-gradient-to-r from-[#fff5bb] to-green-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-[#706f18] mb-6 text-center">
          Dicas de Exercícios por Tipo de Dieta
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {workoutTips.map((tip, index) => (
            <Card key={index} className="p-6 border-2 border-[#98a550] bg-white">
              <h4 className="font-semibold text-[#706f18] mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-[#98a550]" />
                {tip.diet}
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{tip.tip}</p>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600">Exercícios recomendados:</p>
                <div className="flex flex-wrap gap-1">
                  {tip.exercises.map((exercise, exerciseIndex) => (
                    <Badge key={exerciseIndex} variant="outline" className="text-xs border-[#98a550] text-[#98a550]">
                      {exercise}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button 
            className="bg-[#706f18] hover:bg-[#5a5a14] px-8 py-3"
            onClick={() => setShowExerciseTips(true)}
          >
            <Users className="w-4 h-4 mr-2" />
            Ver Mais Dicas de Exercícios
          </Button>
        </div>
      </div>

      {/* Modal de Agendamento */}
      <GymScheduler 
        gym={selectedGym} 
        onClose={() => setSelectedGym(null)} 
      />

      {/* Modal de Dicas de Exercícios */}
      <ExerciseTipsModal 
        isOpen={showExerciseTips}
        onClose={() => setShowExerciseTips(false)}
      />
    </section>
  );
};

export default PartnershipsSection;
