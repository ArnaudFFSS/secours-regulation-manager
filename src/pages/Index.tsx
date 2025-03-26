
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, LifeBuoy, Ambulance, Users, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50 to-navy-100 dark:from-navy-900 dark:to-navy-950">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-navy-700 to-navy-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
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
            </div>
            <div className="md:w-1/2 flex justify-center">
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
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-800 dark:text-white">
              Une solution complète pour vos opérations de secours
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment notre plateforme facilite chaque aspect de la gestion des dispositifs prévisionnels de secours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 hover-scale">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-navy-100 dark:bg-navy-700 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-navy-600 dark:text-navy-300" />
                </div>
                <h3 className="text-xl font-semibold">Planification de DPS</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Créez et planifiez vos dispositifs prévisionnels avec tous les détails nécessaires : personnel, matériel, horaires
              </p>
              <Link to="/login" className="inline-flex items-center text-navy-600 dark:text-navy-300 hover:underline">
                En savoir plus <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 hover-scale">
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
            </div>

            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-md hover:shadow-lg transition-all p-6 hover-scale">
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-navy-700 to-navy-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à améliorer vos dispositifs de secours ?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Rejoignez les organisations qui font confiance à notre plateforme pour leurs opérations quotidiennes
          </p>
          <Button asChild size="lg" className="bg-white text-navy-800 hover:bg-white/90">
            <Link to="/login">Commencer maintenant</Link>
          </Button>
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
