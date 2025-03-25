
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Map, 
  Ambulance, 
  Users, 
  FileText, 
  BarChart4, 
  Settings, 
  HelpCircle, 
  ChevronLeft,
  Calendar,
  Headphones,
  MessageSquare,
  AlertTriangle,
  Stethoscope,
  BuildingHospital,
  Car,
  ClipboardList,
  UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  badge?: string | number;
}

const NavItem = ({ to, icon, label, badge }: NavItemProps) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => cn(
      "flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-all duration-200",
      "hover:bg-emergency-50 dark:hover:bg-emergency-950/50",
      isActive ? "bg-emergency-100 text-emergency-700 dark:bg-emergency-900 dark:text-emergency-100 font-medium" : "text-gray-600 dark:text-gray-400"
    )}
    end
  >
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-6 h-6">
        {icon}
      </div>
      <span>{label}</span>
    </div>
    {badge && (
      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emergency-600 text-white">
        {badge}
      </span>
    )}
  </NavLink>
);

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 flex flex-col bg-white dark:bg-gray-950 shadow-lg transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:z-0 lg:shadow-none lg:border-r lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <span className="font-bold text-xl text-emergency-700">
              SI-DPS FFSS
            </span>
          </div>
          <Button 
            onClick={onClose}
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1.5">
            <NavItem to="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Tableau de bord" badge="3" />
            <NavItem to="/map" icon={<Map className="h-5 w-5" />} label="Carte SITAC" />
            <NavItem to="/dps" icon={<Calendar className="h-5 w-5" />} label="Gestion DPS" />
            <NavItem to="/interventions" icon={<Ambulance className="h-5 w-5" />} label="Interventions" badge="5" />
            <NavItem to="/telephonie" icon={<Headphones className="h-5 w-5" />} label="Téléphonie PBX" />
            <NavItem to="/main-courante" icon={<MessageSquare className="h-5 w-5" />} label="Main Courante" />
            <NavItem to="/crise" icon={<AlertTriangle className="h-5 w-5" />} label="Gestion de crise" />
            <NavItem to="/regulation" icon={<Stethoscope className="h-5 w-5" />} label="Régulation médicale" />
            
            <div className="pt-4 mt-4 border-t">
              <p className="text-xs font-medium text-gray-500 px-3 mb-2">Gestion des ressources</p>
              <NavItem to="/teams" icon={<Users className="h-5 w-5" />} label="Équipes" />
              <NavItem to="/vehicles" icon={<Car className="h-5 w-5" />} label="Véhicules" />
              <NavItem to="/medical-equipment" icon={<BuildingHospital className="h-5 w-5" />} label="Matériel médical" />
              <NavItem to="/reports" icon={<FileText className="h-5 w-5" />} label="Rapports" />
              <NavItem to="/stats" icon={<BarChart4 className="h-5 w-5" />} label="Statistiques" />
            </div>
            
            <div className="pt-4 mt-4 border-t">
              <p className="text-xs font-medium text-gray-500 px-3 mb-2">Administration</p>
              <NavItem to="/profile" icon={<UserCircle className="h-5 w-5" />} label="Mon profil" />
              <NavItem to="/tasks" icon={<ClipboardList className="h-5 w-5" />} label="Tâches" badge="2" />
              <NavItem to="/settings" icon={<Settings className="h-5 w-5" />} label="Paramètres" />
              <NavItem to="/help" icon={<HelpCircle className="h-5 w-5" />} label="Aide" />
            </div>
          </nav>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="px-3 py-2 text-xs text-gray-500">
            <p>Version 1.0.0</p>
            <p>© {new Date().getFullYear()} FFSS Strasbourg OUEST</p>
          </div>
        </div>
      </aside>
    </>
  );
}
