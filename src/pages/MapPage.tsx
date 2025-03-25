
import React from 'react';
import { EmergencyMap } from '@/components/map/EmergencyMap';
import { PageTransition } from '@/components/layout/PageTransition';

const MapPage = () => {
  return (
    <PageTransition>
      <div className="h-[calc(100vh-4rem)]">
        <EmergencyMap />
      </div>
    </PageTransition>
  );
};

export default MapPage;
