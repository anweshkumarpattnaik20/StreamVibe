import { Check, Minus } from "lucide-react";
import SectionHeading from "./SectionHeading";

const features = [
  { name: "Picture quality", essential: "Full HD", standard: "4K", premiere: "4K HDR" },
  { name: "Simultaneous screens", essential: "1", standard: "2", premiere: "4" },
  { name: "Private watchlist", essential: true, standard: true, premiere: true },
  { name: "Spatial audio", essential: false, standard: false, premiere: true },
  { name: "Priority support", essential: false, standard: false, premiere: true },
];

// eslint-disable-next-line react/prop-types
function FeatureValue({ value }) {
  if (typeof value === "boolean") {
    return value ? <Check className="h-4 w-4 text-emerald-400" aria-label="Included" /> : <Minus className="h-4 w-4 text-zinc-600" aria-label="Not included" />;
  }
  return value;
}

function PlanFeatures() {
  return (
    <section id="features" className="page-shell pb-20 sm:pb-28">
      <SectionHeading eyebrow="Compare plans" title="The details, side by side" description="A concise comparison designed to make the decision easy." />
      <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left text-sm">
            <thead className="bg-black/25 text-zinc-200">
              <tr>
                <th className="px-6 py-5 font-medium">Feature</th>
                <th className="px-6 py-5 font-medium">Essential</th>
                <th className="px-6 py-5 font-medium text-rose-300">Standard</th>
                <th className="px-6 py-5 font-medium">Premiere</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-zinc-400">
              {features.map((feature) => (
                <tr key={feature.name}>
                  <th className="px-6 py-5 font-medium text-zinc-200">{feature.name}</th>
                  <td className="px-6 py-5"><FeatureValue value={feature.essential} /></td>
                  <td className="bg-rose-500/[0.025] px-6 py-5"><FeatureValue value={feature.standard} /></td>
                  <td className="px-6 py-5"><FeatureValue value={feature.premiere} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default PlanFeatures;
