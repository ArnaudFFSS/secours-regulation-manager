
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PhoneCall, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, Calendar, Phone } from 'lucide-react';
import { CallRecord } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CallListProps {
  onCallClick: (call: CallRecord) => void;
}

export function CallList({ onCallClick }: CallListProps) {
  // Données fictives pour la démonstration
  const calls: CallRecord[] = [
    {
      id: 'call1',
      callId: '202309150001',
      timestamp: '2023-09-15T14:30:00Z',
      duration: 0,
      direction: 'incoming',
      callerNumber: '0612345678',
      callerName: undefined,
      receiverNumber: '0388123456',
      receiverName: 'FFSS - Poste 1',
      status: 'missed',
    },
    {
      id: 'call2',
      callId: '202309150002',
      timestamp: '2023-09-15T14:35:00Z',
      duration: 45,
      direction: 'outgoing',
      callerNumber: '0388123456',
      callerName: 'FFSS - Poste 1',
      receiverNumber: '0612345678',
      receiverName: undefined,
      status: 'answered',
    },
    {
      id: 'call3',
      callId: '202309150003',
      timestamp: '2023-09-15T15:10:00Z',
      duration: 0,
      direction: 'incoming',
      callerNumber: '0698765432',
      callerName: 'Organisateur Événement',
      receiverNumber: '0388123456',
      receiverName: 'FFSS - Poste 1',
      status: 'missed',
    },
    {
      id: 'call4',
      callId: '202309150004',
      timestamp: '2023-09-15T15:20:00Z',
      duration: 120,
      direction: 'incoming',
      callerNumber: '0712345678',
      callerName: undefined,
      receiverNumber: '0388123456',
      receiverName: 'FFSS - Poste 1',
      status: 'answered',
    }
  ];

  const formatTime = (timestamp: string) => {
    return format(new Date(timestamp), 'HH:mm', { locale: fr });
  };

  const formatDate = (timestamp: string) => {
    return format(new Date(timestamp), 'dd/MM/yyyy', { locale: fr });
  };

  const getCallIcon = (call: CallRecord) => {
    if (call.direction === 'incoming') {
      return call.status === 'missed' ? 
        <PhoneMissed className="h-4 w-4 text-red-500" /> : 
        <PhoneIncoming className="h-4 w-4 text-green-500" />;
    } else {
      return <PhoneOutgoing className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: CallRecord['status']) => {
    switch (status) {
      case 'answered':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      case 'voicemail':
        return 'bg-blue-100 text-blue-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: CallRecord['status']) => {
    switch (status) {
      case 'answered':
        return 'Répondu';
      case 'missed':
        return 'Manqué';
      case 'voicemail':
        return 'Messagerie';
      case 'busy':
        return 'Occupé';
      default:
        return status;
    }
  };

  return (
    <div className="border rounded-lg">
      <div className="p-4 border-b bg-muted/50">
        <h3 className="font-medium">Appels récents</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Numéro</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Date/Heure</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call) => (
            <TableRow key={call.id}>
              <TableCell>
                {getCallIcon(call)}
              </TableCell>
              <TableCell>
                <div className="font-medium">{call.direction === 'incoming' ? call.callerNumber : call.receiverNumber}</div>
              </TableCell>
              <TableCell>
                {(call.direction === 'incoming' ? call.callerName : call.receiverName) || 
                 <span className="text-muted-foreground">Inconnu</span>}
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-xs">{formatDate(call.timestamp)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-xs">{formatTime(call.timestamp)}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(call.status)}>
                  {getStatusLabel(call.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    // Créer un nouvel appel simulé
                    const newCall: CallRecord = {
                      ...call,
                      id: `new-${call.id}`,
                      timestamp: new Date().toISOString(),
                      duration: 0,
                      status: 'answered'
                    };
                    onCallClick(newCall);
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
