# Simulador GNV (Vite + React + TS)

Cotizador rápido con actividad → plazo → modalidad y tabla de tarifas embebida.

## Cómo correr local
```bash
npm install
npm run dev
```

## Deploy en Vercel
1) Crea un repo en GitHub y sube este código:
```bash
git init
git add .
git commit -m "init simulador gnv"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
git push -u origin main
```
2) Entra a https://vercel.com → New Project → importa tu repo → Deploy.

## Deploy en GitHub Pages (opcional)
- Instala gh-pages y publica `dist`.
