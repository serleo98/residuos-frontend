import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ⚠️ Esto ignora los errores de TypeScript durante la compilación
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Esto ignora los errores de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },

  experimental: {
    middlewarePrefetch: "flexible",
  },
  
};

export default nextConfig;
