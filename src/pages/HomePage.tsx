
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, Phone, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">SI-DPS FFSS Strasbourg OUEST</h1>
          <p className="text-xl text-muted-foreground">
            Application de Gestion Complète des Dispositifs Prévisionnels de Secours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover-scale transition-all overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Gestion des DPS</h2>
              <p className="text-muted-foreground mb-4">
                Planifiez, organisez et suivez vos dispositifs prévisionnels de secours
              </p>
              <Button asChild className="mt-auto">
                <Link to="/dps">Gérer les DPS</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Carte des Interventions</h2>
              <p className="text-muted-foreground mb-4">
                Visualisez en temps réel les moyens et interventions sur la carte
              </p>
              <Button asChild className="mt-auto">
                <Link to="/map">Voir la carte</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Interventions</h2>
              <p className="text-muted-foreground mb-4">
                Gérez les interventions et suivez les prises en charge des victimes
              </p>
              <Button asChild className="mt-auto">
                <Link to="/interventions">Voir les interventions</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Phone className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Intégration PBX</h2>
              <p className="text-muted-foreground mb-4">
                Gérez les appels entrants et sortants via l'intégration PBX Grandstream
              </p>
              <Button asChild className="mt-auto">
                <Link to="/telephonie">Téléphonie</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Gestion des Ressources</h2>
              <p className="text-muted-foreground mb-4">
                Suivez et affectez les ressources humaines et matérielles
              </p>
              <Button asChild className="mt-auto">
                <Link to="/ressources">Voir les ressources</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <FileText className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Main Courante</h2>
              <p className="text-muted-foreground mb-4">
                Consultez et mettez à jour la main courante électronique
              </p>
              <Button asChild className="mt-auto">
                <Link to="/main-courante">Accéder</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link to="/dashboard">Accéder au tableau de bord</Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
