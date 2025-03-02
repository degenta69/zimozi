import { useEffect, useState } from "react";
import { getAllOrders } from "@/client-api-service/order.service";
import { EnrichOrder } from "@/models/Order";
import OrderList from "@/components/order/OrderList";
import Header from "@/components/ui/Header";
import { useAuth } from "@/context/AuthContext";
import { useProtectHook } from "@/utils/useProtectHook";

export default function OrdersPage() {
  const [orders, setOrders] = useState<EnrichOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  useProtectHook(user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(
          data.sort(
            (a: EnrichOrder, b: EnrichOrder) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header title="Admin - Order List" />
      <main className="container mx-auto py-8 px-4 relative">
        {loading && <p>Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p className="text-gray-500">No orders found.</p>
        )}
        <OrderList orders={orders} />
      </main>
    </div>
  );
}
