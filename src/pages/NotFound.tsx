import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

export function NotFound() {
  usePageTitle('Page Not Found');
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Background blobs — subtle in light, vivid in dark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center"
      >
        <h1 className="text-9xl font-bold mb-4">
          <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">404</span>
        </h1>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white dark:bg-white/5 border border-gray-300 dark:border-cyan-500/30 text-gray-700 dark:text-white rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Contact Support</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}