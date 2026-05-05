import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { client } from "@/config/client";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/commercial", label: "Commercial" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-x mx-auto flex h-16 max-w-7xl items-center justify-between lg:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3.5 py-2 text-[0.9rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${client.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-semibold text-foreground"
          >
            <Phone className="h-4 w-4 text-[var(--ember)]" />
            {client.phone}
          </a>
          <Button asChild variant="ember" size="default">
            <Link to="/contact">Request Service</Link>
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-x mx-auto flex max-w-7xl flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              <a
                href={`tel:${client.phoneRaw}`}
                className="flex items-center gap-2 px-3 py-2 text-base font-semibold"
              >
                <Phone className="h-4 w-4 text-[var(--ember)]" />
                {client.phone}
              </a>
              <Button asChild variant="ember" size="lg" className="w-full">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Request Service
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
