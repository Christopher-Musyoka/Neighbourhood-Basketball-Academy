import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { Shell, PageHeader } from "@/components/site/Shell";
import { useSiteSettings } from "@/lib/cms";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Neighbourhood Academy Basketball" },
      {
        name: "description",
        content:
          "Get in touch with Neighbourhood Academy about trials, training, fixtures or partnerships.",
      },
      { property: "og:title", content: "Contact Neighbourhood Academy" },
      {
        property: "og:description",
        content: "Reach the academy about trials, training, fixtures or partnerships.",
      },
    ],
  }),
  component: ContactPage,
});

const input =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";

function ContactPage() {
  const { data: settings } = useSiteSettings();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      subject: form.subject || null,
      message: form.message,
    });
    setSending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Message sent — we'll get back to you.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  }

  return (
    <Shell>
      <PageHeader
        eyebrow="TALK TO THE ACADEMY"
        title="Contact"
        intro={settings?.description ?? "Questions about trials, training or partnerships? Send us a message."}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-24 md:px-8 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={submit} className="glass grid gap-4 rounded-2xl border border-border p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="font-mono text-[11px] tracking-widest text-muted-foreground">NAME</span>
              <input
                required
                className={input}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="grid gap-1.5">
              <span className="font-mono text-[11px] tracking-widest text-muted-foreground">EMAIL</span>
              <input
                required
                type="email"
                className={input}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className="grid gap-1.5">
              <span className="font-mono text-[11px] tracking-widest text-muted-foreground">PHONE</span>
              <input
                className={input}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </label>
            <label className="grid gap-1.5">
              <span className="font-mono text-[11px] tracking-widest text-muted-foreground">SUBJECT</span>
              <input
                className={input}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </label>
          </div>
          <label className="grid gap-1.5">
            <span className="font-mono text-[11px] tracking-widest text-muted-foreground">MESSAGE</span>
            <textarea
              required
              className={`${input} min-h-36`}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <button
            type="submit"
            disabled={sending}
            className="justify-self-start rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>

        <aside className="glass grid h-fit gap-4 rounded-2xl border border-border p-6 text-sm">
          <h2 className="text-2xl">Academy details</h2>
          {settings?.phone && (
            <p className="flex items-center gap-2 text-muted-foreground">
              <Phone className="size-4" /> {settings.phone}
            </p>
          )}
          {settings?.email && (
            <p className="flex items-center gap-2 text-muted-foreground">
              <Mail className="size-4" /> {settings.email}
            </p>
          )}
          {settings?.address && (
            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" /> {settings.address}
            </p>
          )}
        </aside>
      </section>
    </Shell>
  );
}
