import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Layers,
  ArrowUpRight,
  PieChart as PieIcon,
  BarChart2,
} from "lucide-react";

import API from "../../services/api";
import StatsCards from "../../components/admin/StatsCards";
import OrdersBarChart from "../../components/admin/charts/OrdersBarChart";
import OrderStatusPieChart from "../../components/admin/charts/OrderStatusPieChart";

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    preparingOrders: 0,
    outForDeliveryOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    avgOrderValue: 0,
    totalMeals: 0,
    monthlyOrders: [],
    orderStatus: [],
    statusBreakdown: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        const [ordersResponse, menuResponse] = await Promise.all([
          API.get("/orders/admin/all"),
          API.get("/menu"),
        ]);

        const orders =
          ordersResponse.data.data?.orders ||
          ordersResponse.data.data ||
          ordersResponse.data ||
          [];

        const menuItems =
          menuResponse.data.data?.menuItems ||
          menuResponse.data.data?.menu ||
          menuResponse.data.data ||
          menuResponse.data ||
          [];

        const totalOrders = orders.length;

        // Order Status Counts
        const pendingOrders = orders.filter(
          (o) => o.status?.toLowerCase() === "pending"
        ).length;

        const preparingOrders = orders.filter(
          (o) => o.status?.toLowerCase() === "preparing" || o.status?.toLowerCase() === "processing"
        ).length;

        const outForDeliveryOrders = orders.filter(
          (o) => o.status?.toLowerCase() === "out for delivery" || o.status?.toLowerCase() === "dispatched"
        ).length;

        const deliveredOrders = orders.filter(
          (o) => o.status?.toLowerCase() === "delivered"
        ).length;

        const cancelledOrders = orders.filter(
          (o) => o.status?.toLowerCase() === "cancelled"
        ).length;

        // Revenue Calculation
        const totalRevenue = orders
          .filter((o) => o.status?.toLowerCase() === "delivered")
          .reduce(
            (sum, o) =>
              sum + Number(o.total || o.totalAmount || o.price || 0),
            0
          );

        const avgOrderValue =
          deliveredOrders > 0
            ? Math.round(totalRevenue / deliveredOrders)
            : 0;

        // Monthly breakdown
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const monthlyObject = {};
        orders.forEach((order) => {
          const date = new Date(order.createdAt || Date.now());
          const month = months[date.getMonth()];
          monthlyObject[month] = (monthlyObject[month] || 0) + 1;
        });

        const monthlyOrders = months.map((month) => ({
          name: month,
          orders: monthlyObject[month] || 0,
        }));

        // Status Pie chart breakdown
        const statusConfig = [
          { key: "Delivered", count: deliveredOrders, color: "#22c55e" },
          { key: "Pending", count: pendingOrders, color: "#f59e0b" },
          { key: "Preparing", count: preparingOrders, color: "#3b82f6" },
          { key: "Out for Delivery", count: outForDeliveryOrders, color: "#8b5cf6" },
          { key: "Cancelled", count: cancelledOrders, color: "#ef4444" },
        ];

        const orderStatus = statusConfig
          .filter((s) => s.count > 0 || totalOrders === 0)
          .map((s) => ({
            name: s.key,
            value: s.count,
          }));

        // Comprehensive comparison breakdown
        const statusBreakdown = statusConfig.map((item) => {
          const pct = totalOrders > 0 ? ((item.count / totalOrders) * 100).toFixed(1) : 0;
          return {
            ...item,
            percentage: pct,
          };
        });

        setAnalytics({
          totalOrders,
          totalRevenue,
          pendingOrders,
          preparingOrders,
          outForDeliveryOrders,
          deliveredOrders,
          cancelledOrders,
          avgOrderValue,
          totalMeals: menuItems.length,
          monthlyOrders,
          orderStatus,
          statusBreakdown,
        });
      } catch (error) {
        console.error(
          "Analytics Error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* PAGE HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b dark:border-gray-800 pb-6"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Analytics Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">
            Real-time restaurant operational insights & status performance comparison
          </p>
        </div>

        <div className="flex items-center gap-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 px-4 py-2 rounded-2xl border border-red-200 dark:border-red-900/30">
          <TrendingUp className="text-red-500" size={20} />
          <span className="text-xs font-bold text-red-600 dark:text-red-400">
            Live Database Analytics
          </span>
        </div>
      </motion.div>

      {/* KPI STATISTICS CARDS */}
      <StatsCards
        totalOrders={analytics.totalOrders}
        totalRevenue={analytics.totalRevenue}
        pendingOrders={analytics.pendingOrders}
        deliveredOrders={analytics.deliveredOrders}
        totalMeals={analytics.totalMeals}
        avgOrderValue={analytics.avgOrderValue}
        loading={loading}
      />

      {/* MEANINGFUL ORDER STATUS COMPARISON GRID */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-gray-800"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b dark:border-gray-800 pb-4">
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Layers className="text-red-500" size={22} />
              Order Status Distribution Comparison
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Detailed comparative analysis of all order stages against total orders
            </p>
          </div>

          <span className="text-xs font-black uppercase px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
            Total Orders: {analytics.totalOrders}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {[
            {
              title: "Delivered",
              count: analytics.deliveredOrders,
              color: "text-emerald-600 dark:text-emerald-400",
              bg: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800",
              barColor: "bg-emerald-500",
              icon: CheckCircle2,
            },
            {
              title: "Pending",
              count: analytics.pendingOrders,
              color: "text-amber-600 dark:text-amber-400",
              bg: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
              barColor: "bg-amber-500",
              icon: Clock,
            },
            {
              title: "Preparing",
              count: analytics.preparingOrders,
              color: "text-blue-600 dark:text-blue-400",
              bg: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
              barColor: "bg-blue-500",
              icon: Layers,
            },
            {
              title: "Out for Delivery",
              count: analytics.outForDeliveryOrders,
              color: "text-purple-600 dark:text-purple-400",
              bg: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
              barColor: "bg-purple-500",
              icon: Truck,
            },
            {
              title: "Cancelled",
              count: analytics.cancelledOrders,
              color: "text-red-600 dark:text-red-400",
              bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
              barColor: "bg-red-500",
              icon: AlertCircle,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            const percentage =
              analytics.totalOrders > 0
                ? ((item.count / analytics.totalOrders) * 100).toFixed(1)
                : 0;

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border ${item.bg} flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-extrabold uppercase text-gray-500 dark:text-gray-400">
                    {item.title}
                  </span>
                  <Icon className={item.color} size={20} />
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className={`text-2xl font-black ${item.color}`}>
                      {item.count}
                    </h3>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                      {percentage}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className={`h-full ${item.barColor} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* CHARTS AREA */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          className="xl:col-span-2"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <OrdersBarChart data={analytics.monthlyOrders} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <OrderStatusPieChart data={analytics.orderStatus} />
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;