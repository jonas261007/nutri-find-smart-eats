
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Award, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import Header from '../components/Header';

// Mock nutritionists data
const nutritionistsData = [
  {
    id: '1',
    name: 'Dra. Maria Silva',
    crn: 'CRN-6 12345',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
    specialties: ['Nutrição Esportiva', 'Emagrecimento', 'Nutrição Clínica'],
    rating: 4.9,
    reviews: 127,
    location: 'Recife, PE',
    price: 150,
    distance: '2.1 km'
  },
  {
    id: '2',
    name: 'Dr. João Santos',
    crn: 'CRN-6 54321',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
    specialties: ['Nutrição Infantil', 'Diabetes', 'Hipertensão'],
    rating: 4.8,
    reviews: 89,
    location: 'Recife, PE',
    price: 120,
    distance: '1.5 km'
  },
  {
    id: '3',
    name: 'Dra. Ana Costa',
    crn: 'CRN-6 67890',
    photo: 'https://images.unsplash.com/photo-1594824087379-62d84b5dcbdc?w=300&h=300&fit=crop&crop=face',
    specialties: ['Nutrição Vegana', 'Alergias Alimentares', 'Gestação'],
    rating: 4.7,
    reviews: 156,
    location: 'Recife, PE',
    price: 180,
    distance: '3.2 km'
  }
];

const Nutritionists = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const specialties = [
    'Todos',
    'Nutrição Esportiva',
    'Emagrecimento',
    'Nutrição Infantil',
    'Diabetes',
    'Nutrição Vegana',
    'Gestação'
  ];

  const filteredNutritionists = nutritionistsData.filter(nutritionist => {
    const matchesSearch = nutritionist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nutritionist.specialties.some(spec => 
                           spec.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'Todos' ||
                            nutritionist.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#706f18] mb-4">
              Encontre seu Nutricionista
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Conecte-se com nutricionistas qualificados para uma alimentação mais saudável
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar por nome ou especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-gray-200 focus:border-[#98a550]"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-md focus:ring-2 focus:ring-[#98a550] focus:border-transparent"
                >
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty === 'Todos' ? '' : specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredNutritionists.length} nutricionista{filteredNutritionists.length !== 1 ? 's' : ''} encontrado{filteredNutritionists.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Nutritionists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNutritionists.map((nutritionist) => (
              <Card key={nutritionist.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={nutritionist.photo} alt={nutritionist.name} />
                      <AvatarFallback className="bg-[#e7e5a2] text-[#706f18] text-lg">
                        {nutritionist.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <CardTitle className="text-lg text-[#706f18] mb-1">
                        {nutritionist.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-2">{nutritionist.crn}</p>
                      
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(nutritionist.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs font-medium">{nutritionist.rating}</span>
                        <span className="text-xs text-gray-500">({nutritionist.reviews})</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {nutritionist.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="border-[#98a550] text-[#98a550] text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {nutritionist.specialties.length > 2 && (
                        <Badge variant="outline" className="border-gray-300 text-gray-500 text-xs">
                          +{nutritionist.specialties.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">{nutritionist.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3 text-green-600" />
                        <span className="font-bold text-[#706f18]">R$ {nutritionist.price}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate(`/nutricionista/${nutritionist.id}`)}
                      className="w-full bg-[#706f18] hover:bg-[#5a5a14]"
                    >
                      Ver Perfil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNutritionists.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum nutricionista encontrado</h3>
              <p className="text-gray-500">Tente ajustar seus filtros de busca</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Nutritionists;
