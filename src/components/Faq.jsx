import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { Link } from "react-router-dom";
import { faq } from "../assets/faq";
import SectionHeading from "./SectionHeading";

function Faq() {
  return (
    <section id="faq" className="page-shell py-16 sm:py-24">
      <SectionHeading
        eyebrow="Questions, answered"
        title="Everything you need to know"
        description="Straightforward details about the catalog, privacy, saved titles, and what this product demo is ready to connect next."
        action={(
          <Link
            to="/support"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            <MessageCircleQuestion className="h-4 w-4" />
            Contact support
          </Link>
        )}
      />
      <div className="grid gap-3 lg:grid-cols-2">
        {faq.map((item, index) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 open:bg-white/[0.045]"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 text-left font-medium text-zinc-100">
              <span className="text-xs font-semibold tabular-nums text-zinc-600">{String(index + 1).padStart(2, "0")}</span>
              <span className="flex-1">{item.question}</span>
              <ChevronDown className="h-4 w-4 text-zinc-500 transition-transform group-open:rotate-180" />
            </summary>
            <p className="ml-9 mt-4 pr-8 text-sm leading-6 text-zinc-400">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default Faq;
