import { trustItems } from "@/lib/content";
import { cn } from "@/lib/utils";

const trustIcons = {
  "Snel contact": ChatIcon,
  "Eén duidelijke prijs": TagIcon,
  "Volledig op maat": PenIcon,
  "Alles blijft van jou": ShieldIcon,
} as const;

export function TrustStrip() {
  return (
    <section className="border-b border-black/6 bg-[#f5f5f5]">
      <div className="mx-auto w-full max-w-[1120px] px-6 py-10 md:py-12 lg:py-14">
        <div className="max-w-xl">
          <p className="text-sm font-semibold tracking-wide text-[#059b60]">Samenwerken</p>
          <h2 className="mt-2 text-[1.65rem] font-semibold tracking-tight text-black sm:text-3xl">
            Dit kun je van ons verwachten
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4 lg:mt-10 lg:grid-cols-4 lg:gap-[18px]">
          {trustItems.map((item, index) => {
            const Icon = trustIcons[item.title];
            return (
              <article
                key={item.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-black/8 bg-white px-6 pb-8 pt-6 pl-7 lg:px-[26px] lg:pl-8 lg:pb-9 lg:pt-7",
                  "transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1.5 hover:border-[#059b60]/35 hover:shadow-[0_20px_44px_rgba(5,155,96,0.16)] motion-reduce:transform-none",
                )}
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-[#059b60] transition-[width] duration-200 group-hover:w-1" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold tracking-[0.14em] text-[#059b60]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="inline-flex size-11 items-center justify-center rounded-xl bg-[#059b60] text-white transition-transform duration-200 group-hover:scale-105"
                    aria-hidden="true"
                  >
                    <Icon />
                  </span>
                </div>
                <p className="mt-7 text-lg font-semibold tracking-tight text-black">
                  {item.title}
                </p>
                <p className="mt-3 text-sm font-medium leading-[1.65] text-muted-foreground">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 1 1 18 0Z" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 3H4v8.5L13.3 20.8a1.5 1.5 0 0 0 2.1 0l5.4-5.4a1.5 1.5 0 0 0 0-2.1L12.5 3Z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 5 6v6c0 5 3.4 8.4 7 9.8 3.6-1.4 7-4.8 7-9.8V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
