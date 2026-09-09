# InteractiveHoverButton

El portal publicado es HTML/CSS/JavaScript estático: no tiene package.json, React, TypeScript, Tailwind ni components.json. Los estilos actuales están en la raíz y en bloques style de cada página. No se ha migrado su arquitectura ni instalado dependencias que el portal no ejecutaría.

La integración funcional es /interactive-hover-button.js y /interactive-hover-button.css. Conserva enlaces, eventos y textos dinámicos; soporta foco de teclado y movimiento reducido. No usa imágenes ni requiere estado, proveedores o llamadas a servicios.

Los archivos TSX de esta carpeta reproducen el componente y el demo solicitados como fuente para una futura aplicación React; no se ejecutan en GitHub Pages directamente.

## Configurar una aplicación React por separado

1. En una carpeta nueva, usa `npx shadcn@latest init -t vite` y elige TypeScript. No ejecutes el scaffolding sobre la raíz del portal estático.
2. Sigue la guía oficial https://ui.shadcn.com/docs/installation/vite para Tailwind, su integración con Vite y los alias TypeScript. El CSS global de la aplicación Vite es normalmente src/index.css. Mantén los tokens background, primary y primary-foreground creados por shadcn.
3. En esa aplicación instala `npm install lucide-react clsx tailwind-merge`. React y TypeScript los proporciona el scaffold. shadcn crea la utilidad cn en src/lib/utils.ts.
4. Copia estos TSX a src/components/ui y configura components.json con `aliases.ui: "@/components/ui"` y `aliases.utils: "@/lib/utils"`, donde @ apunta a src. La carpeta components/ui agrupa componentes reutilizables y permite que los imports y el CLI resuelvan una ruta estable; no es un requisito del navegador.
5. Importa el demo en App.tsx. Pasa text, className y propiedades estándar como onClick, disabled o aria-label. Para títulos largos usa `className="w-auto min-w-32 px-6"`.
6. Ejecuta el build y las comprobaciones de accesibilidad antes de sustituir páginas del portal. El TSX original duplica texto visual: en producción conviene ocultar la copia a lectores de pantalla y añadir foco visible/movimiento reducido como hace la adaptación estática.

No se necesitan fotografías de Unsplash: el único recurso gráfico del componente React es ArrowRight de lucide-react.
