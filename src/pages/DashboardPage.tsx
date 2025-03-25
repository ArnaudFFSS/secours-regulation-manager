
import React from 'react';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { PageTransition } from '@/components/layout/PageTransition';

const DashboardPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
        <p className="text-muted-foreground mb-6">Bienvenue dans l'application SI-DPS FFSS Strasbourg OUEST</p>
        <Dashboard />
      </div>
    </PageTransition>
  );
};

export default DashboardPage;
