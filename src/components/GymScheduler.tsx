
import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, X, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Gym } from '../types';

interface GymSchedulerProps {
  gym: Gym | null;
  onClose: () => void;
}

interface AppointmentForm {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  service: string;
}

const GymScheduler = ({ gym, onClose }: GymSchedulerProps) => {
  const [formData, setFormData] = useState<AppointmentForm>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: 'avaliacao'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const services = [
    { value: 'avaliacao', label: 'Avaliação Física Gratuita' },
    { value: 'treino', label: 'Aula Experimental' },
    { value: 'nutricao', label: 'Consulta Nutricional' },
    { value: 'plano', label: 'Apresentação de Planos' }
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  if (!gym) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Fechar após 3 segundos
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  const handleInputChange = (field: keyof AppointmentForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-white text-center p-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-[#706f18] mb-2">Agendamento Confirmado!</h3>
          <p className="text-gray-600 mb-4">
            Você receberá uma confirmação por WhatsApp em breve.
          </p>
          <Badge className="bg-[#706f18]">
            {gym.name} • {formData.date} às {formData.time}
          </Badge>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-[#706f18]">Agendar Visita</h3>
              <p className="text-gray-600">{gym.name}</p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Informações da Academia */}
            <div>
              <img 
                src={gym.image} 
                alt={gym.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#98a550]" />
                  <span className="text-sm text-gray-600">{gym.address}</span>
                </div>
                
                <div className="bg-[#fff5bb] rounded-lg p-3">
                  <h4 className="font-semibold text-[#706f18] mb-1">Promoção Especial</h4>
                  <p className="text-sm text-gray-700">{gym.promotion}</p>
                </div>

                <div className="text-sm text-gray-600">
                  <p><strong>Horário de Funcionamento:</strong></p>
                  <p>Segunda a Sexta: 06:00 - 22:00</p>
                  <p>Sábado: 08:00 - 18:00</p>
                  <p>Domingo: 08:00 - 14:00</p>
                </div>
              </div>
            </div>

            {/* Formulário de Agendamento */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#706f18] mb-1">
                    Nome Completo *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    className="border-[#98a550] focus:border-[#706f18]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#706f18] mb-1">
                    WhatsApp *
                  </label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(81) 99999-9999"
                    className="border-[#98a550] focus:border-[#706f18]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#706f18] mb-1">
                    E-mail
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="border-[#98a550] focus:border-[#706f18]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#706f18] mb-1">
                    Tipo de Serviço *
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full p-2 border border-[#98a550] rounded-md focus:border-[#706f18] focus:outline-none"
                  >
                    {services.map(service => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#706f18] mb-1">
                      Data *
                    </label>
                    <Input
                      required
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="border-[#98a550] focus:border-[#706f18]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#706f18] mb-1">
                      Horário *
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full p-2 border border-[#98a550] rounded-md focus:border-[#706f18] focus:outline-none"
                    >
                      <option value="">Selecione</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#706f18] hover:bg-[#5a5a14]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Agendando...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Confirmar Agendamento
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Importante:</strong> Você receberá uma confirmação por WhatsApp. 
                  Em caso de dúvidas, entre em contato diretamente com a academia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GymScheduler;
