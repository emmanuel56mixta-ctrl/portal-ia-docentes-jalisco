import { Link } from "@tanstack/react-router";
import { BookOpen, Gem, HelpCircle, Route, User, X } from "lucide-react";
import { Wordmark } from "./spark";
import { useAppStore } from "@/lib/store";

export function MenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const profile = useAppStore((s) => s.profile);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
        aria-label="Cerrar menú"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full max-w-[430px] flex-col bg-surface pt-[max(0.75rem,env(safe-area-inset-top))] shadow-[0_0_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between px-4 pb-3">
          <Wordmark />
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-lg hover:bg-surface-2"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="px-4 pb-4">
          <p className="text-lg font-semibold tracking-tight">
            {profile.name || "Docente de Jalisco"}
          </p>
          <p className="text-sm text-muted">
            {profile.school || "Activa tu perfil para personalizar la ruta"}
          </p>
        </div>
        <nav className="flex flex-col px-2">
          <Link
            to="/t/$slug"
            params={{ slug: "cuenta" }}
            onClick={onClose}
            className="flex h-12 items-center gap-3 rounded-lg px-3 text-[15px] hover:bg-surface-2"
          >
            <User className="size-4 text-muted" />
            Mi perfil
          </Link>
          <Link
            to="/ruta"
            onClick={onClose}
            className="flex h-12 items-center gap-3 rounded-lg px-3 text-[15px] hover:bg-surface-2"
          >
            <Route className="size-4 text-muted" />
            Ruta de formación
          </Link>
          <Link
            to="/gemas"
            onClick={onClose}
            className="flex h-12 items-center gap-3 rounded-lg px-3 text-[15px] hover:bg-surface-2"
          >
            <Gem className="size-4 text-muted" />
            Banco de gemas
          </Link>
          <Link
            to="/t/$slug"
            params={{ slug: "aprender" }}
            onClick={onClose}
            className="flex h-12 items-center gap-3 rounded-lg px-3 text-[15px] hover:bg-surface-2"
          >
            <BookOpen className="size-4 text-muted" />
            Aprende paso a paso
          </Link>
          <Link
            to="/ayuda"
            onClick={onClose}
            className="flex h-12 items-center gap-3 rounded-lg px-3 text-[15px] hover:bg-surface-2"
          >
            <HelpCircle className="size-4 text-muted" />
            Ayuda y criterios
          </Link>
        </nav>
        <p className="mt-auto px-5 pb-8 text-xs leading-relaxed text-subtle">
          Prototipo pedagógico · Secretaría de Educación Jalisco. La IA propone; el criterio
          profesional decide.
        </p>
      </div>
    </div>
  );
}
