
import React from 'react';
import { DPSCard } from './DPSCard';
import { DPS } from '@/types';

// Données fictives pour la démonstration
const mockActiveDPS: DPS[] = [
  {
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
];

export function DPSActive() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockActiveDPS.map(dps => (
          <DPSCard key={dps.id} dps={dps} />
        ))}
      </div>
      
      {mockActiveDPS.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun DPS en cours</p>
        </div>
      )}
    </div>
  );
}
