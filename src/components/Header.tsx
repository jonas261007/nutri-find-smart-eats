
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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e título */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#98a550] rounded-full flex items-center justify-center">
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h1 
                className="text-lg md:text-2xl font-bold cursor-pointer"
                onClick={() => navigate('/')}
              >
                HealthyFood
              </h1>
              <p className="text-green-200 text-xs md:text-sm hidden sm:block">
                Alimentos saudáveis para sua dieta
              </p>
            </div>
          </div>
          
          {/* Menu desktop */}
          <nav className="hidden lg:flex items-center space-x-6">
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
          <div className="hidden md:flex items-center space-x-4">
            {/* Localização */}
            <div className="flex items-center space-x-2 text-green-200">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Recife, PE</span>
            </div>

            {/* Botão de login/perfil */}
            {user ? (
              <Button
                onClick={handleAuthClick}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-[#5a5a14] p-2"
              >
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarFallback className="bg-[#98a550] text-white text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.name.split(' ')[0]}</span>
              </Button>
            ) : (
              <Button
                onClick={handleAuthClick}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-[#5a5a14] p-2"
              >
                <LogIn className="w-4 h-4 mr-2" />
                <span className="text-sm">Entrar</span>
              </Button>
            )}
          </div>

          {/* Botão menu mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-[#5a5a14] p-2"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-green-600 pt-4">
            <nav className="flex flex-col space-y-3">
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
                    Meu Perfil
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="w-4 h-4 mr-2" />
                    Entrar
                  </div>
                )}
              </button>
              
              {/* Localização no menu mobile */}
              <div className="flex items-center space-x-2 text-green-200 py-2">
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
