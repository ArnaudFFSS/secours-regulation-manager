
import { Intervention } from '@/types';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, FileText, MoreVertical } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface InterventionCardProps {
  intervention: Intervention;
  onClick?: () => void;
}

export function InterventionCard({ intervention, onClick }: InterventionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMM yyyy, HH:mm', { locale: fr });
  };
  
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  };
  
  return (
    <div 
      className="rounded-lg overflow-hidden border bg-card hover:shadow-md transition-all duration-200 hover-scale" 
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              intervention.priority === 'low' && 'bg-alert-low',
              intervention.priority === 'medium' && 'bg-alert-medium',
              intervention.priority === 'high' && 'bg-alert-high',
              intervention.priority === 'critical' && 'bg-alert-critical'
            )} />
            <h3 className="font-semibold text-lg">{intervention.title}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Voir les détails</DropdownMenuItem>
              <DropdownMenuItem>Assigner des ressources</DropdownMenuItem>
              <DropdownMenuItem>Modifier le statut</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-alert-high">Annuler l'intervention</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mb-3">
          <span className={cn(
            "inline-block text-xs font-medium px-2 py-1 rounded-full",
            intervention.status === 'pending' && 'bg-emergency-100 text-emergency-800',
            intervention.status === 'inProgress' && 'bg-alert-medium/10 text-alert-medium',
            intervention.status === 'completed' && 'bg-alert-low/10 text-alert-low',
            intervention.status === 'cancelled' && 'bg-gray-100 text-gray-500'
          )}>
            {intervention.status === 'pending' ? 'En attente' :
             intervention.status === 'inProgress' ? 'En cours' :
             intervention.status === 'completed' ? 'Terminée' :
             'Annulée'}
          </span>
          <span className="ml-2 text-xs text-muted-foreground">
            N° {intervention.caseNumber}
          </span>
        </div>
        
        {intervention.description && (
          <p className="text-sm text-muted-foreground mb-3">
            {intervention.description}
          </p>
        )}
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>{intervention.location.address || 'Adresse non spécifiée'}</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Créée le {formatDate(intervention.createdAt)}</span>
          <span className="text-muted-foreground/60 ml-auto">
            {getTimeAgo(intervention.createdAt)}
          </span>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-muted/30 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span>
              {intervention.victims.length} 
              {intervention.victims.length <= 1 ? ' victime' : ' victimes'}
            </span>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
            <span>{intervention.logs.length} notes</span>
          </div>
        </div>
        
        <Button variant="secondary" size="sm" className="text-xs h-8">
          Détails
        </Button>
      </div>
    </div>
  );
}
