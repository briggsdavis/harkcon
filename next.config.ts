import { NextConfig } from "next"

const config: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true,
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
