
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DPS, DPSLog } from '@/types';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Info, Clock, AlertTriangle, Check, FileText, UserCheck, Ambulance, MessageSquare } from 'lucide-react';

interface DPSTimelineProps {
  dps: DPS;
}

export function DPSTimeline({ dps }: DPSTimelineProps) {
  const formatDate = (dateString: string, formatStr: string = 'PPP') => {
    try {
      return format(parseISO(dateString), formatStr, { locale: fr });
    } catch (error) {
      return dateString;
    }
  };
  
  const formatTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'HH:mm', { locale: fr });
    } catch (error) {
      return '';
    }
  };
  
  const formatDay = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'EEEE d MMMM yyyy', { locale: fr });
    } catch (error) {
      return '';
    }
  };
  
  const getLogTypeIcon = (type: DPSLog['type'], message: string) => {
    if (message.includes('DPS créé')) {
      return <FileText className="h-4 w-4" />;
    }
    if (message.includes('Début du DPS')) {
      return <Play className="h-4 w-4" />;
    }
    if (message.includes('Fin du DPS')) {
      return <Stop className="h-4 w-4" />;
    }
    if (message.includes('personnel') || message.includes('Personnel')) {
      return <UserCheck className="h-4 w-4" />;
    }
    if (message.includes('Intervention')) {
      return <Ambulance className="h-4 w-4" />;
    }
    
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'action':
        return <Check className="h-4 w-4" />;
      case 'status':
        return <Clock className="h-4 w-4" />;
      case 'note':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };
  
  const getLogTypeBadge = (type: DPSLog['type']) => {
    switch (type) {
      case 'info':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Info</Badge>;
      case 'action':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Action</Badge>;
      case 'status':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Statut</Badge>;
      case 'note':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Note</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  // Group logs by date
  const logsByDate = dps.logs.reduce<Record<string, DPSLog[]>>((acc, log) => {
    const date = formatDate(log.timestamp, 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {});
  
  // Sort dates in descending order
  const sortedDates = Object.keys(logsByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  
  // Sort logs in each date group by timestamp in descending order
  sortedDates.forEach(date => {
    logsByDate[date].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  });
  
  const Play = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
  
  const Stop = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="6" y="6" width="12" height="12" />
    </svg>
  );
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chronologie du DPS</CardTitle>
      </CardHeader>
      <CardContent>
        {dps.logs.length > 0 ? (
          <div className="space-y-8">
            {sortedDates.map(date => (
              <div key={date} className="space-y-4">
                <h3 className="font-medium text-primary capitalize">
                  {formatDay(date)}
                </h3>
                
                <div className="space-y-4">
                  {logsByDate[date].map(log => (
                    <div key={log.id} className="flex gap-3">
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {getLogTypeIcon(log.type, log.message)}
                        </div>
                        {logsByDate[date].indexOf(log) !== logsByDate[date].length - 1 && (
                          <div className="w-px h-full bg-border flex-grow my-1" />
                        )}
                      </div>
                      
                      <div className="flex-grow pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{formatTime(log.timestamp)}</span>
                            {getLogTypeBadge(log.type)}
                          </div>
                        </div>
                        <p className="mt-1">{log.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucune activité</h3>
            <p className="text-sm text-muted-foreground">
              Aucune activité n'a été enregistrée pour ce DPS.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
