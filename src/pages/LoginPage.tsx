
import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const { status } = useAuth();
  
  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-emergency-700">Secours Régulation</h1>
        <p className="text-muted-foreground">Système de gestion des opérations de secours</p>
      </div>
      <LoginForm />
      <div className="mt-12 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Secours Régulation · Tous droits réservés
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
