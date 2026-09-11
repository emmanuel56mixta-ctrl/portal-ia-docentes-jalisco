import { CONOCE_MODULOS } from "@/lib/content";

export function ConoceTool() {
  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-muted">
        Cuatro ideas para no comprar el mito ni el pánico. La IA es un borrador con sesgos; el
        criterio es tuyo.
      </p>
      {CONOCE_MODULOS.map((m, i) => (
        <article
          key={m.id}
          className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_rgba(244,244,245,0.08)]"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-subtle">
            0{i + 1}
          </p>
          <h2 className="mt-1 text-[15px] font-semibold tracking-tight">{m.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
        </article>
      ))}
    </div>
  );
}
