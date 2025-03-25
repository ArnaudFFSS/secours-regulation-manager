
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { CrisisManagement } from '@/components/crisis/CrisisManagement';

const CrisisManagementPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold">Gestion de Crise</h1>
          <p className="text-muted-foreground">Coordonnez vos ressources et gérez les situations d'urgence</p>
        </div>
        <CrisisManagement />
      </div>
    </PageTransition>
  );
};

export default CrisisManagementPage;
