import type { MetadataRoute } from "next";
import { company } from "@/lib/content";

const paths = [
  "/",
  "/webshop-laten-bouwen",
  "/app-laten-maken",
  "/prijzen",
  "/onderhoud",
  "/ervaringen",
  "/over-ons",
  "/faq",
  "/offerte",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${company.url}${path === "/" ? "" : path}`,
    lastModified: new Date("2026-09-09"),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
