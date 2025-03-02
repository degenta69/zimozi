import { useLoading } from "@/context/LodingContext";
import { getMyOrders } from "@/client-api-service/order.service";
import { EnrichOrder } from "@/models/Order";
import OrderList from "@/components/order/OrderList";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const { loading, setLoading } = useLoading();
  const [orders, setOrders] = useState<EnrichOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getMyOrders();
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
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {!user && (
        <p className="text-gray-500">
          Please{" "}
          <a className="text-blue-500" href="/login">
            login
          </a>{" "}
          to view your orders.
        </p>
      )}
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && orders.length === 0 && user && (
        <p className="text-gray-500">No orders found.</p>
      )}
      <OrderList orders={orders} />
    </div>
  );
}
