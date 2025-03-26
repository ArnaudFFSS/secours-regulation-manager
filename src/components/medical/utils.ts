
import { MedicalCaseStatus, TriageCategory } from './types';

export const getStatusColor = (status: MedicalCaseStatus) => {
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

export const getStatusLabel = (status: MedicalCaseStatus) => {
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

export const getTriageColor = (triage: TriageCategory) => {
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

export const getTriageLabel = (triage: TriageCategory) => {
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

export const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};
