
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../components/ui/sonner';

const Appointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const { nutritionist, date, time } = location.state || {};

  if (!nutritionist || !date || !time) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Dados do agendamento não encontrados</h1>
            <Button onClick={() => navigate('/nutricionistas')} className="bg-[#706f18] hover:bg-[#5a5a14]">
              Ver Nutricionistas
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleConfirmAppointment = () => {
    if (!paymentMethod) {
      toast.error('Por favor, selecione uma forma de pagamento');
      return;
    }

    // Simulate appointment confirmation
    setIsConfirmed(true);
    toast.success('Consulta agendada com sucesso!');
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-[#706f18] mb-4">
                Consulta Agendada!
              </h1>
              
              <p className="text-gray-600 mb-6">
                Sua consulta foi agendada com sucesso. Você receberá um e-mail de confirmação em breve.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-[#706f18] mb-4">Detalhes da Consulta:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{nutritionist.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{new Date(date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    <span>R$ {nutritionist.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => navigate('/')} 
                  className="flex-1 bg-[#706f18] hover:bg-[#5a5a14]"
                >
                  Voltar ao Início
                </Button>
                <Button 
                  onClick={() => navigate('/nutricionistas')} 
                  variant="outline"
                  className="flex-1 border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
                >
                  Ver Outros Nutricionistas
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#706f18] mb-8 text-center">
            Confirmar Agendamento
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Appointment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#706f18]">Detalhes da Consulta</CardTitle>
                <CardDescription>
                  Confirme os dados da sua consulta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={nutritionist.photo} alt={nutritionist.name} />
                    <AvatarFallback className="bg-[#e7e5a2] text-[#706f18] text-lg">
                      {nutritionist.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold text-[#706f18]">{nutritionist.name}</h3>
                    <p className="text-gray-600 text-sm">{nutritionist.crn}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {nutritionist.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="border-[#98a550] text-[#98a550] text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#98a550]" />
                    <div>
                      <p className="text-sm text-gray-600">Data</p>
                      <p className="font-medium">{new Date(date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#98a550]" />
                    <div>
                      <p className="text-sm text-gray-600">Horário</p>
                      <p className="font-medium">{time}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Valor da consulta:</span>
                    <span className="text-xl font-bold text-[#706f18]">R$ {nutritionist.price}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Observações (opcional)
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Descreva brevemente o motivo da consulta ou alguma informação importante..."
                    className="border-2 border-gray-200 focus:border-[#98a550]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment and Confirmation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#706f18]">Dados do Paciente</CardTitle>
                <CardDescription>
                  Seus dados para a consulta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#98a550]" />
                      <div>
                        <p className="text-sm text-gray-600">Nome</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#98a550]" />
                      <div>
                        <p className="text-sm text-gray-600">E-mail</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#98a550]" />
                        <div>
                          <p className="text-sm text-gray-600">Telefone</p>
                          <p className="font-medium">{user.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input placeholder="Seu nome completo" />
                    <Input type="email" placeholder="Seu e-mail" />
                    <Input type="tel" placeholder="Seu telefone" />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Forma de pagamento
                  </label>
                  <div className="space-y-2">
                    {['Dinheiro', 'PIX', 'Cartão de Débito', 'Cartão de Crédito'].map((method) => (
                      <label key={method} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-[#98a550] focus:ring-[#98a550]"
                        />
                        <span className="text-sm">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleConfirmAppointment}
                  className="w-full bg-[#706f18] hover:bg-[#5a5a14]"
                  disabled={!paymentMethod}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirmar Agendamento
                </Button>

                <Button
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="w-full border-[#98a550] text-[#98a550] hover:bg-[#98a550] hover:text-white"
                >
                  Voltar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Appointment;
