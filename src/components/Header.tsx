
import React, { useState } from 'react';
import { Search, MapPin, Menu, X, User, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback } from './ui/avatar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    // Se estivermos na página de perfil, navegar para home primeiro
    if (location.pathname === '/perfil') {
      navigate('/');
      // Aguardar um momento para a página carregar antes de fazer scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Se já estivermos na home, fazer scroll normalmente
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (user) {
      navigate('/perfil');
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#706f18] text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo e título */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#e7e5a2] rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/14b59a35-0106-40ae-a73e-592923ab6ccb.png" 
                alt="NutriFind Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
              />
            </div>
            <div>
              <h1 
                className="text-base sm:text-lg md:text-2xl font-bold cursor-pointer"
                onClick={() => navigate('/')}
              >
                NutriFind
              </h1>
              <p className="text-white-200 text-xs md:text-sm hidden sm:block">
                Alimentos saudáveis para sua dieta
              </p>
            </div>
          </div>
          
          {/* Menu desktop */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <button 
              onClick={() => scrollToSection('busca')} 
              className="hover:text-green-200 transition-colors text-sm"
            >
              Buscar
            </button>
            <button 
              onClick={() => scrollToSection('resultados')} 
              className="hover:text-green-200 transition-colors text-sm"
            >
              Produtos
            </button>
            <button 
              onClick={() => scrollToSection('mapa')} 
              className="hover:text-green-200 transition-colors text-sm"
            >
              Localização
            </button>
            <button 
              onClick={() => scrollToSection('parcerias')} 
              className="hover:text-green-200 transition-colors text-sm"
            >
              Academias
            </button>
          </nav>

          {/* Área de usuário e localização */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {/* Localização */}
            <div className="flex items-center space-x-1 lg:space-x-2 text-white-200">
              <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="text-xs lg:text-sm">Recife, PE</span>
            </div>

            {/* Botão de login/perfil */}
            {user ? (
              <Button
                onClick={handleAuthClick}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-[#5a5a14] p-1 lg:p-2"
              >
                <Avatar className="w-5 h-5 lg:w-6 lg:h-6 mr-1 lg:mr-2">
                  <AvatarFallback className="bg-[#a4b15a] text-white text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs lg:text-sm hidden lg:inline">{user.name.split(' ')[0]}</span>
              </Button>
            ) : (
              <Button
                onClick={handleAuthClick}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-[#b2b25d] p-1 lg:p-2"
              >
                <LogIn className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                <span className="text-xs lg:text-sm">Entrar</span>
              </Button>
            )}
          </div>

          {/* Botão menu mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-[#5a5a14] p-1 sm:p-2"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </Button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 sm:mt-4 pb-3 sm:pb-4 border-t border-green-600 pt-3 sm:pt-4">
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              <button 
                onClick={() => scrollToSection('busca')} 
                className="text-left hover:text-green-200 transition-colors py-2 text-sm"
              >
                🔍 Buscar Alimentos
              </button>
              <button 
                onClick={() => scrollToSection('resultados')} 
                className="text-left hover:text-green-200 transition-colors py-2 text-sm"
              >
                🥗 Produtos
              </button>
              <button 
                onClick={() => scrollToSection('mapa')} 
                className="text-left hover:text-green-200 transition-colors py-2 text-sm"
              >
                📍 Localização
              </button>
              <button 
                onClick={() => scrollToSection('parcerias')} 
                className="text-left hover:text-green-200 transition-colors py-2 text-sm"
              >
                🏋️‍♂️ Academias
              </button>
              
              {/* Botão de login/perfil no menu mobile */}
              <button
                onClick={handleAuthClick}
                className="text-left hover:text-green-200 transition-colors py-2 text-sm border-t border-green-600 mt-2 pt-2"
              >
                {user ? (
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Meu Perfil ({user.name.split(' ')[0]})
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </div>
                )}
              </button>
              
              {/* Localização no menu mobile */}
              <div className="flex items-center space-x-2 text-white-200 py-2 border-t border-green-600 mt-2 pt-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Recife, PE</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
