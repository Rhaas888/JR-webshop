import Link from "next/link";
import { company, navLinks } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/6 bg-white">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-base tracking-tight">
            <span className="font-semibold">JR</span> Intelligence
          </p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            Webshops en apps op maat voor Nederlandse bedrijven. Strak, overzichtelijk, zonder ruis.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Pagina&apos;s</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-foreground">
                {company.email}
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground">
                Offerte aanvragen
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/6">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}</p>
          <p>We reageren binnen 1 werkdag.</p>
        </div>
      </div>
    </footer>
  );
}
