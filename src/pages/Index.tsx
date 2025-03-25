
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Clock, Users, Map, Shield, Headphones } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50 to-white dark:from-navy-950 dark:to-navy-900">
      <div className="container max-w-6xl mx-auto px-4 py-12 md:py-24">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-navy-700 to-emergency-600 bg-clip-text text-transparent dark:from-navy-300 dark:to-emergency-400">
            SI-DPS FFSS Strasbourg OUEST
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Plateforme de gestion des dispositifs prévisionnels de secours et d'interventions d'urgence
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="hover-scale">
              <Link to="/login">
                Connexion <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover-scale">
              <Link to="/dashboard">
                Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
        
        {/* Features Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full glass-card hover-scale">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Map className="h-12 w-12 text-navy-600 dark:text-navy-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Cartographie</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Visualisation en temps réel des équipes et des interventions sur une carte interactive.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full glass-card hover-scale">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-navy-600 dark:text-navy-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Main Courante</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Journal chronologique des événements et décisions prises lors des interventions.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full glass-card hover-scale">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-navy-600 dark:text-navy-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Gestion des DPS</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Planification et organisation des dispositifs prévisionnels de secours.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full glass-card hover-scale">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Headphones className="h-12 w-12 text-navy-600 dark:text-navy-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Téléphonie</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Gestion des appels d'urgence et création rapide d'interventions.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full glass-card hover-scale">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Shield className="h-12 w-12 text-navy-600 dark:text-navy-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Gestion de Crise</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Coordination des ressources et gestion efficace des situations d'urgence.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full glass-card hover-scale">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Code className="h-12 w-12 text-navy-600 dark:text-navy-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Intégration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Compatible avec les systèmes d'information des services d'urgence.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="text-center py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="max-w-3xl mx-auto glass-card p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à améliorer votre gestion des secours ?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Découvrez comment notre plateforme peut vous aider à gérer efficacement vos dispositifs de secours.
            </p>
            <Button asChild size="lg" className="hover-scale">
              <Link to="/home">
                Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} FFSS Strasbourg OUEST. Tous droits réservés.</p>
          <p className="mt-2">Développé pour améliorer la gestion des dispositifs de secours.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
