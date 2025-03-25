
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, UserCheck, UserX, Clock, Ambulance, Stethoscope, Truck } from 'lucide-react';
import { DPS, DPSPersonnel, DPSResource } from '@/types';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface DPSResourcesProps {
  dps: DPS;
}

export function DPSResources({ dps }: DPSResourcesProps) {
  const [activeTab, setActiveTab] = useState('personnel');
  const [showAddPersonnel, setShowAddPersonnel] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  
  const formatDate = (dateString: string, formatStr: string = 'PPP') => {
    try {
      return format(parseISO(dateString), formatStr, { locale: fr });
    } catch (error) {
      return dateString;
    }
  };
  
  const getPersonnelStatusBadge = (status: DPSPersonnel['status']) => {
    switch (status) {
      case 'assigned':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Affecté</Badge>;
      case 'present':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Présent</Badge>;
      case 'absent':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Absent</Badge>;
      case 'late':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">En retard</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getResourceStatusBadge = (status: DPSResource['status']) => {
    switch (status) {
      case 'assigned':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Affecté</Badge>;
      case 'deployed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Déployé</Badge>;
      case 'returned':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Retourné</Badge>;
      case 'unavailable':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Indisponible</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getResourceIcon = (type: DPSResource['type']) => {
    switch (type) {
      case 'ambulance':
        return <Ambulance className="h-8 w-8 text-emergency-600" />;
      case 'medic':
        return <Stethoscope className="h-8 w-8 text-emergency-600" />;
      case 'equipment':
        return <Truck className="h-8 w-8 text-emergency-600" />;
      default:
        return <Truck className="h-8 w-8 text-emergency-600" />;
    }
  };
  
  const handleAddPersonnel = () => {
    toast.success("Personnel ajouté", {
      description: "Le personnel a été ajouté au DPS."
    });
    setShowAddPersonnel(false);
  };
  
  const handleAddVehicle = () => {
    toast.success("Véhicule ajouté", {
      description: "Le véhicule a été ajouté au DPS."
    });
    setShowAddVehicle(false);
  };
  
  const handleAddEquipment = () => {
    toast.success("Équipement ajouté", {
      description: "L'équipement a été ajouté au DPS."
    });
    setShowAddEquipment(false);
  };
  
  const ambulanceResources = dps.assignedResources.filter(r => r.type === 'ambulance');
  const equipmentResources = dps.assignedResources.filter(r => r.type === 'equipment' || r.type === 'other');
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full justify-start mb-6 bg-muted/50">
        <TabsTrigger value="personnel">Personnel</TabsTrigger>
        <TabsTrigger value="vehicles">Véhicules</TabsTrigger>
        <TabsTrigger value="equipment">Matériel</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personnel" className="mt-0">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Personnel affecté</h3>
            <Button 
              className="bg-emergency-600 hover:bg-emergency-700"
              onClick={() => setShowAddPersonnel(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter du personnel
            </Button>
          </div>
          
          {showAddPersonnel && (
            <Card>
              <CardHeader>
                <CardTitle>Ajouter du personnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="personnel-name">Nom</Label>
                      <Select>
                        <SelectTrigger id="personnel-name">
                          <SelectValue placeholder="Sélectionner un secouriste" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jean-dupont">Jean Dupont</SelectItem>
                          <SelectItem value="marie-martin">Marie Martin</SelectItem>
                          <SelectItem value="thomas-blanc">Thomas Blanc</SelectItem>
                          <SelectItem value="julie-roy">Julie Roy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="personnel-role">Rôle</Label>
                      <Select defaultValue="secouriste">
                        <SelectTrigger id="personnel-role">
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="secouriste">Secouriste</SelectItem>
                          <SelectItem value="medic">Médecin</SelectItem>
                          <SelectItem value="logistique">Logistique</SelectItem>
                          <SelectItem value="commandement">Commandement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="personnel-notes">Remarques</Label>
                    <Input id="personnel-notes" placeholder="Notes ou remarques" />
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowAddPersonnel(false)}>
                      Annuler
                    </Button>
                    <Button 
                      className="bg-emergency-600 hover:bg-emergency-700"
                      onClick={handleAddPersonnel}
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {dps.assignedPersonnel.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dps.assignedPersonnel.map(personnel => (
                <Card key={personnel.id} className="relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full w-1"
                    style={{ 
                      backgroundColor: personnel.status === 'present' ? '#10b981' : 
                                     personnel.status === 'absent' ? '#ef4444' : 
                                     personnel.status === 'late' ? '#f59e0b' : '#3b82f6'
                    }}
                  ></div>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="text-lg font-medium">{personnel.name}</h4>
                        <p className="text-sm text-muted-foreground capitalize">{personnel.role}</p>
                      </div>
                      {getPersonnelStatusBadge(personnel.status)}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Affecté le {formatDate(personnel.assignedAt, 'P')}</p>
                      </div>
                      
                      {personnel.checkedInAt && (
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-green-600" />
                          <p className="text-sm">Arrivé à {formatDate(personnel.checkedInAt, 'HH:mm')}</p>
                        </div>
                      )}
                      
                      {personnel.status === 'absent' && (
                        <div className="flex items-center gap-2">
                          <UserX className="h-4 w-4 text-red-600" />
                          <p className="text-sm">Absent</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      {personnel.status === 'assigned' && dps.status === 'inProgress' && (
                        <Button variant="outline" size="sm">Marquer présent</Button>
                      )}
                      {personnel.status === 'present' && dps.status === 'inProgress' && (
                        <Button variant="outline" size="sm">Marquer fin de service</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun personnel affecté</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                  Ce DPS n'a pas encore de personnel affecté. Ajoutez du personnel pour commencer.
                </p>
                <Button 
                  className="bg-emergency-600 hover:bg-emergency-700"
                  onClick={() => setShowAddPersonnel(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter du personnel
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="vehicles" className="mt-0">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Véhicules affectés</h3>
            <Button 
              className="bg-emergency-600 hover:bg-emergency-700"
              onClick={() => setShowAddVehicle(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un véhicule
            </Button>
          </div>
          
          {showAddVehicle && (
            <Card>
              <CardHeader>
                <CardTitle>Ajouter un véhicule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-name">Nom</Label>
                      <Select>
                        <SelectTrigger id="vehicle-name">
                          <SelectValue placeholder="Sélectionner un véhicule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vpsp1">VPSP 1</SelectItem>
                          <SelectItem value="vpsp2">VPSP 2</SelectItem>
                          <SelectItem value="vl1">VL 1</SelectItem>
                          <SelectItem value="vl2">VL 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-type">Type</Label>
                      <Select defaultValue="ambulance">
                        <SelectTrigger id="vehicle-type">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ambulance">Ambulance</SelectItem>
                          <SelectItem value="vl">Véhicule Léger</SelectItem>
                          <SelectItem value="vpsp">VPSP</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-status">Statut</Label>
                      <Select defaultValue="assigned">
                        <SelectTrigger id="vehicle-status">
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assigned">Affecté</SelectItem>
                          <SelectItem value="deployed">Déployé</SelectItem>
                          <SelectItem value="unavailable">Indisponible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-notes">Remarques</Label>
                    <Input id="vehicle-notes" placeholder="Notes ou remarques" />
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowAddVehicle(false)}>
                      Annuler
                    </Button>
                    <Button 
                      className="bg-emergency-600 hover:bg-emergency-700"
                      onClick={handleAddVehicle}
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {ambulanceResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ambulanceResources.map(resource => (
                <Card key={resource.id} className="relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full w-1"
                    style={{ 
                      backgroundColor: resource.status === 'deployed' ? '#10b981' : 
                                     resource.status === 'unavailable' ? '#ef4444' : 
                                     resource.status === 'returned' ? '#6b7280' : '#3b82f6'
                    }}
                  ></div>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getResourceIcon(resource.type)}
                          <h4 className="text-lg font-medium">{resource.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground capitalize">{resource.type}</p>
                      </div>
                      {getResourceStatusBadge(resource.status)}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Affecté le {formatDate(resource.assignedAt, 'P')}</p>
                      </div>
                      
                      {resource.deployedAt && (
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-green-600" />
                          <p className="text-sm">Déployé à {formatDate(resource.deployedAt, 'HH:mm')}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      {resource.status === 'assigned' && dps.status === 'inProgress' && (
                        <Button variant="outline" size="sm">Marquer déployé</Button>
                      )}
                      {resource.status === 'deployed' && dps.status === 'inProgress' && (
                        <Button variant="outline" size="sm">Marquer retourné</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Ambulance className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun véhicule affecté</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                  Ce DPS n'a pas encore de véhicule affecté. Ajoutez un véhicule pour commencer.
                </p>
                <Button 
                  className="bg-emergency-600 hover:bg-emergency-700"
                  onClick={() => setShowAddVehicle(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un véhicule
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="equipment" className="mt-0">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Matériel affecté</h3>
            <Button 
              className="bg-emergency-600 hover:bg-emergency-700"
              onClick={() => setShowAddEquipment(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter du matériel
            </Button>
          </div>
          
          {showAddEquipment && (
            <Card>
              <CardHeader>
                <CardTitle>Ajouter du matériel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="equipment-name">Nom</Label>
                      <Select>
                        <SelectTrigger id="equipment-name">
                          <SelectValue placeholder="Sélectionner un équipement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lota">LOT A</SelectItem>
                          <SelectItem value="lotb">LOT B</SelectItem>
                          <SelectItem value="lotc">LOT C</SelectItem>
                          <SelectItem value="psa">PSA</SelectItem>
                          <SelectItem value="tente">Tente de soins</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="equipment-type">Type</Label>
                      <Select defaultValue="equipment">
                        <SelectTrigger id="equipment-type">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equipment">Équipement</SelectItem>
                          <SelectItem value="medic">Médical</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="equipment-status">Statut</Label>
                      <Select defaultValue="assigned">
                        <SelectTrigger id="equipment-status">
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assigned">Affecté</SelectItem>
                          <SelectItem value="deployed">Déployé</SelectItem>
                          <SelectItem value="unavailable">Indisponible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="equipment-notes">Remarques</Label>
                    <Input id="equipment-notes" placeholder="Notes ou remarques" />
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setShowAddEquipment(false)}>
                      Annuler
                    </Button>
                    <Button 
                      className="bg-emergency-600 hover:bg-emergency-700"
                      onClick={handleAddEquipment}
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {equipmentResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {equipmentResources.map(resource => (
                <Card key={resource.id} className="relative overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full w-1"
                    style={{ 
                      backgroundColor: resource.status === 'deployed' ? '#10b981' : 
                                     resource.status === 'unavailable' ? '#ef4444' : 
                                     resource.status === 'returned' ? '#6b7280' : '#3b82f6'
                    }}
                  ></div>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getResourceIcon(resource.type)}
                          <h4 className="text-lg font-medium">{resource.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground capitalize">{resource.type}</p>
                      </div>
                      {getResourceStatusBadge(resource.status)}
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">Affecté le {formatDate(resource.assignedAt, 'P')}</p>
                      </div>
                      
                      {resource.deployedAt && (
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-green-600" />
                          <p className="text-sm">Déployé à {formatDate(resource.deployedAt, 'HH:mm')}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      {resource.status === 'assigned' && dps.status === 'inProgress' && (
                        <Button variant="outline" size="sm">Marquer déployé</Button>
                      )}
                      {resource.status === 'deployed' && dps.status === 'inProgress' && (
                        <Button variant="outline" size="sm">Marquer retourné</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun matériel affecté</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                  Ce DPS n'a pas encore de matériel affecté. Ajoutez du matériel pour commencer.
                </p>
                <Button 
                  className="bg-emergency-600 hover:bg-emergency-700"
                  onClick={() => setShowAddEquipment(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter du matériel
                </Button>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Lots prédéfinis</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-6 flex flex-col">
                <span className="text-xl font-bold mb-2">LOT A</span>
                <span className="text-xs text-muted-foreground">Lot type A</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col">
                <span className="text-xl font-bold mb-2">LOT B</span>
                <span className="text-xs text-muted-foreground">Lot type B</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col">
                <span className="text-xl font-bold mb-2">LOT C</span>
                <span className="text-xs text-muted-foreground">Lot type C</span>
              </Button>
              <Button variant="outline" className="h-auto py-6 flex flex-col">
                <span className="text-xl font-bold mb-2">PSA</span>
                <span className="text-xs text-muted-foreground">Poste de secours avancé</span>
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
