import { Link } from "@tanstack/react-router";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className={`flex h-10 w-10 items-center justify-center rounded-md text-xl font-black ${light ? "bg-white/15 text-white" : "bg-[var(--navy)] text-white"}`}
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        TG
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`text-[0.95rem] font-bold tracking-tight ${light ? "text-white" : "text-foreground"}`}
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Taylor Group
        </span>
        <span className={`text-[0.55rem] font-semibold uppercase tracking-[0.18em] ${light ? "text-white/60" : "text-muted-foreground"}`}>
          Plumbing · Heating · Mechanical
        </span>
      </div>
    </Link>
  );
}
