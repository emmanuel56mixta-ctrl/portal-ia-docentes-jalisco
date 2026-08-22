import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { CAMPOS, FASES } from "@/lib/content";
import { generateWithGrok } from "@/lib/ai";
import { localPlaneacion } from "@/lib/templates";
import { useAppStore } from "@/lib/store";
import { Markdown } from "@/components/markdown";

export function PlaneacionTool() {
  const profile = useAppStore((s) => s.profile);
  const save = useAppStore((s) => s.savePlaneacion);
  const complete = useAppStore((s) => s.completeStep);
  const [fase, setFase] = useState(profile.fase || "4");
  const [campo, setCampo] = useState(profile.campo || "lenguajes");
  const [grado, setGrado] = useState(profile.grupo || "");
  const [tema, setTema] = useState("");
  const [sesiones, setSesiones] = useState("2");
  const [contexto, setContexto] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState("");

  async function generate(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const payload = {
      fase,
      campo,
      grado,
      tema,
      sesiones,
      contexto,
      docente: profile.name,
      escuela: profile.school,
    };
    const user = `Diseña una planeación didáctica NEM.
Fase: ${FASES.find((f) => f.id === fase)?.label}
Campo: ${CAMPOS.find((c) => c.id === campo)?.label}
Grado/grupo: ${grado || "no especificado"}
Tema: ${tema}
Sesiones: ${sesiones}
Contexto del grupo: ${contexto || "escuela pública de Jalisco, material básico"}
Docente: ${profile.name || "docente de grupo"}
Escuela: ${profile.school || "no especificada"}`;
    try {
      const res = await generateWithGrok({ data: { kind: "planeacion", user } });
      setResult(res.ok ? res.text : localPlaneacion(payload));
    } catch {
      setResult(localPlaneacion(payload));
    } finally {
      setBusy(false);
    }
  }

  function persist() {
    save({
      title: tema || "Planeación didáctica",
      fase,
      campo,
      tema,
      content: result,
    });
    complete("planeacion");
    toast.success("Guardada en Editar");
  }

  if (result) {
    return (
      <div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setResult("")}>
            Nueva
          </Button>
          <Button className="flex-1" onClick={persist}>
            Guardar
          </Button>
        </div>
        <article className="mt-4 rounded-xl bg-surface p-4 shadow-[0_0_0_1px_rgba(244,244,245,0.08)]">
          <Markdown text={result} />
        </article>
      </div>
    );
  }

  return (
    <form onSubmit={generate} className="space-y-3.5">
      <p className="text-sm leading-relaxed text-muted">
        Un borrador para recortar. Contrasta PDA y tiempos con tu programa analítico.
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
        <Label>Campo formativo</Label>
        <Select value={campo} onChange={(e) => setCampo(e.target.value)}>
          {CAMPOS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <Label>Grado / grupo</Label>
          <Input value={grado} onChange={(e) => setGrado(e.target.value)} placeholder="5.° A" />
        </div>
        <div>
          <Label>Sesiones</Label>
          <Select value={sesiones} onChange={(e) => setSesiones(e.target.value)}>
            {["1", "2", "3", "4"].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <Label>Tema o pregunta</Label>
        <Input
          required
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="¿De dónde viene el agua de la escuela?"
        />
      </div>
      <div>
        <Label>Contexto del grupo</Label>
        <Textarea
          value={contexto}
          onChange={(e) => setContexto(e.target.value)}
          placeholder="32 estudiantes, patio chico, tres con apoyo de lectura, zona urbana de Zapopan…"
        />
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={busy}>
        {busy ? "Diseñando…" : "Generar planeación"}
      </Button>
    </form>
  );
}
