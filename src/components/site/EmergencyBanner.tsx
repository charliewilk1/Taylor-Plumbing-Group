import { Phone } from "lucide-react";
import { client } from "@/config/client";

export function EmergencyBanner() {
  return (
    <section className="bg-gradient-navy py-12 text-white lg:py-16">
      <div className="container-x mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--ember)]/40 bg-[var(--ember)]/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--ember)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ember)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--ember)]" />
            </span>
            24/7 Emergency Response
          </span>
          <h3 className="mt-4 text-balance font-display text-2xl font-bold lg:text-3xl">
            {client.emergencyBanner.headline}
          </h3>
        </div>
        <a
          href={`tel:${client.phoneRaw}`}
          className="group inline-flex items-center gap-3 rounded-md bg-[var(--ember)] px-7 py-4 text-lg font-bold text-[var(--ember-foreground)] shadow-elevated transition-all hover:brightness-110"
        >
          <Phone className="h-5 w-5" />
          {client.phone}
        </a>
      </div>
    </section>
  );
}
