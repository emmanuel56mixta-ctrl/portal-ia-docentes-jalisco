# Actualización de Docente IA — 13 de octubre de 2026

Portal que se solicita actualizar: https://apprende.jalisco.gob.mx/docente-ia/

Versión de referencia: https://emmanuel56mixta-ctrl.github.io/portal-ia-docentes-jalisco/academia-docente-jalisco-v2.html

Repositorio: https://github.com/emmanuel56mixta-ctrl/portal-ia-docentes-jalisco

## Cambios para el usuario

1. **Primeros pasos:** se coloca primero «Tu cuenta y servicios digitales», con el botón «Resolver mi cuenta». El curso «Aprende a usar las herramientas de IA» permanece como segundo acceso. La versión móvil incluye el mismo acceso en el filtro «Primeros pasos» y en la búsqueda.
2. **Un solo lugar para resolver problemas:** `servicios-digitales-dti.html` reúne la recuperación de contraseña, la recuperación del correo y la ayuda de NOVA; después presenta la creación de cuentas para personal y alumnos, la activación de cuentas de alumnos y la solicitud de cuentas para grupos.
3. **Tarjetas más claras:** cada tarjeta indica el problema o trámite, a quién está dirigida, una explicación breve y un botón con una acción concreta. Se eliminó el bloque introductorio redundante «¿Qué necesitas resolver?» y su buscador/filtros; las opciones se ordenan directamente por necesidad.
4. **Guías completas:** se conservan nueve manuales y un formato oficial. También se incluyen las guías de credenciales del personal, carga de fotografía y descarga de credenciales de alumnos, así como el acceso a PrecepThor. Los documentos se abren en otra pestaña desde APPrende.
5. **Navegación sin duplicados:** «Cuenta y servicios digitales» sustituye el enlace de «Mesa de Ayuda» en los pies de página actualizados. Las direcciones antiguas `recuperar-cuenta.html` y `recuperar-cuenta-v2.html` llevan automáticamente al bloque de recuperación del nuevo centro de ayuda y conservan un enlace de respaldo.
6. **Promoción al entrar al inicio:** una ventana se desliza desde la derecha hasta el centro. Se cierra con la X, con Escape o al hacer clic fuera, regresando hacia la derecha. El botón «Acceder» abre el nuevo centro de ayuda. Respeta la preferencia de movimiento reducido, permite desplazamiento en pantallas pequeñas y devuelve el foco al cerrar. Espera a que la imagen cargue y a que no haya otro diálogo abierto.
7. **Texto final del banner:** «Recupera tu cuenta institucional», «Encuentra guías para solicitar cuentas para grupos de alumnos.», «Servicios Digitales DTI» y «Acceder». Usa texto HTML con Archivo e Inter, las fuentes del portal. Se eliminó «obtener credenciales» del banner; las guías correspondientes permanecen en la sección.
8. **Inicio vigente:** se retiró la carga de la invitación emergente del Aula Google del 9 de octubre, cuya fecha ya pasó. La guía permanente del Aula Google sigue disponible.

Los formularios, contraseñas y datos de las cuentas se gestionan únicamente en los sistemas institucionales enlazados. Esta actualización no añade un formulario ni un servidor de autenticación.

## Archivos y dependencias

| Grupo | Archivos | Función |
| --- | --- | --- |
| Inicio | `academia-docente-jalisco-v2.html`, `academia-docente-jalisco.html`, `academia-docente-jalisco-mobile-demo.html` | Tarjetas, promoción y navegación de computadora/móvil. |
| Centro de ayuda | `servicios-digitales-dti.html`, `servicios-digitales-dti.css` | Página de problemas de acceso, trámites y guías. |
| Promoción | `servicios-dti-promocion.js`, `servicios-dti-promocion.css` | Contenido, enlace, diálogo y animación. |
| Imágenes nuevas | `assets/dti/servicios-dti-hero.png`, `assets/dti/servicios-dti-banner-v3.png` | Encabezado y fotografía de la promoción. En la promoción, CSS muestra únicamente la zona fotográfica derecha; los textos visibles son HTML. |
| Compatibilidad | `recuperar-cuenta.html`, `recuperar-cuenta-v2.html` | Redirecciones a `servicios-digitales-dti.html#resolver-acceso`. |
| Navegación compartida | `aula-google.html`, `banco-gemas.html`, `banco-gemas-v2.html`, `gemas.html`, `gemas-v2.html`, `gemas-mobile-demo.html`, `ruta.html`, `ruta-v2.html`, `curso-herramientas-ia.html`, `curso-herramientas-ia-v2.html`, `curso-primeros-pasos.html`, `curso-primeros-pasos-v2.html`, `leccion-1.html`, `leccion-1-v2.html` | Enlace unificado de cuenta y servicios digitales. |

Se reutilizan las dependencias existentes: `cuenta-jalisco-naranja.png`, los logotipos SEJ/Jalisco, `portal-a11y.css`, `interactive-hover-button.css`, `interactive-hover-button.js` y `device-router.js`. El `index.html` del repositorio conserva su función de redirigir al inicio según el dispositivo.

## Traslado al portal oficial

1. Tomar los archivos del commit de esta actualización y revisar su diferencia con la versión anterior; el repositorio conserva el historial para revertir el cambio si fuera necesario.
2. Incorporar las tarjetas del inicio y publicar el centro de ayuda junto con sus estilos e imágenes. Mantener la estructura relativa de rutas; si WordPress utiliza otras direcciones, adaptar los `href`, `src`, las redirecciones y los destinos definidos en JavaScript a las URLs oficiales.
3. Cargar `servicios-digitales-dti.css?v=20261013-4` en los inicios de computadora y en el centro de ayuda. Cargar `servicios-dti-promocion.css?v=20261013-3` y `servicios-dti-promocion.js?v=20261013-3` en los inicios de computadora y móvil. El JavaScript de promoción debe cargarse con `defer`. El centro de ayuda no muestra el banner.
4. Conservar Archivo e Inter y permitir las imágenes locales y los scripts/estilos en las políticas de seguridad del portal. Revisar que el gestor de contenido no elimine `<dialog>`, los atributos de accesibilidad ni los fragmentos SVG del centro de ayuda.
5. Retirar la carga de `aula-google-invitacion.js` en el inicio y actualizar el enlace compartido del pie de página. Conservar las direcciones antiguas de recuperación mediante las redirecciones indicadas.
6. Limpiar la caché del portal después de publicar. Las guías PDF permanecen en sus URLs oficiales actuales; no requieren copiarse al repositorio.

## Revisión antes de publicar en APPrende

- En computadora y celular, abrir el inicio y comprobar imagen, tipografía, entrada del banner y botón «Acceder».
- Comprobar el cierre con X, clic exterior y Escape, la navegación por teclado y la preferencia de movimiento reducido.
- Abrir «Primeros pasos», revisar que no existan tarjetas duplicadas y comprobar el filtro/buscador móvil.
- Revisar las tres rutas de recuperación/ayuda en Mi SEJ y las diez URLs de documentos.
- Probar ambos enlaces antiguos de recuperación y los enlaces de regreso al inicio.

La integración incluye comprobación automática de rutas y recursos locales, documentos sin duplicados, sintaxis JavaScript y comportamiento del diálogo mediante simulación. La revisión visual en navegador del portal oficial y de la versión móvil debe realizarse en el entorno de publicación de DTI.
