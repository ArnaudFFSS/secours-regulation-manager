
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, FileText, Ambulance, Users } from 'lucide-react';

export function TransferTab() {
  const [selectedTransferOption, setSelectedTransferOption] = useState('');
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Transfert vers</h4>
        <Select 
          value={selectedTransferOption}
          onValueChange={setSelectedTransferOption}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hospital1">CHU de Strasbourg</SelectItem>
            <SelectItem value="hospital2">Clinique de l'Orangerie</SelectItem>
            <SelectItem value="hospital3">Hôpital de Hautepierre</SelectItem>
            <SelectItem value="home">Retour à domicile</SelectItem>
            <SelectItem value="medicPlace">Poste médical principal</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Moyen de transport</h4>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" className="flex flex-col h-auto py-3">
            <Ambulance className="h-8 w-8 mb-1" />
            <span>Ambulance</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto py-3">
            <Users className="h-8 w-8 mb-1" />
            <span>À pied</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto py-3">
            <Ambulance className="h-8 w-8 mb-1" />
            <span>SMUR</span>
          </Button>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Instructions de transfert</h4>
        <Textarea 
          placeholder="Ajouter des instructions spécifiques pour le transfert..."
          className="min-h-[80px]"
        />
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          <Phone className="h-4 w-4 mr-2" />
          Appel régulation
        </Button>
        <Button className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          Valider le transfert
        </Button>
      </div>
    </div>
  );
}
