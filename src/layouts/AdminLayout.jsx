import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import TopNavbar from "../components/admin/TopNavbar";

const AdminLayout = () => {
  // Controls sidebar collapse/expand
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-950 transition-colors duration-300">

      {/* ================= Sidebar ================= */}

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* ================= Main Content ================= */}

      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          collapsed ? "ml-[90px]" : "ml-[280px]"
        }`}
      >
        {/* Top Navbar will be added here in the next step */}
          <TopNavbar />


        <div className="min-h-screen p-6 md:p-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;