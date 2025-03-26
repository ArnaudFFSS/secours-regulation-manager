
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Target, SendHorizontal } from 'lucide-react';
import { MedicalCase } from '../types';
import { formatTimestamp } from '../utils';

interface OverviewTabProps {
  medicalCase: MedicalCase;
}

interface MedicalNote {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

export function OverviewTab({ medicalCase }: OverviewTabProps) {
  const [newNote, setNewNote] = useState('');
  
  // Données fictives pour les notes
  const notes: MedicalNote[] = [
    { 
      id: 'note1', 
      text: 'Patient conscient, orienté. Douleur thoracique non angineuse, apparue pendant l\'effort.', 
      author: 'Dr. Lambert', 
      timestamp: '2023-09-15T15:15:00Z' 
    },
    { 
      id: 'note2', 
      text: 'ECG réalisé, pas d\'anomalie significative. À surveiller.', 
      author: 'Dr. Lambert', 
      timestamp: '2023-09-15T15:25:00Z' 
    }
  ];
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log('Ajout de note:', newNote);
      setNewNote('');
    }
  };
  
  return (
    <div className="mt-0 space-y-4">
      <div>
        <h4 className="font-medium mb-2">Symptômes signalés</h4>
        <div className="flex flex-wrap gap-2">
          {medicalCase.symptoms.map((symptom, index) => (
            <Badge key={index} variant="outline">
              {symptom}
            </Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Localisation</h4>
        <div className="flex items-center">
          <Target className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{medicalCase.location}</span>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Notes médicales</h4>
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="border rounded-md p-3 bg-muted/50">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{note.author}</span>
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(note.timestamp)}
                </span>
              </div>
              <p className="text-sm">{note.text}</p>
            </div>
          ))}
          
          <div className="flex gap-2">
            <Textarea
              placeholder="Ajouter une note médicale..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex flex-col justify-end">
              <Button size="icon" onClick={handleAddNote}>
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
