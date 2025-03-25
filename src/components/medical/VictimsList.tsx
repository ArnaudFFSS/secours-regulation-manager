
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Victim } from '@/types';

interface VictimsListProps {
  victims: Victim[];
  onSelectVictim: (victim: Victim) => void;
}

export function VictimsList({ victims, onSelectVictim }: VictimsListProps) {
  const getConditionColor = (condition: Victim['condition']) => {
    switch (condition) {
      case 'stable':
        return 'bg-green-100 text-green-800';
      case 'unstable':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'deceased':
        return 'bg-gray-800 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getConditionLabel = (condition: Victim['condition']) => {
    switch (condition) {
      case 'stable':
        return 'Stable';
      case 'unstable':
        return 'Instable';
      case 'critical':
        return 'Critique';
      case 'deceased':
        return 'Décédé';
      case 'unknown':
        return 'Inconnu';
      default:
        return condition;
    }
  };
  
  const getTriageColor = (triage?: Victim['triageCategory']) => {
    switch (triage) {
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      case 'black':
        return 'bg-gray-800 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTriageLabel = (triage?: Victim['triageCategory']) => {
    switch (triage) {
      case 'green':
        return 'UA';
      case 'yellow':
        return 'UR';
      case 'red':
        return 'EU';
      case 'black':
        return 'DCD';
      default:
        return 'N/A';
    }
  };
  
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Âge</TableHead>
            <TableHead>Triage</TableHead>
            <TableHead>État</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {victims.length > 0 ? (
            victims.map((victim) => (
              <TableRow key={victim.id}>
                <TableCell>
                  <div className="font-medium">
                    {victim.firstName && victim.lastName 
                      ? `${victim.firstName} ${victim.lastName}`
                      : 'Patient inconnu'}
                  </div>
                </TableCell>
                <TableCell>{victim.age || 'N/A'}</TableCell>
                <TableCell>
                  <Badge className={getTriageColor(victim.triageCategory)}>
                    {getTriageLabel(victim.triageCategory)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getConditionColor(victim.condition)}>
                    {getConditionLabel(victim.condition)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onSelectVictim(victim)}
                  >
                    Voir
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                <p className="text-muted-foreground">Aucune victime enregistrée</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
