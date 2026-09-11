import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { VIRTUES } from "@/lib/content";
import { generateWithGrok } from "@/lib/ai";
import { useAppStore } from "@/lib/store";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";

export function FormacionTool() {
  const [sel, setSel] = useState(VIRTUES[0].id);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");
  const v = VIRTUES.find((x) => x.id === sel)!;
  const save = useAppStore((s) => s.savePlaneacion);
  const complete = useAppStore((s) => s.completeStep);
  const profile = useAppStore((s) => s.profile);

  async function generate() {
    setBusy(true);
    const user = `Diseña una actividad de aula de 25 minutos para formar la virtud "${v.title}".
Idea guía: ${v.line}
Pista de aula: ${v.aula}
Fase: ${profile.fase || "4"}.
Incluye consigna, roles, qué observa el docente y un cierre de 5 minutos. Sin moralina.`;
    const fallback = `## ${v.title} · 25 minutos

**Idea guía.** ${v.line}

**Apertura (5 min).** Una escena breve (recreo, fila, trabajo en equipo) donde esta virtud se echa de menos. El grupo nombra lo que vio, sin acusar a alguien en concreto.

**Desarrollo (15 min).** ${v.aula} En parejas, ensayan la escena dos veces: como suele pasar y como podría pasar. Un rol observa y anota una frase útil.

**Cierre (5 min).** Elegimos una frase del aula para esta semana y la escribimos en un rincón visible. No es un lema: es un acuerdo.

**Qué observas.** ¿Alguien usó la frase sin que se lo pidieras? Eso vale más que la ronda final.`;
    try {
      const res = await generateWithGrok({ data: { kind: "formacion", user } });
      setResult(res.ok ? res.text : fallback);
    } catch {
      setResult(fallback);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="text-sm leading-relaxed text-muted">
        Ocho virtudes para el aula cotidiana. No es un cartel: es una práctica de 25 minutos.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {VIRTUES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSel(item.id);
              setResult("");
            }}
            className={cn(
              "rounded-lg px-3 py-2.5 text-left text-sm font-medium",
              sel === item.id ? "bg-fg text-bg" : "bg-surface shadow-[0_0_0_1px_rgba(244,244,245,0.08)]",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-fg/90">“{v.line}”</blockquote>
      <p className="mt-2 text-sm text-muted">{v.aula}</p>
      <Button className="mt-4 w-full" onClick={() => void generate()} disabled={busy}>
        {busy ? "Diseñando la práctica…" : "Generar actividad"}
      </Button>
      {result && (
        <article className="mt-4 rounded-xl bg-surface p-4 shadow-[0_0_0_1px_rgba(244,244,245,0.08)]">
          <Markdown text={result} />
          <Button
            className="mt-4 w-full"
            variant="secondary"
            onClick={() => {
              save({
                title: `Carácter · ${v.title}`,
                fase: profile.fase,
                campo: "humano",
                tema: v.title,
                content: result,
              });
              complete("formacion");
              toast.success("Guardada en Editar");
            }}
          >
            Guardar
          </Button>
        </article>
      )}
    </div>
  );
}
