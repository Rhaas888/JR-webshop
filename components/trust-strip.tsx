import { trustItems } from "@/lib/content";

export function TrustStrip() {
  return (
    <section className="border-b border-black/6 bg-forest-soft/70">
      <div className="mx-auto w-full max-w-[1120px] px-6 py-7 md:py-9 lg:py-10">
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-[18px]">
          {trustItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[20px] border border-black/6 bg-white px-6 pb-8 pt-7 lg:px-[26px] lg:pb-9 lg:pt-8"
            >
              <p className="text-[15px] font-semibold tracking-tight text-forest">{item.title}</p>
              <p className="mt-[18px] text-sm font-medium leading-[1.65] text-muted-foreground">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
