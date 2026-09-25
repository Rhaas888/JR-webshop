import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jr-intelligence.com"),
  title: {
    default: `${company.name} | Webshop of app laten bouwen`,
    template: `%s | ${company.name}`,
  },
  description:
    "JR Intelligence bouwt webshops en apps op maat voor Nederlandse bedrijven. Je weet vooraf wat het kost.",
  openGraph: {
    title: `${company.name} | Webshop of app laten bouwen`,
    description:
      "Webshops en apps op maat. Je weet vooraf wat het kost. Binnen 1 werkdag reactie.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ConvexClientProvider>
          <JsonLd />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
