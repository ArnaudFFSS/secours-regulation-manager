
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { MainCourante } from '@/components/main-courante/MainCourante';

const MainCourantePage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold">Main Courante</h1>
          <p className="text-muted-foreground">Journal chronologique des événements et décisions</p>
        </div>
        <MainCourante />
      </div>
    </PageTransition>
  );
};

export default MainCourantePage;
