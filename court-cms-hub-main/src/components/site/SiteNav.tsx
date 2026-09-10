import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSiteSettings } from "@/lib/cms";

const links = [
  { to: "/", label: "Home" },
  { to: "/main", label: "Main" },
  { to: "/boys", label: "Boys" },
  { to: "/girls", label: "Girls" },
  { to: "/fixtures", label: "Fixtures" },
  { to: "/results", label: "Results" },
  { to: "/standings", label: "Standings" },
  { to: "/news", label: "News" },
  { to: "/gallery", label: "Gallery" },
] as const;

export function SiteNav() {
  const { data: settings } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const name = settings?.academy_name ?? "Neighbourhood Academy";

  return (
    <nav className="sticky top-0 z-40">
      <div className="glass border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            {settings?.logo_url ? (
              <img src={settings.logo_url} alt={`${name} logo`} width={32} height={32} className="size-8 rounded-md object-cover" />
            ) : (
              <span className="grid size-8 place-items-center rounded-md bg-primary font-display text-base text-primary-foreground">
                N
              </span>
            )}
            <span className="font-display text-base leading-none tracking-tight sm:text-lg">
              {name.toUpperCase()}
            </span>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium text-muted-foreground xl:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:block"
            >
              Contact
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-md border border-border xl:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border bg-card px-5 py-4 xl:hidden">
            <ul className="grid gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2 text-sm font-medium hover:bg-muted"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 grid gap-1 border-t border-border pt-2 font-mono text-[11px] tracking-widest text-muted-foreground">
                <Link to="/boys/nba" onClick={() => setOpen(false)} className="px-2 py-1.5">BOYS · NBA</Link>
                <Link to="/boys/ncl" onClick={() => setOpen(false)} className="px-2 py-1.5">BOYS · NCL</Link>
                <Link to="/girls/ncl" onClick={() => setOpen(false)} className="px-2 py-1.5">GIRLS · NCL</Link>
                <Link to="/contact" onClick={() => setOpen(false)} className="px-2 py-1.5">CONTACT</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
