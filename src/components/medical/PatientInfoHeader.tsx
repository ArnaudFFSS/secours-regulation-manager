
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeartPulse, Clock, X } from 'lucide-react';
import { MedicalCase } from './types';
import { getTriageColor, getTriageLabel, formatTimestamp } from './utils';

interface PatientInfoHeaderProps {
  medicalCase: MedicalCase;
  onClose: () => void;
}

export function PatientInfoHeader({ medicalCase, onClose }: PatientInfoHeaderProps) {
  const getGenderLabel = (gender?: 'male' | 'female' | 'other' | 'unknown') => {
    switch (gender) {
      case 'male':
        return 'Homme';
      case 'female':
        return 'Femme';
      case 'other':
        return 'Autre';
      default:
        return 'Non précisé';
    }
  };
  
  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle className="flex items-center">
          <HeartPulse className="mr-2 h-5 w-5 text-primary" />
          Dossier médical - {medicalCase.patientName || 'Patient inconnu'}
        </CardTitle>
        <CardDescription className="mt-1">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge className={getTriageColor(medicalCase.triageCategory)}>
              {getTriageLabel(medicalCase.triageCategory)}
            </Badge>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Ouvert à {formatTimestamp(medicalCase.timestamp)}
            </div>
            {medicalCase.age && (
              <>
                <span className="text-muted-foreground">•</span>
                <span>{medicalCase.age} ans</span>
              </>
            )}
            {medicalCase.gender && (
              <>
                <span className="text-muted-foreground">•</span>
                <span>{getGenderLabel(medicalCase.gender)}</span>
              </>
            )}
          </div>
        </CardDescription>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
