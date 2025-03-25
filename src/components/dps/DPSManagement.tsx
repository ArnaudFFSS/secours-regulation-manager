
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DPSUpcoming } from './DPSUpcoming';
import { DPSActive } from './DPSActive';
import { DPSCompleted } from './DPSCompleted';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { NewDPSDialog } from './NewDPSDialog';

export function DPSManagement() {
  const [isNewDPSDialogOpen, setIsNewDPSDialogOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="active">En cours</TabsTrigger>
              <TabsTrigger value="completed">Terminés</TabsTrigger>
            </TabsList>
            <Button 
              onClick={() => setIsNewDPSDialogOpen(true)}
              className="ml-auto"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouveau DPS
            </Button>
          </div>
          
          <TabsContent value="upcoming">
            <DPSUpcoming />
          </TabsContent>
          
          <TabsContent value="active">
            <DPSActive />
          </TabsContent>
          
          <TabsContent value="completed">
            <DPSCompleted />
          </TabsContent>
        </Tabs>
      </div>
      
      <NewDPSDialog 
        open={isNewDPSDialogOpen} 
        onOpenChange={setIsNewDPSDialogOpen} 
      />
    </div>
  );
}
