# Entrega consolidada a DTI · Docente IA

Fecha: 20 de noviembre de 2026.

Destino: https://apprende.jalisco.gob.mx/docente-ia/
Referencia visual: https://emmanuel56mixta-ctrl.github.io/portal-ia-docentes-jalisco/academia-docente-jalisco-v2.html
Constructor: https://emmanuel56mixta-ctrl.github.io/portal-ia-docentes-jalisco/ruta-v2.html#niveles

## Alcance de la entrega

Esta entrega reúne la actualización de Servicios Digitales compartida el 13 de octubre y los cambios posteriores del Constructor, sus gemas, la experiencia móvil y el módulo de métricas. Emmanuel reporta que la actualización anterior sigue pendiente de integración en el portal oficial. No se ha identificado aquí el commit exacto que DTI tiene instalado.

- Actualización pendiente incluida: `328a221f92b2d1c606b86d5cc9ca9e326e2b7f10`.
- Código actual verificado: `b50d9552d7c80f485cb7e40df19bd59e62155659`.
- El código actual incluye la actualización anterior y 11 commits posteriores, con 60 archivos añadidos o modificados respecto de aquella referencia.
- El inventario del código verificado contiene 223 archivos. `MANIFIESTO_ENTREGA_DTI_2026-11-20.json` registra rutas, tamaños, SHA y los cambios posteriores. Los dos documentos de consolidación se incorporan después de ese inventario.

**Usar el repositorio completo de esta entrega como fuente de integración.** El ZIP `Constructor_Gemas_Publicas_2026-11-20.zip` es una entrega parcial del Constructor; no contiene por sí solo todos los cambios pendientes de Servicios Digitales. El ZIP del complemento de métricas contiene únicamente ese complemento.

## Cambios que deben integrarse juntos

| Bloque | Comportamiento esperado |
|---|---|
| Primeros pasos | Primero «Tu cuenta y servicios digitales», seguido del curso de herramientas de inteligencia artificial. Mismo acceso en computadora y móvil. |
| Servicios Digitales DTI | Recuperación de correo y contraseña, apoyo de NOVA, creación y activación de cuentas y solicitud para grupos. Tarjetas organizadas por trámite, destinatario y acción. |
| Guías oficiales | Nueve manuales y un formato de solicitud, incluidos credenciales y acceso a PrecepThor. Los diez PDF permanecen enlazados a sus URLs institucionales. |
| Promoción y navegación | Banner de Servicios Digitales con entrada desde la derecha, botón «Acceder» y cierre con X, Escape o clic exterior. Fuentes Archivo e Inter. Se conserva la retirada de la invitación vencida del Aula Google, las redirecciones antiguas de recuperación y los accesos de navegación actualizados. |
| Constructor por niveles | Educación integral —inicial, especial, indígena y física—, preescolar, primaria, secundaria y media superior. Los perfiles disponibles se adaptan a cada servicio y función. |
| Funciones y gemas | 26 constructores y 26 gemas creadas, con 42 combinaciones de perfil y función. En gestión de preescolar, primaria y secundaria se distingue Dirección, Supervisión y Jefatura de Sector. Las gemas están configuradas para lectura por quien tenga el enlace; Gemini puede requerir iniciar sesión. |
| Recorrido móvil | Un acceso «Constructor pedagógico» desde el inicio; después nivel, perfil y espacio de trabajo. Etapas dentro del Constructor, tarjetas compactas y área de lectura amplia. |
| Continuidad | Atrás, recarga, enlaces directos y opción de continuar recuperan perfil y etapa. El navegador recuerda la selección y las marcas de revisión; no almacena los documentos del docente. |
| Trabajo con Gemini | La acción principal intenta copiar la indicación y abrir la gema. El usuario la pega en Gemini. Hay alternativas para copiar hacia una conversación existente y para bloqueo de pestañas o portapapeles. |
| Diseño | Imagen original del Constructor en tarjeta con imagen arriba y texto abajo en móvil, tonos suaves por sección, bisel brillante y nombres de nivel a 16 px en móvil y 18 px en escritorio. |
| Métricas | Complemento WordPress 0.2.0 preparado para contar visitas y acciones del Constructor. Sigue desactivado hasta que DTI instale, configure y pruebe el receptor. |

La guía permanente del Aula Google, Formación del carácter y las otras secciones existentes permanecen en el repositorio. Conservar sus páginas, recursos y enlaces al integrar el conjunto.

## Archivos esenciales y dependencias

| Grupo | Archivos o carpetas |
|---|---|
| Inicio y selección de dispositivo | `index.html`, `device-router.js`, `academia-docente-jalisco-v2.html`, `academia-docente-jalisco-mobile-demo.html`, `academia-docente-jalisco.html`. Usar las versiones actuales del repositorio, que ya combinan los dos bloques de cambios. |
| Servicios Digitales | `servicios-digitales-dti.html`, `servicios-digitales-dti.css`, `servicios-dti-promocion.js`, `servicios-dti-promocion.css`, `assets/dti/`, `cuenta-jalisco-naranja.png`, `recuperar-cuenta.html`, `recuperar-cuenta-v2.html`. |
| Constructor | `ruta-v2.html`, `constructor-recorrido.js`, `constructor-recorrido.css`, `constructor-border-beam.css`, `constructor-gemas-config.js`, `constructor-uso.js`, `constructor-pedagogico-inicio.png`, `assets/constructor-niveles/`. |
| Catálogo y respaldo de gemas | `constructor-catalogo.json`, `gemas-creadas.json`, `gemas-creacion.json`, `gemas/`, `preparar-gemas.html`. Mantener los enlaces reales de la configuración; las instrucciones y el administrador son respaldo de mantenimiento. |
| Compatibilidad y recursos compartidos | `ruta-general.html`, navegación compartida, logotipos, estilos de accesibilidad, botones y demás recursos del repositorio. Conservar las rutas anteriores que se mantengan enlazadas. |
| Contador | `wordpress/docente-ia-contador/docente-ia-contador.php`, versión 0.2.0. Se instala como complemento de WordPress; no se ejecuta en GitHub Pages. |

Orden de scripts del Constructor: configuración de gemas, módulo de medición, catálogo incluido en el HTML y controlador del recorrido. Conservar el orden del HTML entregado. Versiones actuales: `constructor-recorrido.css?v=2`, `constructor-recorrido.js?v=1`, `constructor-border-beam.css?v=2`.

Servicios Digitales conserva `servicios-digitales-dti.css?v=20261013-4` y `servicios-dti-promocion.css/js?v=20261013-3`; el script de promoción se carga con `defer`. La promoción no aparece dentro del centro de ayuda.

## Integración en el portal oficial

1. Descargar el repositorio completo de la revisión entregada y respaldar la instalación vigente. Adaptar los componentes al WordPress de APPrende; el ZIP del repositorio no es un tema ni un complemento instalable completo.
2. Incorporar conjuntamente los cambios pendientes de Servicios Digitales y los nuevos del Constructor, incluyendo HTML, CSS, JavaScript, imágenes y recursos compartidos.
3. Adaptar `href`, `src`, destinos en JavaScript y redirecciones a las rutas reales de APPrende. Mantener los fragmentos del Constructor: `#niveles`, `#perfiles/...`, `#trabajo/...` y `#cierre/...`.
4. Conservar Archivo e Inter, SVG, atributos de accesibilidad, elementos `dialog` y `details`, y el orden de carga. Comprobar que el editor, la política de seguridad y los optimizadores de WordPress no eliminen o alteren estos elementos.
5. Conservar las URLs institucionales de los PDF. No se incluyeron copias locales de esos documentos en el repositorio.
6. Instalar y configurar por separado el complemento de métricas, siguiendo el apartado siguiente.
7. Limpiar cachés, validar la versión de computadora y celular y confirmar las URLs definitivas publicadas.

## Métricas y acceso de Emmanuel

El contador está preparado, con `measurement.enabled: false` y receptor vacío. No existen conteos previos generados por este módulo. Activarlo después de instalar y verificar el receptor de WordPress.

El reporte muestra los últimos 30 días: visitas, nivel o servicio, perfil, etapa, función y aperturas hacia Gemini. Cuenta visitas y acciones; no personas únicas, finalización de actividades, conversaciones ni respuestas de Gemini. El módulo no envía nombres, correos, texto libre ni identificadores de visitantes. Los registros del servidor se administran por separado.

DTI debe:

1. Instalar o actualizar el complemento 0.2.0 en un entorno de pruebas y comprobar su tabla de conteos.
2. Obtener la URL real del receptor `wp-json/docente-ia/v1/event`, alojado en el mismo origen HTTPS que el Constructor. Configurar `measurement.endpoint` y activar `measurement.enabled` en `constructor-gemas-config.js`.
3. Habilitar una cuenta individual para Emmanuel con el perfil **Consulta de métricas Docente IA** (`dia_metrics_viewer`). Ese perfil concede `read` y `dia_view_metrics`, sin permisos de edición de páginas ni administración del portal. No se ha creado ninguna cuenta desde esta entrega.
4. Entregar la liga completa de acceso al reporte. Su ruta administrativa relativa es `admin.php?page=dia-usage`; no se debe deducir la raíz de WordPress a partir de la URL pública de Docente IA. El perfil de consulta se dirige al reporte al iniciar sesión.
5. Verificar que Emmanuel pueda consultar el reporte y que una cuenta sin el permiso específico no pueda abrirlo, incluso mediante URL directa. Comprobar también que los administradores conserven el acceso.
6. Comprobar eventos reales desde la versión oficial y confirmar a Emmanuel la activación y la liga. Las visitas del prototipo de GitHub Pages no se registran en ese receptor.

## Validaciones y aceptación

Comprobaciones realizadas en la referencia:

- Se verificó que los 18 archivos críticos de ambos bloques existen en el árbol completo; se identificaron los diez PDF institucionales enlazados.
- Los 26 enlaces de gemas se verificaron desde otra cuenta al crearlos. Las 42 combinaciones de perfil y sus cuatro etapas tienen rutas recuperables y una gema configurada.
- 11 pruebas JavaScript correctas del recorrido y la medición. Pruebas de navegador en 320, 390, 430 y 1280 px, incluyendo regreso, recarga, revisión parcial, alternativas de copia/apertura y ausencia de desbordamiento horizontal en los casos revisados.
- Nombres de nivel ampliados comprobados en móvil y escritorio.

Pendiente en DTI:

- Validar en la instalación real de WordPress el complemento PHP, la actualización de permisos y el inicio de sesión de la cuenta de consulta. Este entorno no cuenta con PHP ni WordPress; esas pruebas no se han ejecutado aquí.
- Validar en APPrende Inicio, Servicios Digitales, los diez documentos, los accesos antiguos de recuperación, Aula Google y el Constructor completo.
- Probar al menos un móvil Android y uno iOS reales, incluidas las restricciones de copia y apertura de Gemini. Las comprobaciones previas de tamaño se hicieron con viewport simulado.
- Confirmar publicación de los dos bloques, activar la medición y entregar a Emmanuel su acceso al reporte.

## Documentación complementaria

- [Actualización pendiente de Servicios Digitales](ACTUALIZACION_DTI_2026-10-13.md).
- [Integración del Constructor y del contador](INTEGRACION_CONSTRUCTORES.md).
- [Gemas creadas y enlaces](GEMAS_CREADAS.md).
- [Inventario del código verificado](MANIFIESTO_ENTREGA_DTI_2026-11-20.json).
