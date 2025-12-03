import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Si publicas en GitHub Pages, descomenta y pon tu repo:
// export default defineConfig({ base: "/NOMBRE_DEL_REPO/", plugins: [react()] });
export default defineConfig({
  plugins: [react()]
});
