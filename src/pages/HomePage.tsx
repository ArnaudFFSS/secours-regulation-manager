
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar, MapPin, Users, Phone, Shield, FileText, Bell, Activity, Ambulance } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  
  return (
    <PageTransition>
      <div className="container py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Bienvenue, {user?.name || 'Utilisateur'}</h1>
          <p className="text-xl text-muted-foreground">
            Système de gestion des dispositifs prévisionnels de secours
          </p>
        </div>

        <div className="mb-10">
          <div className="bg-gradient-to-r from-navy-800 to-navy-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Interventions en cours</h2>
                <p className="text-white/80">2 interventions actives nécessitent votre attention</p>
              </div>
              <div className="flex gap-3">
                <Button asChild className="bg-white text-navy-800 hover:bg-white/90">
                  <Link to="/interventions">Voir les interventions</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/map">Voir la carte</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card className="hover-scale">
            <CardContent className="p-6 pt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-navy-100 dark:bg-navy-800 w-12 h-12 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-navy-600 dark:text-navy-300" />
                </div>
                <span className="text-sm font-medium bg-navy-100 dark:bg-navy-800 px-3 py-1 rounded-full">5 à venir</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dispositifs Prévisionnels</h3>
              <p className="text-muted-foreground mb-4">
                Gérez vos DPS et suivez leur état d'avancement
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-6 px-6">
              <Button asChild variant="secondary" className="w-full">
                <Link to="/dps">Gérer les DPS</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6 pt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emergency-100 dark:bg-emergency-900 w-12 h-12 rounded-full flex items-center justify-center">
                  <Ambulance className="h-6 w-6 text-emergency-600 dark:text-emergency-400" />
                </div>
                <span className="text-sm font-medium bg-emergency-100 dark:bg-emergency-900 text-emergency-600 dark:text-emergency-400 px-3 py-1 rounded-full">3 actives</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interventions</h3>
              <p className="text-muted-foreground mb-4">
                Suivez les interventions en cours et gérez les victimes
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-6 px-6">
              <Button asChild variant="secondary" className="w-full">
                <Link to="/interventions">Voir les interventions</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6 pt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-navy-100 dark:bg-navy-800 w-12 h-12 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-navy-600 dark:text-navy-300" />
                </div>
                <span className="text-sm font-medium bg-navy-100 dark:bg-navy-800 px-3 py-1 rounded-full">SITAC</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Carte</h3>
              <p className="text-muted-foreground mb-4">
                Visualisez vos équipes et interventions sur la carte
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-6 px-6">
              <Button asChild variant="secondary" className="w-full">
                <Link to="/map">Voir la carte</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6 pt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-navy-100 dark:bg-navy-800 w-12 h-12 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-navy-600 dark:text-navy-300" />
                </div>
                <span className="text-sm font-medium bg-navy-100 dark:bg-navy-800 px-3 py-1 rounded-full">PBX</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Téléphonie</h3>
              <p className="text-muted-foreground mb-4">
                Gérez les appels et créez des interventions
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-6 px-6">
              <Button asChild variant="secondary" className="w-full">
                <Link to="/telephonie">Accéder</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6 pt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emergency-100 dark:bg-emergency-900 w-12 h-12 rounded-full flex items-center justify-center">
                  <Bell className="h-6 w-6 text-emergency-600 dark:text-emergency-400" />
                </div>
                <span className="text-sm font-medium bg-emergency-100 dark:bg-emergency-900 text-emergency-600 dark:text-emergency-400 px-3 py-1 rounded-full">Urgence</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion de Crise</h3>
              <p className="text-muted-foreground mb-4">
                Coordonnez vos équipes en situation d'urgence
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-6 px-6">
              <Button asChild variant="secondary" className="w-full">
                <Link to="/crise">Accéder</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6 pt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-navy-100 dark:bg-navy-800 w-12 h-12 rounded-full flex items-center justify-center">
                  <Activity className="h-6 w-6 text-navy-600 dark:text-navy-300" />
                </div>
                <span className="text-sm font-medium bg-navy-100 dark:bg-navy-800 px-3 py-1 rounded-full">Journal</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Main Courante</h3>
              <p className="text-muted-foreground mb-4">
                Consultez les événements et suivez l'activité
              </p>
            </CardContent>
            <CardFooter className="pt-0 pb-6 px-6">
              <Button asChild variant="secondary" className="w-full">
                <Link to="/main-courante">Accéder</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button asChild size="lg">
            <Link to="/dashboard">Accéder au tableau de bord complet</Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
