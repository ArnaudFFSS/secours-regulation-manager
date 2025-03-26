
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MainCouranteEntry } from '@/types';
import { MainCouranteHeader } from './MainCouranteHeader';
import { MainCouranteContent } from './MainCouranteContent';
import { MainCouranteEntryForm } from './MainCouranteEntryForm';
import { mockEntries } from './mainCouranteData';

export function MainCourante() {
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Use our mock data
  const entries: MainCouranteEntry[] = mockEntries;
  
  const filteredEntries = searchTerm 
    ? entries.filter(entry => 
        entry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : entries;
  
  return (
    <div className="space-y-6">
      <Card>
        <MainCouranteHeader 
          onNewEntry={() => setIsEntryFormOpen(true)}
          onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
          isFilterOpen={isFilterOpen}
        />
        
        <MainCouranteContent 
          isFilterOpen={isFilterOpen}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filteredEntries={filteredEntries}
        />
      </Card>
      
      {isEntryFormOpen && (
        <MainCouranteEntryForm
          onClose={() => setIsEntryFormOpen(false)}
          onSubmit={(data) => {
            console.log('Nouvelle entrée:', data);
            setIsEntryFormOpen(false);
          }}
        />
      )}
    </div>
  );
}
