import { BadgeCheck, CreditCard, Sparkles } from "lucide-react";
import Plan from "../components/Plan";
import PlanFeatures from "../components/PlanFeatures";

function Subscriptions() {
  return (
    <main className="min-h-screen text-white">
      <section className="page-shell pb-2 pt-10 sm:pt-16" aria-labelledby="subscriptions-title">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-rose-600/[0.16] via-white/[0.045] to-white/[0.02] px-5 py-11 text-center sm:px-10 sm:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-56 w-96 -translate-x-1/2 rounded-full bg-rose-500/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-rose-300/20 bg-rose-500/10 text-rose-300">
              <Sparkles aria-hidden="true" className="h-5 w-5" />
            </span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-rose-400">Stream without limits</p>
            <h1 id="subscriptions-title" className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">The right plan for every screen</h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              Pick the quality and number of screens that fit your household. Upgrade or change your selection whenever your viewing habits change.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-medium text-zinc-400 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck aria-hidden="true" className="h-4 w-4 text-emerald-400" /> Transparent pricing
              </span>
              <span className="inline-flex items-center gap-2">
                <CreditCard aria-hidden="true" className="h-4 w-4 text-emerald-400" /> Secure billing ready
              </span>
            </div>
          </div>
        </div>
      </section>

      <Plan />
      <PlanFeatures />
    </main>
  );
}

export default Subscriptions;
