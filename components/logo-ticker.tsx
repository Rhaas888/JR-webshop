import Image from "next/image";
import { styleBrands, ticker } from "@/lib/content";

export function LogoTicker() {
  const loop = [...styleBrands, ...styleBrands];

  return (
    <section className="border-b border-black/6 bg-forest-soft/70 py-7 md:py-9">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <div className="rounded-[20px] border border-black/6 bg-white px-6 pb-8 pt-7 md:px-[26px] md:pb-9 md:pt-8">
          <p className="text-sm font-semibold tracking-wide text-forest">{ticker.kicker}</p>
          <p className="mt-1.5 text-lg font-semibold tracking-tight">{ticker.title}</p>
          <p className="mt-[18px] max-w-2xl text-sm font-medium leading-[1.65] text-muted-foreground">
            {ticker.caption}
          </p>
        </div>
      </div>
      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-forest-soft/70 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-forest-soft/70 to-transparent sm:w-24" />
        <div className="jr-ticker-track flex w-max items-center gap-16 px-8">
          {loop.map((brand, index) => (
            <Image
              key={`${brand.name}-${index}`}
              src={brand.src}
              alt={brand.name}
              width={220}
              height={48}
              className="h-10 w-auto opacity-80 sm:h-11"
              unoptimized
            />
          ))}
        </div>
      </div>
    </section>
  );
}
