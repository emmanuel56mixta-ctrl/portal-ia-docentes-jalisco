import { CAMPOS, FASES } from "./content";

type PlanInput = {
  fase: string;
  campo: string;
  grado: string;
  tema: string;
  sesiones: string;
  contexto: string;
  docente?: string;
  escuela?: string;
};

function labelOf(list: { id: string; label: string }[], id: string) {
  return list.find((x) => x.id === id)?.label ?? id;
}

export function localPlaneacion(i: PlanInput) {
  const fase = labelOf(FASES, i.fase);
  const campo = labelOf(CAMPOS, i.campo);
  const sesiones = i.sesiones || "2";
  const tema = i.tema.trim() || "El territorio que habitamos";
  const ctx =
    i.contexto.trim() ||
    "Grupo de escuela pública en Jalisco, con ritmos diversos y material básico de aula.";
  const n = Number(sesiones) || 2;

  return `## Planeación didáctica · ${tema}

**Docente:** ${i.docente || "Docente de grupo"}  
**Escuela:** ${i.escuela || "Escuela pública · Jalisco"}  
**Fase / grado:** ${fase}${i.grado ? ` · ${i.grado}` : ""}  
**Campo formativo:** ${campo}  
**Sesiones:** ${n} de 50 minutos  
**Contexto:** ${ctx}

### Intención pedagógica
Que el alumnado explore **${tema}** desde su comunidad, ponga en juego saberes del campo *${campo}* y produzca una evidencia que pueda explicarse en voz alta. La IA solo bosquejó; tú recortas según el grupo real.

### PDA que se movilizan (propuesta)
- Observar, preguntar y registrar un fenómeno o texto cercano al territorio.
- Dialogar con evidencia (no con ocurrencias) y escuchar a quien piensa distinto.
- Elaborar un producto breve (escrito, croquis, explicación oral o prototipo) que muestre el proceso, no solo el resultado.

*Contrasta estos PDA con el programa sintético vigente de tu fase antes de usar esta planeación de manera oficial.*

### Situación didáctica
En el barrio / la colonia / la escuela aparece una pregunta que no se resuelve copiando: **¿cómo se manifiesta “${tema}” aquí, y qué podemos hacer con lo que descubramos?** El grupo sale (o mira por la ventana, o entrevista a alguien de la comunidad escolar) y vuelve con datos. Con esos datos se construye un producto para alguien real: compañeras de otro grado, familias, o el comité de la escuela.

### Secuencia

**Inicio (12 min)**  
- Pregunta detonadora en el pizarrón. Un minuto en silencio, luego pares.  
- Recojo tres respuestas y las dejo vivas (no las “corrijo” aún).  
- Acuerdo de evidencia: qué vamos a poder mostrar al final.

**Desarrollo (28 min × ${n} sesión/es)**  
- Exploración con material de aula: texto corto, imagen del entorno, croquis, objetos.  
- Trabajo en equipos de 3 con roles (quien registra, quien pregunta, quien cuida el tiempo).  
- Punto medio: una ronda de “qué ya sabemos / qué nos falta”.  
- Elaboración del producto. Tú recorres, no explicas al frente todo el tiempo.

**Cierre (10 min)**  
- Tres equipos muestran 60 segundos. El resto anota una fortaleza y una pregunta.  
- Metacognición: *¿Qué cambié de opinión hoy?*  
- Puente a la siguiente sesión o a casa (actividad de 15 min, sin copiar).

### Evaluación formativa
| Evidencia | Lo que observas | Cómo retroalimentas |
|---|---|---|
| Participación en pares | Usa datos, no solo opinión | “Trae un ejemplo del patio / del texto.” |
| Producto | Se entiende sin que estés ahí | “¿Quién podría usarlo fuera del aula?” |
| Oralidad | Explica el proceso | “Cuéntame el paso que más te costó.” |

Niveles sugeridos: *en proceso · esencial · esperado · sobresaliente*. No hace falta número para que haya juicio.

### Adaptaciones
- Apoyo visual de la consigna (pictograma o ejemplo ya resuelto a medias).  
- Tiempo extra o producto más corto para quien lo necesite, misma exigencia cognitiva.  
- Mediación entre pares con rol explícito, no “el que ya acabó ayuda”.

### Familia y comunidad
Nota breve (se puede copiar): *Esta semana observamos “${tema}” en nuestro entorno. En casa, ¿pueden señalar un ejemplo en 15 minutos y mandar una foto o una frase? No se trata de una tarea para calificar, sino de mirar juntos.*

### Materiales reales
Pizarrón, hojas, lápiz, un texto o imagen impresa, el patio o la calle inmediata. Nada que la escuela promedio de Jalisco no pueda conseguir esta semana.

— *Borrador local. Revísalo con tu programa analítico y con lo que sí ocurre en tu grupo.*`;
}

export function localRubrica(tema: string, campo: string) {
  return `## Rúbrica holística · ${tema || "Producto de la secuencia"}

Campo: ${labelOf(CAMPOS, campo)}

| Nivel | Lo que se observa | Retroalimentación tipo |
|---|---|---|
| **En proceso** | El producto existe, pero aún no se entiende sin la voz del autor. Faltan datos o ejemplos. | “Agrega un ejemplo de tu entorno para que alguien de otro grupo lo entienda.” |
| **Esencial** | Se entiende la idea central. Hay al menos una evidencia. La explicación es breve. | “¿Qué paso te costó más? Escríbelo. Eso vuelve más honesto el trabajo.” |
| **Esperado** | Idea clara, evidencia suficiente, se nota el proceso. Puede explicarse en 60 segundos. | “Lleva esto a alguien fuera del aula. ¿Qué pregunta te harían?” |
| **Sobresaliente** | Además de lo esperado, conecta con la comunidad o propone un siguiente paso útil. | “Tu siguiente reto: enseñarle esto a un grado menor en 5 minutos.” |

Criterios transversales: claridad, uso de evidencia, respeto al trabajo de otras personas, cuidado del material.

No conviertas la rúbrica en un promedio. Elige el nivel que **mejor describe** el conjunto.`;
}

export function localChatReply(user: string, profileName?: string) {
  const name = profileName ? ` ${profileName.split(" ")[0]}` : "";
  return `Hola${name}. Puedo ayudarte a bajar esto a una clase de 50 minutos.

A partir de lo que me pediste — “${user.slice(0, 140)}” — te propongo este esqueleto:

1. **Inicio (8 min):** una pregunta que no se responde con sí/no, escrita en el pizarrón.
2. **Desarrollo (32 min):** trabajo en pares o tercias con una evidencia observable (escrito, croquis, oral).
3. **Cierre (10 min):** tres voces, una fortaleza y una pregunta. Nada de aplauso vacío.

Si me dices **fase, campo y tema**, te armo la planeación completa, una rúbrica o una secuencia LEO.

Recuerda: no subas nombres de estudiantes. Describe el grupo (“35, tres con apoyo de lectura, un patio chico”).`;
}
