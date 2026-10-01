import type { ComponentType } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/shell";
import { EXPLORE } from "@/lib/content";
import { CuentaTool } from "@/components/tools/cuenta";
import { AprenderTool } from "@/components/tools/aprender";
import { DiagnosticoTool } from "@/components/tools/diagnostico";
import { ProgramaTool } from "@/components/tools/programa";
import { PlaneacionTool } from "@/components/tools/planeacion";
import { EvaluacionTool } from "@/components/tools/evaluacion";
import { KitTool } from "@/components/tools/kit";
import { FormacionTool } from "@/components/tools/formacion";
import { ConoceTool } from "@/components/tools/conoce";

export const Route = createFileRoute("/t/$slug")({ component: ToolPage });

const TOOLS: Record<string, ComponentType> = {
  cuenta: CuentaTool,
  aprender: AprenderTool,
  diagnostico: DiagnosticoTool,
  programa: ProgramaTool,
  planeacion: PlaneacionTool,
  evaluacion: EvaluacionTool,
  kit: KitTool,
  formacion: FormacionTool,
  conoce: ConoceTool,
};

function ToolPage() {
  const { slug } = Route.useParams();
  const meta = EXPLORE.find((c) => c.id === slug);
  const Comp = TOOLS[slug];

  if (!Comp) {
    return (
      <AppShell title="Herramienta" backTo="/">
        <div className="px-4 py-10 text-center">
          <p className="text-sm text-muted">No encontramos esa herramienta.</p>
          <Link to="/" className="mt-3 inline-block text-sm text-primary">
            Volver a explorar
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={meta?.title ?? "Herramienta"} backTo="/">
      <div className="px-4">
        <Comp />
      </div>
    </AppShell>
  );
}
