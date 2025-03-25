
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { AlertTriangle } from 'lucide-react';

type CrisisFormData = {
  title: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
};

interface CrisisFormProps {
  onClose: () => void;
  onSubmit: (data: CrisisFormData) => void;
}

export function CrisisForm({ onClose, onSubmit }: CrisisFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CrisisFormData>({
    defaultValues: {
      title: '',
      location: '',
      severity: 'medium',
      description: ''
    }
  });
  
  const handleFormSubmit = (data: CrisisFormData) => {
    onSubmit(data);
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Déclarer une situation de crise
          </DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour déclarer une nouvelle situation de crise.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre de la crise</Label>
            <Input 
              id="title" 
              placeholder="Entrez un titre descriptif" 
              {...register('title', { required: 'Ce champ est requis' })}
            />
            {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Localisation</Label>
            <Input 
              id="location" 
              placeholder="Adresse ou point de repère" 
              {...register('location', { required: 'Ce champ est requis' })}
            />
            {errors.location && <p className="text-destructive text-sm">{errors.location.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="severity">Niveau de gravité</Label>
            <Select defaultValue="medium" onValueChange={(value) => register('severity').onChange({ target: { value } })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionnez le niveau de gravité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Faible - Situation maîtrisée</SelectItem>
                <SelectItem value="medium">Moyen - Mobilisation importante</SelectItem>
                <SelectItem value="high">Élevé - Mobilisation générale</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description de la situation</Label>
            <Textarea 
              id="description" 
              placeholder="Décrivez la situation en détail"
              rows={5}
              {...register('description', { required: 'Ce champ est requis' })}
            />
            {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" variant="destructive">
              Déclarer la crise
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
