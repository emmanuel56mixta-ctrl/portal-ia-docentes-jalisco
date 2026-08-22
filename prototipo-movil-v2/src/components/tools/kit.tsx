import { useState, type MouseEvent } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GemOrientation } from "@/components/gem-orientation";
import { GEM_ACCESS, KIT_TOOLS, type GemAccessTarget } from "@/lib/content";
import { promptTarget, readOriginRect, type OriginRect } from "@/lib/gem-access";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const TONE: Record<string, string> = {
  violet: "from-[#4c2d8a] to-[#171021] text-tool-violet",
  green: "from-[#0f513b] to-[#09150f] text-tool-green",
  amber: "from-[#7c3516] to-[#1b0d08] text-tool-amber",
  rose: "from-[#7c1836] to-[#1c0910] text-tool-rose",
  cyan: "from-[#176076] to-[#09171c] text-tool-cyan",
};

export function KitTool() {
  const [gate, setGate] = useState<{ target: GemAccessTarget; origin: OriginRect } | null>(null);
  const complete = useAppStore((state) => state.completeStep);

  function openTool(event: MouseEvent<HTMLButtonElement>, index: number) {
    const tool = KIT_TOOLS[index];
    const target = tool.gema
      ? GEM_ACCESS[tool.gema]
      : promptTarget(`kit-${tool.id}`, tool.title, tool.prompt ?? tool.hint);
    complete("kit");
    setGate({ target, origin: readOriginRect(event.currentTarget) });
  }

  return (
    <div>
      <section className="pb-5 pt-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Recursos impulsados por IA
        </p>
        <h1 className="mt-2 max-w-[13ch] text-[29px] font-semibold leading-[1.02] tracking-tight">
          Seis accesos para el trabajo cotidiano
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Toca una tarjeta para entrar. Cada recurso te orienta antes de abrir Gemini.
        </p>
      </section>

      <div className="kit-tool-grid stagger-in">
        {KIT_TOOLS.map((tool, index) => (
          <button
            key={tool.id}
            type="button"
            onClick={(event) => openTool(event, index)}
            className={cn(
              "kit-access-card group relative overflow-hidden rounded-[24px] bg-gradient-to-br p-4 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.1)]",
              TONE[tool.tone],
              index % 3 === 1 ? "kit-access-card--tall" : "kit-access-card--regular",
            )}
            aria-label={`Abrir ${tool.title}`}
          >
            <span className="absolute left-4 right-4 top-4 flex items-center justify-between">
              <Sparkles className="size-5" />
              <ArrowUpRight className="size-4 text-white/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <span className="absolute inset-x-4 bottom-4">
              <span className="block text-[17px] font-semibold leading-[1.08] tracking-tight text-fg">
                {tool.title}
              </span>
              <span className="mt-1.5 block text-[12px] leading-snug text-fg/60">{tool.hint}</span>
            </span>
          </button>
        ))}
      </div>

      <GemOrientation
        target={gate?.target ?? null}
        origin={gate?.origin ?? null}
        onClose={() => setGate(null)}
      />
    </div>
  );
}
