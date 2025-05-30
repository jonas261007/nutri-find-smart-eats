import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  dietaryRestrictions?: string[];
  avatar?: string;
  userType?: 'user' | 'nutritionist';
  crn?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  userType?: 'user' | 'nutritionist';
  crn?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('healthyfood_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificar credenciais (mock)
    const savedUsers = JSON.parse(localStorage.getItem('healthyfood_users') || '[]');
    const foundUser = savedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('healthyfood_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const savedUsers = JSON.parse(localStorage.getItem('healthyfood_users') || '[]');
      
      // Verificar se email já existe
      if (savedUsers.find((u: any) => u.email === userData.email)) {
        setIsLoading(false);
        return false;
      }
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        dietaryRestrictions: [],
        avatar: ''
      };
      
      savedUsers.push(newUser);
      localStorage.setItem('healthyfood_users', JSON.stringify(savedUsers));
      
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('healthyfood_user', JSON.stringify(userWithoutPassword));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthyfood_user');
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular chamada à API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      if (!user) return false;
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('healthyfood_user', JSON.stringify(updatedUser));
      
      // Atualizar também na lista de usuários
      const savedUsers = JSON.parse(localStorage.getItem('healthyfood_users') || '[]');
      const userIndex = savedUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        savedUsers[userIndex] = { ...savedUsers[userIndex], ...userData };
        localStorage.setItem('healthyfood_users', JSON.stringify(savedUsers));
      }
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
