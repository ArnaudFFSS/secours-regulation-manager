
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { MainCourante } from '@/components/main-courante/MainCourante';

const MainCourantePage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-2">Main Courante</h1>
        <p className="text-muted-foreground mb-6">Journal chronologique des événements et décisions</p>
        <MainCourante />
      </div>
    </PageTransition>
  );
};

export default MainCourantePage;
