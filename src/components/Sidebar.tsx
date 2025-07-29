import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Play, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { ThemeToggle } from '@/components/ThemeToggle';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Decks', href: '/decks', icon: BookOpen },
    { name: 'Quiz Mode', href: '/quiz', icon: Play },
    { name: 'AI Generator', href: '/ai-generator', icon: Sparkles },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const NavContent = () => (
    <nav className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">Mind Vault</span>
        </div>
      </div>

      <div className="flex-1 px-6 py-6">
        <div className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <Button 
            onClick={() => navigate('/add-card')}
            className="btn-gradient w-full justify-start gap-3"
          >
            <Plus className="w-5 h-5" />
            Add Flashcard
          </Button>
        </div>
      </div>

      <div className="p-6 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <Button 
          onClick={handleLogout}
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col">
        <div className="glass-card h-full border-r border-white/20">
          <NavContent />
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="glass-card h-full border-r border-white/20">
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <NavContent />
        </div>
      </aside>
    </>
  );
}

export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="lg:hidden glass-card hover-glow"
    >
      <Menu className="w-5 h-5" />
    </Button>
  );
}