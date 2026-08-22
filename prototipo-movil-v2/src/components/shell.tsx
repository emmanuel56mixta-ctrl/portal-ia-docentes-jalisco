import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Gem, HelpCircle, Home, Menu, Route as RouteIcon } from "lucide-react";
import { Wordmark } from "./spark";
import { cn } from "@/lib/utils";
import { useAppStore, hydrateAppStore } from "@/lib/store";
import { RUTA_STEPS } from "@/lib/content";
import { MenuSheet } from "./menu-sheet";

const TABS = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/ruta", label: "Ruta", icon: RouteIcon },
  { to: "/gemas", label: "Gemas", icon: Gem },
  { to: "/ayuda", label: "Ayuda", icon: HelpCircle },
] as const;

export function AppShell({
  children,
  title,
  backTo,
  showSearchSlot,
}: {
  children: ReactNode;
  title?: string;
  backTo?: string;
  showSearchSlot?: ReactNode;
}) {
  const [menu, setMenu] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const rutaDone = useAppStore((s) => s.rutaDone);
  const planeaciones = useAppStore((s) => s.planeaciones);
  const done = RUTA_STEPS.filter((st) => rutaDone[st.id]).length;
  const pct = Math.round((done / RUTA_STEPS.length) * 100);

  useEffect(() => {
    return hydrateAppStore();
  }, []);

  const isHome = pathname === "/";

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 hidden overflow-hidden lg:block"
      >
        <div className="absolute -left-24 top-20 size-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-16 bottom-10 size-[360px] rounded-full bg-tool-cyan/10 blur-3xl" />
      </div>

      <aside className="pointer-events-none fixed left-8 top-1/2 hidden w-56 -translate-y-1/2 flex-col gap-5 xl:flex">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-subtle">
          SEJ · Jalisco
        </p>
        <p className="text-2xl font-semibold leading-tight tracking-tight text-fg">
          Lleva la IA a tu salón, no al revés.
        </p>
        <p className="text-sm leading-relaxed text-muted">
          Planeación, evaluación y carácter — con criterio docente, alineado a la NEM.
        </p>
      </aside>

      <aside className="pointer-events-none fixed right-8 top-1/2 hidden w-52 -translate-y-1/2 flex-col gap-4 text-right xl:flex">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-subtle">
          Tu avance
        </p>
        <p className="text-4xl font-semibold tabular-nums tracking-tight">{pct}%</p>
        <p className="text-sm text-muted">ruta de formación</p>
        <p className="text-sm text-muted">
          <span className="tabular-nums text-fg">{planeaciones.length}</span> documentos
        </p>
      </aside>

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-bg xl:border-x xl:border-border xl:shadow-[0_0_80px_rgba(255,90,31,0.07)]">
        <header className="sticky top-0 z-30 flex items-center gap-2 bg-bg/90 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md">
          {backTo ? (
            <Link
              to="/"
              className="grid size-11 place-items-center rounded-lg text-fg transition-colors hover:bg-surface-2"
              aria-label="Regresar"
            >
              <ArrowLeft className="size-5" />
            </Link>
          ) : (
            <Link to="/" className="min-w-0">
              <Wordmark />
            </Link>
          )}
          {title && !isHome ? (
            <h1 className="min-w-0 flex-1 truncate text-[15px] font-semibold tracking-tight">
              {title}
            </h1>
          ) : (
            <span className="flex-1" />
          )}
          <button
            type="button"
            onClick={() => setMenu(true)}
            className="grid size-11 place-items-center rounded-lg text-fg transition-colors hover:bg-surface-2"
            aria-label="Menú"
          >
            <Menu className="size-5" />
          </button>
        </header>

        {showSearchSlot}

        <div className="flex-1 safe-bottom">{children}</div>

        <nav
          className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-bg/95 px-2 pt-1.5 backdrop-blur-md"
          style={{ paddingBottom: "max(0.55rem, env(safe-area-inset-bottom))" }}
        >
          <ul className="grid grid-cols-4 items-end">
            {TABS.map((tab) => {
              const active = pathname === tab.to || pathname.startsWith(`${tab.to}/`);
              const Icon = tab.icon;
              return (
                <li key={tab.to}>
                  <Link
                    to={tab.to}
                    className={cn(
                      "flex h-[3.35rem] flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium tracking-wide transition-[color,transform] duration-200 active:scale-[0.95]",
                      active ? "text-primary" : "text-subtle",
                    )}
                  >
                    <Icon className="size-[18px]" strokeWidth={active ? 2.2 : 1.8} />
                    {tab.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <MenuSheet open={menu} onClose={() => setMenu(false)} />
    </div>
  );
}
