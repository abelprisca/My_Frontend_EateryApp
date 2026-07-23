//orders
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import API from "../../services/api";
import OrdersTable from "../../components/admin/orders/OrdersTable";
import OrderDetailsModal from "../../components/admin/orders/OrderDetailsModal";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/orders/admin/all");

      setOrders(data.data.orders || []);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleView = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.patch(`/orders/admin/${id}/status`, {
        status,
      });

      toast.success("Order status updated");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, status }
            : order
        )
      );

      if (
        selectedOrder &&
        selectedOrder._id === id
      ) {
        setSelectedOrder({
          ...selectedOrder,
          status,
        });
      }
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to update order"
      );
    }
  };

  return (
    <div className="space-y-8">

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5"
      >
        <div>

          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Manage Orders
          </h1>

          <p className="text-gray-500 mt-2">
            View, monitor and update customer orders.
          </p>

        </div>

        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </motion.div>

      <OrdersTable
        orders={orders}
        loading={loading}
        onView={handleView}
        onStatusChange={handleStatusChange}
      />

      <OrderDetailsModal
        open={detailsOpen}
        order={selectedOrder}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedOrder(null);
        }}
      />

    </div>
  );
};

export default ManageOrders;