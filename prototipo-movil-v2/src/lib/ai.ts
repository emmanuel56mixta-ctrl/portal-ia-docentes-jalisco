import { createServerFn } from "@tanstack/react-start";

const SYSTEM = `Eres un asesor pedagógico de la Secretaría de Educación Jalisco. Diseñas materiales para docentes de educación básica y media superior en México.

Reglas:
- Español de México, tono cercano y profesional, sin anglicismos innecesarios y sin emojis.
- Alinea a la Nueva Escuela Mexicana: fases (no hables de "grados" como estructura principal), campos formativos, PDA, situaciones didácticas, evaluación formativa, vínculo con territorio y familias.
- Sé concreto: tiempos en minutos, materiales de escuela pública real, consignas que un docente puede usar mañana.
- No inventes normas, artículos de ley, ni PDA oficiales. Si algo es una propuesta, márcalo como propuesta para contrastar con el programa sintético vigente.
- Nunca pidas ni uses nombres, fotos o calificaciones de estudiantes.
- Estructura en markdown claro (títulos, listas, tablas simples).
- No te disculpes de más. No hagas marketing de la IA.`;

export type AiKind =
  | "chat"
  | "planeacion"
  | "rubrica"
  | "programa"
  | "formacion"
  | "gema";

type AiInput = {
  kind: AiKind;
  user: string;
  history?: { role: "user" | "assistant"; content: string }[];
};

export const generateWithGrok = createServerFn({ method: "POST" })
  .validator((input: AiInput) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "unavailable" };
    }

    const extra =
      data.kind === "planeacion"
        ? "Responde con una planeación didáctica completa (intención, PDA propuestos, situación, secuencia inicio-desarrollo-cierre, evaluación, adaptaciones, familia, materiales)."
        : data.kind === "rubrica"
          ? "Responde con una rúbrica holística de 4 niveles y criterios observables."
          : data.kind === "programa"
            ? "Responde con un programa analítico contextualizado: diagnóstico breve del territorio, contenidos priorizados, orientaciones y evaluación."
            : data.kind === "formacion"
              ? "Responde con una actividad de aula de 20-40 minutos para formar carácter, con consignas, roles y cierre restaurativo si aplica."
              : data.kind === "gema"
                ? "Cumple exactamente el tipo de recurso pedido. Sé usable mañana."
                : "Responde como asesor: concreto, breve si piden breve, completo si piden un diseño.";

    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: `${SYSTEM}\n\n${extra}` },
      ...(data.history ?? []).slice(-8).map((m) => ({
        role: m.role,
        content: m.content.slice(0, 4000),
      })),
      { role: "user", content: data.user.slice(0, 6000) },
    ];

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          messages,
          max_tokens: data.kind === "chat" ? 900 : 1600,
          temperature: 0.7,
        }),
      });
      if (!res.ok) {
        return { ok: false as const, error: `xAI ${res.status}` };
      }
      const body = (await res.json()) as {
        choices: { message: { content: string } }[];
      };
      const text = body.choices[0]?.message.content ?? "";
      if (!text.trim()) return { ok: false as const, error: "empty" };
      return { ok: true as const, text };
    } catch {
      return { ok: false as const, error: "network" };
    }
  });
