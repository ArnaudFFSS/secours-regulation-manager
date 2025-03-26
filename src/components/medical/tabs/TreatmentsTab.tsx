
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Syringe } from 'lucide-react';

interface Medication {
  name: string;
  dosage: string;
  time: string;
}

interface TreatmentsTabProps {
  medications: Medication[];
}

export function TreatmentsTab({ medications }: TreatmentsTabProps) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Traitements administrés</h4>
        {medications.length > 0 ? (
          <div className="border rounded-md divide-y">
            {medications.map((med, index) => (
              <div key={index} className="p-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">{med.name}</div>
                  <div className="text-sm text-muted-foreground">{med.dosage}</div>
                </div>
                <Badge variant="outline">{med.time}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border rounded-md">
            <Syringe className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Aucun traitement administré</p>
          </div>
        )}
      </div>
      
      <Button className="w-full">
        <Syringe className="h-4 w-4 mr-2" />
        Ajouter un traitement
      </Button>
    </div>
  );
}
