
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DPS } from '@/types';
import { MapPin, Compass, Users, Ambulance, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DPSMapProps {
  dps: DPS;
}

export function DPSMap({ dps }: DPSMapProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader className="pb-0">
            <CardTitle>Cartographie du DPS</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-4rem)]">
            <div className="relative h-full w-full min-h-[400px] flex items-center justify-center bg-muted rounded-lg border overflow-hidden">
              {dps.location.lat && dps.location.lng ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+f43f5e(${dps.location.lng},${dps.location.lat})/${dps.location.lng},${dps.location.lat},14,0/800x500@2x?access_token=pk.eyJ1IjoibG92YWJsZS1haSIsImEiOiJjbHFpeGlvOWwwYXlmMmtuMXF5OGN5dHY2In0.j5ZoFv3zNUdH2yfctsIyuw`} 
                    alt="Carte du DPS"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <Compass className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Carte non disponible</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Les coordonnées GPS ne sont pas définies pour ce DPS.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Points d'intérêt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 text-emergency-600" />
                <div>
                  <p className="font-medium">Point principal</p>
                  <p className="text-sm text-muted-foreground">{dps.location.address}</p>
                </div>
              </div>
              
              {dps.status === 'inProgress' ? (
                <>
                  <div className="flex items-start gap-2">
                    <Flag className="h-5 w-5 mt-0.5 text-green-600" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Poste de secours principal</p>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Actif</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Entrée principale</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Flag className="h-5 w-5 mt-0.5 text-blue-600" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Poste médical</p>
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Actif</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Zone sud</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Ambulance className="h-5 w-5 mt-0.5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Point d'évacuation</p>
                      <p className="text-sm text-muted-foreground">Parking nord</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">Aucun point d'intérêt défini</p>
                  <Button className="mt-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    Ajouter un point d'intérêt
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {dps.status === 'inProgress' && (
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Localisation du personnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-4">
                {dps.assignedPersonnel
                  .filter(p => p.status === 'present')
                  .map(personnel => (
                    <div key={personnel.id} className="flex items-start gap-2">
                      <Users className="h-5 w-5 mt-0.5 text-navy-600" />
                      <div>
                        <p className="font-medium">{personnel.name}</p>
                        <div className="flex items-center">
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs mr-2">
                            {personnel.role === 'secouriste' ? 'Secouriste' : 
                             personnel.role === 'medic' ? 'Médecin' : 
                             personnel.role === 'logistique' ? 'Logistique' : 'Commandement'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {personnel.role === 'secouriste' ? 'Poste de secours principal' : 
                             personnel.role === 'medic' ? 'Poste médical' : 
                             'PC DPS'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                }
                
                {dps.assignedPersonnel.filter(p => p.status === 'present').length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Aucun personnel présent</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
