import Image from "next/image";
import { styleBrands, ticker } from "@/lib/content";

export function LogoTicker() {
  const loop = [...styleBrands, ...styleBrands];

  return (
    <section className="border-y border-black/6 bg-white py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <p className="text-sm font-semibold tracking-wide text-forest">{ticker.kicker}</p>
        <p className="mt-1 text-lg font-semibold tracking-tight">{ticker.title}</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {ticker.caption}
        </p>
      </div>
      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />
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
