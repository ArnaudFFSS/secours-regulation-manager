import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageTransition } from '@/components/layout/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, Phone, Mail, User, AlertTriangle, Clipboard, ArrowLeft, Play, Square, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { DPSVictimsList } from '@/components/dps/DPSVictimsList';
import { DPSResources } from '@/components/dps/DPSResources';
import { DPSTimeline } from '@/components/dps/DPSTimeline';
import { DPSMap } from '@/components/dps/DPSMap';
import { DPS } from '@/types';

const mockDPS: Record<string, DPS> = {
  '1': {
    id: '1',
    name: 'Course Solidaire Strasbourg',
    eventType: 'sport',
    eventDescription: 'Course caritative dans le centre de Strasbourg',
    startDate: '2023-06-15T08:00:00Z',
    endDate: '2023-06-15T16:00:00Z',
    location: {
      address: 'Place Kléber',
      city: 'Strasbourg',
      postalCode: '67000',
      lat: 48.583,
      lng: 7.745,
    },
    organizerInfo: {
      name: 'Association Courir pour la Vie',
      contact: 'Jean Dupont',
      email: 'jean.dupont@coursesol.org',
      phone: '0388123456',
    },
    status: 'planned',
    riskAssessment: 'medium',
    expectedAttendees: 1500,
    assignedResources: [
      {
        id: 'r1',
        resourceId: 'amb1',
        name: 'Ambulance A1',
        type: 'ambulance',
        status: 'assigned',
        assignedAt: '2023-05-20T14:30:00Z',
      },
      {
        id: 'r2',
        resourceId: 'eq1',
        name: 'Kit Premiers Secours',
        type: 'equipment',
        status: 'assigned',
        assignedAt: '2023-05-20T14:30:00Z',
      },
    ],
    assignedPersonnel: [
      {
        id: 'p1',
        userId: 'u1',
        name: 'Marie Lambert',
        role: 'secouriste',
        status: 'assigned',
        assignedAt: '2023-05-20T14:30:00Z',
      },
      {
        id: 'p2',
        userId: 'u2',
        name: 'Paul Martin',
        role: 'secouriste',
        status: 'assigned',
        assignedAt: '2023-05-20T14:30:00Z',
      },
    ],
    interventions: [],
    documents: [
      {
        id: 'd1',
        dpsId: '1',
        name: 'Convention - Course Solidaire',
        type: 'convention',
        url: '/documents/convention-course.pdf',
        uploadedAt: '2023-05-15T10:20:00Z',
        uploadedBy: 'u5',
      },
    ],
    logs: [
      {
        id: 'l1',
        dpsId: '1',
        timestamp: '2023-05-20T14:30:00Z',
        message: 'DPS créé et ressources assignées',
        userId: 'u5',
        type: 'info',
      },
    ],
    createdAt: '2023-05-15T10:00:00Z',
    updatedAt: '2023-05-20T14:30:00Z',
  },
  '3': {
    id: '3',
    name: 'Tournoi Sportif Universitaire',
    eventType: 'sport',
    eventDescription: 'Tournoi sportif universitaire avec compétitions de basketball, volleyball et athlétisme',
    startDate: '2023-05-10T09:00:00Z',
    endDate: '2023-05-12T18:00:00Z',
    location: {
      address: 'Campus Universitaire Esplanade',
      city: 'Strasbourg',
      postalCode: '67000',
      lat: 48.579,
      lng: 7.765,
    },
    organizerInfo: {
      name: 'Université de Strasbourg - Service des Sports',
      contact: 'Marc Levasseur',
      email: 'marc.levasseur@unistra.fr',
      phone: '0388000000',
    },
    status: 'inProgress',
    riskAssessment: 'medium',
    expectedAttendees: 800,
    assignedResources: [
      {
        id: 'r5',
        resourceId: 'amb1',
        name: 'Ambulance A1',
        type: 'ambulance',
        status: 'deployed',
        assignedAt: '2023-05-01T10:00:00Z',
        deployedAt: '2023-05-10T08:30:00Z',
      },
      {
        id: 'r6',
        resourceId: 'eq2',
        name: 'Tente de soin',
        type: 'equipment',
        status: 'deployed',
        assignedAt: '2023-05-01T10:00:00Z',
        deployedAt: '2023-05-10T07:45:00Z',
      },
    ],
    assignedPersonnel: [
      {
        id: 'p6',
        userId: 'u6',
        name: 'Alexandre Petit',
        role: 'secouriste',
        status: 'present',
        assignedAt: '2023-05-01T10:00:00Z',
        checkedInAt: '2023-05-10T08:15:00Z',
      },
      {
        id: 'p7',
        userId: 'u7',
        name: 'Laura Fernandez',
        role: 'secouriste',
        status: 'present',
        assignedAt: '2023-05-01T10:00:00Z',
        checkedInAt: '2023-05-10T08:20:00Z',
      },
    ],
    interventions: ['int1', 'int2'],
    documents: [
      {
        id: 'd4',
        dpsId: '3',
        name: 'Convention - Tournoi Universitaire',
        type: 'convention',
        url: '/documents/convention-tournoi.pdf',
        uploadedAt: '2023-04-15T14:30:00Z',
        uploadedBy: 'u5',
      },
    ],
    logs: [
      {
        id: 'l4',
        dpsId: '3',
        timestamp: '2023-04-15T14:30:00Z',
        message: 'DPS créé',
        userId: 'u5',
        type: 'info',
      },
      {
        id: 'l5',
        dpsId: '3',
        timestamp: '2023-05-10T08:15:00Z',
        message: 'Personnel arrivé sur site',
        userId: 'u6',
        type: 'action',
      },
      {
        id: 'l6',
        dpsId: '3',
        timestamp: '2023-05-10T10:30:00Z',
        message: 'Intervention pour entorse de cheville - joueur de basketball',
        userId: 'u7',
        type: 'action',
      },
    ],
    createdAt: '2023-04-15T14:30:00Z',
    updatedAt: '2023-05-10T10:30:00Z',
  },
};

const DPSDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dps, setDps] = useState<DPS | null>(id ? mockDPS[id] : null);
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!dps) {
    return (
      <PageTransition>
        <div className="container py-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">DPS non trouvé</h2>
            <p className="text-muted-foreground mb-6">Le DPS que vous recherchez n'existe pas ou a été supprimé.</p>
            <Button onClick={() => navigate('/dps')}>Retour à la liste des DPS</Button>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  const formatDate = (dateString: string, formatStr: string = 'PPP') => {
    try {
      return format(parseISO(dateString), formatStr, { locale: fr });
    } catch (error) {
      return dateString;
    }
  };
  
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
  
  const handleActivate = () => {
    const updatedDps = {
      ...dps,
      status: 'inProgress' as const,
      logs: [
        ...dps.logs,
        {
          id: `l${dps.logs.length + 1}`,
          dpsId: dps.id,
          timestamp: new Date().toISOString(),
          message: 'Début du DPS',
          userId: 'u1', // ID utilisateur courant
          type: 'status' as const,
        },
      ],
    };
    
    setDps(updatedDps);
    toast.success("DPS activé", {
      description: "Le DPS est maintenant en cours."
    });
  };
  
  const handleDeactivate = () => {
    const updatedDps = {
      ...dps,
      status: 'completed' as const,
      logs: [
        ...dps.logs,
        {
          id: `l${dps.logs.length + 1}`,
          dpsId: dps.id,
          timestamp: new Date().toISOString(),
          message: 'Fin du DPS',
          userId: 'u1', // ID utilisateur courant
          type: 'status' as const,
        },
      ],
    };
    
    setDps(updatedDps);
    toast.success("DPS terminé", {
      description: "Le DPS a été marqué comme terminé."
    });
  };
  
  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dps')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour
          </Button>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate">{dps.name}</h1>
            <div className="flex items-center">
              <Badge variant="outline" className={getStatusColor(dps.status)}>
                {getStatusLabel(dps.status)}
              </Badge>
              {dps.status === 'inProgress' && (
                <p className="ml-2 text-sm text-muted-foreground">
                  Activé depuis le {formatDate(dps.logs.find(log => log.message.includes('Début du DPS'))?.timestamp || dps.startDate, 'P')}
                </p>
              )}
            </div>
          </div>
          
          <div className="ml-auto">
            {dps.status === 'planned' && (
              <Button 
                onClick={handleActivate}
                className="bg-emergency-600 hover:bg-emergency-700"
              >
                <Play className="h-4 w-4 mr-2" />
                Activer le DPS
              </Button>
            )}
            
            {dps.status === 'inProgress' && (
              <Button 
                variant="outline"
                onClick={handleDeactivate}
                className="border-emergency-600 text-emergency-700 hover:bg-emergency-50"
              >
                <Square className="h-4 w-4 mr-2" />
                Terminer le DPS
              </Button>
            )}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-muted/50">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="victims" disabled={dps.status !== 'inProgress'}>Victimes</TabsTrigger>
            <TabsTrigger value="resources">Ressources</TabsTrigger>
            <TabsTrigger value="map">Cartographie</TabsTrigger>
            <TabsTrigger value="timeline">Chronologie</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                    <CardDescription>Détails de l'événement</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium">Description</span>
                      <p className="text-sm text-muted-foreground">{dps.eventDescription}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 mt-0.5 text-navy-600" />
                        <div>
                          <span className="text-sm font-medium">Dates</span>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(dps.startDate, 'PPP')} - {formatDate(dps.endDate, 'PPP')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(dps.startDate, 'HH:mm')} - {formatDate(dps.endDate, 'HH:mm')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 mt-0.5 text-navy-600" />
                        <div>
                          <span className="text-sm font-medium">Lieu</span>
                          <p className="text-sm text-muted-foreground">{dps.location.address}</p>
                          <p className="text-sm text-muted-foreground">
                            {dps.location.postalCode} {dps.location.city}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <Users className="h-5 w-5 mt-0.5 text-navy-600" />
                        <div>
                          <span className="text-sm font-medium">Participants</span>
                          <p className="text-sm text-muted-foreground">
                            {dps.expectedAttendees} participants estimés
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {dps.assignedPersonnel.length} secouristes affectés
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 mt-0.5 text-navy-600" />
                        <div>
                          <span className="text-sm font-medium">Niveau de risque</span>
                          <p className="text-sm text-muted-foreground">
                            {dps.riskAssessment === 'low' && 'Faible'}
                            {dps.riskAssessment === 'medium' && 'Moyen'}
                            {dps.riskAssessment === 'high' && 'Élevé'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {dps.status === 'inProgress' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Interventions en cours</CardTitle>
                      <CardDescription>Résumé des interventions pour ce DPS</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {dps.interventions.length > 0 ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{dps.interventions.length}</p>
                              <p className="text-sm text-muted-foreground">Interventions totales</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                              <p className="text-4xl font-bold text-green-600 dark:text-green-400">1</p>
                              <p className="text-sm text-muted-foreground">Interventions en cours</p>
                            </div>
                          </div>
                          
                          <Button variant="outline" className="w-full">
                            <Clipboard className="h-4 w-4 mr-2" />
                            Voir toutes les interventions
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground">Aucune intervention pour le moment</p>
                          <Button className="mt-4 bg-emergency-600 hover:bg-emergency-700">
                            Nouvelle intervention
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organisateur</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2">
                      <User className="h-5 w-5 mt-0.5 text-navy-600" />
                      <div>
                        <span className="text-sm font-medium">Organisation</span>
                        <p className="text-sm text-muted-foreground">
                          {dps.organizerInfo.name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <User className="h-5 w-5 mt-0.5 text-navy-600" />
                      <div>
                        <span className="text-sm font-medium">Contact</span>
                        <p className="text-sm text-muted-foreground">
                          {dps.organizerInfo.contact}
                        </p>
                      </div>
                    </div>
                    
                    {dps.organizerInfo.email && (
                      <div className="flex items-start gap-2">
                        <Mail className="h-5 w-5 mt-0.5 text-navy-600" />
                        <div>
                          <span className="text-sm font-medium">Email</span>
                          <p className="text-sm text-muted-foreground">
                            {dps.organizerInfo.email}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {dps.organizerInfo.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="h-5 w-5 mt-0.5 text-navy-600" />
                        <div>
                          <span className="text-sm font-medium">Téléphone</span>
                          <p className="text-sm text-muted-foreground">
                            {dps.organizerInfo.phone}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {dps.documents.length > 0 ? (
                      <ul className="space-y-2">
                        {dps.documents.map(doc => (
                          <li key={doc.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-navy-600" />
                              <span className="text-sm">{doc.name}</span>
                            </div>
                            <Button variant="ghost" size="sm">Voir</Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-center text-muted-foreground py-2">Aucun document</p>
                    )}
                    <Button variant="outline" className="w-full mt-4">
                      Ajouter un document
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="victims" className="mt-0">
            <DPSVictimsList dpsId={dps.id} />
          </TabsContent>
          
          <TabsContent value="resources" className="mt-0">
            <DPSResources dps={dps} />
          </TabsContent>
          
          <TabsContent value="map" className="mt-0">
            <DPSMap dps={dps} />
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-0">
            <DPSTimeline dps={dps} />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Documents du DPS</CardTitle>
                <CardDescription>
                  Tous les documents associés à ce DPS
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dps.documents.length > 0 ? (
                  <div className="space-y-4">
                    {dps.documents.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-10 w-10 text-muted-foreground p-2 bg-muted rounded-md" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Ajouté le {formatDate(doc.uploadedAt, 'P')} • {doc.type}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Télécharger</Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      Ajouter un document
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Aucun document</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Aucun document n'a été ajouté à ce DPS.
                    </p>
                    <Button>Ajouter un document</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default DPSDetailPage;
