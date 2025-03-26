
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardContent, CardFooter } from '@/components/ui/card';
import { MainCouranteSearch } from './MainCouranteSearch';
import { MainCouranteFilter } from './MainCouranteFilter';
import { MainCouranteTimeline } from './MainCouranteTimeline';
import { MainCouranteEntry } from '@/types';

interface MainCouranteContentProps {
  isFilterOpen: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredEntries: MainCouranteEntry[];
}

export function MainCouranteContent({ 
  isFilterOpen, 
  searchTerm, 
  onSearchChange, 
  filteredEntries 
}: MainCouranteContentProps) {
  return (
    <>
      <Tabs defaultValue="timeline" className="w-full">
        <div className="px-6 pb-2">
          <TabsList className="w-full">
            <TabsTrigger value="timeline" className="flex-1">Chronologie</TabsTrigger>
            <TabsTrigger value="interventions" className="flex-1">Interventions</TabsTrigger>
            <TabsTrigger value="decisions" className="flex-1">Décisions</TabsTrigger>
            <TabsTrigger value="communications" className="flex-1">Communications</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="px-6 py-2">
          <div className="flex items-start gap-4">
            <div className={`transition-all duration-300 ease-in-out ${isFilterOpen ? 'w-1/4' : 'w-0 opacity-0 hidden'}`}>
              {isFilterOpen && <MainCouranteFilter />}
            </div>
            
            <div className={`transition-all duration-300 ease-in-out ${isFilterOpen ? 'w-3/4' : 'w-full'}`}>
              <MainCouranteSearch 
                searchTerm={searchTerm} 
                onSearchChange={onSearchChange} 
              />
              
              <TabsContent value="timeline" className="m-0">
                <MainCouranteTimeline entries={filteredEntries} />
              </TabsContent>
              
              <TabsContent value="interventions" className="m-0">
                <MainCouranteTimeline 
                  entries={filteredEntries.filter(e => e.category === 'intervention')} 
                />
              </TabsContent>
              
              <TabsContent value="decisions" className="m-0">
                <MainCouranteTimeline 
                  entries={filteredEntries.filter(e => e.category === 'decision')} 
                />
              </TabsContent>
              
              <TabsContent value="communications" className="m-0">
                <MainCouranteTimeline 
                  entries={filteredEntries.filter(e => e.category === 'communication')} 
                />
              </TabsContent>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-6 py-4 border-t">
          <div className="w-full text-center text-muted-foreground text-sm">
            {filteredEntries.length} entrées • Dernière mise à jour: {new Date().toLocaleTimeString()}
          </div>
        </CardFooter>
      </Tabs>
    </>
  );
}
