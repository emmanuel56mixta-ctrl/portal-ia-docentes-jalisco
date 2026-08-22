# IA para Docentes · versión móvil

## Cambios incluidos

- Inicio sin buscador en anchos móviles, con tarjetas completas como accesos y composición asimétrica.
- Constructor pedagógico consolidado en un solo bloque móvil: cuatro Gemas en un carrusel horizontal y acceso directo a la Gema seleccionada.
- Navegación inferior simplificada: Inicio, Ruta, Gemas y Ayuda.
- Ruta de cuatro Gemas, todas disponibles desde el primer acceso.
- Transición orgánica de tarjeta a pantalla completa (430 ms) y alternativa sin movimiento para `prefers-reduced-motion`.
- Dos tarjetas de orientación antes de abrir cualquier Gema en Gemini.
- Banco de Gemas y Kit convertidos a accesos directos; el Kit incluye seis recursos.
- Banco de Gemas actualizado con la fotografía fija del docente aprobado en Inicio y su video de 4 segundos dentro del Banco.
- Enlaces externos abiertos en otra pestaña para mantener disponible el portal.

## Configuración de Gemas

Los destinos están centralizados en `src/lib/content.ts`, dentro de `GEM_ACCESS`.

- Diagnóstico inicial, Programa analítico, Planeación didáctica y Programa LEO usan sus enlaces compartidos de Gemini.
- Evaluación usa temporalmente `https://gemini.google.com/app` y copia una guía inicial al portapapeles. Sustituye ese destino en `GEM_ACCESS.evaluacion.url` cuando esté disponible el enlace institucional de la Gema.
- Los recursos especializados del Banco que aún no tienen URL propia copian su guía y abren Gemini en una pestaña nueva.

## Verificación

- TypeScript: correcto.
- ESLint: sin errores (permanece una advertencia preexistente en autenticación).
- Compilación Vite/Nitro: correcta.
- QA visual e interacción: 320, 390 y 430 px; sin desbordamiento horizontal.
- Comprobaciones: 1 bloque de Constructor con 4 posiciones deslizables, 6 accesos adicionales en Inicio, 4 accesos sin bloqueo en Ruta, 10 accesos en Banco, 6 en Kit y ambas orientaciones previas visibles.
- El video del Banco carga, reproduce automáticamente sin audio y conserva una duración exacta de 4 segundos.

El paquete base conserva seis fallos preexistentes en las pruebas del plugin PWA de Grok; los archivos de ese plugin y sus pruebas no fueron modificados.
