
import React from 'react';
import { Search, MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#706f18] text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#98a550] rounded-full flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">HealthyFood</h3>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Encontre alimentos saudáveis e acessíveis alinhados à sua dieta pessoal. 
              Sua jornada para uma vida mais saudável começa aqui.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold mb-4 text-[#fff5bb]">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#busca" className="text-green-200 hover:text-white transition-colors">Buscar Alimentos</a></li>
              <li><a href="#resultados" className="text-green-200 hover:text-white transition-colors">Produtos</a></li>
              <li><a href="#mapa" className="text-green-200 hover:text-white transition-colors">Localização</a></li>
              <li><a href="#parcerias" className="text-green-200 hover:text-white transition-colors">Academias Parceiras</a></li>
            </ul>
          </div>

          {/* Funcionalidades */}
          <div>
            <h4 className="font-semibold mb-4 text-[#fff5bb]">Funcionalidades</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-green-200">✓ Filtros Personalizados</li>
              <li className="text-green-200">✓ Leitura de Rótulos</li>
              <li className="text-green-200">✓ Comparação de Preços</li>
              <li className="text-green-200">✓ Localização de Lojas</li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4 text-[#fff5bb]">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#98a550]" />
                <span className="text-green-200">Recife, PE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#98a550]" />
                <span className="text-green-200">(81) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#98a550]" />
                <span className="text-green-200">contato@healthyfood.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Separação */}
        <div className="border-t border-green-600 my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-green-200 text-sm flex items-center justify-center space-x-2">
            <span>© 2024 HealthyFood. Desenvolvido com</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>para uma vida mais saudável.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
