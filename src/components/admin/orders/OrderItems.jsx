import { Package2 } from "lucide-react";

const OrderItems = ({ items = [] }) => {
  if (!items.length) {
    return (
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <Package2 size={16} />
        <span>No items</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={item._id || item.menuItem?._id || index}
          className="flex justify-between items-center gap-4"
        >
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-800 dark:text-white truncate">
              {item.menuItem?.name || "Menu Item"}
            </p>

            <p className="text-xs text-gray-500">
              Qty: {item.quantity}
            </p>
          </div>

          <div className="text-sm font-semibold text-green-600 whitespace-nowrap">
            ₦{(item.price * item.quantity).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItems;