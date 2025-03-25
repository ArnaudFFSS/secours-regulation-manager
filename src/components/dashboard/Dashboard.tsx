
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivitySquare, Ambulance, Users, AlertTriangle } from 'lucide-react';
import { DashboardStats } from '@/types';
import { cn } from '@/lib/utils';

// Mock data for demonstration
const mockStats: DashboardStats = {
  activeInterventions: 12,
  availableResources: 8,
  completedToday: 24,
  criticalCases: 3
};

interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
  className?: string;
  valueClassName?: string;
  iconClassName?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  className,
  valueClassName,
  iconClassName
}: StatsCardProps) => {
  return (
    <Card className={cn("overflow-hidden hover-scale transition-all", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("p-2 rounded-full", iconClassName || "bg-emergency-100")}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="mt-2">
            <span className={cn(
              "text-xs font-medium inline-flex items-center gap-1",
              trend.positive ? "text-alert-low" : "text-alert-high"
            )}>
              {trend.positive ? '↑' : '↓'} {trend.value} {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const RecentActivityCard = () => {
  const activities = [
    { 
      id: 1, 
      message: "Ambulance A3 dispatched to intervention #2845", 
      time: "Il y a 5 minutes",
      type: "dispatch" 
    },
    { 
      id: 2, 
      message: "New victim added to intervention #2843", 
      time: "Il y a 12 minutes",
      type: "update" 
    },
    { 
      id: 3, 
      message: "Intervention #2842 marked as completed", 
      time: "Il y a 35 minutes",
      type: "complete" 
    },
    { 
      id: 4, 
      message: "Ambulance A1 marked as out of service", 
      time: "Il y a 1 heure",
      type: "status" 
    }
  ];
  
  return (
    <Card className="col-span-2 md:col-span-1 hover-scale transition-all h-[400px]">
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
        <CardDescription>Les dernières actions enregistrées</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="mt-1">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  activity.type === "dispatch" ? "bg-emergency-500" :
                  activity.type === "update" ? "bg-amber-500" :
                  activity.type === "complete" ? "bg-alert-low" :
                  "bg-gray-400"
                )} />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ResourceStatusCard = () => {
  const resources = [
    { id: 1, name: "Ambulance A1", status: "available" },
    { id: 2, name: "Ambulance A2", status: "busy" },
    { id: 3, name: "Médecin M1", status: "emergency" },
    { id: 4, name: "Équipe E1", status: "available" },
    { id: 5, name: "Ambulance A3", status: "busy" }
  ];
  
  return (
    <Card className="hover-scale transition-all h-[400px]">
      <CardHeader>
        <CardTitle>État des ressources</CardTitle>
        <CardDescription>Disponibilité des équipes et véhicules</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map(resource => (
            <div key={resource.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-sm font-medium">{resource.name}</span>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "status-indicator",
                  resource.status === "available" && "status-available",
                  resource.status === "busy" && "status-busy",
                  resource.status === "emergency" && "status-emergency"
                )} />
                <span className="text-xs capitalize">
                  {resource.status === "available" ? "Disponible" :
                   resource.status === "busy" ? "Occupé" :
                   resource.status === "emergency" ? "Urgence" : resource.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const AlertsCard = () => {
  const alerts = [
    { 
      id: 1, 
      title: "Intervention #2847 - Demande de renforts", 
      description: "L'équipe sur place demande des renforts médicaux urgents",
      priority: "high" 
    },
    { 
      id: 2, 
      title: "Niveau de stock critiques - Kits premiers secours", 
      description: "Stock en-dessous du seuil minimal",
      priority: "medium" 
    },
    { 
      id: 3, 
      title: "Maintenance programmée - Ambulance A2", 
      description: "Dans 2 jours",
      priority: "low" 
    }
  ];
  
  return (
    <Card className="hover-scale transition-all h-[400px]">
      <CardHeader>
        <CardTitle>Alertes</CardTitle>
        <CardDescription>Événements nécessitant une attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map(alert => (
            <div 
              key={alert.id} 
              className={cn(
                "p-3 rounded-lg transition-colors",
                alert.priority === "high" ? "bg-alert-high/10 hover:bg-alert-high/15" :
                alert.priority === "medium" ? "bg-alert-medium/10 hover:bg-alert-medium/15" :
                "bg-alert-low/10 hover:bg-alert-low/15"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  alert.priority === "high" ? "bg-alert-high" :
                  alert.priority === "medium" ? "bg-alert-medium" :
                  "bg-alert-low"
                )} />
                <h4 className={cn(
                  "text-sm font-semibold",
                  alert.priority === "high" ? "text-alert-high" :
                  alert.priority === "medium" ? "text-alert-medium" :
                  "text-alert-low"
                )}>
                  {alert.title}
                </h4>
              </div>
              <p className="text-xs text-muted-foreground">{alert.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export function Dashboard() {
  const stats = mockStats;
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Interventions actives"
          value={stats.activeInterventions}
          description="En cours actuellement"
          icon={<ActivitySquare className="h-6 w-6 text-emergency-500" />}
          trend={{ value: 12, label: "depuis hier", positive: true }}
        />
        <StatsCard 
          title="Ressources disponibles"
          value={stats.availableResources}
          description="Véhicules et équipes"
          icon={<Ambulance className="h-6 w-6 text-emergency-500" />}
          trend={{ value: 3, label: "équipes hors service", positive: false }}
        />
        <StatsCard 
          title="Interventions terminées"
          value={stats.completedToday}
          description="Aujourd'hui"
          icon={<Users className="h-6 w-6 text-emergency-500" />}
          trend={{ value: 8, label: "de plus qu'hier", positive: true }}
        />
        <StatsCard 
          title="Cas critiques"
          value={stats.criticalCases}
          description="Nécessitant une attention immédiate"
          icon={<AlertTriangle className="h-6 w-6 text-alert-high" />}
          className="border-alert-high/20 bg-alert-high/5"
          valueClassName="text-alert-high"
          iconClassName="bg-alert-high/10 text-alert-high"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <RecentActivityCard />
        <ResourceStatusCard />
        <AlertsCard />
      </div>
    </div>
  );
}
