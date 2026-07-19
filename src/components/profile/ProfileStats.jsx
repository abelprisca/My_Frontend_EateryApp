
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { ShoppingBag, Loader, CheckCircle, Clock, DollarSign, Tag } from 'lucide-react';

export const ProfileStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    deliveredOrders: 0,
    totalSpent: 0,
    favoriteCategory: 'N/A',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;
      try {
        const userOrders = await mockApi.orders.getByUser(user.id);
        
        // Active orders: pending, preparing, ready, out_for_delivery
        const active = userOrders.filter(o => 
          ['pending', 'preparing', 'ready', 'out_for_delivery'].includes(o.status)
        ).length;
        
        const delivered = userOrders.filter(o => o.status === 'delivered').length;
        
        const spent = userOrders
          .filter(o => o.status === 'delivered')
          .reduce((sum, o) => sum + o.total, 0);

        // Find favorite category
        const categoryCounts = {};
        userOrders.forEach(order => {
          order.items.forEach(item => {
            // Find category from details if exists, or assume standard mockCategories
            const category = item.category || 'Dishes';
            categoryCounts[category] = (categoryCounts[category] || 0) + item.quantity;
          });
        });

        let favCat = 'N/A';
        let maxCount = 0;
        Object.entries(categoryCounts).forEach(([cat, count]) => {
          if (count > maxCount) {
            maxCount = count;
            favCat = cat;
          }
        });

        setStats({
          totalOrders: userOrders.length,
          activeOrders: active,
          deliveredOrders: delivered,
          totalSpent: parseFloat(spent.toFixed(2)),
          favoriteCategory: favCat,
        });
      } catch (err) {
        console.error('Error fetching user stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center h-48">
        <Loader className="w-6 h-6 animate-spin text-[#FF4D6D]" />
      </div>
    );
  }

  const statItems = [
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: <ShoppingBag className="w-5 h-5 text-[#7B61FF]" />,
      bg: 'bg-purple-50',
    },
    {
      label: 'Active Orders',
      value: stats.activeOrders,
      icon: <Clock className="w-5 h-5 text-[#FF9F1C]" />,
      bg: 'bg-orange-50',
    },
    {
      label: 'Delivered',
      value: stats.deliveredOrders,
      icon: <CheckCircle className="w-5 h-5 text-[#16A34A]" />,
      bg: 'bg-green-50',
    },
    {
      label: 'Total Spent',
      value: `$${stats.totalSpent}`,
      icon: <DollarSign className="w-5 h-5 text-[#FF4D6D]" />,
      bg: 'bg-rose-50',
    },
    {
      label: 'Fav Category',
      value: stats.favoriteCategory,
      icon: <Tag className="w-5 h-5 text-[#2563EB]" />,
      bg: 'bg-blue-50',
      cols: 'col-span-2 sm:col-span-1',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {statItems.map((item, idx) => (
        <div 
          key={idx} 
          className={`bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-all duration-300 ${item.cols || ''}`}
        >
          <div className={`p-2.5 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
            {item.icon}
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">{item.label}</p>
            <h4 className="text-base font-bold text-gray-800 truncate mt-0.5">{item.value}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;
