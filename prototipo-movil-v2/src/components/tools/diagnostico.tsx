import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DIAG_QUESTIONS } from "@/lib/content";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function DiagnosticoTool() {
  const existing = useAppStore((s) => s.diag);
  const setDiag = useAppStore((s) => s.setDiag);
  const complete = useAppStore((s) => s.completeStep);
  const setProfile = useAppStore((s) => s.setProfile);
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(existing ?? {});
  const [done, setDone] = useState(!!existing);
  const q = DIAG_QUESTIONS[i];

  if (done && Object.keys(answers).length) {
    return <DiagResult answers={answers} onRedo={() => setDone(false)} />;
  }

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">
        {i + 1} / {DIAG_QUESTIONS.length}
      </p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full bg-tool-cyan transition-[width] duration-300"
          style={{ width: `${((i + 1) / DIAG_QUESTIONS.length) * 100}%` }}
        />
      </div>
      <h2 className="mt-5 text-xl font-semibold leading-tight tracking-tight">{q.q}</h2>
      <div className="mt-4 space-y-2">
        {q.options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
            className={cn(
              "w-full rounded-lg px-3.5 py-3 text-left text-sm transition-colors",
              answers[q.id] === o.id
                ? "bg-fg text-bg"
                : "bg-surface text-fg shadow-[0_0_0_1px_rgba(244,244,245,0.08)] hover:bg-surface-2",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        {i > 0 && (
          <Button variant="outline" className="flex-1" onClick={() => setI((n) => n - 1)}>
            Anterior
          </Button>
        )}
        <Button
          className="flex-1"
          disabled={!answers[q.id]}
          onClick={() => {
            if (i < DIAG_QUESTIONS.length - 1) setI((n) => n + 1);
            else {
              setDiag(answers);
              complete("diagnostico");
              if (answers.fase) setProfile({ fase: answers.fase });
              setDone(true);
              navigate({ to: "/t/$slug", params: { slug: "diagnostico" } });
            }
          }}
        >
          {i < DIAG_QUESTIONS.length - 1 ? "Siguiente" : "Ver resultado"}
        </Button>
      </div>
    </div>
  );
}

function DiagResult({
  answers,
  onRedo,
}: {
  answers: Record<string, string>;
  onRedo: () => void;
}) {
  const recs = recommendations(answers);
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Tu mapa</p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">Punto de partida</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        No es un puntaje. Es una brújula para elegir la siguiente herramienta, no para compararte.
      </p>
      <ul className="mt-5 space-y-2.5">
        {recs.map((r) => (
          <li
            key={r.title}
            className="rounded-xl bg-surface p-3.5 shadow-[0_0_0_1px_rgba(244,244,245,0.08)]"
          >
            <p className="text-[13px] font-medium text-primary">{r.kicker}</p>
            <p className="mt-0.5 text-[15px] font-semibold">{r.title}</p>
            <p className="mt-1 text-sm text-muted">{r.body}</p>
          </li>
        ))}
      </ul>
      <Button variant="outline" className="mt-5 w-full" onClick={onRedo}>
        Repetir diagnóstico
      </Button>
    </div>
  );
}

function recommendations(a: Record<string, string>) {
  const out = [];
  if (a.confianza === "inicio") {
    out.push({
      kicker: "Primeros pasos",
      title: "Empieza por “Aprende paso a paso”",
      body: "Antes de generar una planeación completa, afina el criterio: qué pedir y qué no aceptar.",
    });
  } else {
    out.push({
      kicker: "Oficio",
      title: "Ya puedes exigir borradores mejores",
      body: "Pide tres opciones, recorta tiempos y obliga a materiales de escuela pública.",
    });
  }
  if (a.nee === "varios" || a.reto === "diversidad") {
    out.push({
      kicker: "Inclusión",
      title: "Usa la gema de adaptación NEE",
      body: "Mismos aprendizajes, distintos caminos. No un plan paralelo.",
    });
  }
  if (a.tiempo === "escaso" || a.reto === "tiempo") {
    out.push({
      kicker: "Carga",
      title: "Planeación de 2 sesiones, no de 8",
      body: "Pide menos. Un producto observable vale más que una secuencia interminable.",
    });
  }
  if (a.reto === "convivencia") {
    out.push({
      kicker: "Carácter",
      title: "Formación del carácter Estilo Jalisco",
      body: "Paz, respeto y mediación se enseñan con guion, no con discurso.",
    });
  }
  if (a.dispositivos === "nulo" || a.dispositivos === "docente") {
    out.push({
      kicker: "Territorio",
      title: "La IA es para ti, no para el alumnado aún",
      body: "Genera en casa o en el aula de medios. El grupo trabaja con papel, patio y voz.",
    });
  }
  return out.slice(0, 4);
}
