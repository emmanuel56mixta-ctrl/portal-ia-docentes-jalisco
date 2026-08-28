import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppShell } from "@/components/shell";
import { FAQ } from "@/lib/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ayuda")({ component: AyudaPage });

function AyudaPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <AppShell title="Ayuda">
      <div className="px-4">
        <p className="mb-4 text-sm leading-relaxed text-muted">
          Criterios para usar IA en escuela pública sin perder el oficio docente.
        </p>
        <div className="space-y-2">
          {FAQ.map((item, i) => {
            const on = open === i;
            return (
              <div
                key={item.q}
                className="rounded-xl bg-surface shadow-[0_0_0_1px_rgba(244,244,245,0.08)]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-3.5 py-3.5 text-left"
                  onClick={() => setOpen(on ? null : i)}
                >
                  <span className="text-[15px] font-medium leading-snug">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-subtle transition-transform duration-200",
                      on && "rotate-180",
                    )}
                  />
                </button>
                {on && (
                  <p className="px-3.5 pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>

        <section className="mt-6 rounded-xl bg-surface p-4 shadow-[0_0_0_1px_rgba(244,244,245,0.08)]">
          <h2 className="text-[15px] font-semibold tracking-tight">Glosario breve</h2>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="font-medium">Programa analítico</dt>
              <dd className="text-muted">El sintético aterrizado a tu escuela y territorio.</dd>
            </div>
            <div>
              <dt className="font-medium">PDA</dt>
              <dd className="text-muted">Procesos de desarrollo de aprendizaje. Lo que se moviliza, no un tema a cubrir.</dd>
            </div>
            <div>
              <dt className="font-medium">Gema</dt>
              <dd className="text-muted">Un prompt especializado, listo para abrir en el asistente.</dd>
            </div>
          </dl>
        </section>
      </div>
    </AppShell>
  );
}
