
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MainCouranteEntry } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MessageSquare, AlertTriangle, Megaphone, FileText } from 'lucide-react';

interface MainCouranteTimelineProps {
  entries: MainCouranteEntry[];
}

export function MainCouranteTimeline({ entries }: MainCouranteTimelineProps) {
  const getCategoryIcon = (category: MainCouranteEntry['category']) => {
    switch (category) {
      case 'intervention':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'communication':
        return <Megaphone className="h-4 w-4 text-blue-500" />;
      case 'decision':
        return <FileText className="h-4 w-4 text-purple-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getCategoryLabel = (category: MainCouranteEntry['category']) => {
    switch (category) {
      case 'intervention':
        return 'Intervention';
      case 'communication':
        return 'Communication';
      case 'decision':
        return 'Décision';
      default:
        return 'Autre';
    }
  };
  
  const getCategoryColor = (category: MainCouranteEntry['category']) => {
    switch (category) {
      case 'intervention':
        return 'bg-red-100 text-red-800';
      case 'communication':
        return 'bg-blue-100 text-blue-800';
      case 'decision':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), 'HH:mm', { locale: fr });
  };
  
  const formatDate = (timestamp: string) => {
    return format(new Date(timestamp), 'EEEE d MMMM yyyy', { locale: fr });
  };
  
  // Regrouper par date
  const entriesByDate = entries.reduce((groups: Record<string, MainCouranteEntry[]>, entry) => {
    const date = format(new Date(entry.timestamp), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {});
  
  // Trier les dates par ordre décroissant
  const sortedDates = Object.keys(entriesByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  return (
    <div className="space-y-8">
      {entries.length > 0 ? (
        sortedDates.map((date) => (
          <div key={date} className="space-y-4">
            <div className="sticky top-0 bg-white z-10 py-2">
              <h3 className="font-medium text-sm text-muted-foreground">
                {formatDate(date)}
              </h3>
              <Separator className="mt-2" />
            </div>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-gray-100 before:-z-10">
              {entriesByDate[date].map((entry) => (
                <div key={entry.id} className="relative pl-10">
                  <div className="absolute left-0 top-1 w-10 h-10 flex items-center justify-center bg-white border rounded-full text-xs text-gray-500 font-mono">
                    {formatTimestamp(entry.timestamp)}
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium flex items-center">
                        {getCategoryIcon(entry.category)}
                        <span className="ml-2">{entry.authorName}</span>
                      </div>
                      <Badge className={getCategoryColor(entry.category)}>
                        {getCategoryLabel(entry.category)}
                      </Badge>
                    </div>
                    <p className="text-sm">{entry.message}</p>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Aucune entrée</h3>
          <p className="text-muted-foreground">Aucune entrée ne correspond aux critères sélectionnés.</p>
        </div>
      )}
    </div>
  );
}
