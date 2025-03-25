
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'responder' | 'medic';
  avatar?: string;
  phone?: string;
  certifications?: string[];
  availability?: DPSAvailability[];
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
  dpsId?: string; // ID du DPS associé si l'intervention est liée à un DPS
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
  upcomingDPS: number;
  activeDPS: number;
}

export interface DPS {
  id: string;
  name: string;
  eventType: 'sport' | 'cultural' | 'public' | 'private' | 'other';
  eventDescription: string;
  startDate: string;
  endDate: string;
  location: {
    address: string;
    city: string;
    postalCode: string;
    lat?: number;
    lng?: number;
  };
  organizerInfo: {
    name: string;
    contact: string;
    email?: string;
    phone?: string;
  };
  status: 'planned' | 'inProgress' | 'completed' | 'cancelled';
  riskAssessment: 'low' | 'medium' | 'high';
  expectedAttendees: number;
  assignedResources: DPSResource[];
  assignedPersonnel: DPSPersonnel[];
  interventions: string[]; // IDs des interventions liées
  documents: DPSDocument[];
  logs: DPSLog[];
  createdAt: string;
  updatedAt: string;
}

export interface DPSResource {
  id: string;
  resourceId: string;
  name: string;
  type: 'ambulance' | 'medic' | 'equipment' | 'other';
  status: 'assigned' | 'deployed' | 'returned' | 'unavailable';
  assignedAt: string;
  deployedAt?: string;
  returnedAt?: string;
  notes?: string;
}

export interface DPSPersonnel {
  id: string;
  userId: string;
  name: string;
  role: 'medic' | 'secouriste' | 'logistique' | 'commandement';
  status: 'assigned' | 'present' | 'absent' | 'late';
  assignedAt: string;
  checkedInAt?: string;
  checkedOutAt?: string;
  notes?: string;
}

export interface DPSDocument {
  id: string;
  dpsId: string;
  name: string;
  type: 'convention' | 'autorisation' | 'plan' | 'facture' | 'rapport' | 'other';
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface DPSLog {
  id: string;
  dpsId: string;
  timestamp: string;
  message: string;
  userId: string;
  type: 'info' | 'action' | 'status' | 'note';
}

export interface DPSAvailability {
  id: string;
  userId: string;
  date: string;
  timeSlots: {
    start: string;
    end: string;
  }[];
  status: 'available' | 'unavailable' | 'tentative';
  notes?: string;
}

export interface CallRecord {
  id: string;
  callId: string;
  timestamp: string;
  duration: number;
  direction: 'incoming' | 'outgoing';
  callerNumber: string;
  callerName?: string;
  receiverNumber: string;
  receiverName?: string;
  status: 'answered' | 'missed' | 'voicemail' | 'busy';
  recordingUrl?: string;
  notes?: string;
  interventionId?: string;
  dpsId?: string;
}

export interface MainCouranteEntry {
  id: string;
  timestamp: string;
  message: string;
  authorId: string;
  authorName: string;
  category: 'intervention' | 'dps' | 'communication' | 'decision' | 'other';
  tags: string[];
  relatedInterventionId?: string;
  relatedDpsId?: string;
  relatedCallId?: string;
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';
