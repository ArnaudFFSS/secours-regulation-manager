
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { MedicalRegulation } from '@/components/medical/MedicalRegulation';

const MedicalRegulationPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-2">Régulation Médicale</h1>
        <p className="text-muted-foreground mb-6">Supervision et orientation des prises en charge</p>
        <MedicalRegulation />
      </div>
    </PageTransition>
  );
};

export default MedicalRegulationPage;
