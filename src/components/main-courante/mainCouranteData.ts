
import { MainCouranteEntry } from '@/types';

// Données fictives pour la démonstration
export const mockEntries: MainCouranteEntry[] = [
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
