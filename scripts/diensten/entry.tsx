import { createRoot } from "react-dom/client"
import { ServiceDetail } from "@/components/service-detail"
import { ServiceDirectory } from "@/components/service-directory"
import { getService } from "@/lib/services"

const root = document.querySelector<HTMLElement>("[data-diensten]")
const service = root?.dataset.slug ? getService(root.dataset.slug) : undefined

if (root && service) {
  createRoot(root).render(
    <>
      <ServiceDetail service={service} />
      <ServiceDirectory />
    </>,
  )
}
