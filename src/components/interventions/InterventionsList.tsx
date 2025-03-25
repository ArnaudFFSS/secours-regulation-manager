
import React, { useState } from 'react';
import { Intervention } from '@/types';
import { InterventionCard } from './InterventionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for demonstration
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
    victims: [
      {
        id: 'v1',
        firstName: 'Jean',
        lastName: 'Dupont',
        age: 45,
        gender: 'male',
        condition: 'stable',
        symptoms: ['trauma crânien', 'contusions'],
        interventionId: '1',
        triageCategory: 'yellow'
      },
      {
        id: 'v2',
        firstName: 'Marie',
        lastName: 'Laurent',
        age: 32,
        gender: 'female',
        condition: 'unstable',
        symptoms: ['fracture ouverte', 'hémorragie'],
        interventionId: '1',
        triageCategory: 'red'
      }
    ],
    logs: [
      {
        id: 'l1',
        interventionId: '1',
        timestamp: '2023-05-28T10:15:30Z',
        message: 'Intervention créée',
        userId: 'u1',
        type: 'info'
      },
      {
        id: 'l2',
        interventionId: '1',
        timestamp: '2023-05-28T10:20:00Z',
        message: 'Ambulance A1 assignée',
        userId: 'u1',
        type: 'action'
      }
    ]
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
    victims: [
      {
        id: 'v3',
        condition: 'critical',
        symptoms: ['inconscience', 'difficultés respiratoires'],
        interventionId: '2',
        triageCategory: 'red'
      }
    ],
    logs: [
      {
        id: 'l3',
        interventionId: '2',
        timestamp: '2023-05-28T11:05:00Z',
        message: 'Intervention créée',
        userId: 'u1',
        type: 'info'
      }
    ]
  },
  {
    id: '3',
    caseNumber: 'INT-2023-0458',
    title: 'Chute de hauteur',
    description: 'Chute depuis un échafaudage',
    status: 'completed',
    priority: 'high',
    location: {
      address: '15 Rue de Rivoli, 75004 Paris',
      lat: 48.856389,
      lng: 2.351086
    },
    createdAt: '2023-05-28T09:30:00Z',
    updatedAt: '2023-05-28T10:45:00Z',
    assignedResources: [],
    victims: [
      {
        id: 'v4',
        firstName: 'Thomas',
        lastName: 'Martin',
        age: 28,
        gender: 'male',
        condition: 'stable',
        symptoms: ['fracture cheville', 'contusions multiples'],
        interventionId: '3',
        triageCategory: 'yellow'
      }
    ],
    logs: [
      {
        id: 'l4',
        interventionId: '3',
        timestamp: '2023-05-28T09:30:00Z',
        message: 'Intervention créée',
        userId: 'u1',
        type: 'info'
      },
      {
        id: 'l5',
        interventionId: '3',
        timestamp: '2023-05-28T10:45:00Z',
        message: 'Intervention terminée, patient transporté à l\'hôpital',
        userId: 'u1',
        type: 'status'
      }
    ]
  }
];

export function InterventionsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  
  const filteredInterventions = mockInterventions.filter(intervention => {
    const matchesSearch = !searchTerm || 
      intervention.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intervention.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intervention.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intervention.location.address?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = !statusFilter || intervention.status === statusFilter;
    const matchesPriority = !priorityFilter || intervention.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });
  
  const clearFilters = () => {
    setStatusFilter(null);
    setPriorityFilter(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">Interventions</h2>
          <p className="text-sm text-muted-foreground">
            Gérez les interventions en cours et passées
          </p>
        </div>
        
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Nouvelle intervention</span>
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher par titre, numéro, description..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filtrer</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter('pending')} className={statusFilter === 'pending' ? 'bg-secondary' : ''}>
                En attente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('inProgress')} className={statusFilter === 'inProgress' ? 'bg-secondary' : ''}>
                En cours
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('completed')} className={statusFilter === 'completed' ? 'bg-secondary' : ''}>
                Terminées
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('cancelled')} className={statusFilter === 'cancelled' ? 'bg-secondary' : ''}>
                Annulées
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filtrer par priorité</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setPriorityFilter('low')} className={priorityFilter === 'low' ? 'bg-secondary' : ''}>
                Basse
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('medium')} className={priorityFilter === 'medium' ? 'bg-secondary' : ''}>
                Moyenne
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('high')} className={priorityFilter === 'high' ? 'bg-secondary' : ''}>
                Haute
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('critical')} className={priorityFilter === 'critical' ? 'bg-secondary' : ''}>
                Critique
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={clearFilters} className="text-primary font-medium">
                Effacer les filtres
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span className="hidden sm:inline">Trier</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Plus récentes d'abord
              </DropdownMenuItem>
              <DropdownMenuItem>
                Plus anciennes d'abord
              </DropdownMenuItem>
              <DropdownMenuItem>
                Priorité (haute à basse)
              </DropdownMenuItem>
              <DropdownMenuItem>
                Priorité (basse à haute)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {filteredInterventions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune intervention ne correspond à vos critères</p>
          {(searchTerm || statusFilter || priorityFilter) && (
            <Button variant="ghost" onClick={clearFilters} className="mt-4">
              Effacer les filtres
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredInterventions.map(intervention => (
            <InterventionCard 
              key={intervention.id} 
              intervention={intervention} 
              onClick={() => console.log('View intervention', intervention.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
