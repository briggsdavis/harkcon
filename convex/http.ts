import { httpRouter } from "convex/server"
import { authComponent, createAuth, trustedAdminOrigins } from "./auth"

const http = httpRouter()
authComponent.registerRoutes(http, createAuth, {
  cors: { allowedOrigins: [...trustedAdminOrigins(), "*.vercel.app"] },
})

export default http
