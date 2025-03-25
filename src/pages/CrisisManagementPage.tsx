
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { CrisisManagement } from '@/components/crisis/CrisisManagement';

const CrisisManagementPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-2">Gestion de Crise</h1>
        <p className="text-muted-foreground mb-6">Coordonnez vos ressources et gérez les situations d'urgence</p>
        <CrisisManagement />
      </div>
    </PageTransition>
  );
};

export default CrisisManagementPage;
