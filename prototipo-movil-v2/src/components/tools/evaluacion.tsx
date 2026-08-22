import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { CAMPOS } from "@/lib/content";
import { generateWithGrok } from "@/lib/ai";
import { localRubrica } from "@/lib/templates";
import { useAppStore } from "@/lib/store";
import { Markdown } from "@/components/markdown";

export function EvaluacionTool() {
  const profile = useAppStore((s) => s.profile);
  const save = useAppStore((s) => s.savePlaneacion);
  const complete = useAppStore((s) => s.completeStep);
  const [campo, setCampo] = useState(profile.campo || "lenguajes");
  const [evidencia, setEvidencia] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");

  async function generate(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const user = `Crea una rúbrica holística de 4 niveles para esta evidencia: "${evidencia}". Campo: ${CAMPOS.find((c) => c.id === campo)?.label}. Lenguaje para retroalimentar al alumnado, criterios observables, sin porcentajes.`;
    try {
      const res = await generateWithGrok({ data: { kind: "rubrica", user } });
      setResult(res.ok ? res.text : localRubrica(evidencia, campo));
    } catch {
      setResult(localRubrica(evidencia, campo));
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
              title: `Rúbrica · ${evidencia}`,
              fase: profile.fase,
              campo,
              tema: evidencia,
              content: result,
            });
            complete("evaluacion");
            toast.success("Guardada en Editar");
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
        Evalúa el conjunto, no una lista de cotejo infinita. El nivel describe; no promedia.
      </p>
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
        <Label>Evidencia</Label>
        <Input
          required
          value={evidencia}
          onChange={(e) => setEvidencia(e.target.value)}
          placeholder="Exposición oral de 60 segundos, croquis del barrio…"
        />
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={busy}>
        {busy ? "Armando rúbrica…" : "Generar rúbrica"}
      </Button>
    </form>
  );
}
