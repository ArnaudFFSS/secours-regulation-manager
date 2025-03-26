
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link2, X } from 'lucide-react';
import { Intervention, DPS, CallRecord } from '@/types';

interface LinkedItemBadgeProps {
  linkType: 'intervention' | 'dps' | 'call' | null;
  itemId: string | null;
  onRemove: () => void;
  interventions: Pick<Intervention, 'id' | 'title'>[];
  dpsList: Pick<DPS, 'id' | 'name'>[];
  calls: Pick<CallRecord, 'id' | 'callId'>[];
}

export function LinkedItemBadge({ 
  linkType, 
  itemId, 
  onRemove,
  interventions,
  dpsList,
  calls
}: LinkedItemBadgeProps) {
  if (!itemId || !linkType) return null;

  return (
    <div className="mt-2">
      <div className="text-xs text-muted-foreground mb-1">Élément lié :</div>
      <Badge variant="outline" className="flex items-center gap-1">
        <Link2 className="h-3 w-3" />
        {linkType === 'intervention' && 
          interventions.find(i => i.id === itemId)?.title}
        {linkType === 'dps' && 
          dpsList.find(d => d.id === itemId)?.name}
        {linkType === 'call' && 
          `Appel ${calls.find(c => c.id === itemId)?.callId}`}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-4 w-4 ml-1"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      </Badge>
    </div>
  );
}
