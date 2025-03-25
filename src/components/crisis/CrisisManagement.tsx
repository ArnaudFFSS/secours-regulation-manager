
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Users, Ambulance, Phone, Map, Clock } from 'lucide-react';
import { CrisisForm } from './CrisisForm';
import { CrisisTimeline } from './CrisisTimeline';
import { CrisisResources } from './CrisisResources';

export function CrisisManagement() {
  const [isCreatingCrisis, setIsCreatingCrisis] = useState(false);
  const [activeCrises, setActiveCrises] = useState([
    {
      id: 'crisis-1',
      title: 'Accident de bus - A35',
      location: 'Autoroute A35, km 23',
      status: 'active',
      severity: 'high',
      startedAt: '2023-09-15T14:30:00Z',
      resourcesAssigned: 12,
      interventionsCount: 8,
      description: 'Accident impliquant un bus et deux véhicules légers. Multiples victimes.'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="active" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="active">Crises actives</TabsTrigger>
              <TabsTrigger value="completed">Crises terminées</TabsTrigger>
              <TabsTrigger value="simulation">Simulations</TabsTrigger>
            </TabsList>
            <Button 
              onClick={() => setIsCreatingCrisis(true)}
              className="ml-auto"
              variant="destructive"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Déclarer une crise
            </Button>
          </div>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeCrises.map((crisis) => (
                <Card key={crisis.id} className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{crisis.title}</CardTitle>
                      <Badge variant="destructive">Crise active</Badge>
                    </div>
                    <CardDescription>{crisis.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-1">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Déclarée il y a {Math.floor((Date.now() - new Date(crisis.startedAt).getTime()) / 3600000)} heures
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{crisis.resourcesAssigned} secouristes mobilisés</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ambulance className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{crisis.interventionsCount} interventions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Map className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Voir sur la carte</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{crisis.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-2">
                    <Button className="w-full">Gérer la crise</Button>
                  </CardFooter>
                </Card>
              ))}
              
              {activeCrises.length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Aucune crise active</h3>
                  <p className="text-muted-foreground">Aucune situation de crise n'est active actuellement.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Archives des crises</h3>
              <p className="text-muted-foreground">Les crises terminées apparaîtront ici.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="simulation">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Simulations de crise</h3>
              <p className="text-muted-foreground">Créez et exécutez des simulations de crise pour l'entraînement.</p>
              <Button className="mt-4">Créer une simulation</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {isCreatingCrisis && (
        <CrisisForm 
          onClose={() => setIsCreatingCrisis(false)}
          onSubmit={(data) => {
            setActiveCrises(prev => [...prev, {
              id: `crisis-${Date.now()}`,
              title: data.title,
              location: data.location,
              status: 'active',
              severity: data.severity,
              startedAt: new Date().toISOString(),
              resourcesAssigned: 0,
              interventionsCount: 0,
              description: data.description
            }]);
            setIsCreatingCrisis(false);
          }}
        />
      )}
    </div>
  );
}
