import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// VITE_BASE=./ untuk build pratinjau yang dibuka dari subfolder (bersama VITE_HASH_ROUTER=1). Default "/".
const base = process.env.VITE_BASE || "/";

export default defineConfig({
  base,
  define: { __CLAU_BASE__: JSON.stringify(base) },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
