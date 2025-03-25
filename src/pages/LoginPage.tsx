
import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { status } = useAuth();
  
  if (status === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4 bg-gradient-to-br from-navy-900 to-emergency-950">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-56 h-56 bg-emergency-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-[40%] right-[20%] w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[35%] w-48 h-48 bg-navy-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mb-8 text-center z-10"
      >
        <h1 className="text-5xl font-bold mb-2 text-white">Secours Régulation</h1>
        <p className="text-emergency-100">Système de gestion des opérations de secours</p>
      </motion.div>
      
      <LoginForm />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 text-center z-10"
      >
        <p className="text-xs text-emergency-200">
          © {new Date().getFullYear()} Secours Régulation · Tous droits réservés
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
