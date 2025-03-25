
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, UserCog, Clock, Stethoscope, ChevronRight, Search, AlertTriangle, FilePlus } from 'lucide-react';
import { MedicalCaseDetails } from './MedicalCaseDetails';
import { VictimsList } from './VictimsList';

// Types pour les cas médicaux
type MedicalCaseStatus = 'pending' | 'inProgress' | 'completed' | 'transferred';
type TriageCategory = 'green' | 'yellow' | 'red' | 'black';

interface MedicalCase {
  id: string;
  patientName?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  timestamp: string;
  status: MedicalCaseStatus;
  triageCategory: TriageCategory;
  symptoms: string[];
  assignedDoctor?: string;
  location: string;
  interventionId: string;
}

export function MedicalRegulation() {
  const [selectedCase, setSelectedCase] = useState<MedicalCase | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Données fictives pour la démonstration
  const medicalCases: MedicalCase[] = [
    {
      id: 'med-case-1',
      patientName: 'Jean Dupont',
      age: 45,
      gender: 'male',
      timestamp: '2023-09-15T14:30:00Z',
      status: 'pending',
      triageCategory: 'yellow',
      symptoms: ['Douleur thoracique', 'Essoufflement'],
      location: 'Section B - Stand 3',
      interventionId: 'int1'
    },
    {
      id: 'med-case-2',
      age: 12,
      gender: 'female',
      timestamp: '2023-09-15T14:45:00Z',
      status: 'inProgress',
      triageCategory: 'green',
      symptoms: ['Entorse de cheville'],
      assignedDoctor: 'Dr. Martinez',
      location: 'Entrée principale',
      interventionId: 'int2'
    },
    {
      id: 'med-case-3',
      patientName: 'Pierre Martin',
      age: 67,
      gender: 'male',
      timestamp: '2023-09-15T15:10:00Z',
      status: 'inProgress',
      triageCategory: 'red',
      symptoms: ['Perte de conscience', 'Chute'],
      assignedDoctor: 'Dr. Lambert',
      location: 'Poste de secours principal',
      interventionId: 'int3'
    }
  ];
  
  const getStatusColor = (status: MedicalCaseStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inProgress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'transferred':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusLabel = (status: MedicalCaseStatus) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'inProgress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'transferred':
        return 'Transféré';
      default:
        return status;
    }
  };
  
  const getTriageColor = (triage: TriageCategory) => {
    switch (triage) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      case 'black':
        return 'bg-gray-800 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTriageLabel = (triage: TriageCategory) => {
    switch (triage) {
      case 'green':
        return 'Non urgent';
      case 'yellow':
        return 'Urgent';
      case 'red':
        return 'Très urgent';
      case 'black':
        return 'Décédé';
      default:
        return triage;
    }
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };
  
  const filteredCases = medicalCases.filter(c => 
    (c.patientName && c.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    c.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="active" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="active">Cas actifs</TabsTrigger>
              <TabsTrigger value="closed">Cas terminés</TabsTrigger>
              <TabsTrigger value="transferred">Transferts</TabsTrigger>
            </TabsList>
            <Button 
              className="ml-auto"
            >
              <FilePlus className="mr-2 h-4 w-4" />
              Nouveau Cas
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un cas..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <TabsContent value="active" className="m-0">
                <div className="space-y-3">
                  {filteredCases.length > 0 ? (
                    filteredCases.map((medCase) => (
                      <Card 
                        key={medCase.id}
                        className={`cursor-pointer hover:border-primary transition-colors ${selectedCase?.id === medCase.id ? 'border-primary' : ''}`}
                        onClick={() => setSelectedCase(medCase)}
                      >
                        <CardHeader className="py-3 px-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">
                                {medCase.patientName || 'Patient inconnu'}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3" />
                                {formatTime(medCase.timestamp)}
                                {medCase.age && (
                                  <>
                                    <span className="mx-1">•</span>
                                    {medCase.age} ans
                                  </>
                                )}
                              </CardDescription>
                            </div>
                            <Badge className={getTriageColor(medCase.triageCategory)}>
                              {getTriageLabel(medCase.triageCategory)}
                            </Badge>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="py-0 px-4">
                          <div className="line-clamp-1 text-sm mb-2">
                            {medCase.symptoms.join(', ')}
                          </div>
                        </CardContent>
                        
                        <CardFooter className="py-2 px-4 flex justify-between">
                          <Badge className={getStatusColor(medCase.status)}>
                            {getStatusLabel(medCase.status)}
                          </Badge>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Aucun cas correspondant trouvé</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="closed" className="m-0">
                <div className="text-center py-12 border rounded-lg">
                  <Stethoscope className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Les cas terminés apparaîtront ici</p>
                </div>
              </TabsContent>
              
              <TabsContent value="transferred" className="m-0">
                <div className="text-center py-12 border rounded-lg">
                  <UserCog className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Les cas transférés apparaîtront ici</p>
                </div>
              </TabsContent>
            </div>
            
            <div className="lg:col-span-2">
              {selectedCase ? (
                <MedicalCaseDetails 
                  medicalCase={selectedCase} 
                  onClose={() => setSelectedCase(null)}
                />
              ) : (
                <div className="border rounded-lg flex flex-col items-center justify-center py-20">
                  <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Aucun cas sélectionné</h3>
                  <p className="text-muted-foreground max-w-md text-center mt-2">
                    Sélectionnez un cas médical dans la liste à gauche pour voir les détails et prendre des actions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
