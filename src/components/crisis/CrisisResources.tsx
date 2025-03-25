
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Truck, Tent, Phone, PlusCircle } from 'lucide-react';
import { EmergencyResource } from '@/types';

interface CrisisResourcesProps {
  resources: EmergencyResource[];
  onAssignResource: () => void;
}

export function CrisisResources({ resources, onAssignResource = () => {} }: CrisisResourcesProps) {
  const getStatusColor = (status: EmergencyResource['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'dispatched':
        return 'bg-blue-100 text-blue-800';
      case 'onScene':
        return 'bg-purple-100 text-purple-800';
      case 'returning':
        return 'bg-yellow-100 text-yellow-800';
      case 'outOfService':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: EmergencyResource['status']) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'dispatched':
        return 'En route';
      case 'onScene':
        return 'Sur site';
      case 'returning':
        return 'Retour';
      case 'outOfService':
        return 'Indisponible';
      default:
        return status;
    }
  };

  const getResourceIcon = (type: EmergencyResource['type']) => {
    switch (type) {
      case 'ambulance':
        return <Truck className="h-4 w-4" />;
      case 'medic':
        return <Users className="h-4 w-4" />;
      case 'team':
        return <Users className="h-4 w-4" />;
      case 'helicopter':
        return <Truck className="h-4 w-4" />;
      default:
        return <Tent className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Ressources mobilisées</CardTitle>
        <Button size="sm" onClick={onAssignResource}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Équipe</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.length > 0 ? (
              resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getResourceIcon(resource.type)}
                      <span>{resource.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(resource.status)}>
                      {getStatusLabel(resource.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {resource.crew && resource.crew.length > 0 ? (
                      <span>{resource.crew.length} personnes</span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Aucune ressource mobilisée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
