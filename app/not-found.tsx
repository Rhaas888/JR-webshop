import Link from "next/link";
import { Container } from "@/components/section";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-sm font-semibold tracking-wide text-forest">404</p>
      <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight">
        Deze pagina bestaat niet
      </h1>
      <p className="mt-4 max-w-lg text-lg font-medium leading-8 text-foreground">
        De link is kapot of de pagina is verplaatst. Ga terug naar home, of vraag een offerte.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-2xl bg-foreground px-5 text-sm font-medium text-background"
        >
          Naar home
        </Link>
        <Link
          href="/offerte"
          className="inline-flex h-11 items-center rounded-2xl border border-black/10 px-5 text-sm font-medium"
        >
          Offerte
        </Link>
      </div>
    </Container>
  );
}
