import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { rmSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    {
      name: "remove-vite-folder",
      closeBundle() {
        try {
          rmSync("dist/.vite", { recursive: true, force: true });
          console.log(".vite folder removed from dist");
        } catch (err) {
          console.error("Error removing .vite folder:", err);
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        dir: "dist",
      },
    },
  },
});
