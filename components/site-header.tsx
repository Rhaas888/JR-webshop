"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { company, extraNavLinks, navLinks } from "@/lib/content";
import { hoverBtn } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:12px;pointer-events:none;";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry?.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, [pathname]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-black/8 bg-white text-foreground"
          : "border-transparent bg-black text-white",
      )}
    >
      <div className="mx-auto grid h-[4.5rem] w-full max-w-[1120px] grid-cols-[1fr_auto] items-center gap-4 px-6 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="justify-self-start">
          <img
            src={scrolled ? "/images/logo-jr-black.png" : "/images/logo-jr.png"}
            alt={company.name}
            width={146}
            height={73}
            className="h-11 w-auto sm:h-12"
          />
        </Link>

        <nav
          className={cn(
            "hidden items-center gap-8 text-sm lg:flex",
            scrolled ? "text-neutral-700" : "text-white/80",
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "jr-nav-link",
                scrolled ? "hover:text-foreground" : "hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link
            href="/offerte"
            className={cn(
              "hidden h-10 items-center rounded-lg px-4 text-sm font-medium sm:inline-flex",
              hoverBtn,
              scrolled
                ? "bg-foreground text-background hover:bg-neutral-800"
                : "bg-white text-black hover:bg-neutral-100",
            )}
          >
            Offerte aanvragen
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "lg:hidden",
                  !scrolled && "text-white hover:bg-white/10 hover:text-white",
                )}
                aria-label="Menu openen"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>
                  <img
                    src="/images/logo-jr-black.png"
                    alt={company.name}
                    width={146}
                    height={73}
                    className="h-10 w-auto"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => go(link.href)}
                    className="rounded-lg px-2 py-3 text-left text-base text-neutral-800 hover:bg-muted"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="my-3 h-px bg-black/8" />
                {extraNavLinks.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => go(link.href)}
                    className="rounded-lg px-2 py-3 text-left text-base text-neutral-800 hover:bg-muted"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => go("/offerte")}
                  className={cn(
                    "mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-foreground px-4 text-sm font-medium text-background hover:bg-neutral-800",
                    hoverBtn,
                  )}
                >
                  Offerte aanvragen
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
