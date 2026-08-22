import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck, Sparkles, X } from "lucide-react";
import type { GemAccessTarget } from "@/lib/content";
import type { OriginRect } from "@/lib/gem-access";
import { cn } from "@/lib/utils";

export function GemOrientation({
  target,
  origin,
  onClose,
}: {
  target: GemAccessTarget | null;
  origin: OriginRect | null;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [step, setStep] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const closeGate = useCallback(() => {
    if (reducedMotion) {
      onClose();
      return;
    }
    setRevealed(false);
    setExpanded(false);
    window.setTimeout(onClose, 300);
  }, [onClose, reducedMotion]);

  useLayoutEffect(() => {
    if (!target) return;
    setStep(0);

    if (reducedMotion) {
      setExpanded(true);
      setRevealed(true);
      return;
    }

    const frame = window.requestAnimationFrame(() => setExpanded(true));
    const revealTimer = window.setTimeout(() => setRevealed(true), 360);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(revealTimer);
    };
  }, [reducedMotion, target]);

  useEffect(() => {
    if (!target) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGate();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeGate, target]);

  useEffect(() => {
    if (revealed) closeRef.current?.focus();
  }, [revealed]);

  if (!target || typeof document === "undefined") return null;

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const panelWidth = Math.min(viewportWidth, 430);
  const panelLeft = (viewportWidth - panelWidth) / 2;
  const start = origin ?? {
    left: panelLeft + panelWidth * 0.12,
    top: viewportHeight * 0.4,
    width: panelWidth * 0.76,
    height: 150,
  };
  const scaleX = Math.max(start.width / panelWidth, 0.01);
  const scaleY = Math.max(start.height / viewportHeight, 0.01);
  const startTransform = `translate3d(${start.left - panelLeft}px, ${start.top}px, 0) scale(${scaleX}, ${scaleY}) rotate(-1.25deg)`;

  function openGem() {
    if (target?.copyText && navigator.clipboard) {
      void navigator.clipboard.writeText(target.copyText);
    }
    window.open(target?.url, "_blank", "noopener,noreferrer");
    closeGate();
  }

  return createPortal(
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-labelledby="gem-gate-title">
      <button
        type="button"
        aria-label="Cerrar orientación"
        onClick={closeGate}
        className={cn(
          "absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300",
          expanded ? "opacity-100" : "opacity-0",
        )}
      />

      <section
        data-gem={target.id}
        className="gem-gate-panel overflow-hidden bg-bg shadow-[0_0_80px_rgba(0,0,0,0.65)]"
        style={{
          left: panelLeft,
          width: panelWidth,
          height: viewportHeight,
          transform: expanded ? "translate3d(0,0,0) scale(1) rotate(0deg)" : startTransform,
        }}
      >
        <div
          aria-hidden
          className={cn(
            "gem-gate-preview absolute inset-0 transition-opacity duration-200",
            revealed ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        >
          <Sparkles className="absolute left-5 top-5 size-5 text-white/70" />
          <p className="absolute inset-x-5 bottom-5 text-2xl font-semibold leading-tight tracking-tight text-white">
            {target.title}
          </p>
        </div>

        <div
          className={cn(
            "relative flex h-full flex-col transition-opacity duration-200",
            revealed ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <header className="flex items-center gap-3 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <button
              ref={closeRef}
              type="button"
              onClick={step === 0 ? closeGate : () => setStep(0)}
              className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface text-fg transition-transform duration-200 active:scale-95"
              aria-label={step === 0 ? "Cerrar" : "Regresar"}
            >
              {step === 0 ? <X className="size-5" /> : <ArrowLeft className="size-5" />}
            </button>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Antes de entrar a la Gema
              </p>
              <h1 id="gem-gate-title" className="truncate text-[15px] font-semibold tracking-tight">
                {target.title}
              </h1>
            </div>
            <span className="text-xs tabular-nums text-subtle">{step + 1} / 2</span>
          </header>

          <div className="flex gap-1.5 px-4">
            <span className="h-1 flex-1 rounded-full bg-primary" />
            <span className={cn("h-1 flex-1 rounded-full", step === 1 ? "bg-primary" : "bg-surface-2")} />
          </div>

          <main className="gem-gate-main no-scrollbar flex min-h-0 flex-1 items-center overflow-y-auto px-4 py-6">
            {step === 0 ? (
              <article className="orientation-card w-full overflow-hidden rounded-[28px] border border-white/10 bg-surface p-5">
                <span className="grid size-14 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <ShieldCheck className="size-7" />
                </span>
                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  Prepara tu acceso
                </p>
                <h2 className="mt-2 text-[28px] font-semibold leading-[1.05] tracking-tight">
                  Entra con tu cuenta institucional
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Inicia sesión en Gemini con tu cuenta @jaliscoedu.mx. La Gema se abrirá en otra
                  pestaña para que este portal siga disponible.
                </p>
                <ul className="mt-7 space-y-3 text-sm text-fg/90">
                  <li className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-tool-green" />
                    Confirma que estás en la cuenta correcta.
                  </li>
                  <li className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-tool-green" />
                    No compartas nombres, fotos ni calificaciones.
                  </li>
                </ul>
              </article>
            ) : (
              <article className="orientation-card orientation-card--second w-full overflow-hidden rounded-[28px] border border-white/10 bg-surface p-5">
                <span className="grid size-14 place-items-center rounded-2xl bg-tool-violet/15 text-tool-violet">
                  <Sparkles className="size-7" />
                </span>
                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-tool-violet">
                  Trabaja con criterio
                </p>
                <h2 className="mt-2 text-[28px] font-semibold leading-[1.05] tracking-tight">
                  Dale contexto y hazla tuya
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Indica fase, campo formativo, PDA, tiempo y materiales reales. Revisa cada
                  propuesta y adáptala a tu grupo antes de usarla.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-2">
                  <p className="rounded-2xl bg-bg/70 p-3 text-sm font-medium text-fg">La IA propone</p>
                  <p className="rounded-2xl bg-bg/70 p-3 text-sm font-medium text-primary">
                    Tu criterio decide
                  </p>
                </div>
                {target.copyText ? (
                  <p className="mt-4 text-xs leading-relaxed text-subtle">
                    Al continuar copiaremos una guía inicial para que puedas pegarla en Gemini.
                  </p>
                ) : null}
              </article>
            )}
          </main>

          <footer className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={step === 0 ? () => setStep(1) : openGem}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-[15px] font-semibold text-primary-fg shadow-[0_14px_30px_-16px_rgba(255,90,31,0.9)] transition-[transform,filter] duration-200 active:scale-[0.97] active:brightness-95"
            >
              {step === 0 ? "Siguiente" : target.copyText ? "Copiar guía y abrir Gemini" : "Abrir Gema en Gemini"}
              {step === 1 ? <ArrowUpRight className="size-4" /> : null}
            </button>
          </footer>
        </div>
      </section>
    </div>,
    document.body,
  );
}
