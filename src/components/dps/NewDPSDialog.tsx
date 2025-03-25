
import React, { useState } from 'react';
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
import { CalendarIcon, ChevronRight, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

interface NewDPSDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const dpsSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  type: z.string(),
  description: z.string().optional(),
  startDate: z.date(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format d'heure invalide (HH:MM)"),
  endDate: z.date(),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format d'heure invalide (HH:MM)"),
  address: z.string(),
  city: z.string(),
  postalCode: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
  organisateur: z.string(),
  contactPerson: z.string(),
  email: z.string().email("Format d'email invalide").optional(),
  phone: z.string().regex(/^0[1-9]\d{8}$/, "Format de téléphone invalide (10 chiffres)"),
  riskLevel: z.enum(["low", "medium", "high"]),
  attendees: z.number().min(1, "Le nombre de participants doit être d'au moins 1"),
  riskDetails: z.string().optional(),
});

export function NewDPSDialog({ open, onOpenChange }: NewDPSDialogProps) {
  const form = useForm<z.infer<typeof dpsSchema>>({
    resolver: zodResolver(dpsSchema),
    defaultValues: {
      name: "",
      type: "sport",
      description: "",
      startTime: "08:00",
      endTime: "18:00",
      address: "",
      city: "",
      postalCode: "",
      organisateur: "",
      contactPerson: "",
      email: "",
      phone: "",
      riskLevel: "medium",
      attendees: 100,
      riskDetails: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof dpsSchema>) => {
    // Pour simuler la création, nous allons simplement afficher un toast
    toast.success("DPS créé avec succès", {
      description: "Le DPS a été créé et ajouté à la liste des DPS planifiés.",
    });
    
    console.log("Nouveau DPS:", values);
    form.reset();
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="text-emergency-700 dark:text-emergency-300">Créer un nouveau DPS</DialogTitle>
          <DialogDescription>
            Remplissez les informations nécessaires pour créer un nouveau dispositif prévisionnel de secours.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="basic">Informations</TabsTrigger>
                <TabsTrigger value="location">Lieu</TabsTrigger>
                <TabsTrigger value="organizer">Organisateur</TabsTrigger>
                <TabsTrigger value="resources">Ressources</TabsTrigger>
                <TabsTrigger value="risk">Risques</TabsTrigger>
              </TabsList>
              
              {/* Tab 1: Informations de base */}
              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'événement</FormLabel>
                      <FormControl>
                        <Input placeholder="Saisir le nom de l'événement" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d'événement</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type d'événement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sport">Sportif</SelectItem>
                          <SelectItem value="cultural">Culturel</SelectItem>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Privé</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez l'événement en détail"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de début</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full flex justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: fr })
                                ) : (
                                  <span>Sélectionner une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              locale={fr}
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure de début</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de fin</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full flex justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: fr })
                                ) : (
                                  <span>Sélectionner une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              locale={fr}
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure de fin</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              {/* Tab 2: Informations de localisation */}
              <TabsContent value="location" className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Input placeholder="Saisir l'adresse" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input placeholder="Saisir la ville" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code postal</FormLabel>
                        <FormControl>
                          <Input placeholder="Saisir le code postal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              {/* Tab 3: Informations de l'organisateur */}
              <TabsContent value="organizer" className="space-y-4">
                <FormField
                  control={form.control}
                  name="organisateur"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'organisateur</FormLabel>
                      <FormControl>
                        <Input placeholder="Saisir le nom de l'organisateur" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personne de contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Saisir le nom de la personne de contact" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Saisir l'email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="Saisir le numéro de téléphone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              {/* Tab 4: Ressources */}
              <TabsContent value="resources" className="space-y-4">
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Moyens humains</h3>
                    <Button type="button" size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter du personnel
                    </Button>
                  </div>
                  <div className="text-center py-6 text-muted-foreground">
                    Aucun personnel assigné. Utilisez le bouton pour ajouter du personnel.
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Matériel médical</h3>
                    <Button type="button" size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter du matériel
                    </Button>
                  </div>
                  <div className="text-center py-6 text-muted-foreground">
                    Aucun matériel assigné. Utilisez le bouton pour ajouter du matériel.
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-1">
                      <Button type="button" variant="outline" className="w-full text-xs py-1 px-2">LOT A</Button>
                    </div>
                    <div className="col-span-1">
                      <Button type="button" variant="outline" className="w-full text-xs py-1 px-2">LOT B</Button>
                    </div>
                    <div className="col-span-1">
                      <Button type="button" variant="outline" className="w-full text-xs py-1 px-2">LOT C</Button>
                    </div>
                    <div className="col-span-1">
                      <Button type="button" variant="outline" className="w-full text-xs py-1 px-2">PSA</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Véhicules</h3>
                    <Button type="button" size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un véhicule
                    </Button>
                  </div>
                  <div className="text-center py-6 text-muted-foreground">
                    Aucun véhicule assigné. Utilisez le bouton pour ajouter un véhicule.
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <Button type="button" variant="outline" className="w-full text-xs py-1 px-2">VPSP</Button>
                    </div>
                    <div className="col-span-1">
                      <Button type="button" variant="outline" className="w-full text-xs py-1 px-2">VL</Button>
                    </div>
                    <div className="col-span-1">
                      <Button type="button" variant="outline" className="w-full text-xs py-1 px-2">PSE</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Tab 5: Évaluation des risques */}
              <TabsContent value="risk" className="space-y-4">
                <FormField
                  control={form.control}
                  name="riskLevel"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Niveau de risque</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="attendees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de participants estimé</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Saisir le nombre de participants" 
                          {...field}
                          onChange={e => field.onChange(e.target.valueAsNumber)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="riskDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Détails des risques identifiés</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez les risques spécifiques identifiés pour cet événement"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="sm:mr-2">
                Annuler
              </Button>
              <Button type="submit" className="bg-emergency-600 hover:bg-emergency-700">Créer le DPS</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
