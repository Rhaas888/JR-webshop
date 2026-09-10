import Link from "next/link";
import { company, extraNavLinks, footerGroups } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/6 bg-white">
      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-base tracking-tight">
            <span className="font-semibold">JR</span> Intelligence
          </p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            Webshops en apps op maat. Geen ingewikkeld gedoe.
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-medium">{group.title}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-sm font-medium">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-foreground">
                {company.email}
              </a>
            </li>
            <li>
              <Link href="/offerte" className="hover:text-foreground">
                Offerte aanvragen
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/6">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {extraNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
