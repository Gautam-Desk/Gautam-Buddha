import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  base: "/Gautam-Buddha/",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/three/")) {
            return "three-core";
          }
          if (
            id.includes("/node_modules/@react-three/fiber/") ||
            id.includes("/node_modules/@react-three/drei/")
          ) {
            return "three-fiber";
          }
          if (
            id.includes("/node_modules/@react-three/postprocessing/") ||
            id.includes("/node_modules/postprocessing/")
          ) {
            return "three-postprocessing";
          }
          if (
            id.includes("/node_modules/framer-motion/") ||
            id.includes("/node_modules/gsap/") ||
            id.includes("/node_modules/lenis/")
          ) {
            return "motion";
          }
          return undefined;
        },
      },
    },
  },
});
