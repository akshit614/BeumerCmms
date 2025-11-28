import { NavLink } from 'react-router-dom';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '../ui/sheet';
import { Wrench } from 'lucide-react';
import { navigation } from './Sidebar';

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 w-64 bg-slate-900 border-slate-800">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Main navigation menu for CMMS Pro application
        </SheetDescription>
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-slate-800">
            <Wrench className="h-8 w-8 text-blue-500" />
            <span className="ml-3 text-white">CMMS Pro</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Main navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => onOpenChange(false)}
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
      </SheetContent>
    </Sheet>
  );
}
