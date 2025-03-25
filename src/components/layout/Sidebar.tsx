
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
  MessageSquare
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
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
      "hover:bg-emergency-50 dark:hover:bg-emergency-950/50",
      isActive ? "bg-emergency-100 text-emergency-700 dark:bg-emergency-900 dark:text-emergency-100 font-medium" : "text-gray-600 dark:text-gray-400"
    )}
    end
  >
    <div className="flex items-center justify-center w-6 h-6">
      {icon}
    </div>
    <span>{label}</span>
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
            <NavItem to="/" icon={<LayoutDashboard className="h-5 w-5" />} label="Tableau de bord" />
            <NavItem to="/map" icon={<Map className="h-5 w-5" />} label="Carte SITAC" />
            <NavItem to="/dps" icon={<Calendar className="h-5 w-5" />} label="Gestion DPS" />
            <NavItem to="/interventions" icon={<Ambulance className="h-5 w-5" />} label="Interventions" />
            <NavItem to="/victims" icon={<Users className="h-5 w-5" />} label="Victimes" />
            <NavItem to="/reports" icon={<FileText className="h-5 w-5" />} label="Rapports" />
            <NavItem to="/stats" icon={<BarChart4 className="h-5 w-5" />} label="Statistiques" />
            <NavItem to="/phone" icon={<Headphones className="h-5 w-5" />} label="Téléphonie PBX" />
            <NavItem to="/maincourante" icon={<MessageSquare className="h-5 w-5" />} label="Main Courante" />
            
            <div className="pt-4 mt-4 border-t">
              <p className="text-xs font-medium text-gray-500 px-3 mb-2">Administration</p>
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
