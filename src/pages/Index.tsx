
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  LifeBuoy, 
  Ambulance, 
  Users, 
  Heart, 
  ChevronRight, 
  Clock, 
  FileText,
  Map,
  PhoneCall,
  Clipboard,
  AlertTriangle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
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
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50 to-navy-100 dark:from-navy-900 dark:to-navy-950">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-navy-700 to-navy-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="md:w-1/2" variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Gestion des secours simplifiée et efficace
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Une plateforme complète pour organiser, suivre et gérer vos dispositifs prévisionnels de secours
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-navy-800 hover:bg-white/90">
                  <Link to="/login">Connexion</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div className="md:w-1/2 flex justify-center" variants={itemVariants}>
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 w-full max-w-md">
                <div className="flex items-center justify-center p-6 mb-6 bg-white/10 rounded-xl">
                  <Shield className="text-white h-16 w-16" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                    <div className="bg-white/10 p-2 rounded-md">
                      <LifeBuoy className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Gestion complète des DPS</h3>
                      <p className="text-sm text-white/70">Planifiez et gérez tous vos dispositifs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                    <div className="bg-white/10 p-2 rounded-md">
                      <Ambulance className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Suivi des interventions</h3>
                      <p className="text-sm text-white/70">En temps réel sur le terrain</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg">
                    <div className="bg-white/10 p-2 rounded-md">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Coordination d'équipe</h3>
                      <p className="text-sm text-white/70">Gestion optimisée des ressources</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-800 dark:text-white">
              Une solution complète pour vos opérations de secours
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment notre plateforme facilite chaque aspect de la gestion des dispositifs prévisionnels de secours
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 hover-scale">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-navy-100 dark:bg-navy-700 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-navy-600 dark:text-navy-300" />
                </div>
                <h3 className="text-xl font-semibold">Planification de DPS</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Créez et planifiez vos dispositifs prévisionnels avec tous les détails nécessaires : personnel, matériel, horaires, et bien plus
              </p>
              <Link to="/login" className="inline-flex items-center text-navy-600 dark:text-navy-300 hover:underline">
                En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 hover-scale">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-emergency-100 dark:bg-emergency-900 p-3 rounded-lg">
                  <Ambulance className="h-6 w-6 text-emergency-600 dark:text-emergency-400" />
                </div>
                <h3 className="text-xl font-semibold">Gestion d'interventions</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Suivez chaque intervention en temps réel, gérez les prises en charge et coordonnez vos équipes efficacement
              </p>
              <Link to="/login" className="inline-flex items-center text-navy-600 dark:text-navy-300 hover:underline">
                En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 hover-scale">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold">Suivi médical</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Gérez les dossiers médicaux des victimes, assurez un suivi rigoureux et générez des rapports complets
              </p>
              <Link to="/login" className="inline-flex items-center text-navy-600 dark:text-navy-300 hover:underline">
                En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 hover-scale">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <Map className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">Cartographie en temps réel</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Visualisez vos équipes et moyens sur une carte interactive, suivez les déplacements et optimisez les interventions
              </p>
              <Link to="/login" className="inline-flex items-center text-navy-600 dark:text-navy-300 hover:underline">
                En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 hover-scale">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Main courante électronique</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Enregistrez chronologiquement tous les événements, décisions et actions pour une traçabilité complète
              </p>
              <Link to="/login" className="inline-flex items-center text-navy-600 dark:text-navy-300 hover:underline">
                En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 hover-scale">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold">Gestion de crise</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Coordonnez efficacement les situations d'urgence avec des outils spécifiques pour la gestion de crise
              </p>
              <Link to="/login" className="inline-flex items-center text-navy-600 dark:text-navy-300 hover:underline">
                En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 bg-navy-50 dark:bg-navy-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-800 dark:text-white">
              Modules principaux
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une solution complète pour gérer l'ensemble de vos opérations de secours
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-6">
              <div className="p-4 bg-white dark:bg-navy-700 rounded-full mb-4 shadow-md">
                <Shield className="h-8 w-8 text-navy-600 dark:text-navy-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">DPS</h3>
              <p className="text-muted-foreground">Gestion complète des dispositifs prévisionnels de secours</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-6">
              <div className="p-4 bg-white dark:bg-navy-700 rounded-full mb-4 shadow-md">
                <Ambulance className="h-8 w-8 text-emergency-600 dark:text-emergency-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interventions</h3>
              <p className="text-muted-foreground">Suivi en temps réel des interventions et des équipes sur le terrain</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-6">
              <div className="p-4 bg-white dark:bg-navy-700 rounded-full mb-4 shadow-md">
                <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Médical</h3>
              <p className="text-muted-foreground">Régulation médicale et gestion des prises en charge</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-6">
              <div className="p-4 bg-white dark:bg-navy-700 rounded-full mb-4 shadow-md">
                <PhoneCall className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Téléphonie</h3>
              <p className="text-muted-foreground">Gestion des appels et création rapide d'interventions</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="lg:w-1/2">
              <motion.img 
                src="/placeholder.svg" 
                alt="Application en action" 
                className="rounded-2xl shadow-lg w-full"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              />
            </div>
            <div className="lg:w-1/2">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-navy-800 dark:text-white"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Pourquoi choisir notre solution ?
              </motion.h2>
              
              <motion.div 
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-navy-100 dark:bg-navy-700 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Conforme aux réglementations</h3>
                    <p className="text-muted-foreground">Notre application respecte les normes RGPD et les protocoles de sécurité pour la protection des données sensibles.</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-navy-100 dark:bg-navy-700 p-2 rounded-full">
                      <Clipboard className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Traçabilité complète</h3>
                    <p className="text-muted-foreground">Enregistrement détaillé de toutes les actions pour une transparence totale et des analyses post-événement.</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="bg-navy-100 dark:bg-navy-700 p-2 rounded-full">
                      <Users className="h-5 w-5 text-navy-600 dark:text-navy-300" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Conçue par des professionnels</h3>
                    <p className="text-muted-foreground">Développée en collaboration avec des secouristes et médecins pour répondre aux besoins réels du terrain.</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-navy-700 to-navy-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à améliorer vos dispositifs de secours ?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Rejoignez les organisations qui font confiance à notre plateforme pour leurs opérations quotidiennes
            </p>
            <Button asChild size="lg" className="bg-white text-navy-800 hover:bg-white/90">
              <Link to="/login">Commencer maintenant</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SecoursPro</h3>
              <p className="text-white/70">
                Solution professionnelle pour la gestion des dispositifs prévisionnels de secours
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white/70 hover:text-white">Accueil</Link></li>
                <li><Link to="/login" className="text-white/70 hover:text-white">Connexion</Link></li>
                <li><Link to="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><Link to="/mentions-legales" className="text-white/70 hover:text-white">Mentions légales</Link></li>
                <li><Link to="/confidentialite" className="text-white/70 hover:text-white">Politique de confidentialité</Link></li>
                <li><Link to="/cgv" className="text-white/70 hover:text-white">CGV</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <address className="not-italic text-white/70">
                <p>1 rue de l'Aide</p>
                <p>75001 Paris, France</p>
                <p className="mt-2">contact@secourspro.fr</p>
                <p>01 23 45 67 89</p>
              </address>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50">
            <p>© 2023 SecoursPro. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
