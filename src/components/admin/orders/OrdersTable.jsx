//orders
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

const ITEMS_PER_PAGE = 8;

const statusOptions = [
  "ALL",
  "PENDING",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const OrdersTable = ({
  orders = [],
  loading = false,
  onView,
  onStatusChange,
}) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customer =
        order.user?.fullName ||
        order.user?.name ||
        "";

      const matchesSearch =
        customer.toLowerCase().includes(search.toLowerCase()) ||
        order._id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "ALL" || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  );

  const currentOrders = filteredOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-16 bg-gray-200 rounded-xl mb-3 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow overflow-hidden"
    >
      {/* Header */}

      <div className="p-5 border-b flex flex-col lg:flex-row gap-4 justify-between">

        <div className="relative w-full lg:w-80">

          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={18}
          />

          <input
            placeholder="Search customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />

        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="border rounded-xl px-4 py-3"
        >
          {statusOptions.map((item) => (
            <option key={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Desktop Table */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left px-6 py-4">Customer</th>

              <th className="text-left px-6 py-4">Order ID</th>

              <th className="text-left px-6 py-4">Items</th>

              <th className="text-left px-6 py-4">Amount</th>

              <th className="text-left px-6 py-4">Status</th>

              <th className="text-left px-6 py-4">Update</th>

              <th className="text-center px-6 py-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {currentOrders.map((order) => (

              <tr
                key={order._id}
                className="border-b hover:bg-red-50"
              >

                <td className="px-6 py-4 font-semibold">
                  {order.user?.fullName || order.user?.name}
                </td>

                <td className="px-6 py-4">
                  #{order._id.slice(-6)}
                </td>

                <td className="px-6 py-4">
                  {order.items.length}
                </td>

                <td className="px-6 py-4 font-bold text-green-600">
                  ₦{order.totalAmount.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>

                <td className="px-6 py-4">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      onStatusChange(order._id, e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
                  >
                    {statusOptions
                      .filter((s) => s !== "ALL")
                      .map((s) => (
                        <option key={s}>
                          {s}
                        </option>
                      ))}
                  </select>

                </td>

                <td className="px-6 py-4">

                  <button
                    onClick={() => onView(order)}
                    className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-xl flex items-center justify-center mx-auto"
                  >
                    <Eye size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}

      <div className="lg:hidden p-4 space-y-4">

        {currentOrders.map((order) => (

          <div
            key={order._id}
            className="border rounded-2xl p-4 shadow-sm"
          >

            <div className="flex justify-between items-center">

              <h3 className="font-bold">
                {order.user?.fullName || order.user?.name}
              </h3>

              <StatusBadge status={order.status} />

            </div>

            <p className="text-gray-500 mt-2">
              Order #{order._id.slice(-6)}
            </p>

            <p className="mt-2">
              Items: {order.items.length}
            </p>

            <p className="font-bold text-green-600">
              ₦{order.totalAmount.toLocaleString()}
            </p>

            <select
              value={order.status}
              onChange={(e) =>
                onStatusChange(order._id, e.target.value)
              }
              className="w-full mt-4 border rounded-xl p-3"
            >
              {statusOptions
                .filter((s) => s !== "ALL")
                .map((s) => (
                  <option key={s}>
                    {s}
                  </option>
                ))}
            </select>

            <button
              onClick={() => onView(order)}
              className="w-full mt-3 bg-red-500 text-white py-3 rounded-xl"
            >
              View Details
            </button>

          </div>

        ))}

      </div>

      {/* Pagination */}

      <div className="flex justify-between items-center p-5 border-t">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="flex items-center gap-2 border px-4 py-2 rounded-xl disabled:opacity-40"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <span className="font-semibold">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="flex items-center gap-2 border px-4 py-2 rounded-xl disabled:opacity-40"
        >
          Next
          <ChevronRight size={18} />
        </button>

      </div>

    </motion.div>
  );
};

export default OrdersTable;