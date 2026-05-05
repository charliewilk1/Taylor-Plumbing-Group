import { Star } from "lucide-react";
import { client } from "@/config/client";

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[var(--ember)] text-[var(--ember)]" />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/40">
      <div className="container-x mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ember)]">
              Google Reviews
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight lg:text-4xl">
              What our customers say.
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-card">
            <span className="font-display text-4xl font-bold text-foreground">4.7</span>
            <div>
              <StarRow count={5} />
              <p className="mt-1 text-xs text-muted-foreground">367 Google reviews</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {client.reviews.map((review) => (
            <div key={review.name} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-card">
              <StarRow count={review.rating} />
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-sm font-semibold text-foreground">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
