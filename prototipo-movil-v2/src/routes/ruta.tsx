import { useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { AppShell } from "@/components/shell";
import { GemOrientation } from "@/components/gem-orientation";
import { GEM_ACCESS, RUTA_STEPS, type GemAccessTarget } from "@/lib/content";
import { readOriginRect, type OriginRect } from "@/lib/gem-access";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ruta")({ component: RutaPage });

const TONE: Record<string, string> = {
  cyan: "from-[#0b3945] via-[#092b35] to-[#090a0d] text-tool-cyan",
  green: "from-[#0d3c2b] via-[#092b20] to-[#090a0d] text-tool-green",
  blue: "from-[#102f58] via-[#0d2341] to-[#090a0d] text-tool-blue",
  amber: "from-[#54200c] via-[#381609] to-[#090a0d] text-tool-amber",
};

function RutaPage() {
  const [gate, setGate] = useState<{ target: GemAccessTarget; origin: OriginRect } | null>(null);
  const complete = useAppStore((state) => state.completeStep);

  function openStep(event: MouseEvent<HTMLButtonElement>, id: keyof typeof GEM_ACCESS) {
    complete(id);
    setGate({ target: GEM_ACCESS[id], origin: readOriginRect(event.currentTarget) });
  }

  return (
    <AppShell>
      <div className="px-4">
        <section className="pb-5 pt-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Del diagnóstico al aula
          </p>
          <h1 className="mt-2 max-w-[14ch] text-[30px] font-semibold leading-[1.02] tracking-tight">
            Cuatro accesos, en el orden que tú necesites
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Todas las Gemas están disponibles desde el inicio. Cada una se abre en una pestaña
            nueva para que puedas volver a esta ruta.
          </p>
        </section>

        <div className="route-card-grid stagger-in">
          {RUTA_STEPS.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={(event) => openStep(event, step.id as keyof typeof GEM_ACCESS)}
              className={cn(
                "route-access-card group relative overflow-hidden rounded-[24px] bg-gradient-to-br p-4 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.1)]",
                TONE[step.tone],
                index % 3 === 0 ? "route-access-card--tall" : "route-access-card--regular",
              )}
              aria-label={`Abrir Gema ${step.title}`}
            >
              <span className="absolute -right-7 -top-7 size-24 rounded-full bg-current opacity-[0.08] blur-xl" />
              <span className="absolute left-4 right-4 top-4 flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <ArrowUpRight className="size-4 text-white/65 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span className="absolute bottom-4 left-4 right-4">
                <Sparkles className="mb-3 size-4" />
                <span className="block text-[18px] font-semibold leading-[1.08] tracking-tight text-fg">
                  {step.title}
                </span>
                <span className="mt-2 block text-[12px] leading-snug text-fg/65">{step.blurb}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <GemOrientation
        target={gate?.target ?? null}
        origin={gate?.origin ?? null}
        onClose={() => setGate(null)}
      />
    </AppShell>
  );
}
