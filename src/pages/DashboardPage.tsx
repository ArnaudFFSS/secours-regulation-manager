
import React from 'react';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { PageTransition } from '@/components/layout/PageTransition';

const DashboardPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue dans l'application SI-DPS FFSS Strasbourg OUEST</p>
        </div>
        <Dashboard />
      </div>
    </PageTransition>
  );
};

export default DashboardPage;
