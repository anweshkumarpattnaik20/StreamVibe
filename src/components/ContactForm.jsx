import { CheckCircle2, LockKeyhole, Send } from "lucide-react";
import { useState } from "react";

const SUPPORT_ENDPOINT = import.meta.env.VITE_SUPPORT_ENDPOINT?.trim();
const initialForm = { name: "", email: "", topic: "Playback", message: "", agree: false };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setStatus((current) => current.type === "loading" ? current : { type: "idle", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim() || !form.agree) {
      setStatus({ type: "error", message: "Complete the required fields and accept the privacy notice." });
      return;
    }

    if (!emailPattern.test(form.email.trim())) {
      setStatus({ type: "error", message: "Enter a valid email address so the support team can reply." });
      return;
    }

    if (!SUPPORT_ENDPOINT) {
      setStatus({
        type: "preview",
        message: "Your request is ready. This preview does not transmit personal data until a secure support endpoint is configured.",
      });
      return;
    }

    setStatus({ type: "loading", message: "Sending your request…" });
    try {
      const response = await fetch(SUPPORT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), topic: form.topic, message: form.message.trim() }),
      });
      if (!response.ok) throw new Error(`Support request failed (${response.status})`);
      setForm(initialForm);
      setStatus({ type: "success", message: "Message sent. The support team will get back to you soon." });
    } catch {
      setStatus({ type: "error", message: "We could not send that message. Please try again in a moment." });
    }
  };

  const fieldClass = "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition focus:border-rose-500/60 focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-5 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-zinc-200">
          Name <span className="text-rose-400">*</span>
          <input className={fieldClass} name="name" value={form.name} onChange={updateField} autoComplete="name" placeholder="Your name" maxLength={80} required />
        </label>
        <label className="text-sm font-medium text-zinc-200">
          Email <span className="text-rose-400">*</span>
          <input className={fieldClass} type="email" name="email" value={form.email} onChange={updateField} autoComplete="email" placeholder="you@example.com" maxLength={160} required />
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium text-zinc-200">
        What can we help with?
        <select className={fieldClass} name="topic" value={form.topic} onChange={updateField}>
          <option>Playback</option>
          <option>Account access</option>
          <option>Plans and billing</option>
          <option>Content feedback</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="mt-5 block text-sm font-medium text-zinc-200">
        Message <span className="text-rose-400">*</span>
        <textarea className={`${fieldClass} min-h-36 resize-y`} name="message" value={form.message} onChange={updateField} placeholder="Tell us what happened and what you expected…" maxLength={2000} required />
      </label>
      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-zinc-400">
        <input className="mt-1 h-4 w-4 accent-rose-600" type="checkbox" name="agree" checked={form.agree} onChange={updateField} />
        <span>I agree that my details may be used to respond to this request.</span>
      </label>

      {status.message && (
        <div
          className={`mt-5 rounded-xl border px-4 py-3 text-sm ${status.type === "error" ? "border-red-500/25 bg-red-500/10 text-red-200" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"}`}
          role="status"
          aria-live="polite"
        >
          <span className="flex items-start gap-2">
            {status.type === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />}
            {status.message}
          </span>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-zinc-500">
          <LockKeyhole className="h-3.5 w-3.5" /> Privacy-conscious support delivery
        </p>
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:cursor-wait disabled:opacity-60"
        >
          <Send className="h-4 w-4" /> {status.type === "loading" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
