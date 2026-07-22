import React from "react";
import {
  Search,
  Bell,
  Sun,
  Moon,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const TopNavbar = () => {
  const {
    user,
    darkMode,
    toggleDarkMode,
  } = useAuth();

  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className="
      sticky
      top-0
      z-40
      bg-white/90
      dark:bg-gray-900/90
      backdrop-blur-xl
      border-b
      border-gray-200
      dark:border-gray-800
      px-8
      py-5
      transition-colors
      duration-300
    "
    >
      <div className="flex items-center justify-between">

        {/* LEFT */}

        <div>

          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {formattedDate}
          </p>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div
            className="
            hidden
            lg:flex
            items-center
            gap-3
            rounded-2xl
            border
            border-gray-200
            dark:border-gray-700
            bg-gray-50
            dark:bg-gray-800
            px-4
            py-3
            w-80
          "
          >
            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search anything..."
              className="
                bg-transparent
                outline-none
                w-full
                text-sm
                text-gray-700
                dark:text-white
                placeholder:text-gray-400
              "
            />
          </div>

          {/* Notification */}

          <button
            className="
            relative
            h-12
            w-12
            rounded-2xl
            bg-gray-100
            dark:bg-gray-800
            hover:bg-red-500
            hover:text-white
            transition-all
          "
          >
            <Bell className="mx-auto" />

            <span
              className="
              absolute
              top-2
              right-2
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
            "
            />
          </button>

          {/* Theme Toggle */}

          <button
            onClick={toggleDarkMode}
            className="
            h-12
            w-12
            rounded-2xl
            bg-gray-100
            dark:bg-gray-800
            hover:bg-red-500
            hover:text-white
            transition-all
          "
          >
            {darkMode ? (
              <Sun className="mx-auto" />
            ) : (
              <Moon className="mx-auto" />
            )}
          </button>

          {/* Profile */}

          <div
            className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-gray-50
            dark:bg-gray-800
            px-4
            py-2
          "
          >

            {/*
              ====================================================

              TODO:
              Replace with uploaded profile picture later.

              <img
                src={user.profileImage}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />

              ====================================================
            */}

            <div
              className="
              h-12
              w-12
              rounded-full
              bg-gradient-to-r
              from-red-500
              to-red-600
              flex
              items-center
              justify-center
              text-white
              font-black
              text-lg
            "
            >
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="hidden md:block">

              <h3 className="font-bold text-gray-800 dark:text-white">
                {user?.name || "Administrator"}
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role || "ADMIN"}
              </p>

            </div>

          </div>

        </div>

      </div>
    </header>
  );
};

export default TopNavbar;
