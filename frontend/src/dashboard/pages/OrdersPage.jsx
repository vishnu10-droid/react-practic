import OrdersTable from "../components/OrdersTable";
import { SectionHead } from "../components/ui";

export default function OrdersPage({ orders, query }) {
  return (
    <section className="space-y-5">
      <SectionHead title="Orders" text={`${orders.length} orders ${query ? `matching “${query}”` : "in total"}`} />
      <OrdersTable orders={orders} />
    </section>
  );
}
