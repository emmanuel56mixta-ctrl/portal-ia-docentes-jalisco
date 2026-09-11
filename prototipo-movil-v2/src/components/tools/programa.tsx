import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { CAMPOS, FASES } from "@/lib/content";
import { generateWithGrok } from "@/lib/ai";
import { useAppStore } from "@/lib/store";
import { Markdown } from "@/components/markdown";

export function ProgramaTool() {
  const profile = useAppStore((s) => s.profile);
  const save = useAppStore((s) => s.savePlaneacion);
  const complete = useAppStore((s) => s.completeStep);
  const [fase, setFase] = useState(profile.fase || "4");
  const [campo, setCampo] = useState(profile.campo || "etica");
  const [territorio, setTerritorio] = useState("");
  const [prioridades, setPrioridades] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");

  async function generate(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const user = `Contextualiza un programa analítico.
Fase: ${FASES.find((f) => f.id === fase)?.label}
Campo: ${CAMPOS.find((c) => c.id === campo)?.label}
Escuela: ${profile.school || "escuela pública de Jalisco"}
Territorio: ${territorio}
Prioridades del colectivo: ${prioridades}
Entrega: diagnóstico breve, contenidos priorizados (propuesta), orientaciones didácticas, evaluación formativa y vínculo con comunidad. Marca lo que debe contrastarse con el programa sintético.`;
    const fallback = `## Programa analítico contextualizado

**Fase:** ${FASES.find((f) => f.id === fase)?.label}  
**Campo:** ${CAMPOS.find((c) => c.id === campo)?.label}  
**Territorio:** ${territorio || "comunidad escolar de Jalisco"}

### Diagnóstico breve
El programa sintético llega a una escuela con ${territorio || "su propio barrio, feria, clima y familias"}. Priorizamos lo que el colectivo ya marcó: ${prioridades || "lectura, convivencia y vínculo con el entorno"}.

### Contenidos priorizados (propuesta)
1. Un problema real del territorio que el grupo pueda observar.
2. Un texto o registro (oral, escrito, visual) producido por el alumnado.
3. Una evidencia pública: exposición a otro grado o a familias.

*Contrasta con el programa sintético vigente antes de adoptar esta priorización.*

### Orientaciones
- Menos temas, más profundidad.
- El patio, la calle y la cocina de la escuela son laboratorio.
- La IA ayuda a bosquejar; el colectivo decide el recorte.

### Evaluación
Portafolio de tres evidencias por periodo. Rúbrica holística, no promedio de listas de cotejo.

### Comunidad
Una nota mensual a familias y una visita o entrevista en el barrio.`;
    try {
      const res = await generateWithGrok({ data: { kind: "programa", user } });
      setResult(res.ok ? res.text : fallback);
    } catch {
      setResult(fallback);
    } finally {
      setBusy(false);
    }
  }

  return result ? (
    <div>
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => setResult("")}>
          Nueva
        </Button>
        <Button
          className="flex-1"
          onClick={() => {
            save({
              title: "Programa analítico",
              fase,
              campo,
              tema: territorio,
              content: result,
            });
            complete("programa");
            toast.success("Guardado en Editar");
          }}
        >
          Guardar
        </Button>
      </div>
      <article className="mt-4 rounded-xl bg-surface p-4 shadow-[0_0_0_1px_rgba(244,244,245,0.08)]">
        <Markdown text={result} />
      </article>
    </div>
  ) : (
    <form onSubmit={generate} className="space-y-3.5">
      <p className="text-sm leading-relaxed text-muted">
        El sintético no se copia: se aterriza. Describe tu territorio y el colectivo decide el recorte.
      </p>
      <div>
        <Label>Fase</Label>
        <Select value={fase} onChange={(e) => setFase(e.target.value)}>
          {FASES.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Campo</Label>
        <Select value={campo} onChange={(e) => setCampo(e.target.value)}>
          {CAMPOS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Territorio</Label>
        <Input
          required
          value={territorio}
          onChange={(e) => setTerritorio(e.target.value)}
          placeholder="Colonia, oficios, feria, río, industria…"
        />
      </div>
      <div>
        <Label>Prioridades del colectivo</Label>
        <Textarea
          value={prioridades}
          onChange={(e) => setPrioridades(e.target.value)}
          placeholder="Lectura, agua, convivencia…"
        />
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={busy}>
        {busy ? "Contextualizando…" : "Generar recorte"}
      </Button>
    </form>
  );
}
