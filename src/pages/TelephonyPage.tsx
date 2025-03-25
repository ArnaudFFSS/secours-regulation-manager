
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Telephony } from '@/components/telephony/Telephony';

const TelephonyPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold">Téléphonie</h1>
          <p className="text-muted-foreground">Gestion des appels et création d'interventions</p>
        </div>
        <Telephony />
      </div>
    </PageTransition>
  );
};

export default TelephonyPage;
