# Simulador GNV 2025 (Vite + React + TS)

Cotizador simple basado en tabla (Actividad → Plazo → Modalidad) con % Recaudo.
- Sin dependencias visuales (shadcn) para facilitar despliegue en GitHub Pages o Vercel.
- Datos embebidos en `src/App.tsx` (const `TARIFF`).

## Correr local
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## GitHub Pages
En `vite.config.ts` define:
```ts
export default defineConfig({ plugins:[react()], base:'/NOMBRE_DEL_REPO/' })
```
Luego compila y publica `dist/` con gh-pages o Actions.
