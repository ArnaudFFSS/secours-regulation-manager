
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Download, Filter, PlusCircle } from 'lucide-react';

interface MainCouranteHeaderProps {
  onNewEntry: () => void;
  onToggleFilter: () => void;
  isFilterOpen: boolean;
}

export function MainCouranteHeader({ onNewEntry, onToggleFilter, isFilterOpen }: MainCouranteHeaderProps) {
  return (
    <CardHeader className="px-6 py-4 flex flex-row items-center justify-between">
      <CardTitle className="flex items-center">
        <Clock className="mr-2 h-5 w-5" />
        Main Courante
      </CardTitle>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onToggleFilter}>
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
        <Button size="sm" onClick={onNewEntry}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nouvelle entrée
        </Button>
      </div>
    </CardHeader>
  );
}
