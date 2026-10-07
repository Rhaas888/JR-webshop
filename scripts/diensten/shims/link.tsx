import { type AnchorHTMLAttributes, type ReactNode } from "react"

const routes: Record<string, string> = {
  "/contact": "/pages/contact",
  "/over-ons": "/pages/over-ons",
  "/diensten/webshop": "/pages/diensten-webshop",
  "/diensten/website": "/pages/diensten-website",
  "/diensten/app": "/pages/diensten-app",
  "/diensten/automatisering": "/pages/diensten-automatisering",
}

function mapHref(href: string) {
  const hashAt = href.indexOf("#")
  const hash = hashAt >= 0 ? href.slice(hashAt) : ""
  const beforeHash = hashAt >= 0 ? href.slice(0, hashAt) : href
  const queryAt = beforeHash.indexOf("?")
  const query = queryAt >= 0 ? beforeHash.slice(queryAt) : ""
  const path = queryAt >= 0 ? beforeHash.slice(0, queryAt) : beforeHash
  return `${routes[path] ?? path}${query}${hash}`
}

export default function Link({
  href,
  children,
  ...props
}: {
  href: string
  children?: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <a href={mapHref(href)} {...props}>
      {children}
    </a>
  )
}
