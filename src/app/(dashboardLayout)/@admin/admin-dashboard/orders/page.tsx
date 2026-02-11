import { getAllOrders } from "@/services/order.service";
import SellerOrdersTable from "@/components/modules/order/OrdersTable";

export default async function SellerOrdersPage() {
  const res = await getAllOrders();

  const orders = res?.data || [];
  console.log(orders);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>

      <SellerOrdersTable orders={orders} />
    </div>
  );
}
