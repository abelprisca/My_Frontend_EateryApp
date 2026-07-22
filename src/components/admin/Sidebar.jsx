import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Users,
  Star,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { logout, user } = useAuth();

  const menuItems = [
    {
      title: "Business Overview",
      icon: LayoutDashboard,
      path: "/admin/analytics",
    },
    {
      title: "Manage Orders",
      icon: ShoppingBag,
      path: "/admin/orders",
    },
    {
      title: "Manage Menu",
      icon: UtensilsCrossed,
      path: "/admin/menu",
    },
    {
      title: "Customers",
      icon: Users,
      path: "/admin/customers",
    },
    {
      title: "Reviews",
      icon: Star,
      path: "/admin/reviews",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  return (
    <motion.aside
      animate={{
        width: collapsed ? 90 : 280,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="
        fixed
        left-0
        top-0
        z-50
        h-screen
        bg-white
        dark:bg-gray-900
        border-r
        border-gray-200
        dark:border-gray-800
        shadow-xl
        transition-colors
        duration-300
        flex
        flex-col
      "
    >
      {/* ================= LOGO ================= */}

      <div className="relative border-b border-gray-200 dark:border-gray-800 px-6 py-6">

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="
            absolute
            -right-4
            top-7
            rounded-full
            border
            border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-gray-800
            p-2
            shadow-lg
            hover:bg-red-500
            hover:text-white
            transition-all
          "
        >
          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </button>

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
            E
          </div>

          {!collapsed && (
            <div>

              <h2 className="font-black text-lg text-gray-800 dark:text-white">
                Eatery Admin
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Restaurant Management
              </p>

            </div>
          )}

        </div>

      </div>

      {/* ================= MENU ================= */}

      <div className="flex-1 overflow-y-auto px-3 py-6">

        {!collapsed && (

          <p className="mb-4 px-3 text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400">
            Main Menu
          </p>

        )}

        <div className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-4
                  py-3
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-800 hover:text-red-600"
                  }
                `
                }
              >

                <Icon
                  size={22}
                  className="flex-shrink-0"
                />

                {!collapsed && (
                  <span className="font-semibold text-sm">
                    {item.title}
                  </span>
                )}

              </NavLink>

            );

          })}

        </div>

      </div>

      {/* ================= PROFILE ================= */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">

        <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 transition-colors duration-300">

          <div className="flex items-center gap-3">

            {/*
              =========================================================

              TODO:
              Replace this placeholder avatar with the
              admin's uploaded profile picture after you
              implement profile image upload.

              Example:

              <img
                src={user?.profileImage}
                alt={user?.name}
                className="h-12 w-12 rounded-full object-cover"
              />

              =========================================================
            */}

            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-lg font-bold shadow-lg">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            {!collapsed && (
              <div className="overflow-hidden">

                <h4 className="font-bold text-gray-800 dark:text-white truncate">
                  {user?.name || "Administrator"}
                </h4>

                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || "admin@eatery.com"}
                </p>

              </div>
            )}

          </div>

          <button
            onClick={logout}
            className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 text-white py-3 font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <LogOut size={18} />

            {!collapsed && "Logout"}
          </button>

        </div>

      </div>

    </motion.aside>
  );
};

export default Sidebar;