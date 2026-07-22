import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  DollarSign,
  Clock3,
  CheckCircle2,
  Users,
  UtensilsCrossed,
} from "lucide-react";

const StatsCards = ({
  totalOrders = 0,
  totalRevenue = 0,
  pendingOrders = 0,
  deliveredOrders = 0,
  totalCustomers = 0,
  totalMeals = 0,
  loading = false,
}) => {
  const cards = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Revenue",
      value: `₦${Number(totalRevenue).toLocaleString()}`,
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: Clock3,
      color: "from-yellow-500 to-orange-500",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle2,
      color: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      title: "Customers",
      value: totalCustomers,
      icon: Users,
      color: "from-purple-500 to-violet-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Menu Items",
      value: totalMeals,
      icon: UtensilsCrossed,
      color: "from-pink-500 to-rose-600",
      bg: "bg-pink-50 dark:bg-pink-900/20",
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
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <div
              className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${card.color}`}
            />

            <div className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                {loading ? (
                  <div className="mt-4 h-9 w-24 rounded bg-gray-200 animate-pulse" />
                ) : (
                  <h2 className="mt-4 text-3xl font-black text-gray-900 dark:text-white">
                    {card.value}
                  </h2>
                )}
              </div>

              <div
                className={`h-16 w-16 rounded-2xl flex items-center justify-center ${card.bg}`}
              >
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white`}
                >
                  <Icon size={26} />
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