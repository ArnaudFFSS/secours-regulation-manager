
export type MedicalCaseStatus = 'pending' | 'inProgress' | 'completed' | 'transferred';
export type TriageCategory = 'green' | 'yellow' | 'red' | 'black';

export interface MedicalCase {
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
