
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, UserRound, Map as MapIcon, Ambulance, Users } from 'lucide-react';
import { EmergencyResource, Intervention } from '@/types';

// Mock data for demonstration
const mockResources: EmergencyResource[] = [
  {
    id: '1',
    name: 'Ambulance A1',
    type: 'ambulance',
    status: 'available',
    location: { lat: 48.856614, lng: 2.352222 }
  },
  {
    id: '2',
    name: 'Médecin M1',
    type: 'medic',
    status: 'dispatched',
    location: { lat: 48.852674, lng: 2.349962 },
    assignedTo: '1'
  },
  {
    id: '3',
    name: 'Équipe E1',
    type: 'team',
    status: 'onScene',
    location: { lat: 48.864716, lng: 2.349014 },
    assignedTo: '2'
  }
];

const mockInterventions: Intervention[] = [
  {
    id: '1',
    caseNumber: 'INT-2023-0456',
    title: 'Accident de la route',
    description: 'Collision entre deux véhicules',
    status: 'inProgress',
    priority: 'high',
    location: {
      address: '75 Avenue des Champs-Élysées, 75008 Paris',
      lat: 48.869966,
      lng: 2.303816
    },
    createdAt: '2023-05-28T10:15:00Z',
    updatedAt: '2023-05-28T10:30:00Z',
    assignedResources: [],
    victims: [],
    logs: []
  },
  {
    id: '2',
    caseNumber: 'INT-2023-0457',
    title: 'Malaise sur voie publique',
    description: 'Personne inconsciente',
    status: 'pending',
    priority: 'critical',
    location: {
      address: '1 Place du Trocadéro, 75116 Paris',
      lat: 48.862923,
      lng: 2.287894
    },
    createdAt: '2023-05-28T11:05:00Z',
    updatedAt: '2023-05-28T11:05:00Z',
    assignedResources: [],
    victims: [],
    logs: []
  }
];

export function EmergencyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  // Mock function to simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="h-full grid grid-rows-[auto,1fr]">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">Carte SITAC</h2>
            <p className="text-sm text-muted-foreground">
              Situation tactique en temps réel
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant={activeFilter === 'resources' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveFilter(activeFilter === 'resources' ? null : 'resources')}
              className="gap-2"
            >
              <Ambulance className="h-4 w-4" />
              <span>Ressources</span>
            </Button>
            <Button 
              variant={activeFilter === 'interventions' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveFilter(activeFilter === 'interventions' ? null : 'interventions')}
              className="gap-2"
            >
              <Users className="h-4 w-4" />
              <span>Interventions</span>
            </Button>
            <Button 
              variant={activeFilter === 'layers' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveFilter(activeFilter === 'layers' ? null : 'layers')}
              className="gap-2"
            >
              <Layers className="h-4 w-4" />
              <span>Couches</span>
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {}}
              title="Recentrer la carte"
            >
              <UserRound className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="relative h-full">
        {/* Map container */}
        <div ref={mapRef} className="absolute inset-0 bg-gray-100">
          {!mapLoaded ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <MapIcon className="h-10 w-10 text-muted-foreground mb-2 mx-auto animate-pulse" />
                <p className="text-muted-foreground">Chargement de la carte...</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-emergency-50">
              <p className="text-muted-foreground bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow text-center">
                [Carte interactive]<br />
                <span className="text-xs">Ici s'afficherait la carte avec les ressources, interventions et victimes</span>
              </p>
            </div>
          )}
        </div>
        
        {/* Sidebar for details */}
        <div className="absolute top-4 right-4 w-80 space-y-4">
          <Card className="glass-card shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Résumé opérationnel</CardTitle>
              <CardDescription>Vue d'ensemble</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Ressources disponibles:</span>
                  <span className="font-medium">{mockResources.filter(r => r.status === 'available').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ressources en intervention:</span>
                  <span className="font-medium">{mockResources.filter(r => r.status !== 'available').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interventions en cours:</span>
                  <span className="font-medium">{mockInterventions.filter(i => i.status === 'inProgress').length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interventions en attente:</span>
                  <span className="font-medium text-alert-high">{mockInterventions.filter(i => i.status === 'pending').length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {activeFilter === 'resources' && (
            <Card className="glass-card shadow-lg animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Ressources</CardTitle>
                <CardDescription>Ambulances et équipes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockResources.map(resource => (
                    <div key={resource.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-white transition-colors">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "status-indicator",
                          resource.status === "available" && "status-available",
                          resource.status === "dispatched" && "status-busy",
                          (resource.status === "onScene" || resource.status === "returning") && "status-emergency"
                        )} />
                        <span className="text-sm font-medium">{resource.name}</span>
                      </div>
                      <span className="text-xs capitalize">
                        {resource.status === "available" ? "Disponible" :
                         resource.status === "dispatched" ? "En route" :
                         resource.status === "onScene" ? "Sur site" :
                         resource.status === "returning" ? "Retour" : "Hors service"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeFilter === 'interventions' && (
            <Card className="glass-card shadow-lg animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Interventions</CardTitle>
                <CardDescription>Situations en cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockInterventions.map(intervention => (
                    <div key={intervention.id} className="p-3 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-2 h-2 rounded-full mt-1",
                              intervention.priority === "low" && "bg-alert-low",
                              intervention.priority === "medium" && "bg-alert-medium",
                              intervention.priority === "high" && "bg-alert-high",
                              intervention.priority === "critical" && "bg-alert-critical"
                            )} />
                            <span className="font-medium text-sm">{intervention.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{intervention.location.address}</p>
                        </div>
                        <div className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          intervention.status === "pending" && "bg-alert-high/10 text-alert-high",
                          intervention.status === "inProgress" && "bg-emergency-100 text-emergency-700"
                        )}>
                          {intervention.status === "pending" ? "En attente" :
                           intervention.status === "inProgress" ? "En cours" :
                           intervention.status === "completed" ? "Terminé" : "Annulé"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeFilter === 'layers' && (
            <Card className="glass-card shadow-lg animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Couches</CardTitle>
                <CardDescription>Filtres d'affichage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm">Ambulances</span>
                    <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-emergency-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm">Équipes médicales</span>
                    <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-emergency-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm">Interventions actives</span>
                    <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-emergency-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm">Interventions en attente</span>
                    <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-emergency-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <span className="text-sm">Zones à risque</span>
                    <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-emergency-600 rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
