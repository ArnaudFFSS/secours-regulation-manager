
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { DPSManagement } from '@/components/dps/DPSManagement';

const DPSPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-2">Gestion des DPS</h1>
        <p className="text-muted-foreground mb-6">Créez, gérez et suivez les dispositifs prévisionnels de secours</p>
        <DPSManagement />
      </div>
    </PageTransition>
  );
};

export default DPSPage;
