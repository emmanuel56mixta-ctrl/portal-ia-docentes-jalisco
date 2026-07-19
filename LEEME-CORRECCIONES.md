# Correcciones P0 aplicadas (copia — el original no fue modificado)

Fecha: 18 jul 2026. Aplicadas por igual a v1 (lima) y v2 (magenta/naranja), como exige el LEEME original.

## 1. Contraste (WCAG 2.1 AA)
- `--dim` pasó de `#6c6c74` (3.54:1 sobre panel, fallaba) a `#8a8a94` (5.38:1, cumple). Afecta descripciones de tarjetas en las 10 páginas.
- **Solo v2:** los botones con fondo magenta/degradado (`.cta`, `.btn`, `.btn-next`, `.s3btn`, `.badge-price`) cambiaron su texto de blanco (3.99:1, fallaba) a `#0a0a0b` (4.96:1 en el extremo magenta, 8.18:1 en el naranja; cumple).

## 2. Semántica y teclado
- Flechas del carrusel hero: `<div>` → `<button>` con `aria-label`.
- Puntos (dots) del carrusel: `<span>` → `<button>` con `aria-label` "Ir a la diapositiva N".
- "Iniciar sesión" en la barra superior: `<div>`/`<span>` → `<a href>` enfocable.
- Tarjetas de video: ahora tienen `tabindex="0"`, `role="button"` y responden a Enter/Espacio.
- Flechas del carrusel de ejemplos (gemas): `aria-label` añadido.

## 3. Modal de video (home)
- Al abrir, el foco pasa al botón de cierre; al cerrar, regresa al elemento que lo abrió.
- Trampa de foco con Tab/Shift+Tab dentro del modal (Esc ya funcionaba).

## 4. Carrusel hero (WCAG 2.2.2)
- Nuevo botón de pausa/reanudar (abajo-izquierda) con estado accesible.
- Si el sistema tiene `prefers-reduced-motion`, el autoplay arranca pausado.

## 5. Movimiento reducido
- Regla CSS global `@media (prefers-reduced-motion: reduce)` en las 10 páginas: anula transiciones y animaciones (incluida la rotación del modal).

## 6. Dominio de cuenta unificado
- Dominio unificado a `@jaliscoedu.mx` en todo el sitio (verificado: es el dominio institucional real de la SEJ; la recuperación de cuenta se realiza en mi.sej.jalisco.gob.mx) (texto, altos y encabezado "Recupera tu cuenta"). Un solo dominio en todo el sitio reduce confusión y riesgo de phishing.

## Pendiente (P1/P2, no incluido en esta pasada)
Cuadrar lecciones/duraciones entre home y curso, tipografía mínima 12–13px, breadcrumbs consistentes, renombrar `--lime`→`--accent`, avisos de privacidad junto a "Abrir Gema", búsqueda/filtros en el catálogo.

## Nuevas adiciones (post-P0)
- **Carrusel orbital en gemas[-v2].html:** las 7 cards oficiales (Diagnóstico, Carácter, Proyectos, LEO, Matemáticas, Planeación, Evaluación) giran en 3D alrededor de la Gema central (60 s/vuelta, pausa al hover, respeta movimiento reducido).
- **Página nueva recuperar-cuenta[-v2].html (Mesa de Ayuda):** se abre desde el botón "Recuperación de cuenta" del banner en curso-primeros-pasos. Incluye triaje de 3 casos con enlaces a los trámites oficiales de Mi SEJ (recuperar usuario / contraseña / ticket NOVA), checklist previa (CURP, correo alternativo), sección "Esto es lo que recuperas" (APPrende Digital, Mi Muro, Google Workspace, Gemini/Gemas — verificado contra fuentes oficiales) y bloque antiphishing. Sin formularios propios: nunca captura CURP ni datos personales en el prototipo.
- **Banner Mesa de Ayuda (curso):** texto acotado para no invadir la foto; dominio corregido a JALISCOEDU.MX.
