import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AdminSidebar from '../components/layout/AdminSidebar';
import { Menu, User, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminLayout = () => {
  const { user, isAuthenticated, isAdmin, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show access denied toast only if authenticated but not admin
    if (isAuthenticated && !isAdmin && !loading) {
      toast.error('Access denied. Administrator privileges required.');
    }
  }, [isAuthenticated, isAdmin, loading]);

  // Loader state check
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4D6D]"></div>
      </div>
    );
  }

  // Auth Redirects
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Format path name for header e.g. /admin/analytics -> Analytics
  const getPageTitle = () => {
    const parts = location.pathname.split('/');
    if (parts.length <= 2) return 'Admin Dashboard';
    const sub = parts[2];
    return sub.charAt(0).toUpperCase() + sub.slice(1).replace(/-/g, ' ');
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      {/* Sidebar Wrapper */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Panel Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Bar */}
        <header className="bg-white border-b border-gray-150 h-16 shrink-0 flex items-center justify-between px-6 shadow-xs relative z-20">
          <div className="flex items-center gap-3">
            {/* Hamburger toggle in mobile */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 border rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base font-black text-gray-800">{getPageTitle()}</h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1 text-[10px] font-black uppercase text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              Terminal Synced
            </span>

            {/* Profile Avatar link */}
            <Link to="/profile" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-pink-100 shrink-0">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-pink-50 text-[#FF4D6D] flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                )}
              </div>
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Content outlet */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
