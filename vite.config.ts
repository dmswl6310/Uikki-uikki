import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import fs from "fs";
import { transformSync } from "esbuild";
import tailwindcss from "@tailwindcss/vite";

function rawJsPlugin() {
  return {
    name: "vite-plugin-raw-js",
    enforce: "pre" as const,
    load(id: string) {
      if (id.endsWith("?jsx-raw")) {
        const filePath = id.split("?")[0];
        let fileContent = "";
        try {
          fileContent = fs.readFileSync(filePath, "utf-8");
        } catch {
          return `export default ""`;
        }

        const result = transformSync(fileContent, {
          loader: "tsx",
          jsx: "preserve",
          target: "esnext",
          format: "esm",
        });

        return `export default ${JSON.stringify(result.code)};`;
      }
      return null;
    },
  };
}

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@data": path.resolve(__dirname, "src/data"),
      "@types": path.resolve(__dirname, "src/types"),
    },
  },
  plugins: [
    rawJsPlugin(),
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        navigateFallback: "/index.html",
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        id: "/",
        name: "Uikki✦Uikki React UI Playground",
        short_name: "Uikki",
        description:
          "React 컴포넌트를 실시간으로 테스트하고 소스를 가져가는 UI Playground",
        lang: "ko-KR",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2563eb",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
