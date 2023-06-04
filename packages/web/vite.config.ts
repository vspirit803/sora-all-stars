import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@core": path.resolve("../core/src/"),
    },
  },
  server: {
    host: true,
  },
});
