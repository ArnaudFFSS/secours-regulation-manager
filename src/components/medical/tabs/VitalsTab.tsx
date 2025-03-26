
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, Thermometer, Target } from 'lucide-react';

interface VitalsTabProps {
  vitalSigns: {
    heartRate: string;
    bloodPressure: string;
    oxygenSaturation: string;
    respiratoryRate: string;
    temperature: string;
    gcs: string;
  };
}

export function VitalsTab({ vitalSigns }: VitalsTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base flex items-center">
              <HeartPulse className="h-4 w-4 mr-2 text-red-500" />
              Fréquence cardiaque
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="text-2xl font-bold">{vitalSigns.heartRate}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base flex items-center">
              <Thermometer className="h-4 w-4 mr-2 text-orange-500" />
              Température
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="text-2xl font-bold">{vitalSigns.temperature}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Tension artérielle</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="text-2xl font-bold">{vitalSigns.bloodPressure}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Saturation en O²</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="text-2xl font-bold">{vitalSigns.oxygenSaturation}</div>
          </CardContent>
        </Card>
      </div>
      
      <Button className="w-full">
        <Target className="h-4 w-4 mr-2" />
        Mettre à jour les signes vitaux
      </Button>
    </div>
  );
}
