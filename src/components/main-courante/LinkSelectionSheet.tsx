
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Intervention, DPS, CallRecord } from '@/types';

interface LinkSelectionSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  linkType: 'intervention' | 'dps' | 'call' | null;
  onSelect: (id: string) => void;
}

export function LinkSelectionSheet({ isOpen, onOpenChange, linkType, onSelect }: LinkSelectionSheetProps) {
  // Sample data - would typically come from props or API in a real application
  const interventions: Pick<Intervention, 'id' | 'title' | 'status'>[] = [
    { id: 'int1', title: 'Chute de coureur KM 3', status: 'completed' },
    { id: 'int2', title: 'Déshydratation', status: 'inProgress' },
    { id: 'int3', title: 'Malaise public', status: 'pending' }
  ];
  
  const dpsList: Pick<DPS, 'id' | 'name' | 'status'>[] = [
    { id: 'dps1', name: 'Course Solidaire Strasbourg', status: 'inProgress' },
    { id: 'dps2', name: 'Festival de Musique', status: 'planned' }
  ];
  
  const calls: Pick<CallRecord, 'id' | 'callId' | 'callerNumber' | 'callerName'>[] = [
    { id: 'call1', callId: '202309150001', callerNumber: '0612345678', callerName: undefined },
    { id: 'call2', callId: '202309150002', callerNumber: '0698765432', callerName: 'Organisateur Événement' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Sélectionnez un{' '}
            {linkType === 'intervention' ? 'e intervention' : 
             linkType === 'dps' ? ' DPS' : ' appel'}
          </SheetTitle>
          <SheetDescription>
            Choisissez l'élément à lier à cette entrée
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-4">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-8"
            />
          </div>
          
          <div className="space-y-2">
            {linkType === 'intervention' && interventions.map(intervention => (
              <Button 
                key={intervention.id}
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => onSelect(intervention.id)}
              >
                <div>
                  <div className="font-medium">{intervention.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {intervention.status === 'pending' ? 'En attente' :
                     intervention.status === 'inProgress' ? 'En cours' :
                     intervention.status === 'completed' ? 'Terminée' : intervention.status}
                  </div>
                </div>
              </Button>
            ))}
            
            {linkType === 'dps' && dpsList.map(dps => (
              <Button 
                key={dps.id}
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => onSelect(dps.id)}
              >
                <div>
                  <div className="font-medium">{dps.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {dps.status === 'planned' ? 'Planifié' :
                     dps.status === 'inProgress' ? 'En cours' :
                     dps.status === 'completed' ? 'Terminé' : dps.status}
                  </div>
                </div>
              </Button>
            ))}
            
            {linkType === 'call' && calls.map(call => (
              <Button 
                key={call.id}
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => onSelect(call.id)}
              >
                <div>
                  <div className="font-medium">
                    Appel {call.callId}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {call.callerName || call.callerNumber}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
