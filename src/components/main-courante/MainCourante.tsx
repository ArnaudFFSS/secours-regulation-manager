
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MainCouranteFilter } from './MainCouranteFilter';
import { MainCouranteTimeline } from './MainCouranteTimeline';
import { MainCouranteEntry } from '@/types';
import { PlusCircle, Clock, Search, Download, Filter } from 'lucide-react';
import { MainCouranteEntryForm } from './MainCouranteEntryForm';

export function MainCourante() {
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Données fictives pour la démonstration
  const entries: MainCouranteEntry[] = [
    {
      id: 'entry1',
      timestamp: '2023-09-15T08:00:00Z',
      message: 'Ouverture du PC Sécurité pour l\'événement "Course Solidaire Strasbourg"',
      authorId: 'u1',
      authorName: 'Marie Lambert',
      category: 'communication',
      tags: ['ouverture', 'pc-securite']
    },
    {
      id: 'entry2',
      timestamp: '2023-09-15T08:15:00Z',
      message: 'Vérification des moyens radio, tous opérationnels',
      authorId: 'u2',
      authorName: 'Paul Martin',
      category: 'communication',
      tags: ['radio', 'matériel']
    },
    {
      id: 'entry3',
      timestamp: '2023-09-15T08:30:00Z',
      message: 'Briefing des équipes de secouristes',
      authorId: 'u1',
      authorName: 'Marie Lambert',
      category: 'communication',
      tags: ['briefing', 'personnel']
    },
    {
      id: 'entry4',
      timestamp: '2023-09-15T09:00:00Z',
      message: 'Début officiel de la manifestation',
      authorId: 'u1',
      authorName: 'Marie Lambert',
      category: 'communication',
      tags: ['événement']
    },
    {
      id: 'entry5',
      timestamp: '2023-09-15T09:15:00Z',
      message: 'Signalement d\'un coureur en difficulté au KM 3',
      authorId: 'u3',
      authorName: 'Jean Dubois',
      category: 'intervention',
      tags: ['coureur', 'secours'],
      relatedInterventionId: 'int1'
    },
    {
      id: 'entry6',
      timestamp: '2023-09-15T09:20:00Z',
      message: 'Envoi d\'une équipe d\'intervention au KM 3',
      authorId: 'u1',
      authorName: 'Marie Lambert',
      category: 'decision',
      tags: ['intervention', 'équipe'],
      relatedInterventionId: 'int1'
    },
    {
      id: 'entry7',
      timestamp: '2023-09-15T09:30:00Z',
      message: 'Prise en charge du coureur en difficulté, suspicion de déshydratation',
      authorId: 'u2',
      authorName: 'Paul Martin',
      category: 'intervention',
      tags: ['prise en charge', 'déshydratation'],
      relatedInterventionId: 'int1'
    },
    {
      id: 'entry8',
      timestamp: '2023-09-15T10:00:00Z',
      message: 'Ravitaillement en eau du poste de secours principal',
      authorId: 'u4',
      authorName: 'Sophie Moreau',
      category: 'other',
      tags: ['logistique', 'ravitaillement']
    }
  ];
  
  const filteredEntries = searchTerm 
    ? entries.filter(entry => 
        entry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : entries;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="px-6 py-4 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Main Courante
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button size="sm" onClick={() => setIsEntryFormOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nouvelle entrée
            </Button>
          </div>
        </CardHeader>
        
        <Tabs defaultValue="timeline" className="w-full">
          <div className="px-6 pb-2">
            <TabsList className="w-full">
              <TabsTrigger value="timeline" className="flex-1">Chronologie</TabsTrigger>
              <TabsTrigger value="interventions" className="flex-1">Interventions</TabsTrigger>
              <TabsTrigger value="decisions" className="flex-1">Décisions</TabsTrigger>
              <TabsTrigger value="communications" className="flex-1">Communications</TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="px-6 py-2">
            <div className="flex items-start gap-4">
              <div className={`transition-all duration-300 ease-in-out ${isFilterOpen ? 'w-1/4' : 'w-0 opacity-0 hidden'}`}>
                {isFilterOpen && <MainCouranteFilter />}
              </div>
              
              <div className={`transition-all duration-300 ease-in-out ${isFilterOpen ? 'w-3/4' : 'w-full'}`}>
                <div className="mb-4 relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher dans la main courante..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <TabsContent value="timeline" className="m-0">
                  <MainCouranteTimeline entries={filteredEntries} />
                </TabsContent>
                
                <TabsContent value="interventions" className="m-0">
                  <MainCouranteTimeline 
                    entries={filteredEntries.filter(e => e.category === 'intervention')} 
                  />
                </TabsContent>
                
                <TabsContent value="decisions" className="m-0">
                  <MainCouranteTimeline 
                    entries={filteredEntries.filter(e => e.category === 'decision')} 
                  />
                </TabsContent>
                
                <TabsContent value="communications" className="m-0">
                  <MainCouranteTimeline 
                    entries={filteredEntries.filter(e => e.category === 'communication')} 
                  />
                </TabsContent>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="px-6 py-4 border-t">
            <div className="w-full text-center text-muted-foreground text-sm">
              {filteredEntries.length} entrées • Dernière mise à jour: {new Date().toLocaleTimeString()}
            </div>
          </CardFooter>
        </Tabs>
      </Card>
      
      {isEntryFormOpen && (
        <MainCouranteEntryForm
          onClose={() => setIsEntryFormOpen(false)}
          onSubmit={(data) => {
            console.log('Nouvelle entrée:', data);
            setIsEntryFormOpen(false);
          }}
        />
      )}
    </div>
  );
}
