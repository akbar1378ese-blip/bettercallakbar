import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { generateIndexPHP } from "./generate-php";
import { fileURLToPath } from "url";
import path from "path";

// Define __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      viteSingleFile(),
      {
        name: "generate-index-php",
        apply: "build",
        closeBundle() {
          const buildDir = path.resolve(__dirname, "build"); // Match the `outDir` setting
          generateIndexPHP(buildDir);
        },
      },
    ],
    build: {
      outDir: "build", // Ensure the output matches your desired directory
      sourcemap: false,
      target: "esnext",
      assetsInlineLimit: 100000000, // Inline large assets for single file build
      cssCodeSplit: false,
    },
  };
});