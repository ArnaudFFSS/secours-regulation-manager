
import React from 'react';
import { DPSCard } from './DPSCard';
import { DPS } from '@/types';

// Données fictives pour la démonstration
const mockCompletedDPS: DPS[] = [
  {
    id: '4',
    name: 'Marché de Noël',
    eventType: 'public',
    eventDescription: 'Marché de Noël de Strasbourg en centre-ville',
    startDate: '2022-12-01T10:00:00Z',
    endDate: '2022-12-24T22:00:00Z',
    location: {
      address: 'Place Broglie',
      city: 'Strasbourg',
      postalCode: '67000',
      lat: 48.585,
      lng: 7.747,
    },
    organizerInfo: {
      name: 'Ville de Strasbourg',
      contact: 'Service événementiel',
      email: 'evenements@strasbourg.eu',
      phone: '0388998877',
    },
    status: 'completed',
    riskAssessment: 'high',
    expectedAttendees: 10000,
    assignedResources: [
      {
        id: 'r7',
        resourceId: 'amb1',
        name: 'Ambulance A1',
        type: 'ambulance',
        status: 'returned',
        assignedAt: '2022-11-15T09:00:00Z',
        deployedAt: '2022-12-01T09:00:00Z',
        returnedAt: '2022-12-24T22:30:00Z',
      },
      {
        id: 'r8',
        resourceId: 'amb2',
        name: 'Ambulance A2',
        type: 'ambulance',
        status: 'returned',
        assignedAt: '2022-11-15T09:00:00Z',
        deployedAt: '2022-12-01T09:00:00Z',
        returnedAt: '2022-12-24T22:30:00Z',
      },
    ],
    assignedPersonnel: [
      {
        id: 'p8',
        userId: 'u8',
        name: 'Philippe Durand',
        role: 'commandement',
        status: 'assigned',
        assignedAt: '2022-11-15T09:00:00Z',
        checkedInAt: '2022-12-01T08:30:00Z',
        checkedOutAt: '2022-12-24T22:45:00Z',
      },
      {
        id: 'p9',
        userId: 'u9',
        name: 'Dr. Camille Leroux',
        role: 'medic',
        status: 'assigned',
        assignedAt: '2022-11-15T09:00:00Z',
        checkedInAt: '2022-12-01T08:45:00Z',
        checkedOutAt: '2022-12-24T22:40:00Z',
      },
    ],
    interventions: ['int3', 'int4', 'int5', 'int6', 'int7'],
    documents: [
      {
        id: 'd5',
        dpsId: '4',
        name: 'Convention - Marché de Noël',
        type: 'convention',
        url: '/documents/convention-marche-noel.pdf',
        uploadedAt: '2022-11-10T11:20:00Z',
        uploadedBy: 'u5',
      },
      {
        id: 'd6',
        dpsId: '4',
        name: 'Rapport final - Marché de Noël',
        type: 'rapport',
        url: '/documents/rapport-marche-noel.pdf',
        uploadedAt: '2022-12-30T14:15:00Z',
        uploadedBy: 'u8',
      },
      {
        id: 'd7',
        dpsId: '4',
        name: 'Facture - Marché de Noël',
        type: 'facture',
        url: '/documents/facture-marche-noel.pdf',
        uploadedAt: '2023-01-05T10:30:00Z',
        uploadedBy: 'u5',
      },
    ],
    logs: [
      {
        id: 'l7',
        dpsId: '4',
        timestamp: '2022-11-10T11:20:00Z',
        message: 'DPS créé',
        userId: 'u5',
        type: 'info',
      },
      {
        id: 'l8',
        dpsId: '4',
        timestamp: '2022-12-01T09:00:00Z',
        message: 'Début du DPS',
        userId: 'u8',
        type: 'status',
      },
      {
        id: 'l9',
        dpsId: '4',
        timestamp: '2022-12-24T22:30:00Z',
        message: 'Fin du DPS',
        userId: 'u8',
        type: 'status',
      },
      {
        id: 'l10',
        dpsId: '4',
        timestamp: '2022-12-30T14:15:00Z',
        message: 'Rapport final soumis',
        userId: 'u8',
        type: 'info',
      },
    ],
    createdAt: '2022-11-10T11:20:00Z',
    updatedAt: '2023-01-05T10:30:00Z',
  },
];

export function DPSCompleted() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCompletedDPS.map(dps => (
          <DPSCard key={dps.id} dps={dps} />
        ))}
      </div>
      
      {mockCompletedDPS.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun DPS terminé</p>
        </div>
      )}
    </div>
  );
}
