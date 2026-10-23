import { NextConfig } from "next"

const config: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
}

export default config
