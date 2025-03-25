
import React from 'react';
import { InterventionsList } from '@/components/interventions/InterventionsList';
import { PageTransition } from '@/components/layout/PageTransition';

const InterventionsPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <InterventionsList />
      </div>
    </PageTransition>
  );
};

export default InterventionsPage;
