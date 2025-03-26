
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FilePlus } from 'lucide-react';
import { MedicalCaseDetails } from './MedicalCaseDetails';
import { MedicalCasesList } from './MedicalCasesList';
import { EmptyState } from './EmptyState';
import { MedicalCase } from './types';
import { medicalCasesData } from './mockData';

export function MedicalRegulation() {
  const [selectedCase, setSelectedCase] = useState<MedicalCase | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCases = medicalCasesData.filter(c => 
    (c.patientName && c.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    c.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="active" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="active">Cas actifs</TabsTrigger>
              <TabsTrigger value="closed">Cas terminés</TabsTrigger>
              <TabsTrigger value="transferred">Transferts</TabsTrigger>
            </TabsList>
            <Button className="ml-auto">
              <FilePlus className="mr-2 h-4 w-4" />
              Nouveau Cas
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MedicalCasesList 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filteredCases={filteredCases}
              selectedCase={selectedCase}
              onSelectCase={setSelectedCase}
            />
            
            <div className="lg:col-span-2">
              {selectedCase ? (
                <MedicalCaseDetails 
                  medicalCase={selectedCase} 
                  onClose={() => setSelectedCase(null)}
                />
              ) : (
                <EmptyState type="noSelection" />
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
