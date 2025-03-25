
import React from 'react';
import { DPSCard } from './DPSCard';
import { DPS } from '@/types';

// Données fictives pour la démonstration
const mockUpcomingDPS: DPS[] = [
  {
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
  {
    id: '2',
    name: 'Festival de Musique',
    eventType: 'cultural',
    eventDescription: 'Festival de musique en plein air',
    startDate: '2023-07-01T18:00:00Z',
    endDate: '2023-07-03T23:00:00Z',
    location: {
      address: 'Parc de l\'Orangerie',
      city: 'Strasbourg',
      postalCode: '67000',
      lat: 48.590,
      lng: 7.768,
    },
    organizerInfo: {
      name: 'Association MusicFest',
      contact: 'Sophie Martin',
      email: 'sophie.martin@musicfest.org',
      phone: '0388987654',
    },
    status: 'planned',
    riskAssessment: 'high',
    expectedAttendees: 5000,
    assignedResources: [
      {
        id: 'r3',
        resourceId: 'amb2',
        name: 'Ambulance A2',
        type: 'ambulance',
        status: 'assigned',
        assignedAt: '2023-06-01T09:15:00Z',
      },
      {
        id: 'r4',
        resourceId: 'amb3',
        name: 'Ambulance A3',
        type: 'ambulance',
        status: 'assigned',
        assignedAt: '2023-06-01T09:15:00Z',
      },
    ],
    assignedPersonnel: [
      {
        id: 'p3',
        userId: 'u3',
        name: 'Dr. Eric Blanc',
        role: 'medic',
        status: 'assigned',
        assignedAt: '2023-06-01T09:15:00Z',
      },
      {
        id: 'p4',
        userId: 'u4',
        name: 'Julie Roux',
        role: 'secouriste',
        status: 'assigned',
        assignedAt: '2023-06-01T09:15:00Z',
      },
      {
        id: 'p5',
        userId: 'u5',
        name: 'Thomas Dubois',
        role: 'secouriste',
        status: 'assigned',
        assignedAt: '2023-06-01T09:15:00Z',
      },
    ],
    interventions: [],
    documents: [
      {
        id: 'd2',
        dpsId: '2',
        name: 'Convention - Festival de Musique',
        type: 'convention',
        url: '/documents/convention-festival.pdf',
        uploadedAt: '2023-05-25T11:30:00Z',
        uploadedBy: 'u5',
      },
      {
        id: 'd3',
        dpsId: '2',
        name: 'Plan du site - Festival',
        type: 'plan',
        url: '/documents/plan-festival.pdf',
        uploadedAt: '2023-05-26T14:00:00Z',
        uploadedBy: 'u5',
      },
    ],
    logs: [
      {
        id: 'l2',
        dpsId: '2',
        timestamp: '2023-05-25T11:30:00Z',
        message: 'DPS créé',
        userId: 'u5',
        type: 'info',
      },
      {
        id: 'l3',
        dpsId: '2',
        timestamp: '2023-06-01T09:15:00Z',
        message: 'Ressources et personnel assignés',
        userId: 'u5',
        type: 'action',
      },
    ],
    createdAt: '2023-05-25T11:30:00Z',
    updatedAt: '2023-06-01T09:15:00Z',
  },
];

export function DPSUpcoming() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockUpcomingDPS.map(dps => (
          <DPSCard key={dps.id} dps={dps} />
        ))}
      </div>
      
      {mockUpcomingDPS.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun DPS à venir</p>
        </div>
      )}
    </div>
  );
}
