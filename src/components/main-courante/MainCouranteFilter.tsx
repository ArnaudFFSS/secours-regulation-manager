
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, RefreshCw } from 'lucide-react';

export function MainCouranteFilter() {
  return (
    <Card className="w-full">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-sm font-medium flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2 space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium">Période</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">De</Label>
              <DatePicker />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">À</Label>
              <DatePicker />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs font-medium">Catégories</Label>
          <div className="space-y-2">
            {[
              { id: 'intervention', label: 'Interventions' },
              { id: 'communication', label: 'Communications' },
              { id: 'decision', label: 'Décisions' },
              { id: 'other', label: 'Autres' }
            ].map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={category.id} defaultChecked />
                <Label htmlFor={category.id} className="text-xs">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs font-medium">Auteurs</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tous les auteurs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les auteurs</SelectItem>
              <SelectItem value="u1">Marie Lambert</SelectItem>
              <SelectItem value="u2">Paul Martin</SelectItem>
              <SelectItem value="u3">Jean Dubois</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-xs font-medium">Tags</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              'intervention', 'radio', 'événement', 'briefing', 'logistique', 'personnel'
            ].map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox id={`tag-${tag}`} />
                <Label htmlFor={`tag-${tag}`} className="text-xs">
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Button size="sm" variant="outline" className="w-full">
          <RefreshCw className="h-3 w-3 mr-2" />
          Réinitialiser
        </Button>
      </CardContent>
    </Card>
  );
}
