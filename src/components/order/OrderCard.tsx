import { EnrichOrder } from "@/models/Order";
import { getStatusColor } from "@/utils/utils";

type OrderCardProps = { order: EnrichOrder };
const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <li className="border p-6 rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold text-lg">Order ID: {order.id}</span>
          {order.user && (
            <p className="text-sm text-gray-600">
              Ordered by: <strong>{order.user.name || "Unknown User"}</strong> ({order.user.email})
            </p>
          )}
        </div>
        <span className={`px-3 py-1 rounded text-white text-sm ${getStatusColor(order.status)}`}>
          {order.status.toUpperCase()}
        </span>
      </div>
      <p className="text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleString()}</p>
      <p className="text-lg font-bold mt-2">Total: ${order.totalAmount.toFixed(2)}</p>

      <div className="mt-4">
        <h3 className="text-md font-semibold">Products:</h3>
        <ul className="mt-2 space-y-3">
          {order.items.map((item, index) => (
            <li key={index} className="flex items-center gap-4 p-2 border rounded-md shadow-sm">
              <img
                src={item.product?.image || "/placeholder.png"}
                alt={item.product?.title || "Product"}
                className="w-16 h-16 object-contain rounded"
              />
              <div>
                <p className="font-medium">{item.product?.title || "Unknown Product"}</p>
                <p className="text-sm text-gray-500">Category: {item.product?.category || "N/A"}</p>
                <p className="text-sm">
                  Price: <span className="font-semibold">${item.product?.price.toFixed(2)}</span> x{" "}
                  {item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default OrderCard;
