import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, HardHat, FileCheck2, Network, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EmergencyBanner } from "@/components/site/EmergencyBanner";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-excavation.jpg";

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial Projects — NYC Underground Utility Contractor | Smiley's Waterworks" },
      { name: "description", content: "Commercial water main, sewer, and fire service contractor for NYC GCs, developers, property managers, and municipalities." },
      { property: "og:title", content: "Commercial Services | Smiley's Waterworks" },
      { property: "og:description", content: "Trusted by NYC GCs, developers, and municipalities for critical infrastructure work." },
    ],
  }),
  component: CommercialPage,
});

function CommercialPage() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden bg-[var(--navy-deep)] text-white">
        <img src={heroImg} alt="Commercial excavation NYC" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container-x relative mx-auto max-w-7xl py-24 lg:py-32">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
            Commercial
          </span>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight lg:text-6xl">
            The crew NYC builders call when it has to be done right.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-white/75 lg:text-lg">
            Smiley&rsquo;s Waterworks partners with general contractors,
            developers, property managers, and municipalities on water main,
            sewer, and fire service projects across New York City.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button asChild variant="ember" size="xl">
              <Link to="/contact">Start a Project <ArrowRight /></Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/services">View Capabilities</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              { icon: Building2, t: "Developers & Owners", d: "New construction water and sewer service from feasibility through sign-off." },
              { icon: HardHat, t: "General Contractors", d: "Reliable underground utility subs who hit the schedule and protect the site." },
              { icon: Network, t: "Municipalities & Agencies", d: "Public infrastructure work with full DEP, DOT, and FDNY coordination." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-border bg-card p-8 shadow-card">
                <c.icon className="h-8 w-8 text-[var(--ember)]" />
                <h3 className="mt-5 font-display text-xl font-bold">{c.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-24 lg:py-32">
        <div className="container-x mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
              Capabilities
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight lg:text-5xl">
              Full-scope underground utility &amp; plumbing.
            </h2>
            <p className="mt-5 text-pretty text-muted-foreground lg:text-lg">
              We self-perform the work that matters most &mdash; with our own
              equipment, our own crews, and a single point of accountability.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Water main installation & replacement",
              "Lead service line replacement",
              "Sanitary & storm sewer construction",
              "Fire service & sprinkler mains",
              "Hydrant installation & relocation",
              "Backflow prevention",
              "Excavation & shoring",
              "Street & sidewalk restoration",
              "DEP, DOB, DOT, FDNY permits",
              "Emergency main break response",
            ].map((p) => (
              <li key={p} className="flex items-start gap-2.5 rounded-md border border-border bg-card p-4 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ember)]" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
                How we work
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight lg:text-4xl">
                Predictable execution on complex jobs.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { icon: FileCheck2, t: "Pre-construction", d: "Site walks, scope reviews, value engineering, and accurate budgets." },
                { icon: HardHat, t: "Permitting", d: "We pull and manage DEP, DOT, FDNY, and DOB permits in-house." },
                { icon: Network, t: "Coordination", d: "Tight coordination with GCs, utility owners, and inspectors." },
                { icon: CheckCircle2, t: "Close-out", d: "Restoration, documentation, and inspection sign-off." },
              ].map((s) => (
                <div key={s.t} className="rounded-xl border border-border p-6">
                  <s.icon className="h-6 w-6 text-[var(--navy)]" />
                  <div className="mt-3 font-display font-bold">{s.t}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
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
