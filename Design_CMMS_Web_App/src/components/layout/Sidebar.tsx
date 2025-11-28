import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ClipboardList, 
  Calendar, 
  BarChart3, 
  BookOpen, 
  Settings,
  Wrench
} from 'lucide-react';

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Assets', href: '/assets', icon: Package },
  { name: 'Work Orders', href: '/work-orders', icon: ClipboardList },
  { name: 'Preventive Maintenance', href: '/preventive-maintenance', icon: Calendar },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'SOP Library', href: '/sop-library', icon: BookOpen },
  // { name: 'Admin Settings', href: '/admin', icon: Settings },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-slate-900 border-r border-slate-800">
        <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-slate-800">
          <Wrench className="h-8 w-8 text-blue-500" />
          <span className="ml-3 text-white">CMMS </span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
