import SalesChart from "../components/SalesChart";
import RevenueChart from "../components/RevenueChart";
import PieAnalytics from "../components/PieAnalytics";
import { SectionHead } from "../components/ui";

export default function ReportsPage({ monthly, categoryShare, hasCatalog }) {
  return (
    <section className="space-y-5">
      <SectionHead title="Reports" text="Sales & revenue analytics" />
      <SalesChart data={monthly} />
      <div className="grid gap-5 xl:grid-cols-2">
        <RevenueChart data={monthly} />
        <PieAnalytics data={hasCatalog ? categoryShare : []} />
      </div>
    </section>
  );
}
