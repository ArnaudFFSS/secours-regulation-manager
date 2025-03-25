
import React from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Telephony } from '@/components/telephony/Telephony';

const TelephonyPage = () => {
  return (
    <PageTransition>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-2">Téléphonie</h1>
        <p className="text-muted-foreground mb-6">Gestion des appels et création d'interventions</p>
        <Telephony />
      </div>
    </PageTransition>
  );
};

export default TelephonyPage;
