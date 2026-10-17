import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { APRENDER_STEPS } from "@/lib/content";
import { useAppStore } from "@/lib/store";

export function AprenderTool() {
  const [i, setI] = useState(0);
  const step = APRENDER_STEPS[i];
  const complete = useAppStore((s) => s.completeStep);
  const navigate = useNavigate();
  const last = i === APRENDER_STEPS.length - 1;

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">
        Paso {step.n} de {APRENDER_STEPS.length}
      </p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full bg-primary transition-[width] duration-300"
          style={{ width: `${((i + 1) / APRENDER_STEPS.length) * 100}%` }}
        />
      </div>
      <h2 className="mt-5 text-xl font-semibold leading-tight tracking-tight">{step.title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.body}</p>
      <div className="mt-8 flex gap-2">
        {i > 0 && (
          <Button variant="outline" className="flex-1" onClick={() => setI((n) => n - 1)}>
            Anterior
          </Button>
        )}
        <Button
          className="flex-1"
          onClick={() => {
            if (last) {
              complete("aprender");
              navigate({ to: "/ruta" });
            } else setI((n) => n + 1);
          }}
        >
          {last ? "Marcar como visto" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}
