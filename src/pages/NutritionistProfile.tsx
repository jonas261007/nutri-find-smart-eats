
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Phone, Mail, MapPin, Calendar, Clock, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import Header from '../components/Header';

// Mock nutritionist data
const nutritionists = [
  {
    id: '1',
    name: 'Dra. Maria Silva',
    crn: 'CRN-6 12345',
    photo: '/placeholder.svg',
    specialties: ['Nutrição Esportiva', 'Emagrecimento', 'Nutrição Clínica'],
    rating: 4.9,
    reviews: 127,
    bio: 'Nutricionista com mais de 10 anos de experiência em nutrição esportiva e emagrecimento saudável. Especialista em dietas personalizadas.',
    phone: '(81) 99999-1234',
    email: 'dra.maria@nutrifind.com',
    location: 'Recife, PE',
    price: 150
  },
  {
    id: '2',
    name: 'Dr. João Santos',
    crn: 'CRN-6 54321',
    photo: '/placeholder.svg',
    specialties: ['Nutrição Infantil', 'Diabetes', 'Hipertensão'],
    rating: 4.8,
    reviews: 89,
    bio: 'Especialista em nutrição infantil e tratamento nutricional de doenças crônicas. Atendimento humanizado e personalizado.',
    phone: '(81) 99999-5678',
    email: 'dr.joao@nutrifind.com',
    location: 'Recife, PE',
    price: 120
  }
];

const NutritionistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const nutritionist = nutritionists.find(n => n.id === id);

  if (!nutritionist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Nutricionista não encontrado</h1>
            <Button onClick={() => navigate('/nutricionistas')} className="bg-[#706f18] hover:bg-[#5a5a14]">
              Ver Todos os Nutricionistas
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleScheduleConsultation = () => {
    if (!selectedDate || !selectedTime) {
      alert('Por favor, selecione uma data e horário');
      return;
    }
    
    navigate('/agendamento', {
      state: {
        nutritionist,
        date: selectedDate,
        time: selectedTime
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={nutritionist.photo} alt={nutritionist.name} />
                      <AvatarFallback className="bg-[#e7e5a2] text-[#706f18] text-xl">
                        {nutritionist.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-[#706f18]">{nutritionist.name}</CardTitle>
                      <p className="text-gray-600 mb-2">{nutritionist.crn}</p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(nutritionist.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium">{nutritionist.rating}</span>
                          <span className="ml-1 text-sm text-gray-500">({nutritionist.reviews} avaliações)</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {nutritionist.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="border-[#98a550] text-[#98a550]">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-[#706f18] mb-2">Sobre</h3>
                      <p className="text-gray-700">{nutritionist.bio}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#98a550]" />
                        <span className="text-sm">{nutritionist.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#98a550]" />
                        <span className="text-sm">{nutritionist.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#98a550]" />
                        <span className="text-sm">{nutritionist.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#98a550]" />
                        <span className="text-sm">R$ {nutritionist.price} / consulta</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Appointment Scheduling */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-[#706f18]">
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar Consulta
                  </CardTitle>
                  <CardDescription>
                    Escolha uma data e horário para sua consulta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Data</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#98a550] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Horário</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#98a550] focus:border-transparent"
                    >
                      <option value="">Selecione um horário</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                    </select>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Valor da consulta:</span>
                      <span className="font-bold text-[#706f18]">R$ {nutritionist.price}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleScheduleConsultation}
                    className="w-full bg-[#706f18] hover:bg-[#5a5a14]"
                    disabled={!selectedDate || !selectedTime}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Marcar Consulta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NutritionistProfile;
