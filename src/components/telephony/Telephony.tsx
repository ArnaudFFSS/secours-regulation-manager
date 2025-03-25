
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PhoneCall, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, User, Plus, Phone, Save, Play, Stop, Pause } from 'lucide-react';
import { CallList } from './CallList';
import { NewCallDialog } from './NewCallDialog';
import { CallRecord } from '@/types';

export function Telephony() {
  const [isNewCallDialogOpen, setIsNewCallDialogOpen] = useState(false);
  const [activeCall, setActiveCall] = useState<CallRecord | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [callTimer, setCallTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Simuler un appel actif
  const startCall = (call: CallRecord) => {
    setActiveCall(call);
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    setCallTimer(timer);
  };

  const endCall = () => {
    if (callTimer) {
      clearInterval(callTimer);
    }
    setActiveCall(null);
    setCallDuration(0);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="calls" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="calls">Appels</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>
            <Button 
              onClick={() => setIsNewCallDialogOpen(true)}
              className="ml-auto"
            >
              <PhoneOutgoing className="mr-2 h-4 w-4" />
              Nouvel Appel
            </Button>
          </div>
          
          {activeCall && (
            <Card className="mb-6 border-2 border-green-500 animate-pulse">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center">
                    <PhoneIncoming className="h-5 w-5 mr-2 text-green-500" />
                    Appel en cours
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    {formatDuration(callDuration)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Numéro</div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-lg font-semibold">{activeCall.callerNumber}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Contact</div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-lg">{activeCall.callerName || 'Inconnu'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-muted-foreground">Durée</div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-lg">{formatDuration(callDuration)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="space-x-2">
                <Button variant="outline" size="icon" onClick={() => {}}>
                  <Pause className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => {}}>
                  <Save className="h-4 w-4 mr-2" />
                  Créer intervention
                </Button>
                <Button variant="destructive" onClick={endCall}>
                  <Stop className="h-4 w-4 mr-2" />
                  Terminer
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <TabsContent value="calls">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-2">
                <CallList onCallClick={(call) => startCall(call)} />
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Numérotation rapide</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Entrez un numéro..." />
                      <Button variant="outline" size="icon">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((digit) => (
                        <Button key={digit} variant="outline" className="aspect-square text-lg">
                          {digit}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Numéros favoris</div>
                      <div className="space-y-2">
                        {[
                          { name: 'Secours Strasbourg', number: '0388XXXXXX' },
                          { name: 'SAMU 67', number: '0367XXXXXX' },
                          { name: 'Pompiers Ouest', number: '0388XXXXXX' }
                        ].map((contact) => (
                          <Button 
                            key={contact.number} 
                            variant="outline" 
                            className="w-full justify-start text-left"
                            onClick={() => {}}
                          >
                            <div>
                              <div className="font-medium">{contact.name}</div>
                              <div className="text-xs text-muted-foreground">{contact.number}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique des appels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <PhoneCall className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Historique des appels</h3>
                  <p className="text-muted-foreground">Un historique complet de tous les appels.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de téléphonie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">Configuration du PBX</h3>
                  <p className="text-muted-foreground">Gérez les paramètres d'intégration avec le PBX Grandstream.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <NewCallDialog 
        open={isNewCallDialogOpen} 
        onOpenChange={setIsNewCallDialogOpen}
        onCallInitiated={(call) => {
          setIsNewCallDialogOpen(false);
          startCall(call);
        }}
      />
    </div>
  );
}
