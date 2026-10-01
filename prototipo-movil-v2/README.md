# IA para Docentes · prototipo móvil v2

Esta carpeta contiene la experiencia móvil como proyecto independiente. No sustituye ni modifica las páginas HTML de la versión web ubicadas en la raíz del repositorio.

## Experiencia incluida

- Portada móvil en formato mosaico, sin buscador redundante.
- Un solo bloque **Constructor pedagógico**, desplazable horizontalmente entre Diagnóstico inicial, Programa analítico, Planeación didáctica y Evaluación.
- Acceso a la Gema seleccionada después de dos orientaciones breves de uso.
- Ruta pedagógica con las cuatro Gemas disponibles desde el inicio.
- Banco de Gemas y Kit de herramientas como accesos completos.
- Fotografía fija del docente en la portada del Banco y video de cuatro segundos en su página interna.
- Navegación inferior con Inicio, Ruta, Gemas y Ayuda.

## Desarrollo

```bash
npm ci
npm run dev
```

## Verificación

```bash
npm run typecheck
npm run build:dev
```

La interfaz fue verificada en 320, 390 y 430 px sin desbordamiento horizontal. La bitácora funcional completa se encuentra en `IMPLEMENTACION-MOVIL.md`.
