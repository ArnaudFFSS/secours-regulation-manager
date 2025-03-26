
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface MainCouranteSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function MainCouranteSearch({ searchTerm, onSearchChange }: MainCouranteSearchProps) {
  return (
    <div className="mb-4 relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Rechercher dans la main courante..."
        className="pl-8"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
