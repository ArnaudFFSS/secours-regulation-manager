
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  user: {
    name: string;
    role: string;
  };
  category: 'info' | 'action' | 'alert' | 'decision';
}

interface CrisisTimelineProps {
  events: TimelineEvent[];
}

export function CrisisTimeline({ events }: CrisisTimelineProps) {
  const getCategoryColor = (category: TimelineEvent['category']) => {
    switch (category) {
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'action':
        return 'bg-green-100 text-green-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      case 'decision':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: TimelineEvent['category']) => {
    switch (category) {
      case 'info':
        return 'Information';
      case 'action':
        return 'Action';
      case 'alert':
        return 'Alerte';
      case 'decision':
        return 'Décision';
      default:
        return category;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chronologie des évènements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:bg-gray-200 before:-z-10">
          {events.length > 0 ? events.map((event, index) => (
            <div key={event.id} className="relative pl-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <div className="absolute left-0 top-1 w-10 h-10 flex items-center justify-center bg-white border rounded-full text-xs text-gray-500 font-mono">
                  {format(new Date(event.timestamp), 'HH:mm', { locale: fr })}
                </div>
                <div className="bg-gray-50 p-3 rounded-lg w-full">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium">{event.title}</div>
                    <Badge className={getCategoryColor(event.category)}>
                      {getCategoryLabel(event.category)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  <div className="text-xs text-gray-500">
                    Par {event.user.name} - {event.user.role}
                  </div>
                </div>
              </div>

              {index < events.length - 1 && (
                <Separator className="my-3 opacity-0" />
              )}
            </div>
          )) : (
            <div className="text-center py-4 text-gray-500">
              Aucun événement à afficher
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
