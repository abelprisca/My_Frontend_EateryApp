//orders
import { X, MapPin, Phone, Mail, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";

const OrderDetailsModal = ({ open, order, onClose }) => {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b">

          <div>

            <h2 className="text-2xl font-bold">
              Order Details
            </h2>

            <p className="text-gray-500">
              #{order._id}
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center"
          >
            <X size={22} />
          </button>

        </div>

        {/* Customer */}

        <div className="grid lg:grid-cols-2 gap-6 p-6">

          <div className="border rounded-2xl p-5">

            <h3 className="font-bold text-lg mb-4">
              Customer Information
            </h3>

            <div className="space-y-3">

              <p>
                <strong>Name:</strong>{" "}
                {order.user?.fullName || order.user?.name}
              </p>

              <p className="flex items-center gap-2">
                <Mail size={16} />
                {order.user?.email}
              </p>

              <p className="flex items-center gap-2">
                <Phone size={16} />
                {order.user?.phone || "N/A"}
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} />
                {order.deliveryAddress}
              </p>

              <p className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(order.createdAt).toLocaleString()}
              </p>

            </div>

          </div>

          <div className="border rounded-2xl p-5">

            <h3 className="font-bold text-lg mb-4">
              Order Summary
            </h3>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span>Status</span>

                <StatusBadge status={order.status} />

              </div>

              <div className="flex justify-between">

                <span>Total Items</span>

                <strong>{order.items.length}</strong>

              </div>

              <div className="flex justify-between">

                <span>Total Amount</span>

                <strong className="text-green-600 text-xl">
                  ₦{order.totalAmount.toLocaleString()}
                </strong>

              </div>

            </div>

          </div>

        </div>

        {/* Ordered Meals */}

        <div className="px-6 pb-6">

          <h3 className="text-xl font-bold mb-5">
            Ordered Meals
          </h3>

          <div className="space-y-4">

            {order.items.map((item) => (

              <div
                key={item._id}
                className="border rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center"
              >

                <img
                  src={
                    item.menuItem?.image
                      ? `http://localhost:5000${item.menuItem.image}`
                      : "/placeholder-food.png"
                  }
                  alt={item.menuItem?.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />

                <div className="flex-1">

                  <h4 className="font-bold text-lg">
                    {item.menuItem?.name}
                  </h4>

                  <p className="text-gray-500">
                    {item.menuItem?.category}
                  </p>

                </div>

                <div className="text-center">

                  <p className="text-gray-500">
                    Qty
                  </p>

                  <strong>{item.quantity}</strong>

                </div>

                <div className="text-center">

                  <p className="text-gray-500">
                    Price
                  </p>

                  <strong>
                    ₦{item.price.toLocaleString()}
                  </strong>

                </div>

                <div className="text-center">

                  <p className="text-gray-500">
                    Total
                  </p>

                  <strong className="text-green-600">
                    ₦{(item.quantity * item.price).toLocaleString()}
                  </strong>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderDetailsModal;