# Informe profesional: Proyecto Educativo de Jalisco (PEJ) y auditoría UI/UX del portal "IA para Docentes"

Fecha: 18 de julio de 2026 · Insumos: PEJ-sep-VFinal.pdf (48 pp., sep. 2025) y prototipo portal-ia-docentes-jalisco (5 páginas × 2 versiones)

---

## PARTE I. Observaciones al PEJ como profesional de la educación

### 1. Lectura general

El PEJ es un documento de **filosofía y visión educativa**, no un plan operativo. Se estructura en cuatro apartados (El Jalisco que soñamos; cinco Ejes estratégicos al 2030; Mirada Educativa Innovadora; Innovación educativa) y su tesis central —transitar de una "educación en y para el saber" a una "educación en y para el vivir"— es coherente y sostenida a lo largo del texto. Es la continuación explícita del proyecto Recrea (2019) y de las Comunidades de Aprendizaje en y para la Vida (CAV).

### 2. Fortalezas

**Continuidad de política pública.** Plantear un horizonte 2030 que "trasciende sexenios" y construir sobre seis años de trabajo previo (Recrea, CAV) es poco común en México, donde cada administración suele refundar el sistema. Es la mayor fortaleza del documento.

**Coherencia filosófica interna.** Las tres dimensiones (humanista, sistémica, crítica), los tres aprendizajes (ser, estar, pertenecer), las tres palancas y los tres ámbitos de autonomía responsable forman una arquitectura conceptual consistente, alineada con la Nueva Escuela Mexicana y con el marco UNESCO 2021 (*Reimaginar juntos nuestros futuros*), y con anclaje cultural propio (el difrasismo náhuatl *in ixtli, in yollotl* para la formación del carácter).

**Instrumentos nombrados.** A diferencia de muchos documentos aspiracionales, el PEJ sí nombra vehículos concretos: FINEDUC (infraestructura), Plataforma Jalisco Academy y Red de Centros de Innovación Educativa (formación docente), Unidad de Acompañamiento a Directivos y Docentes, Jalisco Bilingüe, Sistema de Educación Tecnológica, Recrea Familia, CAV regionales.

**Sustento evaluativo declarado.** Cita el Informe de Evaluación ReImagine (SEJ, 2024) como evidencia del impacto de las CAV.

### 3. Debilidades y riesgos

**a) Ausencia de metas, indicadores y presupuesto.** El documento aspira a "ser el mejor sistema educativo del país" sin definir cómo se medirá: no hay líneas base, metas cuantificables, indicadores de aprendizaje (lectura, matemáticas, permanencia, cobertura), cronograma ni fuentes de financiamiento más allá de la mención al FINEDUC. Un proyecto rector puede ser filosófico, pero necesita un anexo programático o remitir explícitamente a uno; tal como está, la rendición de cuentas es imposible.

**b) La evaluación es el eslabón débil.** Se menciona "evaluación educativa para la mejora" (Eje 3) de forma genérica. No se dice qué se evaluará, con qué instrumentos, con qué periodicidad ni quién lo hará. En el contexto del rezago de aprendizajes post-pandemia —el problema más urgente de cualquier sistema educativo mexicano hoy— la omisión de un diagnóstico de aprendizajes y de una estrategia de recuperación es significativa.

**c) Inflación retórica del término "innovación".** La palabra aparece en prácticamente cada párrafo con significados distintos (cualidad de la vida, proceso comunitario, palanca, trayecto, distintivo). Cuando un concepto lo explica todo, deja de explicar algo. Para el docente de aula, el texto ofrece poca orientación operativa: ¿qué cambia el lunes en mi salón?

**d) La IA aparece solo de pasada.** Se menciona una vez como programa estratégico de formación (Eje 2) y una vez como reflexión pendiente (Eje 3). No hay marco de gobernanza, criterios éticos ni lineamientos de protección de datos para su uso educativo. Esto es relevante porque, en paralelo, la SEJ está desplegando un portal que pone IA generativa en manos de todos los docentes (ver Parte III): la práctica va por delante de la política escrita, y ese vacío normativo es un riesgo institucional.

**e) Equidad enunciada, no estratégica.** Inclusión, pueblos originarios, primera infancia y educación especial se mencionan en párrafos breves sin estrategias, poblaciones objetivo ni recursos diferenciados. La "autonomía responsable" de las CAV, sin compensación de capacidades, tiende a favorecer a las comunidades que ya tienen más capital organizativo: el mecanismo puede ampliar brechas que dice cerrar.

**f) Revalorización magisterial incompleta.** El Eje 2 habla de formación, acompañamiento y equipo de cómputo, pero omite las condiciones materiales que más pesan en la revalorización real: carga administrativa total, tiempo para el trabajo colegiado dentro de la jornada, salario y certidumbre laboral. Prometer formación adicional sin liberar tiempo suele traducirse en sobrecarga.

**g) Descuido editorial en un documento rector.** Las referencias bibliográficas contienen erratas graves en URLs ("microsiyios", "portalsej.jlaisco.gob.mx", "articulo oa?=805"), y buena parte de las fuentes son autorreferenciales (la SEJ citándose a sí misma). En un documento que aspira a fundamentar el sistema educativo estatal, esto debilita su credibilidad académica y debe corregirse en la siguiente edición.

**h) Tensión no resuelta: transexenal pero sexenal.** El texto afirma trascender administraciones y a la vez promete que el proyecto "se hará realidad en los próximos seis años". Para que la continuidad no dependa de la voluntad política, convendría anclar el PEJ a un instrumento con fuerza normativa (ley estatal de educación, programa sectorial con decreto).

### 4. Recomendaciones al PEJ

1. Publicar un **anexo programático** con metas 2027/2030, indicadores, líneas base y responsables por eje.
2. Incorporar un capítulo de **gobernanza de IA educativa** (protección de datos de menores, criterios de uso docente, evaluación de herramientas) — el portal analizado abajo lo hace urgente.
3. Explicitar la **estrategia de recuperación de aprendizajes** y los instrumentos de evaluación diagnóstica estatal.
4. Diferenciar recursos y acompañamiento por **índice de marginación de las CAV** para que la autonomía no amplifique brechas.
5. Corregir la edición de referencias y someter el documento a dictamen académico externo.

---

## PARTE II. Auditoría UI/UX del portal "IA para Docentes"

### 1. Valoración general

Para ser un prototipo estático sin servidor, el trabajo es de **calidad notable**: sistema de diseño con tokens CSS, dos versiones cromáticas paralelas completas, arquitectura de información clara (Home → Tutorial → Lección; Ruta; Catálogo de Gemas), microcopy dirigido al docente en segunda persona, fallbacks `onerror` en imágenes y un LEEME ejemplar. La narrativa de onboarding —cuenta institucional → Gemini → Gema → primera planeación— está bien pensada: reduce la fricción inicial, que es la barrera número uno en adopción de tecnología docente.

Dicho eso, hay hallazgos que deben resolverse **antes de cualquier lanzamiento público**, porque el público objetivo (magisterio estatal completo, con rango amplio de edad, visión y alfabetización digital) es precisamente el más sensible a ellos.

### 2. Hallazgos críticos (P0 — bloquean lanzamiento)

**A. Contraste insuficiente (WCAG 2.1 AA).** Medido programáticamente sobre los valores reales del CSS:

| Combinación | Ratio | Veredicto |
|---|---|---|
| Texto `--dim #6c6c74` sobre panel `#141416` (descripciones de cards, 12.5px) | 3.54:1 | **Falla AA** (mín. 4.5:1) |
| Blanco sobre CTA degradado magenta `#f5254f` (botón "Explorar la ruta", 12.5px) | 3.99:1 | **Falla AA** |
| Magenta `#f5254f` sobre fondo (v2, texto de acento) | 4.96:1 | Pasa justo |
| Naranja `#f98a1e` sobre fondo | 8.18:1 | Pasa holgado |
| Lima v1 `#c8f135` sobre fondo | 15.16:1 | Pasa holgado |
| `--muted #9a9aa2` sobre fondo | 7.08:1 | Pasa |

Corrección: aclarar `--dim` a ~`#8a8a94`, y en v2 usar el naranja como color de acento tipográfico reservando el magenta para superficies y degradados.

**B. Controles no semánticos = inaccesibles por teclado.** Las flechas del carrusel hero son `<div>`, "Iniciar sesión" es un `<div>`, y las tarjetas de video abren el modal solo vía listener JS sin ser `<button>` ni `<a>`. Nada de esto es operable con teclado ni visible para lectores de pantalla. Tres de las cinco páginas tienen **cero atributos ARIA**. Los emojis usados como íconos (📘 ✏️ 🧮) carecen de `aria-hidden` o etiqueta.

**C. Modal sin gestión de foco.** El modal de video declara `aria-modal="true"` pero no atrapa el foco, no lo devuelve al cerrar y no recibe foco al abrir. Esc sí funciona (bien). La animación de entrada con rotación debe respetar `prefers-reduced-motion`.

**D. Carrusel con autoplay sin pausa.** Rota cada 5 s sin control de pausa, violando WCAG 2.2.2 y perjudicando la lectura de usuarios lentos — que en este público serán muchos.

**E. Inconsistencia en el dominio de la cuenta.** En la misma página conviven `@jalisco.edu.mx` y `jaliscoedu.mx` (hero, mesa de ayuda). La cuenta institucional es *la* credencial de todo el ecosistema: cualquier ambigüedad en cómo se escribe confunde al docente y **facilita phishing**. Debe normalizarse a un único dominio en todo el sitio.

### 3. Hallazgos altos (P1)

**Datos contradictorios entre páginas.** La card del home anuncia "1 lección · 5 minutos" para el curso que su propia página describe con "8 lecciones · 30 minutos"; la segunda card dice "6 lecciones"; el curso se anuncia "en directo" pero la ruta y la lección lo describen como autogestivo. En un portal que enseña rigor, los números deben cuadrar.

**Tipografía por debajo del mínimo práctico.** Tags y badges usan 10–11.5px. Para un público docente con fuerte presencia de mayores de 45 años, nada por debajo de 12px, idealmente 13px.

**Sin búsqueda ni filtros en el catálogo de Gemas.** Hoy hay ~10 gemas y funciona; con 30+ el catálogo por scroll colapsa. Prever buscador, filtros por nivel/campo formativo y ordenamiento desde ahora.

**Deuda técnica semántica.** En v2 la variable `--lime` contiene magenta. Renombrar a `--accent`/`--accent-soft` antes de que produzca errores de mantenimiento (el propio LEEME exige duplicar cada cambio en ambas versiones — otra razón para unificar pronto).

**Navegación desigual.** El curso tiene breadcrumb; gemas y ruta no. La lección 1 no tiene camino de regreso evidente al home. Estandarizar breadcrumb + logo clickeable en todas las páginas.

### 4. Hallazgos medios (P2)

Estados vacíos, de carga y de error no diseñados (esperable en prototipo, pero el flujo real de SSO con Google merece diseño propio: qué ve el docente cuya cuenta no está activa es el caso de soporte n.º 1). Falta versión de una sola columna verdaderamente auditada en móvil (los docentes usarán esto mayoritariamente desde teléfono). No hay plan de analítica (eventos: activación de cuenta, copia de enlace de Gema, término de lección) — sin eso no habrá evidencia de adopción que reportar. El botón "Copiar enlace" cambia el borde al copiar, pero convendría feedback textual explícito ("Copiado ✓").

### 5. Decisión v1 (lima) vs v2 (magenta/naranja)

Recomiendo **v2 con correcciones**. Razones: la paleta magenta/naranja pertenece a la identidad institucional Jalisco y dialoga con la marca "Estilo Jalisco" del PEJ, mientras la lima es ajena a esa identidad y demasiado deudora de la referencia de diseño original. La ventaja objetiva de v1 es contraste (15.16:1 vs 4.96:1); se neutraliza aplicando la corrección del punto 2.A: naranja `#f98a1e` (8.18:1) como acento de texto y magenta solo en superficies, degradados y elementos grandes.

---

## PARTE III. Alineación portal ↔ PEJ (el aporte que conecta ambos análisis)

**Lo que ya está bien alineado.** Los cuatro ejes del catálogo de Gemas (Formación del Carácter, Proyectos integradores, Programa LEO, Matemáticas) corresponden a programas nombrados en el PEJ; la ruta de 4 etapas (Diagnóstico → Programa analítico → Planeación → Evaluación) reproduce fielmente el ciclo de planeación de la Nueva Escuela Mexicana; el formato autogestivo con constancia SEJ encaja con la formación diversificada del Eje 2.

**Lo que falta — y es la brecha más importante.** El PEJ pivota por completo sobre la **comunidad**: CAV, aprendizaje dialógico, "todos aprenden de todos", el trayecto de innovación (Identificar el desafío → Construir colectivamente → **Conectar para co-crear**). El portal, en cambio, está diseñado para un docente **individual** frente a una herramienta. La única traza comunitaria es "comparte tu Gema con tu academia" y la mención a mentores. Propuestas concretas:

1. **Galería de experiencias por región/CAV**: el carrusel "Ejemplos creados con Gemas" debería atribuir cada material a una CAV o región real, convirtiéndolo en vitrina del "conectar para co-crear" del PEJ.
2. **Sección "Comparte con tu CAV"** con flujos de co-edición de Gemas (el rol Lector/Editor ya existe en Gemini; el portal solo debe narrarlo en clave comunitaria, no individual).
3. **Mapear la ruta al trayecto de innovación del PEJ**: la etapa 1 (diagnóstico) es "identificar el desafío"; las etapas 2–3 son "construir colectiva y creativamente"; la comunidad de mentores es "conectar para co-crear". Nombrarlo así alinea el lenguaje del portal con el documento rector y le da al docente un marco que ya conoce.
4. **Uso responsable como principio de diseño, no como lección final.** El flujo invita a subir diagnósticos de grupo y planeaciones a Gemini — documentos que contienen **datos de menores**. El PEJ exige un ciudadano que "utilice las tecnologías de manera responsable y segura" (Ciudadano Jalisco, rasgo 6), pero la advertencia de privacidad vive solo en la lección 8. Debe aparecer *en el punto de acción*: un aviso breve junto a cada "Abrir Gema" ("No incluyas nombres ni datos personales de tus alumnos") y una página de lineamientos SEJ de datos enlazada desde el pie de todas las páginas. Esto además cubriría parcialmente el vacío normativo de IA señalado en la Parte I.
5. **Resolver el naming institucional**: el PEJ nombra "Plataforma Jalisco Academy"; el portal se llama "Academia Docente Digital / IA para Docentes". Si son la misma cosa, unificar; si no, explicitar la relación, porque el docente recibirá ambos nombres por canales oficiales.

## Resumen ejecutivo de prioridades

| Prioridad | Acción |
|---|---|
| P0 | Corregir contrastes (`--dim`, CTA blanco/magenta), semántica de controles (button/a), foco del modal, pausa del carrusel, unificar dominio de cuenta |
| P1 | Cuadrar lecciones/duraciones entre páginas, subir tipografía mínima a 12–13px, breadcrumbs consistentes, renombrar `--lime`→`--accent`, decidir v2 con acento naranja |
| P2 | Avisos de privacidad in situ + página de lineamientos de datos, búsqueda/filtros en gemas, estados de error del SSO, plan de analítica, auditoría móvil |
| PEJ | Anexo programático con metas e indicadores, capítulo de gobernanza de IA, estrategia de recuperación de aprendizajes, corrección editorial de referencias |
