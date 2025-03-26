
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Link2 } from 'lucide-react';
import { Intervention, DPS, CallRecord } from '@/types';
import { LinkSelectionSheet } from './LinkSelectionSheet';
import { LinkedItemBadge } from './LinkedItemBadge';

interface MainCouranteEntryFormProps {
  onClose: () => void;
  onSubmit: (data: {
    message: string;
    category: string;
    tags: string[];
    relatedItemId?: string;
    relatedItemType?: 'intervention' | 'dps' | 'call';
  }) => void;
}

export function MainCouranteEntryForm({ onClose, onSubmit }: MainCouranteEntryFormProps) {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('communication');
  const [tags, setTags] = useState('');
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkType, setLinkType] = useState<'intervention' | 'dps' | 'call' | null>(null);
  const [relatedItemId, setRelatedItemId] = useState<string | null>(null);
  
  // Sample data for demonstration
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
  
  const handleSubmit = () => {
    if (!message.trim()) return;
    
    onSubmit({
      message,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      relatedItemId: relatedItemId || undefined,
      relatedItemType: linkType || undefined
    });
  };
  
  const handleLinkSelect = (id: string) => {
    setRelatedItemId(id);
    setIsLinkDialogOpen(false);
  };
  
  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nouvelle entrée</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle entrée à la main courante
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message"
                placeholder="Saisissez le contenu de l'entrée..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <RadioGroup 
                defaultValue="communication" 
                className="flex flex-wrap gap-4"
                value={category}
                onValueChange={setCategory}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="communication" id="communication" />
                  <Label htmlFor="communication">Communication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="decision" id="decision" />
                  <Label htmlFor="decision">Décision</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intervention" id="intervention" />
                  <Label htmlFor="intervention">Intervention</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Autre</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
              <Input 
                id="tags" 
                placeholder="briefing, radio, personnel..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Lier à un élément</Label>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="flex-1"
                  onClick={() => {
                    setLinkType('intervention');
                    setIsLinkDialogOpen(true);
                  }}
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Intervention
                </Button>
                <Button 
                  variant="outline" 
                  type="button" 
                  className="flex-1"
                  onClick={() => {
                    setLinkType('dps');
                    setIsLinkDialogOpen(true);
                  }}
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  DPS
                </Button>
                <Button 
                  variant="outline" 
                  type="button" 
                  className="flex-1"
                  onClick={() => {
                    setLinkType('call');
                    setIsLinkDialogOpen(true);
                  }}
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Appel
                </Button>
              </div>
              
              <LinkedItemBadge 
                linkType={linkType} 
                itemId={relatedItemId}
                onRemove={() => {
                  setRelatedItemId(null);
                  setLinkType(null);
                }}
                interventions={interventions}
                dpsList={dpsList}
                calls={calls}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="button" onClick={handleSubmit}>
              Ajouter l'entrée
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <LinkSelectionSheet 
        isOpen={isLinkDialogOpen}
        onOpenChange={setIsLinkDialogOpen}
        linkType={linkType}
        onSelect={handleLinkSelect}
      />
    </>
  );
}
