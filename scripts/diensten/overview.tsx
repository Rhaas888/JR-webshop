import { Container } from "@/components/container"
import { services, type ServiceSlug } from "@/lib/services"
import { ArrowRight, Monitor, ShoppingBag, Smartphone, Workflow, type LucideIcon } from "lucide-react"
import Link from "next/link"

const order: ServiceSlug[] = ["website", "webshop", "app", "automatisering"]

const meta: Record<ServiceSlug, { kicker: string; icon: LucideIcon; title?: string }> = {
  website: { kicker: "Site", icon: Monitor },
  webshop: { kicker: "Shop", icon: ShoppingBag },
  app: { kicker: "App", icon: Smartphone },
  automatisering: { kicker: "Systeem", icon: Workflow, title: "Automatisering bouwen" },
}

export function DienstenOverview() {
  const items = order.flatMap((slug) => {
    const service = services.find((item) => item.slug === slug)
    return service ? [service] : []
  })

  return (
    <main>
      <section className="pt-8 pb-16 sm:pt-12 sm:pb-20">
        <Container>
          <p className="text-sm text-mist">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-ink">Diensten</span>
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Diensten</h1>
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {items.map((item) => {
              const card = meta[item.slug]
              const ItemIcon = card.icon
              return (
                <Link
                  key={item.slug}
                  href={`/diensten/${item.slug}`}
                  className="pakket-lift group rounded-3xl bg-white ring-1 ring-[#e8e8e3]"
                >
                  <div className="overflow-hidden rounded-3xl">
                    <div
                      className="flex items-center justify-between px-5 py-4"
                      style={{
                        backgroundColor: "#141414",
                        backgroundImage:
                          "radial-gradient(circle, rgba(22,163,74,0.95) 1.15px, transparent 1.25px)",
                        backgroundSize: "14px 14px",
                      }}
                    >
                      <span className="grid size-11 place-items-center rounded-xl bg-brand text-white">
                        <ItemIcon className="size-5" aria-hidden />
                      </span>
                      <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-brand">
                        {card.kicker.toUpperCase()}
                      </span>
                    </div>
                    <div className="px-5 py-5">
                      <span className="block text-lg font-semibold tracking-tight">
                        {card.title ?? item.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-6 text-mist">{item.menuDescription}</span>
                      <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand">
                        Bekijk de dienst
                        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </section>
    </main>
  )
}
