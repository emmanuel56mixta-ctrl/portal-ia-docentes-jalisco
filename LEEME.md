# Portal "IA para Docentes" · Secretaría de Educación de Jalisco

Prototipo web (HTML/CSS/JS autónomo, sin servidor) para el lanzamiento de un portal
que acerca la inteligencia artificial —Gemini y las **Gemas**— a los docentes de Jalisco,
usando su cuenta institucional **@jalisco.edu.mx**.

Diseño oscuro tipo "academia" con acento de color. Existen **dos versiones completas y paralelas**:

- **Versión 1 (v1):** acento **verde lima** (`#c8f135`). Archivos sin sufijo.
- **Versión 2 (v2):** acento **magenta/naranja Jalisco** (magenta `#f5254f`, naranja `#f98a1e`). Archivos con sufijo `-v2`.

> Aún no se ha decidido cuál versión será la definitiva. Todo cambio debe aplicarse a las DOS.

---

## Cómo abrirlo

Abre **`academia-docente-jalisco.html`** (v1) o **`academia-docente-jalisco-v2.html`** (v2)
haciendo doble clic; se ve en cualquier navegador. **Todos los archivos deben permanecer
juntos en la misma carpeta** (los enlaces entre páginas y las imágenes son rutas relativas).

---

## Mapa de páginas y navegación

Página inicial → (clic) → destino

1. **academia-docente-jalisco[-v2].html** — Página principal (home). Contiene:
   - Barra superior: logo SEJ (izq.) + "IA para Docentes" · "Iniciar sesión" (der.).
   - **Carrusel** hero con 3 imágenes y textos (autoplay, flechas, puntos).
   - Sección **Tutoriales** (2 tarjetas):
     - "Primeros pasos con tu cuenta @jalisco.edu.mx" → **curso-primeros-pasos[-v2].html**
     - "Aula digital / Paso a paso" (imagen de la maestra).
   - Banner **"Del diagnóstico al aula"** (ruta con las Gemas, 4 tarjetas estilo Gemini
     con borde arcoíris) → botón "Explorar la ruta" → **ruta[-v2].html**
   - Sección **Kit de herramientas**: el bloque es clickeable → **gemas[-v2].html**
     + **carrusel de 8 videos**; al hacer clic en una tarjeta se abre una **ventana flotante**
     (crece y gira) con detalle; se cierra con X, clic afuera o Esc.

2. **curso-primeros-pasos[-v2].html** — Detalle del tutorial (estilo curso).
   - Hero con imagen del @jaliscoedu.mx de fondo y texto a la derecha.
   - "Lo que aprenderás", "Programa de estudios" (8 lecciones), barra lateral
     (Detalles, Habilidades, Modelos, Herramientas), "Descripción".
   - Banner inferior **"Mesa de ayuda / Recupera tu cuenta jaliscoedu.mx"**.
   - Lección 1 y botón "Iniciar tutorial" → **leccion-1[-v2].html**

3. **leccion-1[-v2].html** — Vista de lección.
   - **Panel lateral izquierdo con la ruta** de las 8 lecciones (la actual resaltada).
   - Contenido con énfasis en el color de acento, botón "Siguiente lección".
   - Lecciones 2–8 aún apuntan a `#` (pendientes de crear).

4. **gemas[-v2].html** — Catálogo de Gemas (página elaborada).
   - Hero con cluster de íconos + destello Gemini.
   - Panel de pasos "Cómo usar una Gema" (pestañas + copiar enlace).
   - **Gemas por eje al estilo Jalisco:**
     - *Formación del Carácter* (Gema insignia con demo).
     - *Proyectos integradores* (3 sub-gemas).
     - *Programa LEO* (3 sub-gemas).
     - *Matemáticas* (3 sub-gemas).
   - Carrusel de "Ejemplos creados con Gemas".

5. **ruta[-v2].html** — Ruta "Del diagnóstico al aula".
   - Hero + chips + CTA, beneficios, **línea de tiempo de 4 etapas**
     (Diagnóstico → Programa analítico → Planeación → Evaluación),
     tarjetas "Empieza por aquí" y panel de "Detalles de la ruta".

---

## Assets (imágenes)

- `logo-sej.svg` — Logo Secretaría de Educación de Jalisco.
- `hero-1.png` `hero-2.png` `hero-3.png` — Carrusel del home (docentes con laptops / aula / colaboración).
- `cuenta-jalisco.png` — @jaliscoedu.mx en LED **verde** (v1).
- `cuenta-jalisco-naranja.png` — @jaliscoedu.mx en LED **naranja** (v2).
- `curso-hero-naranja.png` — Fondo del hero de detalle (v2).
- `maestra.png` — Maestra dando clase (tarjeta "Aula digital / Paso a paso").
- `kit-herramientas.png` — Cuatro ejes (Formación del Carácter, Proyectos, LEO, Matemáticas).
- `recuperar-bg.png` — Fondo del banner "Mesa de ayuda".

---

## Identidad visual

- **Tipografías:** Archivo (títulos, 800–900) e Inter (texto). Se cargan desde Google Fonts.
- **Fondo:** casi negro `#0a0a0b`. Paneles `#141416`, líneas `#26262a`.
- **Acento v1:** lima `#c8f135`. **Acento v2:** magenta `#f5254f` + naranja `#f98a1e`.
- Los detalles tipo Gemini (borde arcoíris, destello de 4 puntas) están hechos con CSS/SVG.

---

## Pendientes / ideas para continuar

- Crear las **lecciones 2 a 8** y encadenar el botón "Siguiente lección".
- Definir la **versión final** (verde o magenta) y quedarse con una sola.
- Igualar números de lección entre tarjeta y detalle si se desea.
- Poner enlaces reales en botones "Abrir Gema" / "Iniciar sesión" cuando existan.
- Opcional: imagen de fondo real en el hero de `ruta.html`.
- Reemplazar textos/números de ejemplo por los oficiales de la SEJ.

---

## Notas

- Es un **prototipo de front-end**: los botones de acceso/inicio de sesión son visuales.
- El diseño reproduce un **patrón** de layout (academia/catálogo oscuro) con **contenido,
  textos e imágenes propios**; el color verde de la referencia se sustituyó por el acento de Jalisco.
