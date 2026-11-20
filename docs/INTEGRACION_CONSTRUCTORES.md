# Constructor por niveles: integración preparada

## Estado de la entrega

- Diseño aprobado incorporado a `ruta-v2.html`: cinco secciones principales, cuatro áreas dentro de Integral y 26 constructores.
- Recorrido móvil reorganizado en niveles, perfiles compactos y espacio de trabajo independiente. Dirección, Supervisión y Jefatura se eligen directamente. Conserva los tonos por sección y el bisel animado.
- 26 gemas cubren los 26 constructores y sus cuatro etapas. En Preescolar, Primaria y Secundaria, Gestión elige entre las gemas de Dirección, Supervisión y Jefatura de Sector; los demás servicios tienen gestión especializada.
- Las 26 configuraciones de gemas están en `gemas-creacion.json`, sus instrucciones en `gemas/`, el catálogo de constructores en `constructor-catalogo.json` y el administrador en `preparar-gemas.html`.
- **Las 26 gemas están creadas y abiertas para cualquier usuario con el enlace, con permiso de lector, por indicación de Emmanuel.** Los 26 enlaces se comprobaron desde otra cuenta. Ver `docs/GEMAS_CREADAS.md` y `gemas-creadas.json`.
- `ruta-general.html` conserva la página actual y sus cuatro enlaces originales como alternativa funcional. Los enlaces a esa página no han sido verificados dentro de la cuenta institucional.
- La medición está implementada pero desactivada hasta instalar y probar el receptor de WordPress. No hay conteos históricos ni demostrativos que se presenten como reales.
- Esta entrega es un borrador para integrar; no sustituye por sí sola la instalación de WordPress que administra DTI.

## Crear y enlazar las gemas

1. Abrir `preparar-gemas.html` y comprobar en Gemini la cuenta institucional indicada por Emmanuel.
2. Elegir un constructor. Copiar su nombre e instrucciones en una nueva gema. Guardar.
3. Incorporar únicamente fuentes oficiales pertinentes, verificando vigencia y permisos. Los enlaces de las instrucciones no equivalen a archivos cargados en Conocimientos. No subir datos de alumnado.
4. Probar las cuatro etapas. Para gestión probar alcance de escuela, zona y sector; ajustar si alguna función no corresponde al servicio. Para indígena comprobar que pide nivel y lengua; para especial que parte de barreras y apoyos; para media superior que solicita el programa del subsistema.
5. Compartir con acceso de lector según el alcance permitido por la cuenta y la política institucional. Comprobar el enlace desde otra cuenta educativa antes de marcarlo como listo. El acceso público de lector de estas 26 gemas fue autorizado expresamente por Emmanuel. No dar edición a los visitantes.
6. Registrar cada enlace y exportar `constructor-gemas-config.js`. Sustituir el archivo homónimo. Conservar la configuración de medición si DTI ya la activó; la exportación conserva la medición definida en el archivo de configuración cargado; si no existe, la deja desactivada.
7. Verificar los 26 accesos, las etapas, la navegación de regreso y la versión móvil antes de publicar el reemplazo de `ruta-v2.html`.

El portal copia una indicación de etapa que el usuario debe pegar en Gemini. No asume parámetros de URL no documentados ni transfiere automáticamente texto a Gemini. Una nueva conversación no hereda el trabajo anterior: guardar y pegar el resumen para continuar.

## Recorrido y continuidad en móvil

- Publicar juntos `ruta-v2.html`, `constructor-recorrido.js`, `constructor-recorrido.css`, `constructor-border-beam.css`, `constructor-gemas-config.js` y `constructor-uso.js`, además de los recursos ya incluidos. Conservar el orden de los scripts del HTML: configuración, medición, catálogo y controlador del recorrido.
- La selección se refleja en el fragmento de URL (`#perfiles/primaria`, `#trabajo/primaria/docente/2`). Atrás, Adelante, recarga y enlaces directos recuperan la pantalla correspondiente.
- `localStorage`, clave `docente-ia-recorrido-v1`, recuerda únicamente el último perfil, función, etapa y marcas de revisión de ese navegador. No guarda documentos, conversaciones ni datos personales; no se envía al contador. Si no está disponible, el recorrido sigue funcionando mediante la URL.
- La acción principal intenta copiar la indicación y abrir la gema. El usuario debe pegarla en Gemini. Si falla el portapapeles o se bloquea la pestaña, aparece una alternativa manual cuyo botón de apertura permanece visible en pantallas pequeñas. “Solo copiar” permite continuar en una conversación existente.
- El cierre muestra solo las etapas marcadas expresamente como revisadas por el usuario. Visitar una etapa no acredita su realización ni implica que el portal haya guardado su resultado.
- Pruebas de interfaz: ventanas de 320 × 568, 390 × 844, 430 × 932 y escritorio. Son pruebas de navegador con viewport reducido; no sustituyen pruebas físicas de Safari/iOS, Android o teclado virtual.

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
5. Configurar la página o plantilla WordPress con el HTML y los recursos enumerados en “Recorrido y continuidad en móvil”. Conservar los fragmentos de navegación y el orden de los scripts. Si se incrusta en un iframe de otro origen, esta versión de la medición no funcionará; alojar la página y receptor en el mismo origen.
6. Probar desde una ventana sin sesión: una carga genera una visita; abrir Primaria genera sección; elegir Docente genera constructor; cambiar a Evaluación genera etapa; hacer clic final en una gema configurada genera salida. Revisar el aumento correspondiente en el informe. No confundir la apertura del aviso con la salida efectiva.
7. Comprobar que los cuerpos con campos extra, nombres de evento inventados, niveles fuera del catálogo y combinaciones incompatibles se rechazan. Comprobar que un visitante no puede leer el informe.
8. Revisar el aviso institucional de privacidad y los registros del servidor por separado. Aunque este módulo no guarda IP, el hosting puede conservarla en logs. Establecer conservación de agregados y protección ante abuso en el servidor; el filtro de origen no detiene bots que falsifiquen encabezados.

El receptor usa incremento atómico para evitar pérdidas por visitas simultáneas. No identifica personas ni promete exactitud frente a robots. El navegador elimina doble clic inmediato y limita eventos por carga, pero esos límites no sustituyen controles del servidor.

## Validación y pendientes

- Pruebas de JavaScript: `node --test tests/measurement.test.cjs tests/recorrido.test.cjs` (11 pruebas: eventos, persistencia validada, navegación de 42 perfiles y cuatro etapas, roles y continuidad de contexto).
- Revisión sintáctica de scripts incluidos y correspondencia de 26 configuraciones.
- Pendientes: validación PHP/WordPress en un servidor de pruebas e instalación/configuración del receptor; revisión pedagógica continua de respuestas. Las 26 gemas están creadas y su acceso fue comprobado. Las pruebas de interfaz se registran en la entrega.
- `ruta-general.html` mantiene los enlaces y código de la versión de GitHub consultada al preparar la entrega. La carpeta local `site-edit` contenía otros cambios; esta entrega no los sobrescribe.

## Fuentes de preparación (consultadas el 20 de noviembre de 2026)

- SEP, programas sintéticos: https://educacionbasica.sep.gob.mx/programas-de-estudio-para-la-educacion-preescolar-primaria-y-secundaria-programas-sinteticos-de-las-fases-1-a-6/
- Google, crear y gestionar Gems: https://support.google.com/gemini/answer/15146780?co=GENIE.Platform%3DDesktop&hl=es
- Google, compartir Gems y niveles de acceso: https://support.google.com/gemini/answer/16504957?co=GENIE.Platform%3DDesktop&hl=es-419
- WordPress, endpoints: https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/
- WordPress, tablas de plugins: https://developer.wordpress.org/plugins/creating-tables-with-plugins/

La disponibilidad y los nombres de funciones de Gemini pueden cambiar según tipo de cuenta. Verificar la interfaz de la cuenta educativa antes de crear o compartir.
