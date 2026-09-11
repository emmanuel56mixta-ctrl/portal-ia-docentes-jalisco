import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FileText, Plus, Trash2 } from "lucide-react";
import { AppShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/editar")({
  validateSearch: (s: Record<string, unknown>): { id?: string } =>
    typeof s.id === "string" ? { id: s.id } : {},
  component: EditarPage,
});

function EditarPage() {
  const docs = useAppStore((s) => s.planeaciones);
  const remove = useAppStore((s) => s.deletePlaneacion);
  const navigate = useNavigate();

  return (
    <AppShell title="Editar">
      <div className="px-4">
        <Button className="w-full" onClick={() => navigate({ to: "/t/$slug", params: { slug: "planeacion" } })}>
          <Plus className="size-4" />
          Nueva planeación
        </Button>

        {docs.length === 0 ? (
          <div className="mt-10 px-4 text-center">
            <FileText className="mx-auto size-8 text-subtle" />
            <p className="mt-3 text-[15px] font-medium">Aún no hay documentos</p>
            <p className="mt-1 text-sm text-muted">
              Genera una planeación, rúbrica o secuencia y quedará aquí, en este dispositivo.
            </p>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {docs.map((d) => (
              <li
                key={d.id}
                className="flex items-start gap-3 rounded-xl bg-surface p-3.5 shadow-[0_0_0_1px_rgba(244,244,245,0.08)]"
              >
                <FileText className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <Link
                    to="/editar"
                    search={{ id: d.id }}
                    className="block text-[15px] font-semibold leading-snug tracking-tight"
                  >
                    {d.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-subtle">
                    {formatDate(d.createdAt)} · {d.campo}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Eliminar"
                  onClick={() => remove(d.id)}
                  className="grid size-9 place-items-center rounded-md text-subtle hover:bg-surface-2 hover:text-fg"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <DocReader />
      </div>
    </AppShell>
  );
}

function DocReader() {
  const search = Route.useSearch();
  const docs = useAppStore((s) => s.planeaciones);
  const doc = docs.find((d) => d.id === search.id);
  if (!doc) return null;
  return (
    <article className="mt-5 rounded-xl bg-surface p-4 shadow-[0_0_0_1px_rgba(244,244,245,0.08)]">
      <h2 className="text-base font-semibold tracking-tight">{doc.title}</h2>
      <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-fg/90">
        {doc.content}
      </pre>
    </article>
  );
}
