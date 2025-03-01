import { EnrichOrder } from "@/models/Order";
import OrderCard from "./OrderCard";

type OrderListProps = { orders: EnrichOrder[] };
const OrderList = ({ orders }: OrderListProps) => {
  return (
    <ul className="space-y-6">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </ul>
  );
};

export default OrderList;
