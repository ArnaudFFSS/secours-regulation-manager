
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { DPSManagement } from '@/components/dps/DPSManagement';

const DPSPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold">Gestion des DPS</h1>
          <p className="text-muted-foreground">Créez, gérez et suivez les dispositifs prévisionnels de secours</p>
        </div>
        <DPSManagement />
      </div>
    </PageTransition>
  );
};

export default DPSPage;
