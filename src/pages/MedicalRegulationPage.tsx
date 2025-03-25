
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { MedicalRegulation } from '@/components/medical/MedicalRegulation';

const MedicalRegulationPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold">Régulation Médicale</h1>
          <p className="text-muted-foreground">Supervision et orientation des prises en charge</p>
        </div>
        <MedicalRegulation />
      </div>
    </PageTransition>
  );
};

export default MedicalRegulationPage;
