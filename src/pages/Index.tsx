
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Clock, Users, Map, Shield, Headphones, Check } from 'lucide-react';

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
      {/* Hero Section with Background Image */}
      <div className="relative bg-navy-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 to-navy-900/80 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506833345857-935a8275b07a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30"></div>
        
        <div className="container max-w-6xl mx-auto px-4 py-20 md:py-32 relative z-20">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SI-DPS FFSS Strasbourg OUEST
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Plateforme de gestion des dispositifs prévisionnels de secours et d'interventions d'urgence
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-emergency-600 hover:bg-emergency-700">
                <Link to="/login">
                  Connexion <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white/50 hover:bg-white/10">
                <Link to="/home">
                  Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container max-w-6xl mx-auto px-4 py-20">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-800 dark:text-white">
            Fonctionnalités Principales
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Une solution complète pour la gestion des dispositifs de secours et des interventions d'urgence.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all border-navy-100 dark:border-navy-800">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-navy-100 dark:bg-navy-800 rounded-full flex items-center justify-center mb-6">
                  <Map className="h-8 w-8 text-navy-600 dark:text-navy-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy-800 dark:text-white">Cartographie</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Visualisation en temps réel des équipes et des interventions sur une carte interactive.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all border-navy-100 dark:border-navy-800">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-navy-100 dark:bg-navy-800 rounded-full flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-navy-600 dark:text-navy-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy-800 dark:text-white">Main Courante</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Journal chronologique des événements et décisions prises lors des interventions.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all border-navy-100 dark:border-navy-800">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-navy-100 dark:bg-navy-800 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-navy-600 dark:text-navy-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy-800 dark:text-white">Gestion des DPS</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Planification et organisation des dispositifs prévisionnels de secours.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all border-navy-100 dark:border-navy-800">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-navy-100 dark:bg-navy-800 rounded-full flex items-center justify-center mb-6">
                  <Headphones className="h-8 w-8 text-navy-600 dark:text-navy-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy-800 dark:text-white">Téléphonie</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Gestion des appels d'urgence et création rapide d'interventions.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all border-navy-100 dark:border-navy-800">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-navy-100 dark:bg-navy-800 rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-navy-600 dark:text-navy-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy-800 dark:text-white">Gestion de Crise</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Coordination des ressources et gestion efficace des situations d'urgence.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="h-full shadow-lg hover:shadow-xl transition-all border-navy-100 dark:border-navy-800">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-navy-100 dark:bg-navy-800 rounded-full flex items-center justify-center mb-6">
                  <Code className="h-8 w-8 text-navy-600 dark:text-navy-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-navy-800 dark:text-white">Intégration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Compatible avec les systèmes d'information des services d'urgence.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Benefits Section */}
      <div className="bg-navy-50 dark:bg-navy-900 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-800 dark:text-white">
              Avantages de notre solution
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Notre plateforme améliore l'efficacité et la coordination de vos dispositifs de secours.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.ul 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <li className="flex items-start">
                  <div className="mr-4 bg-emergency-100 dark:bg-emergency-900 p-1 rounded-full">
                    <Check className="h-5 w-5 text-emergency-600 dark:text-emergency-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-navy-800 dark:text-white">Gestion en temps réel</h3>
                    <p className="text-gray-600 dark:text-gray-300">Suivi des interventions et des ressources en temps réel pour une prise de décision rapide.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mr-4 bg-emergency-100 dark:bg-emergency-900 p-1 rounded-full">
                    <Check className="h-5 w-5 text-emergency-600 dark:text-emergency-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-navy-800 dark:text-white">Interface intuitive</h3>
                    <p className="text-gray-600 dark:text-gray-300">Une expérience utilisateur pensée pour les situations d'urgence et la rapidité d'action.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="mr-4 bg-emergency-100 dark:bg-emergency-900 p-1 rounded-full">
                    <Check className="h-5 w-5 text-emergency-600 dark:text-emergency-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-navy-800 dark:text-white">Interopérabilité</h3>
                    <p className="text-gray-600 dark:text-gray-300">Compatibilité avec les systèmes externes et partage fluide des informations.</p>
                  </div>
                </li>
              </motion.ul>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="bg-white dark:bg-navy-800 rounded-lg shadow-xl overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1596435163709-b373dbe93d8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Équipe de secours en action" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-navy-800 dark:text-white">Une solution éprouvée</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Utilisée par des équipes de secours professionnelles, notre plateforme a fait ses preuves lors de nombreux événements et situations d'urgence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container max-w-6xl mx-auto px-4 py-20">
        <motion.div 
          className="text-center bg-gradient-to-r from-navy-800 to-navy-700 rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="relative p-12">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522158637959-30ab8018e198?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-white">Prêt à améliorer votre gestion des secours ?</h2>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
                Découvrez comment notre plateforme peut vous aider à gérer efficacement vos dispositifs de secours.
              </p>
              <Button asChild size="lg" className="bg-emergency-600 hover:bg-emergency-700 text-white">
                <Link to="/home">
                  Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="bg-navy-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SI-DPS FFSS</h3>
              <p className="text-gray-300 mb-4">
                Plateforme de gestion des dispositifs prévisionnels de secours et d'interventions d'urgence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/home" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Tableau de bord</Link></li>
                <li><Link to="/dps" className="hover:text-white transition-colors">Gestion DPS</Link></li>
                <li><Link to="/interventions" className="hover:text-white transition-colors">Interventions</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Assistance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoriels</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>FFSS Strasbourg OUEST</li>
                <li>contact@ffss-strasbourg.fr</li>
                <li>+33 (0)3 88 XX XX XX</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} FFSS Strasbourg OUEST. Tous droits réservés.</p>
            <p className="mt-2">Développé pour améliorer la gestion des dispositifs de secours.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
