import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  DollarSign,
  Clock3,
  CheckCircle2,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";

const StatsCards = ({
  totalOrders = 0,
  totalRevenue = 0,
  pendingOrders = 0,
  deliveredOrders = 0,
  avgOrderValue = 0,
  totalMeals = 0,
  loading = false,
}) => {
  const cards = [
    {
      title: "Total Revenue",
      value: `₦${Number(totalRevenue).toLocaleString()}`,
      subtitle: "Gross Revenue from Delivered Orders",
      icon: DollarSign,
      color: "from-[#FF4D6D] to-[#E63956]",
      bg: "bg-pink-50 dark:bg-pink-950/30 text-[#FF4D6D]",
      badge: "+14.2% mo",
    },
    {
      title: "Total Orders",
      value: Number(totalOrders).toLocaleString(),
      subtitle: "All orders placed",
      icon: ShoppingBag,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50 dark:bg-blue-950/30 text-blue-500",
      badge: "Active",
    },
    {
      title: "Average Ticket (AOV)",
      value: `₦${Number(avgOrderValue).toLocaleString()}`,
      subtitle: "Average revenue per delivered order",
      icon: TrendingUp,
      color: "from-purple-500 to-indigo-600",
      bg: "bg-purple-50 dark:bg-purple-950/30 text-purple-500",
      badge: "High Margin",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      subtitle: "Awaiting preparation & dispatch",
      icon: Clock3,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-50 dark:bg-amber-950/30 text-amber-500",
      badge: pendingOrders > 0 ? "Action Req." : "Clear",
    },
    {
      title: "Delivered Orders",
      value: deliveredOrders,
      subtitle: "Successfully completed",
      icon: CheckCircle2,
      color: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500",
      badge: "Fulfilling",
    },
    {
      title: "Active Menu Items",
      value: totalMeals,
      subtitle: "Available dishes on menu",
      icon: UtensilsCrossed,
      color: "from-rose-500 to-pink-600",
      bg: "bg-rose-50 dark:bg-rose-950/30 text-rose-500",
      badge: "Catalog",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.07,
            }}
            whileHover={{
              y: -6,
            }}
            className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div
              className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${card.color}`}
            />

            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {card.title}
                </span>

                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {card.badge}
                </span>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  {loading ? (
                    <div className="h-9 w-28 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  ) : (
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                      {card.value}
                    </h2>
                  )}

                  <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500 font-medium">
                    {card.subtitle}
                  </p>
                </div>

                <div
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center ${card.bg} transition-transform duration-300 group-hover:scale-110 shrink-0`}
                >
                  <div
                    className={`h-10 w-10 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white shadow-md`}
                  >
                    <Icon size={22} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;