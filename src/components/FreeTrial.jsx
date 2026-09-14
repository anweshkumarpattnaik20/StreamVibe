import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const trialBenefits = ["No long-term commitment", "Watch on every screen"];

function FreeTrialSection() {
  return (
    <section
      aria-labelledby="free-trial-heading"
      className="bg-[#141414] px-4 py-14 sm:px-6 sm:py-20 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#260909] via-[#151012] to-[#0d0d0f] px-6 py-10 shadow-[0_28px_80px_rgba(0,0,0,0.34)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div
          className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-red-600/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-9 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
              Your next watch starts here
            </p>
            <h2
              id="free-trial-heading"
              className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl"
            >
              Unlimited stories. One simple plan.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
              Start your free trial and turn any night into movie night. Pick the plan that fits your screen time.
            </p>

            <ul className="mt-6 flex flex-col gap-3 text-sm text-zinc-300 sm:flex-row sm:gap-6">
              {trialBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/15 text-red-400">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/subscriptions"
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(220,38,38,0.3)] transition-all hover:-translate-y-0.5 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#260909] lg:self-auto"
          >
            Start your free trial
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FreeTrialSection;
