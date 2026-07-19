# Bitácora de traspaso · Portal "IA para Docentes" · SEJ Jalisco

Última actualización: 19 de julio de 2026. Este documento permite retomar el proyecto en otro chat **sin perder contexto**. Léelo completo antes de modificar nada.

---

## 1. Qué es este proyecto

Prototipo web estático (HTML/CSS/JS autónomo, sin servidor) del portal que acerca IA —Gemini y las **Gemas**— a los docentes de Jalisco con su cuenta institucional **@jaliscoedu.mx** (dominio verificado contra Mi SEJ; NO usar jalisco.edu.mx). Existen **dos versiones paralelas completas**: v1 acento lima `#c8f135` (archivos sin sufijo) y v2 acento magenta `#f5254f` + naranja `#f98a1e` (sufijo `-v2`). **Todo cambio debe aplicarse a ambas.** Aún no se decide la definitiva; la recomendación de auditoría fue v2 usando naranja para texto de acento.

## 2. Mapa de páginas

| Página | Contenido |
|---|---|
| `academia-docente-jalisco[-v2].html` | Home: hero carrusel (3 slides, textos sobre IA con criterio docente al centro), sección "Primeros pasos" (2 cards con botón gris "Explorar ▸": card 1 → recuperar-cuenta, card 2 → curso-herramientas-ia), banner "Del diagnóstico al aula" (4 pasos + CTA → ruta), "Kit de herramientas" (imagen túnel neón `kit-herramientas-neon.jpg` + abanico 3D de 7 cards `hd-*.jpg` con paralaje al scroll: Carácter al centro-frente, laterales hacia atrás con opacidad decreciente; botón gris en la descripción → gemas), carrusel de 8 videos con modal |
| `gemas[-v2].html` | "Banco de recursos": hero con carrusel orbital 3D (7 cards `card-*.png` girando 60s alrededor del emblema `gema-central.jpg`, pausa al hover), título "Recursos impulsados por IA...", buscador estilo Gemini (glow, ×, flecha sólida) que enruta a APPrende Digital (`/?s=`) SIEMPRE en pestaña nueva, chips a categorías reales de APPrende, panel "Cómo utilizar una Gema" (4 pasos con mini-ventanas réplica que se animan SOLO al hover con zoom interno 1.07: banco/login Google/chat Gemini/documento) + leyenda de uso responsable, 4 ejes con textos pedagógicos revisados (lenguaje de sugerencia, nunca de producto terminado), banner del Banco de Gemas (imagen docente `banco-banner.jpg`, texto derecha) → banco-gemas, ejemplos "Lo que puedes elaborar" |
| `banco-gemas[-v2].html` | Banco de 50 Gemas reales (del Excel) estilo showcase Higgsfield: búsqueda instantánea sin acentos, chips por eje con contador, cards con thumb degradado por eje, etiqueta principal, campo formativo (LEO→Lenguajes, Matemáticas→Saberes y Pensamiento Científico, Valores→De lo Humano y lo Comunitario, Proyectos→Interdisciplinario) y stats random >500 (👁 vistas, ⚡ usos). Ligas reales a gemini.google.com |
| `ruta[-v2].html` | Hero banner (maestra `ruta-banner.jpg`, solo kicker + título abajo), caja de aviso con ícono amarillo (Gemas no sustituyen al docente), **ruta interactiva**: instrucción 1 Abre→2 Genera y guarda→3 Vuelve, selector "¿En qué etapa vas?" (tabs, solo una etapa abierta), 4 paneles con Antes de entrar/Realízala/Al terminar/nota 💾 guarda, botón "Abrir Gema..." que abre MODAL (realiza-guarda-regresa + Abrir/Cancelar), conexiones "Continuar con..." entre etapas. Gemas de etapas aún en `#` |
| `curso-primeros-pasos[-v2].html` | Detalle del tutorial (8 lecciones), banner Mesa de Ayuda con `mesa-ayuda-llave.jpg` → recuperar-cuenta |
| `leccion-1[-v2].html` | Lección 1 con panel lateral (lecciones 2–8 en `#`) |
| `curso-herramientas-ia[-v2].html` | Trayecto autogestivo (Gemini/Gemas/NotebookLM), estilo Higgsfield Academy: hero glow + tiles, checklist, temario 6 lecciones (`#`), sidebar chips |
| `recuperar-cuenta[-v2].html` | Mesa de Ayuda: hero llave `mesa-ayuda-llave.jpg`, triaje 3 cards con fotos (`tri-usuario/password/ticket.jpg`) → trámites oficiales Mi SEJ, "Tu cuenta @jaliscoedu.mx es la llave:" (6 ventajas verificadas), bloque antiphishing |

## 3. Sistema de diseño

- Tipos: Archivo (títulos 800–900) + Inter (texto). Fondo `#0a0a0b`, panel `#141416`, panel-2 `#1b1b1e`, línea `#26262a`, muted `#9a9aa2`, dim `#8a8a94` (corregido de #6c6c74 por contraste AA).
- **Fondo global (16 páginas):** retícula gris 44px (blanco 3.4%) + glow superior fixed — v2 `rgba(245,37,79,.24)`, v1 `rgba(200,241,53,.17)` en radial 60%×42% top-center.
- **Botones CTA: gris claro sólido `#ececee` con texto negro** (decisión del usuario, aplica a todo el sitio). Botón flecha del buscador: acento sólido.
- Textos de lectura crecidos +2px en todo el sitio (público 40+); títulos/subtítulos sin tocar.
- Footer institucional (16 páginas): logo SEJ, columnas Portal + Institucional (con Transparencia), redes FB/X/YT reales, soporte **alfadireccion.sej@jalisco.gob.mx**, © 2026. Falta logo Gobierno de Jalisco (pedir asset).
- Accesibilidad instalada: focus-visible, aria en controles, modales con gestión de foco, `prefers-reduced-motion` global, enlaces externos con ↗ y "pestaña nueva", breadcrumbs semánticos.
- Colores por eje (banco y minis): Valores `#f5254f`, Proyectos `#a142f4`, LEO `#18b7a4`, Matemáticas `#f98a1e`.

## 4. Assets (imágenes en esta carpeta)

`logo-sej.svg` · `hero-1/2/3.png` (carrusel home) · `cuenta-jalisco[-naranja].png` · `curso-hero-naranja.png` · `maestra.png` · `kit-herramientas.png` (original, ya no se usa en home) · `kit-herramientas-neon.jpg` (túnel neón kit) · `card-{caracter,diagnostico,evaluacion,leo,matematicas,planeacion,proyectos}.png` (7 cards del carrusel orbital) · `hd-*.jpg` (7 cards HD con tagline, abanico 3D del home) · `gema-central.jpg` (emblema leones+árbol, centro del orbital) · `mesa-ayuda-llave.jpg` (llave @jaliscoedu.mx: hero recuperar-cuenta y banner curso) · `mesa-ayuda-hero.png` (mujer, ya sin uso) · `banco-banner.jpg` (docente, banner del banco en gemas) · `ruta-banner.jpg` (maestra, hero de ruta) · `tri-usuario/password/ticket.jpg` (fotos triaje) · `recuperar-bg.png` (original sin uso).

## 5. Datos

- `datos/50_Gemas_Ligas_para_Compartir.xlsx`: fuente del banco (No., Nombre, Eje, Etiquetas, Liga, Acceso). ⚠️ Ligas compartidas desde cuenta personal emmanuel56mixta@gmail.com — **migrar a cuenta institucional antes de publicar**.
- Vistas/usos del banco: generados con `random.seed(50)`, rango 520–9,800, usos < vistas.
- Correo soporte oficial: alfadireccion.sej@jalisco.gob.mx. Recuperación: mi.sej.jalisco.gob.mx (recuperar_cuenta / recuperar_password / registro / ayuda·NOVA / preguntas_frecuentes).
- Buscador de recuperar-cuenta eliminado (decisión); el de gemas enruta por keywords a Mi SEJ ("crear cuenta"→registro, "contraseña"→password, etc.)... **NOTA: ese router vive en recuperar-cuenta? NO — fue eliminado. El buscador vigente es el de gemas → APPrende `/?s=`.**

## 6. Decisiones editoriales clave (no revertir sin razón)

1. Lenguaje pedagógico: las Gemas **sugieren**, el docente **decide** ("Propuesta generada. Revísala y adáptala…"). Nada de "listo para tu grupo" ni soluciones paso a paso en matemáticas.
2. gemas.html = página general de **recursos** (no solo Gemas); botones "Explorar recurso". El banco sí es específico de Gemas.
3. "Iniciar sesión" eliminado de todas las barras superiores.
4. Sin capturar datos personales en el prototipo (ni CURP ni formularios propios); todo canaliza a sitios oficiales.
5. Home "Del diagnóstico al aula" mantiene las 4 cards arcoíris + CTA (se revirtió un banner que lo sustituía).

## 7. Pendientes conocidos

- Conectar Gemas reales a las 4 etapas de la ruta (data-gema="#" en ruta[-v2].html).
- Lecciones 2–8 del curso y las 6 del trayecto (en `#`).
- Logo Gobierno de Jalisco para el footer.
- Decidir versión final (v1/v2) y eliminar la otra.
- Migrar ligas del Excel a cuenta institucional.
- P1/P2 de la auditoría original: breadcrumbs 100% consistentes, renombrar `--lime`→`--accent`, filtros por tipo de recurso cuando lleguen videos/interactivos (patrón ya definido: chips visibles + búsqueda).
- El archivo `docs/informe-PEJ-y-auditoria-UIUX-portal.md` contiene el análisis PEJ + auditoría UX inicial completa.

## 8. Cómo retomar en otro chat

Comparte el ZIP de respaldo y pide: "continúa el proyecto del portal IA para Docentes; lee BITACORA-PROYECTO.md". Con eso el contexto queda completo.
