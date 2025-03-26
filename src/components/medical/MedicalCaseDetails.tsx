
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardList, FileText } from 'lucide-react';
import { MedicalCase } from './types';
import { PatientInfoHeader } from './PatientInfoHeader';
import { OverviewTab } from './tabs/OverviewTab';
import { VitalsTab } from './tabs/VitalsTab';
import { TreatmentsTab } from './tabs/TreatmentsTab';
import { TransferTab } from './tabs/TransferTab';

interface MedicalCaseDetailsProps {
  medicalCase: MedicalCase;
  onClose: () => void;
}

export function MedicalCaseDetails({ medicalCase, onClose }: MedicalCaseDetailsProps) {
  // Données fictives pour le dossier médical
  const vitalSigns = {
    heartRate: '88 bpm',
    bloodPressure: '132/85 mmHg',
    oxygenSaturation: '98%',
    respiratoryRate: '16/min',
    temperature: '37.2°C',
    gcs: '15'
  };
  
  const medications = [
    { name: 'Paracétamol', dosage: '1g', time: '15:30' },
    { name: 'Oxygène', dosage: '2L/min', time: '15:40' }
  ];
  
  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <PatientInfoHeader medicalCase={medicalCase} onClose={onClose} />
      </CardHeader>
      
      <Tabs defaultValue="overview" className="w-full">
        <div className="px-6 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="vitals" className="flex-1">Signes vitaux</TabsTrigger>
            <TabsTrigger value="treatments" className="flex-1">Traitements</TabsTrigger>
            <TabsTrigger value="transfer" className="flex-1">Transfert</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="px-6 pt-4 pb-3">
          <TabsContent value="overview" className="mt-0">
            <OverviewTab medicalCase={medicalCase} />
          </TabsContent>
          
          <TabsContent value="vitals" className="mt-0">
            <VitalsTab vitalSigns={vitalSigns} />
          </TabsContent>
          
          <TabsContent value="treatments" className="mt-0">
            <TreatmentsTab medications={medications} />
          </TabsContent>
          
          <TabsContent value="transfer" className="mt-0">
            <TransferTab />
          </TabsContent>
        </CardContent>
        
        <CardFooter className="border-t px-6 py-3">
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1">
              <ClipboardList className="h-4 w-4 mr-2" />
              Éditer la fiche
            </Button>
            <Button className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Valider la prise en charge
            </Button>
          </div>
        </CardFooter>
      </Tabs>
    </Card>
  );
}
