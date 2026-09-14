import { Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { plans } from "../assets/plan";
import SectionHeading from "./SectionHeading";

function Plan() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [billing, setBilling] = useState(params.get("billing") === "yearly" ? "yearly" : "monthly");
  const selectedPlan = params.get("plan");

  const selectPlan = (planId) => {
    navigate(`/subscriptions?plan=${planId}&billing=${billing}#features`);
  };

  return (
    <section id="plans" className="page-shell py-16 sm:py-24">
      <SectionHeading
        eyebrow="Simple pricing"
        title="Choose your perfect screen time"
        description="Clear options with no hidden extras. These plans are a product demonstration—secure billing can be connected when the experience goes live."
        action={(
          <div className="inline-flex rounded-full border border-white/10 bg-black/30 p-1" aria-label="Billing period">
            {["monthly", "yearly"].map((period) => (
              <button
                key={period}
                type="button"
                aria-pressed={billing === period}
                onClick={() => setBilling(period)}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${billing === period ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
              >
                {period}
              </button>
            ))}
          </div>
        )}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
          const active = selectedPlan === plan.id;
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border p-6 sm:p-7 ${plan.popular ? "border-rose-500/40 bg-gradient-to-b from-rose-500/[0.12] to-white/[0.03]" : "border-white/[0.08] bg-white/[0.03]"} ${active ? "ring-2 ring-rose-400" : ""}`}
            >
              {plan.popular && (
                <span className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
                  <Sparkles className="h-3.5 w-3.5" /> Most popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-400">{plan.description}</p>
              <p className="mt-7 flex items-end gap-1">
                <span className="text-4xl font-semibold tracking-tight">${price.toFixed(2)}</span>
                <span className="pb-1 text-sm text-zinc-500">/{billing === "monthly" ? "month" : "year"}</span>
              </p>
              {billing === "yearly" && <p className="mt-2 text-xs font-medium text-emerald-400">Save 20% with annual billing</p>}
              <ul className="my-7 space-y-3 text-sm text-zinc-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-rose-400" /> {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => selectPlan(plan.id)}
                className={`mt-auto rounded-xl px-4 py-3 text-sm font-semibold transition ${plan.popular ? "bg-rose-600 text-white hover:bg-rose-500" : "border border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1]"}`}
              >
                {active ? "Selected for preview" : "Choose plan"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Plan;
