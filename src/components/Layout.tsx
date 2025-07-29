import { useState } from 'react';
import { Sidebar, SidebarToggle } from '@/components/Sidebar';
import { useApp } from '@/contexts/AppContext';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden p-4 border-b border-white/10">
          <SidebarToggle onClick={() => setSidebarOpen(true)} />
        </header>
        
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}