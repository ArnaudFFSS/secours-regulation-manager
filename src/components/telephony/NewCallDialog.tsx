
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CallRecord } from '@/types';
import { Phone } from 'lucide-react';

interface NewCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCallInitiated: (call: CallRecord) => void;
}

export function NewCallDialog({ 
  open, 
  onOpenChange,
  onCallInitiated
}: NewCallDialogProps) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!number) return;
    
    const newCall: CallRecord = {
      id: `call-${Date.now()}`,
      callId: `${Date.now()}`,
      timestamp: new Date().toISOString(),
      duration: 0,
      direction: 'outgoing',
      callerNumber: '0388123456', // Numéro de l'expéditeur (fixe pour la démo)
      callerName: 'FFSS - Poste 1',
      receiverNumber: number,
      receiverName: name || undefined,
      status: 'answered'
    };
    
    onCallInitiated(newCall);
    setNumber('');
    setName('');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Nouvel appel</DialogTitle>
          <DialogDescription>
            Saisissez le numéro à appeler
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="number">Numéro de téléphone</Label>
            <Input 
              id="number" 
              placeholder="0612345678" 
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Nom (optionnel)</Label>
            <Input 
              id="name" 
              placeholder="Nom du contact" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit">
              <Phone className="h-4 w-4 mr-2" />
              Appeler
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
