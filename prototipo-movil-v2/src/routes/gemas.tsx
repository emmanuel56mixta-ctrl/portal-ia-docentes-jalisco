import { useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Gem } from "lucide-react";
import { AppShell } from "@/components/shell";
import { GemOrientation } from "@/components/gem-orientation";
import { GEMAS, GEM_ACCESS, type GemAccessTarget, type Gema } from "@/lib/content";
import { promptTarget, readOriginRect, type OriginRect } from "@/lib/gem-access";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gemas")({ component: GemasPage });

const TONE: Record<string, string> = {
  cyan: "from-[#0f4050] to-[#0a1115] text-tool-cyan",
  green: "from-[#0c3c2c] to-[#09110e] text-tool-green",
  blue: "from-[#123665] to-[#090d15] text-tool-blue",
  amber: "from-[#5a220d] to-[#130b08] text-tool-amber",
  rose: "from-[#561327] to-[#14090d] text-tool-rose",
  violet: "from-[#362064] to-[#0e0a15] text-tool-violet",
};

function accessFor(gema: Gema): GemAccessTarget {
  if (gema.id === "leo") return GEM_ACCESS.leo;
  return promptTarget(`banco-${gema.id}`, gema.title, gema.prompt);
}

function GemasPage() {
  const [gate, setGate] = useState<{ target: GemAccessTarget; origin: OriginRect } | null>(null);

  function openGema(event: MouseEvent<HTMLButtonElement>, gema: Gema) {
    setGate({ target: accessFor(gema), origin: readOriginRect(event.currentTarget) });
  }

  return (
    <AppShell>
      <div className="px-4">
        <section className="pb-5 pt-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Banco especializado
          </p>
          <h1 className="mt-2 text-[29px] font-semibold leading-[1.02] tracking-tight">
            Elige una necesidad del aula
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Toca cualquier tarjeta. Antes de salir te mostraremos dos orientaciones breves para
            trabajar de forma segura y con criterio docente.
          </p>
        </section>

        <section className="relative mb-5 aspect-[2/1] overflow-hidden rounded-[26px] bg-surface shadow-[0_0_0_1px_rgba(255,255,255,0.09)]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/banco-gemas-docente.mp4"
            poster="/images/gemas-docente-wide.jpg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
          <div className="absolute inset-x-4 bottom-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
              Banco de Gemas
            </p>
            <p className="mt-1 max-w-[18rem] text-[17px] font-semibold leading-[1.08] tracking-tight text-fg">
              Asistentes para necesidades concretas del aula
            </p>
          </div>
        </section>

        <div className="gem-bank-grid stagger-in">
          {GEMAS.map((gema, index) => (
            <button
              key={gema.id}
              type="button"
              onClick={(event) => openGema(event, gema)}
              className={cn(
                "bank-gem-card group relative overflow-hidden rounded-[24px] bg-gradient-to-br p-4 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.09)]",
                TONE[gema.tone],
                index % 4 === 1 || index % 4 === 2
                  ? "bank-gem-card--tall"
                  : "bank-gem-card--regular",
              )}
              aria-label={`Usar ${gema.title}`}
            >
              <span className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10">
                  <Gem className="size-4" />
                </span>
                <ArrowUpRight className="size-4 text-white/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span className="absolute inset-x-4 bottom-4">
                <span className="block text-[11px] font-medium uppercase tracking-[0.13em] text-current">
                  {gema.campo}
                </span>
                <span className="mt-1.5 block text-[17px] font-semibold leading-[1.08] tracking-tight text-fg">
                  {gema.title}
                </span>
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
