import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/shell";
import { ExploreGrid } from "@/components/explore-grid";
import { FILTERS, type FilterId } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [filter, setFilter] = useState<FilterId>("todos");
  const [query, setQuery] = useState("");
  const searchSlot = useMemo(
    () => (
      <div className="hidden px-4 pb-3 md:block">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué necesitas preparar hoy?"
            className="h-11 w-full rounded-full bg-surface-2 pl-10 pr-4 text-sm text-fg placeholder:text-subtle shadow-[0_0_0_1px_rgba(244,244,245,0.1)] outline-none focus:shadow-[0_0_0_2px_rgba(255,90,31,0.5)]"
          />
        </label>
      </div>
    ),
    [query],
  );

  return (
    <AppShell showSearchSlot={searchSlot}>
      <div className="px-4">
        <section className="relative overflow-hidden rounded-xl">
          <img
            src="/images/hero.jpg"
            alt="Docentes colaborando con un portátil en el aula"
            className="h-[220px] w-full object-cover object-[61%_center] md:h-[188px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-fg/90">
              IA para docentes
            </p>
            <p className="mt-1 max-w-[16ch] text-[22px] font-semibold leading-[1.1] tracking-tight text-primary">
              Lleva la IA a tu salón de clases
            </p>
          </div>
        </section>

        <div className="no-scrollbar -mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1">
          {FILTERS.map((f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "h-11 shrink-0 rounded-full px-4 text-[13px] font-medium transition-[color,background-color,transform] duration-200 active:scale-[0.96] md:h-8 md:px-3.5",
                  on ? "bg-fg text-bg" : "bg-transparent text-fg shadow-[0_0_0_1px_rgba(244,244,245,0.16)]",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <h2 className="mb-3 mt-5 text-[17px] font-semibold tracking-tight">Explora</h2>
        <ExploreGrid filter={filter} query={query} />
      </div>
    </AppShell>
  );
}
