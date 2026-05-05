import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Printer, CheckCircle2, Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Smiley's Waterworks | Request NYC Service or Quote" },
      { name: "description", content: "Request a quote or 24/7 emergency service from Smiley's Waterworks. Call (718) 474-1293 or send a message — we serve all five NYC boroughs." },
      { property: "og:title", content: "Contact Smiley's Waterworks" },
      { property: "og:description", content: "Request a quote or 24/7 emergency service. Call (718) 474-1293." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-navy text-white">
        <div className="container-x mx-auto max-w-7xl py-20 lg:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
            Contact
          </span>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight lg:text-6xl">
            Tell us about the job. We&rsquo;ll take it from there.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-white/75 lg:text-lg">
            For 24/7 emergency response, call us directly. For quotes,
            scheduling, and project inquiries, send a message and we&rsquo;ll
            be in touch quickly.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* FORM */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card lg:p-12">
            {submitted ? (
              <div className="flex flex-col items-start gap-4 py-6">
                <CheckCircle2 className="h-10 w-10 text-[var(--ember)]" />
                <h2 className="font-display text-2xl font-bold">Message received.</h2>
                <p className="text-muted-foreground">
                  Thanks &mdash; we&rsquo;ll get back to you shortly. For
                  emergencies, please call <a href="tel:+17184741293" className="font-semibold text-foreground underline">(718) 474-1293</a>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  Request a quote
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" required placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required placeholder="(718) 555-0123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Job address / borough</Label>
                  <Input id="address" placeholder="123 Main St, Brooklyn, NY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Type of work</Label>
                  <select
                    id="service"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option>Water main</option>
                    <option>Sewer</option>
                    <option>Fire hydrant / sprinkler</option>
                    <option>Interior plumbing</option>
                    <option>Commercial / GC inquiry</option>
                    <option>Emergency</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Project details</Label>
                  <Textarea id="message" rows={5} placeholder="Tell us about the job, timeline, and any details we should know." />
                </div>
                <Button type="submit" variant="ember" size="xl" className="w-full">
                  Send Message
                </Button>
                <p className="text-xs text-muted-foreground">
                  For emergencies, please call us directly &mdash; we answer 24/7.
                </p>
              </form>
            )}
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-8">
            <a
              href="tel:+17184741293"
              className="block rounded-2xl bg-gradient-navy p-8 text-white shadow-elevated transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
                <Clock className="h-3.5 w-3.5" /> 24/7 Direct Line
              </div>
              <div className="mt-3 font-display text-3xl font-bold lg:text-4xl">
                (718) 474-1293
              </div>
              <p className="mt-2 text-sm text-white/70">
                Speak directly with our team for emergencies and immediate dispatch.
              </p>
            </a>

            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="font-display text-lg font-bold">Office</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-[var(--ember)]" />
                  <a href="tel:+17184741293" className="hover:underline">(718) 474-1293</a>
                </li>
                <li className="flex items-start gap-3">
                  <Printer className="mt-0.5 h-4 w-4 text-[var(--ember)]" />
                  <span>Fax: (718) 474-1294</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-[var(--ember)]" />
                  <a href="mailto:smileywaterworks@aol.com" className="break-all hover:underline">
                    smileywaterworks@aol.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-[var(--ember)]" />
                  <span>13-01 Redfern Avenue<br />Far Rockaway, NY 11691</span>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Smiley's Waterworks location"
                src="https://www.google.com/maps?q=13-01+Redfern+Avenue+Far+Rockaway+NY+11691&output=embed"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
