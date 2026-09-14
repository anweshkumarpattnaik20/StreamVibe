import { Clock3, LifeBuoy, ShieldCheck } from "lucide-react";
import ContactForm from "../components/ContactForm";
import Faq from "../components/Faq";

const supportPromises = [
  {
    icon: Clock3,
    title: "Clear next steps",
    description: "Share the details once and receive a focused, useful response.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy first",
    description: "Your message stays on this device until a secure endpoint is configured.",
  },
];

function Support() {
  return (
    <main className="text-white">
      <section className="page-shell pb-8 pt-10 sm:pb-12 sm:pt-16" aria-labelledby="support-title">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] px-5 py-10 sm:px-10 sm:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-rose-600/20 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div className="max-w-3xl">
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-rose-300">
                <LifeBuoy aria-hidden="true" className="h-5 w-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-400">StreamVibe support</p>
              <h1 id="support-title" className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">Tell us how we can help</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                Whether something interrupted movie night or you have an idea for the experience, give us the context and we will make the next step clear.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {supportPromises.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4 rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                  <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
                  <div>
                    <h2 className="text-sm font-semibold text-zinc-100">{title}</h2>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact-us" className="page-shell py-10 sm:py-16" aria-labelledby="contact-title">
        <div className="grid gap-8 lg:grid-cols-[0.62fr_1fr] lg:gap-12">
          <div className="lg:pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-400">Contact us</p>
            <h2 id="contact-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Send a support request</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Include what happened, the device you were using, and what you expected. Those details help resolve an issue faster.
            </p>
            <div className="mt-7 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-sm leading-6 text-zinc-500">
              Never include passwords, payment card numbers, or other sensitive account credentials in your message.
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <Faq />
    </main>
  );
}

export default Support;
