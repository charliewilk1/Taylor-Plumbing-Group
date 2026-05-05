import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Printer } from "lucide-react";
import { Logo } from "./Logo";
import { client } from "@/config/client";

export function Footer() {
  return (
    <footer className="bg-gradient-navy text-white">
      <div className="container-x mx-auto max-w-7xl py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo light />
            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-white/70">
              {client.footer.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {client.certifications.map(
                (b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-white/80"
                  >
                    {b}
                  </span>
                ),
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Services
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/85">
              {client.services.map((s) => (
                <li key={s.title}><Link to={s.href} className="hover:text-[var(--ember)]">{s.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Contact
            </h4>
            <ul className="mt-5 space-y-3.5 text-sm text-white/85">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ember)]" />
                <a href={`tel:${client.phoneRaw}`} className="hover:text-white">{client.phone}</a>
              </li>
              {client.fax && (
                <li className="flex items-start gap-3">
                  <Printer className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ember)]" />
                  <span>Fax: {client.fax}</span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ember)]" />
                <a href={`mailto:${client.email}`} className="hover:text-white break-all">{client.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ember)]" />
                <span>{client.address.street}<br />{client.address.city}, {client.address.state} {client.address.zip}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/55 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {client.name}. All rights reserved.</p>
          <p>{client.footer.serviceAreaLine}</p>
        </div>
      </div>
    </footer>
  );
}
