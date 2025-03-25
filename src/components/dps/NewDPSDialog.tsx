
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface NewDPSDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewDPSDialog({ open, onOpenChange }: NewDPSDialogProps) {
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouveau DPS</DialogTitle>
          <DialogDescription>
            Remplissez les informations nécessaires pour créer un nouveau dispositif prévisionnel de secours.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basic">Informations</TabsTrigger>
            <TabsTrigger value="location">Lieu</TabsTrigger>
            <TabsTrigger value="organizer">Organisateur</TabsTrigger>
            <TabsTrigger value="risk">Risques</TabsTrigger>
          </TabsList>
          
          {/* Tab 1: Informations de base */}
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'événement</Label>
                <Input id="name" placeholder="Saisir le nom de l'événement" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type d'événement</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type d'événement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sport">Sportif</SelectItem>
                    <SelectItem value="cultural">Culturel</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Privé</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez l'événement en détail"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Date de début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full flex justify-between"
                      >
                        {startDate ? (
                          format(startDate, 'PPP', { locale: fr })
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-date">Date de fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full flex justify-between"
                      >
                        {endDate ? (
                          format(endDate, 'PPP', { locale: fr })
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab 2: Informations de localisation */}
          <TabsContent value="location" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" placeholder="Saisir l'adresse" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" placeholder="Saisir la ville" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Code postal</Label>
                  <Input id="postal-code" placeholder="Saisir le code postal" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input id="latitude" placeholder="Latitude (optionnel)" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input id="longitude" placeholder="Longitude (optionnel)" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab 3: Informations de l'organisateur */}
          <TabsContent value="organizer" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="organizer-name">Nom de l'organisateur</Label>
                <Input id="organizer-name" placeholder="Saisir le nom de l'organisateur" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-person">Personne de contact</Label>
                <Input id="contact-person" placeholder="Saisir le nom de la personne de contact" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Saisir l'email" type="email" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="Saisir le numéro de téléphone" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Tab 4: Évaluation des risques */}
          <TabsContent value="risk" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="risk-assessment">Niveau de risque</Label>
                <RadioGroup defaultValue="medium">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="risk-low" />
                    <Label htmlFor="risk-low" className="text-green-600">Faible</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="risk-medium" />
                    <Label htmlFor="risk-medium" className="text-yellow-600">Moyen</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="risk-high" />
                    <Label htmlFor="risk-high" className="text-red-600">Élevé</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="attendees">Nombre de participants estimé</Label>
                <Input id="attendees" type="number" placeholder="Saisir le nombre de participants" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="risk-details">Détails des risques identifiés</Label>
                <Textarea
                  id="risk-details"
                  placeholder="Décrivez les risques spécifiques identifiés pour cet événement"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="sm:mr-2">
            Annuler
          </Button>
          <Button type="submit">Créer le DPS</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
