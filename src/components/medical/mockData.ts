
import { MedicalCase } from './types';

// Données fictives pour la démonstration
export const medicalCasesData: MedicalCase[] = [
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
