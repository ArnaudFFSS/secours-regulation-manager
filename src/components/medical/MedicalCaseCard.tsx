
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ChevronRight } from 'lucide-react';
import { MedicalCase } from './types';
import { getTriageColor, getTriageLabel, getStatusColor, getStatusLabel, formatTime } from './utils';

interface MedicalCaseCardProps {
  medicalCase: MedicalCase;
  isSelected: boolean;
  onClick: () => void;
}

export function MedicalCaseCard({ medicalCase, isSelected, onClick }: MedicalCaseCardProps) {
  return (
    <Card 
      className={`cursor-pointer hover:border-primary transition-colors ${isSelected ? 'border-primary' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="py-3 px-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">
              {medicalCase.patientName || 'Patient inconnu'}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              {formatTime(medicalCase.timestamp)}
              {medicalCase.age && (
                <>
                  <span className="mx-1">•</span>
                  {medicalCase.age} ans
                </>
              )}
            </CardDescription>
          </div>
          <Badge className={getTriageColor(medicalCase.triageCategory)}>
            {getTriageLabel(medicalCase.triageCategory)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="py-0 px-4">
        <div className="line-clamp-1 text-sm mb-2">
          {medicalCase.symptoms.join(', ')}
        </div>
      </CardContent>
      
      <CardFooter className="py-2 px-4 flex justify-between">
        <Badge className={getStatusColor(medicalCase.status)}>
          {getStatusLabel(medicalCase.status)}
        </Badge>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </CardFooter>
    </Card>
  );
}
