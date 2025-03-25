
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  FileDown, 
  Grid2X2, 
  List, 
  Tag,
  User,
  Clock
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Checkbox } from '@/components/ui/checkbox';

interface Victim {
  id: string;
  identifier: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'unknown';
  category: 'green' | 'yellow' | 'red' | 'black';
  symptoms: string[];
  location: string;
  timestamp: string;
  status: 'active' | 'released' | 'transferred' | 'refused';
  assignedTo?: string;
  notes?: string;
}

interface DPSVictimsListProps {
  dpsId: string;
}

const mockVictims: Victim[] = [
  {
    id: 'v1',
    identifier: 'VCT-DPS3-001',
    firstName: 'Thomas',
    lastName: 'Durant',
    age: 22,
    gender: 'male',
    category: 'yellow',
    symptoms: ['Entorse cheville', 'Douleur'],
    location: 'Terrain de basketball',
    timestamp: '2023-05-10T10:15:00Z',
    status: 'active',
    assignedTo: 'Laura Fernandez',
    notes: 'Joueur blessé lors d\'un match de basketball',
  },
  {
    id: 'v2',
    identifier: 'VCT-DPS3-002',
    firstName: 'Émilie',
    lastName: 'Petit',
    age: 19,
    gender: 'female',
    category: 'green',
    symptoms: ['Migraine', 'Déshydratation'],
    location: 'Entrée principale',
    timestamp: '2023-05-10T11:30:00Z',
    status: 'released',
    assignedTo: 'Alexandre Petit',
  },
  {
    id: 'v3',
    identifier: 'VCT-DPS3-003',
    firstName: 'Michel',
    lastName: 'Lambert',
    age: 45,
    gender: 'male',
    category: 'red',
    symptoms: ['Douleur thoracique', 'Essoufflement'],
    location: 'Gradins',
    timestamp: '2023-05-10T13:45:00Z',
    status: 'transferred',
    assignedTo: 'Dr. Martinez',
    notes: 'Transféré vers l\'hôpital universitaire',
  },
];

export function DPSVictimsList({ dpsId }: DPSVictimsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedVictims, setSelectedVictims] = useState<string[]>([]);
  
  const formatDate = (dateString: string, formatStr: string = 'PPP') => {
    try {
      return format(parseISO(dateString), formatStr, { locale: fr });
    } catch (error) {
      return dateString;
    }
  };
  
  const getCategoryStyles = (category: Victim['category']) => {
    switch (category) {
      case 'green':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'red':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'black':
        return 'bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getCategoryLabel = (category: Victim['category']) => {
    switch (category) {
      case 'green':
        return 'Non urgent';
      case 'yellow':
        return 'Urgent';
      case 'red':
        return 'Très urgent';
      case 'black':
        return 'Décédé';
      default:
        return category;
    }
  };
  
  const getStatusStyles = (status: Victim['status']) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'released':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'transferred':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'refused':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getStatusLabel = (status: Victim['status']) => {
    switch (status) {
      case 'active':
        return 'En cours';
      case 'released':
        return 'Libéré';
      case 'transferred':
        return 'Transféré';
      case 'refused':
        return 'Refus de soin';
      default:
        return status;
    }
  };
  
  const filteredVictims = mockVictims.filter(victim => 
    victim.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    victim.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    victim.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    victim.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const toggleVictimSelection = (victimId: string) => {
    if (selectedVictims.includes(victimId)) {
      setSelectedVictims(selectedVictims.filter(id => id !== victimId));
    } else {
      setSelectedVictims([...selectedVictims, victimId]);
    }
  };
  
  const toggleAllVictims = () => {
    if (selectedVictims.length === filteredVictims.length) {
      setSelectedVictims([]);
    } else {
      setSelectedVictims(filteredVictims.map(victim => victim.id));
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une victime..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center space-x-1 border rounded-md overflow-hidden">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none h-9"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none h-9"
              onClick={() => setViewMode('grid')}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="hidden sm:flex ml-2">
            <FileDown className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          
          <Button className="bg-emergency-600 hover:bg-emergency-700 ml-auto">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle victime
          </Button>
        </div>
      </div>
      
      {filteredVictims.length > 0 ? (
        <>
          {viewMode === 'list' ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedVictims.length === filteredVictims.length && filteredVictims.length > 0}
                          onCheckedChange={toggleAllVictims}
                          aria-label="Sélectionner toutes les victimes"
                        />
                      </TableHead>
                      <TableHead className="w-32">Identifiant</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Âge</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Symptômes</TableHead>
                      <TableHead>Lieu</TableHead>
                      <TableHead>Heure</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVictims.map(victim => (
                      <TableRow key={victim.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedVictims.includes(victim.id)}
                            onCheckedChange={() => toggleVictimSelection(victim.id)}
                            aria-label={`Sélectionner ${victim.firstName} ${victim.lastName}`}
                          />
                        </TableCell>
                        <TableCell className="font-mono text-xs">{victim.identifier}</TableCell>
                        <TableCell className="font-medium">{victim.firstName} {victim.lastName}</TableCell>
                        <TableCell>{victim.age} ans</TableCell>
                        <TableCell>
                          <Badge className={getCategoryStyles(victim.category)}>
                            {getCategoryLabel(victim.category)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {victim.symptoms.map((symptom, index) => (
                            <span key={index} className="inline-block text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded mr-1 mb-1">
                              {symptom}
                            </span>
                          ))}
                        </TableCell>
                        <TableCell>{victim.location}</TableCell>
                        <TableCell>{formatDate(victim.timestamp, 'HH:mm')}</TableCell>
                        <TableCell>
                          <Badge className={getStatusStyles(victim.status)}>
                            {getStatusLabel(victim.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Détails</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVictims.map(victim => (
                <Card key={victim.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">
                        {victim.firstName} {victim.lastName}
                      </CardTitle>
                      <Badge className={getCategoryStyles(victim.category)}>
                        {getCategoryLabel(victim.category)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Tag className="h-3 w-3" />
                        <span className="font-mono text-xs">{victim.identifier}</span>
                      </div>
                      <Badge className={getStatusStyles(victim.status)}>
                        {getStatusLabel(victim.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{victim.age} ans</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{formatDate(victim.timestamp, 'HH:mm')}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-muted-foreground">Symptômes:</span>
                      <div>
                        {victim.symptoms.map((symptom, index) => (
                          <span key={index} className="inline-block text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded mr-1 mb-1">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 flex justify-end">
                      <Button variant="outline" size="sm">Voir détails</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {filteredVictims.length} victime(s)
            </p>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="sm:hidden">
                <FileDown className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune victime trouvée</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              {searchTerm ? 
                `Aucune victime ne correspond à votre recherche "${searchTerm}".` : 
                "Aucune victime n'a été enregistrée pour ce DPS."}
            </p>
            <Button className="bg-emergency-600 hover:bg-emergency-700">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une victime
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
