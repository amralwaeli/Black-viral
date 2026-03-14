import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { FloatingChatWidget } from './FloatingChatWidget';
import { ScrollToTop } from './ScrollToTop';
import { Toaster } from 'sonner';
import { AuthProvider } from '../contexts/AuthContext';

export function Root() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-gray-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950">
        <ScrollToTop />
        <Navigation />
        <Outlet />
        <Footer />
        <FloatingChatWidget />
        <Toaster 
          position="top-right" 
          richColors 
          theme="system"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white dark:border-cyan-500/20',
          }}
        />
      </div>
    </AuthProvider>
  );
}