# Constructor por niveles: integración preparada

## Estado de la entrega

- Diseño aprobado incorporado a `ruta-v2.html`: cinco secciones principales, cuatro áreas dentro de Integral y 26 constructores.
- Una gema por constructor, cada una con cuatro etapas. Gestión adapta su alcance a la función elegida; no requiere tres gemas duplicadas.
- Las 26 instrucciones están en `gemas/`, el catálogo en `constructor-catalogo.json` y el asistente de carga en `preparar-gemas.html`.
- **No se han creado ni verificado las nuevas gemas en Gemini.** Sus enlaces son `null`; el portal muestra esos accesos como no disponibles. No hay enlaces ficticios.
- `ruta-general.html` conserva la página actual y sus cuatro enlaces originales como alternativa funcional. Los enlaces a esa página no han sido verificados dentro de la cuenta institucional.
- La medición está implementada pero desactivada hasta instalar y probar el receptor de WordPress. No hay conteos históricos ni demostrativos que se presenten como reales.
- Esta entrega es un borrador para integrar; no sustituye por sí sola la instalación de WordPress que administra DTI.

## Crear y enlazar las gemas

1. Abrir `preparar-gemas.html` y comprobar en Gemini la cuenta institucional indicada por Emmanuel.
2. Elegir un constructor. Copiar su nombre e instrucciones en una nueva gema. Guardar.
3. Incorporar únicamente fuentes oficiales pertinentes, verificando vigencia y permisos. Los enlaces de las instrucciones no equivalen a archivos cargados en Conocimientos. No subir datos de alumnado.
4. Probar las cuatro etapas. Para gestión probar alcance de escuela, zona y sector; ajustar si alguna función no corresponde al servicio. Para indígena comprobar que pide nivel y lengua; para especial que parte de barreras y apoyos; para media superior que solicita el programa del subsistema.
5. Compartir con acceso de lector según el alcance permitido por la cuenta y la política institucional. Comprobar el enlace desde otra cuenta educativa antes de marcarlo como listo. No ampliar automáticamente el acceso a público ni dar edición.
6. Registrar cada enlace y exportar `constructor-gemas-config.js`. Sustituir el archivo homónimo. Conservar la configuración de medición si DTI ya la activó; la exportación de esta página la deja apagada por seguridad operativa.
7. Verificar los 26 accesos, las etapas, la navegación de regreso y la versión móvil antes de publicar el reemplazo de `ruta-v2.html`.

El portal copia una indicación de etapa que el usuario debe pegar en Gemini. No asume parámetros de URL no documentados ni transfiere automáticamente texto a Gemini. Una nueva conversación no hereda el trabajo anterior: guardar y pegar el resumen para continuar.

## Qué contará

| Evento | Significado | Límite |
|---|---|---|
| `page_view` | Apertura/carga del Constructor por niveles | Una recarga cuenta otra visita; no equivale a una persona |
| `section_open` | Apertura de sección o área | Puede haber varias por visita |
| `constructor_open` | Selección de constructor | No prueba que se haya usado la gema |
| `stage_select` | Cambio de etapa | No equivale a completar la etapa |
| `role_select` | Cambio de función en Gestión | No identifica al visitante |
| `gem_open` | Clic final para salir hacia una gema configurada | No registra conversación, respuestas ni permanencia en Gemini |

El módulo manda solo evento, sección, tipo de constructor, número de etapa y función cuando corresponde. No manda nombres, correos, texto libre, URL, parámetros de búsqueda, referente o identificadores persistentes. No usa cookies ni almacenamiento local para identificar visitas. Respeta Do Not Track y Global Privacy Control. Esto limita el conteo: no permite conocer personas únicas, y bloqueadores, errores o bots afectan las cifras.

## Activación en WordPress por DTI

1. En un entorno de pruebas, instalar la carpeta `wordpress/docente-ia-contador` como plugin de WordPress y activarlo. Usar una cuenta con permisos para instalar plugins. No instalar sobre producción sin validar compatibilidad y respaldo.
2. La activación crea una tabla propia de conteos agregados diarios. No modifica tablas de usuarios. El informe aparece en **Herramientas → Uso del Constructor**, restringido a administradores.
3. Comprobar la zona horaria de WordPress (preferentemente America/Mexico_City) y el prefijo de instalación. Obtener la ruta real del receptor: `https://HOST/RUTA-WORDPRESS/wp-json/docente-ia/v1/event`.
4. En `constructor-gemas-config.js`, activar `measurement.enabled` y poner esa ruta en `measurement.endpoint`. Debe estar en el mismo origen HTTPS que la página: no se envían eventos desde GitHub Pages a WordPress.
5. Configurar el formulario/página o plantilla WordPress con los tres recursos: `constructor-gemas-config.js`, `constructor-uso.js` y el contenido del Constructor. Si se incrusta en un iframe de otro origen, esta versión de la medición no funcionará; alojar la página y receptor en el mismo origen.
6. Probar desde una ventana sin sesión: una carga genera una visita; abrir Primaria genera sección; elegir Docente genera constructor; cambiar a Evaluación genera etapa; hacer clic final en una gema configurada genera salida. Revisar el aumento correspondiente en el informe. No confundir la apertura del aviso con la salida efectiva.
7. Comprobar que los cuerpos con campos extra, nombres de evento inventados, niveles fuera del catálogo y combinaciones incompatibles se rechazan. Comprobar que un visitante no puede leer el informe.
8. Revisar el aviso institucional de privacidad y los registros del servidor por separado. Aunque este módulo no guarda IP, el hosting puede conservarla en logs. Establecer conservación de agregados y protección ante abuso en el servidor; el filtro de origen no detiene bots que falsifiquen encabezados.

El receptor usa incremento atómico para evitar pérdidas por visitas simultáneas. No identifica personas ni promete exactitud frente a robots. El navegador elimina doble clic inmediato y limita eventos por carga, pero esos límites no sustituyen controles del servidor.

## Validación y pendientes

- Pruebas de JavaScript: `node --test tests/measurement.test.cjs`.
- Revisión sintáctica de scripts incluidos y correspondencia de 26 configuraciones.
- Pendientes: prueba visual en navegador, creación y prueba de gemas, validación PHP/WordPress en un servidor de pruebas e instalación/configuración del receptor. No había PHP, WordPress ni control de navegador disponibles en la sesión de preparación.
- `ruta-general.html` mantiene los enlaces y código de la versión de GitHub consultada al preparar la entrega. La carpeta local `site-edit` contenía otros cambios; esta entrega no los sobrescribe.

## Fuentes de preparación (consultadas el 20 de noviembre de 2026)

- SEP, programas sintéticos: https://educacionbasica.sep.gob.mx/programas-de-estudio-para-la-educacion-preescolar-primaria-y-secundaria-programas-sinteticos-de-las-fases-1-a-6/
- Google, crear y gestionar Gems: https://support.google.com/gemini/answer/15146780?co=GENIE.Platform%3DDesktop&hl=es
- Google, compartir Gems y niveles de acceso: https://support.google.com/gemini/answer/16504957?co=GENIE.Platform%3DDesktop&hl=es-419
- WordPress, endpoints: https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/
- WordPress, tablas de plugins: https://developer.wordpress.org/plugins/creating-tables-with-plugins/

La disponibilidad y los nombres de funciones de Gemini pueden cambiar según tipo de cuenta. Verificar la interfaz de la cuenta educativa antes de crear o compartir.
