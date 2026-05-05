import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EmergencyBanner } from "@/components/site/EmergencyBanner";
import { Button } from "@/components/ui/button";
import nycImg from "@/assets/nyc-streets.jpg";
import waterMain from "@/assets/service-watermain.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Smiley's Waterworks | NYC Family-Run Utility Contractor" },
      { name: "description", content: "A family-run NYC contractor with 17+ years of water main, sewer, and plumbing experience across all five boroughs." },
      { property: "og:title", content: "About Smiley's Waterworks" },
      { property: "og:description", content: "17+ years of NYC underground utility expertise. Family-run, license-held, and committed to doing it right." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-navy text-white">
        <div className="container-x mx-auto max-w-7xl py-20 lg:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
            About
          </span>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight lg:text-6xl">
            New York runs on infrastructure. We&rsquo;re proud to build it.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-white/75 lg:text-lg">
            Smiley&rsquo;s Waterworks is a family-run, NYC-based utility and
            plumbing contractor serving the five boroughs with personalized
            service, fair rates, and master-level craftsmanship.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <img src={nycImg} alt="NYC neighborhood" loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover shadow-elevated" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
              Our story
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight lg:text-5xl">
              A New York name, built one job at a time.
            </h2>
            <div className="mt-6 space-y-4 text-pretty text-muted-foreground lg:text-lg">
              <p>
                Based in Far Rockaway and led by Johann Smiley, our company has
                been quietly serving New York property owners, contractors, and
                municipalities for years &mdash; on the kind of work that has to
                be done right the first time.
              </p>
              <p>
                We&rsquo;re licensed, insured, and bonded. We carry the
                experience, the equipment, and the relationships with city
                agencies to handle the full scope of underground utility and
                interior plumbing work. We work hard for our reputation, and we
                back every job with personalized service and fair pricing.
              </p>
            </div>
            <Button asChild variant="navy" size="lg" className="mt-8">
              <Link to="/contact">Talk to Johann <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-24">
        <div className="container-x mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-balance font-display text-3xl font-bold tracking-tight lg:text-4xl">
                What we stand for.
              </h2>
              <p className="mt-4 text-pretty text-muted-foreground lg:text-lg">
                The values that show up on every job we touch.
              </p>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2">
              {[
                { t: "Do it right the first time.", d: "No shortcuts, no callbacks, no surprises." },
                { t: "Show up when we say.", d: "Schedule discipline matters in this city." },
                { t: "Use the finest materials.", d: "We don&rsquo;t cheap out where it counts." },
                { t: "Treat every site like ours.", d: "Clean, safe, restored — every time." },
              ].map((v) => (
                <li key={v.t} className="rounded-xl border border-border bg-card p-6">
                  <CheckCircle2 className="h-5 w-5 text-[var(--ember)]" />
                  <h3 className="mt-3 font-display font-bold" dangerouslySetInnerHTML={{ __html: v.t }} />
                  <p className="mt-1.5 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: v.d }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="lg:order-2">
            <img src={waterMain} alt="Water main detail" loading="lazy" className="aspect-square w-full rounded-xl object-cover shadow-elevated" />
          </div>
          <div className="lg:order-1">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
              Coverage area
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight lg:text-4xl">
              Serving all five NYC boroughs.
            </h2>
            <p className="mt-4 text-muted-foreground lg:text-lg">
              We work daily across Manhattan, Brooklyn, Queens, the Bronx, and
              Staten Island &mdash; with crews experienced in the unique
              conditions, codes, and constraints of each neighborhood.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island"].map((b) => (
                <span key={b} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EmergencyBanner />
    </SiteLayout>
  );
}
