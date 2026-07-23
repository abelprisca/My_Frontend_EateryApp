//orders
import {
  Clock3,
  ChefHat,
  Bike,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const statusConfig = {
  PENDING: {
    label: "Pending",
    icon: Clock3,
    className: "bg-amber-100 text-amber-700 border border-amber-200",
  },
  PREPARING: {
    label: "Preparing",
    icon: ChefHat,
    className: "bg-blue-100 text-blue-700 border border-blue-200",
  },
  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    icon: Bike,
    className: "bg-purple-100 text-purple-700 border border-purple-200",
  },
  DELIVERED: {
    label: "Delivered",
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 border border-green-200",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-100 text-red-700 border border-red-200",
  },
};

const OrderStatusBadge = ({ status }) => {
  const config = statusConfig[status] || {
    label: status || "Unknown",
    icon: Clock3,
    className: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${config.className}`}
    >
      <Icon size={16} />
      {config.label}
    </span>
  );
};

export default OrderStatusBadge;