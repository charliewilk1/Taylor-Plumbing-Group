import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Clock, Award, MapPin, Phone, Wrench, Thermometer, Flame, Droplets, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EmergencyBanner } from "@/components/site/EmergencyBanner";
import { InlineChat } from "@/components/site/InlineChat";
import { Reviews } from "@/components/site/Reviews";
import { Button } from "@/components/ui/button";
import { client } from "@/config/client";
import heroImg from "@/assets/hero-excavation.jpg";
import waterMain from "@/assets/service-watermain.jpg";
import sewerImg from "@/assets/service-sewer.jpg";
import hydrantImg from "@/assets/service-hydrant.jpg";
import plumbingImg from "@/assets/service-plumbing.jpg";
import nycImg from "@/assets/nyc-streets.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: client.seo.title },
      { name: "description", content: client.seo.description },
      { property: "og:title", content: client.seo.title },
      { property: "og:description", content: client.seo.description },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Droplets, title: "Plumbing Repair & Installation", desc: "Full-service residential and commercial plumbing — done right the first time.", img: plumbingImg },
  { icon: Wrench, title: "Leak Detection & Repair", desc: "Fast, accurate leak detection and repair to protect your property.", img: waterMain },
  { icon: Thermometer, title: "Heating & Mechanical", desc: "Boiler service, heating systems, and mechanical installations.", img: sewerImg },
  { icon: Flame, title: "Sprinkler & Fire Suppression", desc: "Licensed fire suppression piping installation and maintenance.", img: hydrantImg },
] as const;

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[var(--navy-deep)] text-white">
        <img
          src={heroImg}
          alt="Taylor Group plumbing crew at work in NYC"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative container-x mx-auto max-w-7xl pb-24 pt-20 lg:pb-36 lg:pt-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ember)]" />
              Serving All Five Boroughs · 24/7 Emergency
            </span>
            <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
              NYC&rsquo;s trusted plumbing &amp; mechanical experts.
              <span className="block text-white/65">Done right — every time.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-white/75 lg:text-lg">
              Taylor Group delivers 23+ years of licensed plumbing, heating, mechanical,
              and sprinkler expertise across all five boroughs — with the honesty
              and reliability NYC property owners count on.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button asChild variant="ember" size="xl">
                <a href={client.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book Online <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <a
                href={`tel:${client.phoneRaw}`}
                className="inline-flex items-center gap-3 rounded-md border border-white/25 bg-white/5 px-6 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-[var(--ember)]" />
                {client.phone}
              </a>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-10 sm:grid-cols-4 lg:mt-28">
            {[
              { k: "4.7★", v: "367 Google Reviews" },
              { k: "23+", v: "Years in Business" },
              { k: "24/7", v: "Emergency Response" },
              { k: "MBE", v: "& LBE Certified" },
            ].map((s) => (
              <div key={s.k}>
                <div className="font-display text-3xl font-bold text-white lg:text-4xl">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InlineChat />

      {/* SERVICES */}
      <section className="py-24 lg:py-32">
        <div className="container-x mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
                What we do
              </span>
              <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight lg:text-5xl">
                Full-service plumbing & mechanical for NYC.
              </h2>
              <p className="mt-5 text-pretty text-base text-muted-foreground lg:text-lg">
                From emergency repairs to large commercial installations — one
                licensed, accountable contractor handles it all.
              </p>
            </div>
            <Button asChild variant="navy" size="lg">
              <Link to="/services">All Services <ArrowRight /></Link>
            </Button>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Link
                key={s.title}
                to="/services"
                className="group relative overflow-hidden rounded-xl bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/80 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-white/95 text-[var(--navy)]">
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--navy)] transition-all group-hover:gap-2.5">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="border-y border-border bg-secondary/40 py-24 lg:py-32">
        <div className="container-x mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <img
              src={nycImg}
              alt="NYC streets"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-xl object-cover shadow-elevated"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-[var(--navy)] p-6 text-white shadow-elevated sm:block">
              <div className="font-display text-4xl font-bold">23<span className="text-[var(--ember)]">+</span></div>
              <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">
                Years Serving<br />New York City
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
              Why Taylor Group
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight lg:text-5xl">
              Honest work. Fair prices. NYC experience.
            </h2>
            <p className="mt-5 text-pretty text-muted-foreground lg:text-lg">
              Owner Norris I. Taylor built this company on a simple promise: do
              the job right, charge a fair price, and treat every customer with
              respect. Over 23 years and 367 Google reviews later, that promise
              hasn&rsquo;t changed.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { icon: ShieldCheck, t: "Licensed Master Plumber No. 1973", d: "Full NYC DOB compliance and proper permitting on every job." },
                { icon: Clock, t: "24/7 Emergency Response", d: "Call any time — we respond fast to breaks, leaks, and shutoffs." },
                { icon: Award, t: "MBE & LBE Certified", d: "Minority certified with NY State, SCA, and NYC." },
                { icon: MapPin, t: "All Five Boroughs", d: "Manhattan, Brooklyn, Queens, the Bronx, and Staten Island." },
              ].map((f) => (
                <li key={f.t} className="flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--navy)] text-white">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display font-semibold">{f.t}</div>
                    <div className="text-sm text-muted-foreground">{f.d}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="ember" size="default">
                <a href={client.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book Online <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="navy" size="default">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <Reviews />

      {/* PROCESS */}
      <section className="py-24 lg:py-32">
        <div className="container-x mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
              Our process
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight lg:text-5xl">
              Simple, transparent, and on your schedule.
            </h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Call or Book Online", d: "Reach us by phone 24/7 or schedule online — we typically reply within hours." },
              { n: "02", t: "Free Estimate", d: "A licensed technician visits, assesses the job, and gives you a clear written estimate." },
              { n: "03", t: "We Do the Work", d: "Skilled crews show up on time, pull the permits, and complete the job cleanly." },
              { n: "04", t: "Sign-Off & Done", d: "We handle final inspection and documentation so you have nothing to worry about." },
            ].map((p) => (
              <div key={p.n} className="bg-background p-8 lg:p-10">
                <div className="font-display text-sm font-bold text-[var(--ember)]">{p.n}</div>
                <div className="mt-3 font-display text-xl font-bold">{p.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LICENSES */}
      <section className="border-t border-border bg-secondary/40 py-16">
        <div className="container-x mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">Credentials</span>
              <h3 className="mt-2 font-display text-xl font-bold">NYC Licensed & Certified</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-6 lg:justify-end">
              {client.licenses.map((l) => (
                <div key={l.label} className="text-center">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{l.label}</div>
                  <div className="mt-1 font-display text-lg font-bold text-[var(--navy)]">{l.number}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EmergencyBanner />
    </SiteLayout>
  );
}
