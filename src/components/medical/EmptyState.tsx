
import React from 'react';
import { AlertTriangle, Stethoscope, UserCog, Heart } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'closed' | 'transferred' | 'noSelection';
}

export function EmptyState({ type }: EmptyStateProps) {
  let icon;
  let text;

  switch (type) {
    case 'search':
      icon = <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />;
      text = "Aucun cas correspondant trouvé";
      break;
    case 'closed':
      icon = <Stethoscope className="h-8 w-8 text-muted-foreground mx-auto mb-2" />;
      text = "Les cas terminés apparaîtront ici";
      break;
    case 'transferred':
      icon = <UserCog className="h-8 w-8 text-muted-foreground mx-auto mb-2" />;
      text = "Les cas transférés apparaîtront ici";
      break;
    case 'noSelection':
      icon = <Heart className="h-16 w-16 text-muted-foreground mb-4" />;
      text = "Aucun cas sélectionné";
      break;
  }

  if (type === 'noSelection') {
    return (
      <div className="border rounded-lg flex flex-col items-center justify-center py-20">
        {icon}
        <h3 className="text-lg font-medium">Aucun cas sélectionné</h3>
        <p className="text-muted-foreground max-w-md text-center mt-2">
          Sélectionnez un cas médical dans la liste à gauche pour voir les détails et prendre des actions.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12 border rounded-lg">
      {icon}
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}
