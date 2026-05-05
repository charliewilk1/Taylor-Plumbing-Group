import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Droplets, Wrench, Flame, Hammer, ShieldCheck, Building2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EmergencyBanner } from "@/components/site/EmergencyBanner";
import { Button } from "@/components/ui/button";
import waterMain from "@/assets/service-watermain.jpg";
import sewerImg from "@/assets/service-sewer.jpg";
import hydrantImg from "@/assets/service-hydrant.jpg";
import plumbingImg from "@/assets/service-plumbing.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Water Main, Sewer, Hydrants & Plumbing | Smiley's Waterworks" },
      { name: "description", content: "Full-service NYC contractor: water main installation, sewer construction, fire hydrants, sprinkler service, and interior plumbing." },
      { property: "og:title", content: "Services | Smiley's Waterworks NYC" },
      { property: "og:description", content: "Underground utility and plumbing services across NYC's five boroughs." },
    ],
  }),
  component: ServicesPage,
});

const detail = [
  {
    id: "water-main",
    icon: Droplets,
    title: "Water Main Construction",
    img: waterMain,
    desc: "Municipal water service installation, replacement, and emergency repair. We work directly with NYC DEP for permitting, taps, and shutdowns.",
    points: ["New service installations", "Lead service replacement", "Emergency main breaks", "DEP permits & coordination", "Ductile iron, copper, K-copper"],
  },
  {
    id: "sewer",
    icon: Wrench,
    title: "Sewer Main & House Connections",
    img: sewerImg,
    desc: "Full sewer line work — from house connections to municipal sewer construction. Excavation, tie-ins, and full street restoration.",
    points: ["House sewer replacement", "Storm & sanitary sewers", "Sewer tie-ins", "Trenchless options where suited", "Full street restoration"],
  },
  {
    id: "hydrants",
    icon: Flame,
    title: "Fire Hydrants & Service",
    img: hydrantImg,
    desc: "DEP-approved fire hydrant installation, relocation, and maintenance. Sprinkler and fire service line work for buildings of every scale.",
    points: ["Hydrant installation & relocation", "Sprinkler service lines", "Fire service mains", "Backflow prevention", "FDNY coordination"],
  },
  {
    id: "plumbing",
    icon: Hammer,
    title: "Interior Plumbing",
    img: plumbingImg,
    desc: "Complete interior plumbing installations — risers, mains, fixtures, and rough-ins for residential and commercial buildings.",
    points: ["Full plumbing installations", "Risers & branch lines", "Boiler & water heater work", "Fixture installation", "Code compliance & inspection"],
  },
] as const;

function ServicesPage() {
  return (
    <SiteLayout>
      {/* PAGE HEADER */}
      <section className="border-b border-border bg-gradient-navy text-white">
        <div className="container-x mx-auto max-w-7xl py-20 lg:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
            Services
          </span>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight lg:text-6xl">
            One contractor. The full underground &amp; interior scope.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-white/75 lg:text-lg">
            From the street to the fixture, Smiley&rsquo;s Waterworks self-performs
            the full range of water, sewer, and plumbing work New York City
            properties depend on.
          </p>
        </div>
      </section>

      {/* SERVICE BLOCKS */}
      <section className="py-24 lg:py-32">
        <div className="container-x mx-auto flex max-w-7xl flex-col gap-24 lg:gap-32">
          {detail.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div>
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-xl object-cover shadow-elevated"
                />
              </div>
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[var(--navy)] text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-balance font-display text-3xl font-bold tracking-tight lg:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-pretty text-muted-foreground lg:text-lg">{s.desc}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ember)]" />
                      <span className="text-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="navy" size="lg" className="mt-8">
                  <Link to="/contact">
                    Request a Quote <ArrowRight />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="border-t border-border bg-secondary/40 py-20">
        <div className="container-x mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "Licensed & Bonded", d: "Master plumber and licensed water/sewer contractor." },
            { icon: Building2, t: "Commercial & Municipal", d: "Experienced on large-scale and public infrastructure." },
            { icon: CheckCircle2, t: "Code Compliant", d: "DEP, DOB, FDNY, and DOT permitting handled in-house." },
            { icon: Hammer, t: "Self-Performed", d: "Our crews, our equipment — accountable from start to finish." },
          ].map((c) => (
            <div key={c.t}>
              <c.icon className="h-7 w-7 text-[var(--ember)]" />
              <h3 className="mt-4 font-display text-lg font-bold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <EmergencyBanner />
    </SiteLayout>
  );
}
