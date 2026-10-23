import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática: o build gera `out/`, pronto para hospedagem estática.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
