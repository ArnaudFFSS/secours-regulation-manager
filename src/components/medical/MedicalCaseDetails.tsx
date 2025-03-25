
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HeartPulse, Thermometer, Syringe, ClipboardList, FileText, Phone, Clock, Target, Ambulance, X, SendHorizontal, Users } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Types simplifiés pour la démo
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

interface MedicalCaseDetailsProps {
  medicalCase: MedicalCase;
  onClose: () => void;
}

export function MedicalCaseDetails({ medicalCase, onClose }: MedicalCaseDetailsProps) {
  const [newNote, setNewNote] = useState('');
  const [selectedTransferOption, setSelectedTransferOption] = useState('');
  
  // Données fictives pour le dossier médical
  const vitalSigns = {
    heartRate: '88 bpm',
    bloodPressure: '132/85 mmHg',
    oxygenSaturation: '98%',
    respiratoryRate: '16/min',
    temperature: '37.2°C',
    gcs: '15'
  };
  
  const medications = [
    { name: 'Paracétamol', dosage: '1g', time: '15:30' },
    { name: 'Oxygène', dosage: '2L/min', time: '15:40' }
  ];
  
  const notes = [
    { 
      id: 'note1', 
      text: 'Patient conscient, orienté. Douleur thoracique non angineuse, apparue pendant l\'effort.', 
      author: 'Dr. Lambert', 
      timestamp: '2023-09-15T15:15:00Z' 
    },
    { 
      id: 'note2', 
      text: 'ECG réalisé, pas d\'anomalie significative. À surveiller.', 
      author: 'Dr. Lambert', 
      timestamp: '2023-09-15T15:25:00Z' 
    }
  ];
  
  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), 'HH:mm', { locale: fr });
  };
  
  const getGenderLabel = (gender?: 'male' | 'female' | 'other' | 'unknown') => {
    switch (gender) {
      case 'male':
        return 'Homme';
      case 'female':
        return 'Femme';
      case 'other':
        return 'Autre';
      default:
        return 'Non précisé';
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
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log('Ajout de note:', newNote);
      setNewNote('');
    }
  };
  
  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <HeartPulse className="mr-2 h-5 w-5 text-primary" />
              Dossier médical - {medicalCase.patientName || 'Patient inconnu'}
            </CardTitle>
            <CardDescription className="mt-1">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge className={getTriageColor(medicalCase.triageCategory)}>
                  {getTriageLabel(medicalCase.triageCategory)}
                </Badge>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Ouvert à {formatTimestamp(medicalCase.timestamp)}
                </div>
                {medicalCase.age && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span>{medicalCase.age} ans</span>
                  </>
                )}
                {medicalCase.gender && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span>{getGenderLabel(medicalCase.gender)}</span>
                  </>
                )}
              </div>
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="overview" className="w-full">
        <div className="px-6 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="vitals" className="flex-1">Signes vitaux</TabsTrigger>
            <TabsTrigger value="treatments" className="flex-1">Traitements</TabsTrigger>
            <TabsTrigger value="transfer" className="flex-1">Transfert</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="px-6 pt-4 pb-3">
          <TabsContent value="overview" className="mt-0 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Symptômes signalés</h4>
              <div className="flex flex-wrap gap-2">
                {medicalCase.symptoms.map((symptom, index) => (
                  <Badge key={index} variant="outline">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Localisation</h4>
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{medicalCase.location}</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Notes médicales</h4>
              <div className="space-y-3">
                {notes.map((note) => (
                  <div key={note.id} className="border rounded-md p-3 bg-muted/50">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{note.author}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(note.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm">{note.text}</p>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ajouter une note médicale..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex flex-col justify-end">
                    <Button size="icon" onClick={handleAddNote}>
                      <SendHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vitals" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base flex items-center">
                      <HeartPulse className="h-4 w-4 mr-2 text-red-500" />
                      Fréquence cardiaque
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">{vitalSigns.heartRate}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base flex items-center">
                      <Thermometer className="h-4 w-4 mr-2 text-orange-500" />
                      Température
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">{vitalSigns.temperature}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Tension artérielle</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">{vitalSigns.bloodPressure}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Saturation en O²</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">{vitalSigns.oxygenSaturation}</div>
                  </CardContent>
                </Card>
              </div>
              
              <Button className="w-full">
                <Target className="h-4 w-4 mr-2" />
                Mettre à jour les signes vitaux
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="treatments" className="mt-0">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Traitements administrés</h4>
                {medications.length > 0 ? (
                  <div className="border rounded-md divide-y">
                    {medications.map((med, index) => (
                      <div key={index} className="p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{med.name}</div>
                          <div className="text-sm text-muted-foreground">{med.dosage}</div>
                        </div>
                        <Badge variant="outline">{med.time}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border rounded-md">
                    <Syringe className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Aucun traitement administré</p>
                  </div>
                )}
              </div>
              
              <Button className="w-full">
                <Syringe className="h-4 w-4 mr-2" />
                Ajouter un traitement
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="transfer" className="mt-0">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Transfert vers</h4>
                <Select 
                  value={selectedTransferOption}
                  onValueChange={setSelectedTransferOption}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital1">CHU de Strasbourg</SelectItem>
                    <SelectItem value="hospital2">Clinique de l'Orangerie</SelectItem>
                    <SelectItem value="hospital3">Hôpital de Hautepierre</SelectItem>
                    <SelectItem value="home">Retour à domicile</SelectItem>
                    <SelectItem value="medicPlace">Poste médical principal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Moyen de transport</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="flex flex-col h-auto py-3">
                    <Ambulance className="h-8 w-8 mb-1" />
                    <span>Ambulance</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-auto py-3">
                    <Users className="h-8 w-8 mb-1" />
                    <span>À pied</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col h-auto py-3">
                    <Ambulance className="h-8 w-8 mb-1" />
                    <span>SMUR</span>
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Instructions de transfert</h4>
                <Textarea 
                  placeholder="Ajouter des instructions spécifiques pour le transfert..."
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Appel régulation
                </Button>
                <Button className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Valider le transfert
                </Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
        
        <CardFooter className="border-t px-6 py-3">
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1">
              <ClipboardList className="h-4 w-4 mr-2" />
              Éditer la fiche
            </Button>
            <Button className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Valider la prise en charge
            </Button>
          </div>
        </CardFooter>
      </Tabs>
    </Card>
  );
}
