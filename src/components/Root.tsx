import { Outlet } from 'react-router';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useEffect } from 'react';

export function Root() {
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-gray-50 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}