import { trustItems } from "@/lib/content";

export function TrustStrip() {
  return (
    <section className="border-b border-black/6 bg-forest-soft/70">
      <div className="mx-auto grid w-full max-w-[1120px] gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:py-12">
        {trustItems.map((item) => (
          <div key={item.title}>
            <p className="text-sm font-semibold tracking-tight text-forest">{item.title}</p>
            <p className="mt-2 text-sm font-medium leading-6 text-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
