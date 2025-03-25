
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, FileText, AlertTriangle, Timer, Clipboard } from 'lucide-react';
import { DPS } from '@/types';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface DPSCardProps {
  dps: DPS;
}

export function DPSCard({ dps }: DPSCardProps) {
  const navigate = useNavigate();
  
  // Fonction pour formater les dates
  const formatDate = (dateString: string, formatStr: string = 'PPP') => {
    try {
      return format(parseISO(dateString), formatStr, { locale: fr });
    } catch (error) {
      return dateString;
    }
  };
  
  // Fonction pour obtenir la couleur de statut
  const getStatusColor = (status: DPS['status']) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'inProgress':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  // Fonction pour obtenir le libellé de statut
  const getStatusLabel = (status: DPS['status']) => {
    switch (status) {
      case 'planned':
        return 'Planifié';
      case 'inProgress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };
  
  // Fonction pour obtenir la couleur du niveau de risque
  const getRiskColor = (risk: DPS['riskAssessment']) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  // Fonction pour obtenir le libellé du niveau de risque
  const getRiskLabel = (risk: DPS['riskAssessment']) => {
    switch (risk) {
      case 'low':
        return 'Faible risque';
      case 'medium':
        return 'Risque modéré';
      case 'high':
        return 'Risque élevé';
      default:
        return risk;
    }
  };

  const handleActivate = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`DPS "${dps.name}" activé`, {
      description: "Le DPS est maintenant en cours."
    });
  };

  const handleViewDetails = () => {
    navigate(`/dps/${dps.id}`);
  };
  
  return (
    <Card 
      className="hover:shadow-md transition-all overflow-hidden h-full flex flex-col cursor-pointer border-l-4 dark:bg-navy-800"
      style={{ borderLeftColor: dps.status === 'inProgress' ? '#10b981' : '#e5e7eb' }}
      onClick={handleViewDetails}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-navy-700 dark:text-white">{dps.name}</CardTitle>
          <Badge variant="outline" className={cn("ml-2", getStatusColor(dps.status))}>
            {getStatusLabel(dps.status)}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{dps.eventDescription}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 mt-0.5 text-navy-600" />
            <div>
              <p className="text-sm">
                {formatDate(dps.startDate, 'P')} - {formatDate(dps.endDate, 'P')}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(dps.startDate, 'HH:mm')} - {formatDate(dps.endDate, 'HH:mm')}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 text-navy-600" />
            <div>
              <p className="text-sm">{dps.location.address}</p>
              <p className="text-xs text-muted-foreground">
                {dps.location.postalCode} {dps.location.city}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 mt-0.5 text-navy-600" />
            <div>
              <p className="text-sm">
                {dps.expectedAttendees} participants estimés
              </p>
              <p className="text-xs text-muted-foreground">
                {dps.assignedPersonnel.length} secouristes affectés
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 text-navy-600" />
            <div>
              <Badge variant="outline" className={cn(getRiskColor(dps.riskAssessment))}>
                {getRiskLabel(dps.riskAssessment)}
              </Badge>
            </div>
          </div>
          
          {dps.documents.length > 0 && (
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-0.5 text-navy-600" />
              <p className="text-sm">{dps.documents.length} document(s)</p>
            </div>
          )}

          {dps.status === 'inProgress' && (
            <div className="flex items-start gap-2">
              <Timer className="h-4 w-4 mt-0.5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-600">DPS en cours</p>
                <p className="text-xs text-muted-foreground">
                  Depuis {formatDate(dps.logs.find(log => log.message.includes('Début du DPS'))?.timestamp || dps.startDate, 'HH:mm')}
                </p>
              </div>
            </div>
          )}

          {dps.status === 'inProgress' && dps.interventions.length > 0 && (
            <div className="flex items-start gap-2">
              <Clipboard className="h-4 w-4 mt-0.5 text-navy-600" />
              <div>
                <p className="text-sm">{dps.interventions.length} intervention(s)</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        {dps.status === 'planned' ? (
          <Button 
            variant="default" 
            className="w-full bg-emergency-600 hover:bg-emergency-700"
            onClick={handleActivate}
          >
            Activer le DPS
          </Button>
        ) : dps.status === 'inProgress' ? (
          <Button 
            variant="outline" 
            className="w-full border-emergency-600 text-emergency-700 hover:bg-emergency-50"
          >
            Gérer
          </Button>
        ) : (
          <Button variant="outline" className="w-full">Voir les détails</Button>
        )}
      </CardFooter>
    </Card>
  );
}
