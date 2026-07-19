import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { 
  LayoutDashboard, BarChart3, Utensils, ClipboardList, Users, 
  CreditCard, Settings, ChevronLeft, ChevronRight, LogOut, Home
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Manage Menu', path: '/admin/menu', icon: <Utensils className="w-5 h-5" /> },
    { name: 'Manage Orders', path: '/admin/orders', icon: <ClipboardList className="w-5 h-5" /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users className="w-5 h-5" /> },
    { name: 'Payments', path: '/admin/settings#payments', icon: <CreditCard className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white border-r border-gray-150 p-4 shadow-sm">
      {/* Brand Header */}
      <div>
        <div className={`flex items-center gap-3 mb-8 px-2 py-1.5 ${collapsed ? 'justify-center' : ''}`}>
          <div className="h-9 w-9 bg-gradient-to-tr from-[#FF4D6D] to-[#7B61FF] rounded-xl flex items-center justify-center shadow-md shadow-pink-100">
            <span className="text-white font-extrabold text-lg">E</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-gray-900 leading-none">
                Eatery<span className="text-[#FF4D6D]">Admin</span>
              </span>
              <span className="text-[10px] text-gray-400 font-bold mt-0.5">PORTAL</span>
            </div>
          )}
        </div>

        {/* User Mini Profile */}
        {!collapsed && (
          <div className="bg-[#FFF7F8] p-3 rounded-2xl flex items-center gap-3.5 mb-6 border border-pink-50">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-200 shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-pink-100 text-[#FF4D6D] flex items-center justify-center font-bold text-sm">
                  A
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-gray-800 truncate">{user?.name}</p>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FF4D6D] bg-[#FFE5E9] px-2 py-0.5 rounded-full inline-block mt-0.5">
                Admin
              </span>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path.includes('#') && location.pathname + location.hash === item.path);
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3.5 px-4.5 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF4D6D] to-[#E63956] text-white shadow-md shadow-pink-100'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-[#FF4D6D]'
                } ${collapsed ? 'justify-center px-0' : ''}`}
                title={collapsed ? item.name : ''}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Control Action */}
      <div className="flex flex-col gap-1.5">
        {/* Back to Client Storefront */}
        <Link
          to="/"
          className={`flex items-center gap-3.5 px-4.5 py-3 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-[#FF9F1C] transition-all ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title="Back to Shop"
        >
          <Home className="w-5 h-5" />
          {!collapsed && <span>Storefront</span>}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3.5 px-4.5 py-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all ${
            collapsed ? 'justify-center px-0' : ''
          }`}
          title="Log Out"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Log Out</span>}
        </button>

        {/* Collapsible toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center p-2 border border-gray-100 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-600 mt-4 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside 
        className={`hidden md:block h-screen sticky top-0 transition-all duration-300 z-30 select-none ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop overlay */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs md:hidden z-30 cursor-pointer"
        />
      )}

      {/* Mobile Sidebar (Floating Drawer) */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 w-64 bg-white z-40 md:hidden transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default AdminSidebar;
