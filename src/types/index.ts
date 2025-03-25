
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'responder' | 'medic';
  avatar?: string;
}

export interface EmergencyResource {
  id: string;
  name: string;
  type: 'ambulance' | 'medic' | 'team' | 'helicopter' | 'other';
  status: 'available' | 'dispatched' | 'onScene' | 'returning' | 'outOfService';
  location?: {
    lat: number;
    lng: number;
  };
  assignedTo?: string; // Intervention ID
  crew?: User[];
}

export interface Victim {
  id: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  condition: 'stable' | 'unstable' | 'critical' | 'deceased' | 'unknown';
  symptoms: string[];
  interventionId: string;
  notes?: string;
  medicalHistory?: string;
  triageCategory?: 'green' | 'yellow' | 'red' | 'black';
}

export interface Intervention {
  id: string;
  caseNumber: string;
  title: string;
  description?: string;
  status: 'pending' | 'inProgress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  location: {
    address?: string;
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
  assignedResources: EmergencyResource[];
  victims: Victim[];
  logs: InterventionLog[];
}

export interface InterventionLog {
  id: string;
  interventionId: string;
  timestamp: string;
  message: string;
  userId: string;
  type: 'info' | 'action' | 'status' | 'note';
}

export interface DashboardStats {
  activeInterventions: number;
  availableResources: number;
  completedToday: number;
  criticalCases: number;
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';
