
import React from 'react';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { PageTransition } from '@/components/layout/PageTransition';

const DashboardPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
        <Dashboard />
      </div>
    </PageTransition>
  );
};

export default DashboardPage;
