import { OrderStatus } from "@/models/Order";

export function commonExample(): void {
  console.log("common example output");
}

export function getStatusColor(status: string) {
  switch (status) {
    case OrderStatus.PENDING:
      return "bg-yellow-500";
    case OrderStatus.SHIPPED:
      return "bg-blue-500";
    case OrderStatus.DELIVERED:
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}
