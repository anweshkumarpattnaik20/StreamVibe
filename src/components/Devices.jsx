import { Download, Gamepad2, Laptop, MonitorPlay, Smartphone, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

const experiences = [
  { icon: Smartphone, title: "Pocket-ready", text: "Touch-friendly controls and clear typography tuned for small screens." },
  { icon: Laptop, title: "Made for focus", text: "A fast desktop layout that puts discovery ahead of visual clutter." },
  { icon: MonitorPlay, title: "Big-screen polish", text: "Cinematic artwork and responsive spacing that scale beautifully." },
  { icon: Gamepad2, title: "Keyboard friendly", text: "Logical focus order and visible states make navigation effortless." },
  { icon: Download, title: "Save for later", text: "Keep a private watchlist on your device without creating an account." },
  { icon: Sparkles, title: "Always useful", text: "A curated preview catalog keeps the experience alive without API keys." },
];

function Devices() {
  return (
    <section id="devices" className="page-shell py-16 sm:py-24">
      <SectionHeading
        eyebrow="Designed everywhere"
        title="A premium experience on every screen"
        description="The interface adapts thoughtfully instead of simply shrinking—keeping actions comfortable, content readable, and artwork immersive."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="surface-ring rounded-3xl border border-white/[0.07] bg-gradient-to-br from-white/[0.055] to-transparent p-6"
          >
            <div className="mb-6 inline-flex rounded-2xl border border-rose-400/15 bg-rose-500/10 p-3 text-rose-400">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Devices;
