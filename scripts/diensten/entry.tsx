import { createRoot } from "react-dom/client"
import { TabBuilder } from "@/components/builder/tab-builder"
import { ServiceDetail } from "@/components/service-detail"
import { getService } from "@/lib/services"
import { DienstenOverview } from "./overview"

const root = document.querySelector<HTMLElement>("[data-diensten]")
const slug = root?.dataset.slug

fitLaptop(root)

function fitLaptop(element: HTMLElement | null) {
  if (!element?.parentElement) return
  const design = 1120
  const frame = document.createElement("div")
  element.parentElement.insertBefore(frame, element)
  frame.appendChild(element)
  let frameHeight = 0

  const apply = () => {
    if (window.innerWidth < 1080) {
      frame.style.width = ""
      frame.style.height = ""
      frame.style.marginInline = ""
      frame.style.overflow = ""
      element.style.width = ""
      element.style.maxWidth = ""
      element.style.marginLeft = ""
      element.style.transform = ""
      frameHeight = 0
      return
    }
    const gutter = Math.min(112, Math.max(56, window.innerWidth * 0.055))
    const available = Math.min(window.innerWidth - gutter, 1880)
    const scale = available / design
    frame.style.width = `${available}px`
    frame.style.marginInline = "auto"
    frame.style.overflow = "clip"
    element.style.width = `${design}px`
    element.style.maxWidth = "none"
    element.style.marginLeft = `${(available - design) / 2}px`
    element.style.transformOrigin = "top center"
    element.style.transform = `scale(${scale})`
    const next = element.offsetHeight * scale
    if (Math.abs(next - frameHeight) > 0.5) {
      frameHeight = next
      frame.style.height = `${next}px`
    }
  }

  apply()
  window.addEventListener("resize", apply)
  new ResizeObserver(apply).observe(element)
}

if (root && slug === "overzicht") {
  createRoot(root).render(<DienstenOverview />)
} else if (root && slug === "bouwer") {
  createRoot(root).render(<TabBuilder />)
} else if (root && slug) {
  const service = getService(slug)
  if (service) createRoot(root).render(<ServiceDetail service={service} />)
}
