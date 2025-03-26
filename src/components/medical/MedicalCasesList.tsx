
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, AlertTriangle } from 'lucide-react';
import { MedicalCase } from './types';
import { MedicalCaseCard } from './MedicalCaseCard';
import { EmptyState } from './EmptyState';

interface MedicalCasesListProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredCases: MedicalCase[];
  selectedCase: MedicalCase | null;
  onSelectCase: (medicalCase: MedicalCase) => void;
}

export function MedicalCasesList({ 
  searchTerm, 
  onSearchChange, 
  filteredCases, 
  selectedCase, 
  onSelectCase 
}: MedicalCasesListProps) {
  return (
    <div className="lg:col-span-1">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un cas..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <TabsContent value="active" className="m-0">
        <div className="space-y-3">
          {filteredCases.length > 0 ? (
            filteredCases.map((medCase) => (
              <MedicalCaseCard 
                key={medCase.id}
                medicalCase={medCase}
                isSelected={selectedCase?.id === medCase.id}
                onClick={() => onSelectCase(medCase)}
              />
            ))
          ) : (
            <EmptyState type="search" />
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="closed" className="m-0">
        <EmptyState type="closed" />
      </TabsContent>
      
      <TabsContent value="transferred" className="m-0">
        <EmptyState type="transferred" />
      </TabsContent>
    </div>
  );
}
