import { Fragment, useState, type MouseEvent, type ReactNode, type UIEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  EXPLORE,
  GEM_ACCESS,
  KIT_TOOLS,
  type ExploreCard,
  type FilterId,
  type GemAccessTarget,
} from "@/lib/content";
import {
  IllustDiagnostico,
  IllustEvaluacion,
  IllustPlaneacion,
  IllustPrograma,
  JaliscoMark,
} from "./illustrations";
import { GemOrientation } from "./gem-orientation";
import { readOriginRect, type OriginRect } from "@/lib/gem-access";
import { cn } from "@/lib/utils";

const ILLUST = {
  diagnostico: IllustDiagnostico,
  programa: IllustPrograma,
  planeacion: IllustPlaneacion,
  evaluacion: IllustEvaluacion,
} as const;

const TONE_BG: Record<string, string> = {
  cyan: "from-[#083344] to-[#155e75]",
  green: "from-[#052e1f] to-[#065f46]",
  blue: "from-[#0b1f3a] to-[#1e3a8a]",
  amber: "from-[#3b1408] to-[#9a3412]",
  rose: "from-[#3f0d1c] to-[#9f1239]",
  violet: "from-[#1e1338] to-[#5b21b6]",
  dark: "from-[#141416] to-[#0a0a0b]",
};

const GEM_CARD_IDS = new Set(["diagnostico", "programa", "planeacion", "evaluacion"]);
const CONSTRUCTOR_CARD_IDS = ["diagnostico", "programa", "planeacion", "evaluacion"] as const;

const CONSTRUCTOR_ACCENT: Record<(typeof CONSTRUCTOR_CARD_IDS)[number], string> = {
  diagnostico: "from-[#073745] via-[#0d5664] to-[#0c1115] text-tool-cyan",
  programa: "from-[#063629] via-[#0a6046] to-[#0b1210] text-tool-green",
  planeacion: "from-[#102d58] via-[#184a88] to-[#0c111a] text-tool-blue",
  evaluacion: "from-[#56230f] via-[#8b3a14] to-[#140d09] text-tool-amber",
};

function ConstructorPedagogico({
  onGem,
}: {
  onGem: (target: GemAccessTarget, origin: OriginRect) => void;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const cards = CONSTRUCTOR_CARD_IDS.map((id) => EXPLORE.find((card) => card.id === id)!);

  function updateActiveSlide(event: UIEvent<HTMLDivElement>) {
    const track = event.currentTarget;
    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-constructor-slide]"));
    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveSlide(closestIndex);
  }

  return (
    <section
      className="constructor-mobile-block relative min-w-0 overflow-hidden rounded-[28px] bg-surface shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
      aria-labelledby="constructor-title"
      aria-roledescription="carrusel"
    >
      <div className="flex items-end justify-between gap-4 px-4 pb-3 pt-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-primary">
            Cuatro Gemas · un solo acceso
          </p>
          <h2
            id="constructor-title"
            className="mt-1 text-[20px] font-semibold leading-none tracking-tight"
          >
            Constructor pedagógico
          </h2>
        </div>
        <span className="shrink-0 text-xs tabular-nums text-muted" aria-live="polite">
          {activeSlide + 1} / {cards.length}
        </span>
      </div>

      <div
        className="constructor-track no-scrollbar flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-3"
        onScroll={updateActiveSlide}
      >
        {cards.map((card, index) => {
          const id = card.id as (typeof CONSTRUCTOR_CARD_IDS)[number];
          const Ill = ILLUST[id];
          const target = GEM_ACCESS[id];

          return (
            <button
              key={card.id}
              type="button"
              data-constructor-slide
              className={cn(
                "constructor-slide group relative shrink-0 snap-start overflow-hidden rounded-[22px] bg-gradient-to-br text-left shadow-[0_0_0_1px_rgba(255,255,255,0.11)]",
                CONSTRUCTOR_ACCENT[id],
              )}
              onClick={(event) => onGem(target, readOriginRect(event.currentTarget))}
              aria-label={`Abrir ${card.title}`}
            >
              <div className="absolute inset-0 opacity-85 transition-transform duration-500 group-active:scale-[1.03]">
                <Ill />
              </div>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent px-4 pb-4 pt-16">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-current">
                  Gema {index + 1}
                </span>
                <span className="mt-1 block max-w-[15rem] text-[19px] font-semibold leading-[1.05] tracking-tight text-fg">
                  {card.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4 px-4 pb-4">
        <p className="text-[11px] text-muted">Desliza y toca la Gema que necesitas</p>
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          {cards.map((card, index) => (
            <span
              key={card.id}
              className={cn(
                "h-2.5 rounded-full transition-[width,background-color] duration-300",
                activeSlide === index ? "w-6 bg-primary" : "w-2.5 bg-white/25",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardShell({
  card,
  children,
  onGem,
}: {
  card: ExploreCard;
  children: ReactNode;
  onGem: (target: GemAccessTarget, origin: OriginRect) => void;
}) {
  const classNames = cn(
    "explore-card group relative block overflow-hidden rounded-2xl text-left shadow-[0_0_0_1px_rgba(255,255,255,0.09)]",
    GEM_CARD_IDS.has(card.id) && "constructor-desktop-card",
    card.span === "full" && "col-span-2",
    `explore-card--${card.layout ?? "medium"}`,
  );
  const inner = (
    <>
      {children}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-3.5 pb-3.5 pt-12">
        <span className="block text-[15px] font-semibold leading-[1.12] tracking-tight text-fg">
          {card.title}
        </span>
      </span>
    </>
  );

  if (GEM_CARD_IDS.has(card.id)) {
    const target = GEM_ACCESS[card.id as keyof typeof GEM_ACCESS];
    return (
      <button
        type="button"
        className={classNames}
        onClick={(event: MouseEvent<HTMLButtonElement>) =>
          onGem(target, readOriginRect(event.currentTarget))
        }
        aria-label={`Abrir ${card.title}`}
      >
        {inner}
      </button>
    );
  }

  if (card.id === "gemas-banco") {
    return (
      <Link to="/gemas" className={classNames} aria-label={`Abrir ${card.title}`}>
        {inner}
      </Link>
    );
  }

  return (
    <Link
      to="/t/$slug"
      params={{ slug: card.id }}
      className={classNames}
      aria-label={`Abrir ${card.title}`}
    >
      {inner}
    </Link>
  );
}

export function ExploreGrid({ filter, query }: { filter: FilterId; query: string }) {
  const [gate, setGate] = useState<{ target: GemAccessTarget; origin: OriginRect } | null>(null);
  const q = query.trim().toLowerCase();
  const cards = EXPLORE.filter((card) => {
    const byFilter = filter === "todos" || card.filter.includes(filter);
    const byQuery = !q || card.title.toLowerCase().includes(q);
    return byFilter && byQuery;
  });
  const firstConstructorIndex = cards.findIndex((card) => GEM_CARD_IDS.has(card.id));

  if (!cards.length) {
    return (
      <p className="px-1 py-10 text-center text-sm text-muted">
        No hay coincidencias. Prueba con “planeación”, “evaluación” o “carácter”.
      </p>
    );
  }

  return (
    <>
      <div className="explore-card-grid stagger-in">
        {cards.map((card, index) => {
          const cardElement = (() => {
            if (card.kind === "kit") {
              return (
                <CardShell
                  key={card.id}
                  card={card}
                  onGem={(target, origin) => setGate({ target, origin })}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,71,102,0.28),transparent_42%),linear-gradient(145deg,#280914,#0b0b10_70%)]" />
                  <div className="absolute inset-x-3 top-3 grid grid-cols-3 gap-1.5">
                    {KIT_TOOLS.map((tool) => (
                      <div
                        key={tool.id}
                        className={cn(
                          "flex h-[3.75rem] items-end rounded-lg px-1.5 pb-1.5 text-[8px] font-semibold leading-[1.05] text-fg shadow-[0_5px_16px_rgba(0,0,0,0.3)]",
                          tool.tone === "violet" &&
                            "bg-gradient-to-b from-tool-violet/80 to-[#2e1065]",
                          tool.tone === "green" &&
                            "bg-gradient-to-b from-tool-green/80 to-[#064e3b]",
                          tool.tone === "amber" &&
                            "bg-gradient-to-b from-tool-amber/80 to-[#7c2d12]",
                          tool.tone === "rose" && "bg-gradient-to-b from-tool-rose/80 to-[#9f1239]",
                          tool.tone === "cyan" && "bg-gradient-to-b from-tool-cyan/80 to-[#155e75]",
                        )}
                      >
                        {tool.title}
                      </div>
                    ))}
                  </div>
                </CardShell>
              );
            }

            if (card.kind === "logo") {
              return (
                <CardShell
                  key={card.id}
                  card={card}
                  onGem={(target, origin) => setGate({ target, origin })}
                >
                  <div className="absolute inset-0 bg-[#0c0c0e]" />
                  <JaliscoMark />
                </CardShell>
              );
            }

            if (card.kind === "illustration") {
              const Ill = ILLUST[card.id as keyof typeof ILLUST];
              return (
                <CardShell
                  key={card.id}
                  card={card}
                  onGem={(target, origin) => setGate({ target, origin })}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      TONE_BG[card.tone ?? "dark"],
                    )}
                  />
                  <div className="absolute inset-0 opacity-95">{Ill ? <Ill /> : null}</div>
                </CardShell>
              );
            }

            return (
              <CardShell
                key={card.id}
                card={card}
                onGem={(target, origin) => setGate({ target, origin })}
              >
                {card.id === "gemas-banco" ? (
                  <picture>
                    <source media="(max-width: 767px)" srcSet="/images/gemas-docente-mobile.jpg" />
                    <img
                      src={card.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.035]"
                    />
                  </picture>
                ) : (
                  <img
                    src={card.image}
                    alt=""
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]",
                      card.id === "aprender" && "object-[52%_center]",
                      card.id === "formacion" && "object-[60%_center]",
                      card.id === "conoce" && "object-[62%_center]",
                    )}
                  />
                )}
              </CardShell>
            );
          })();

          return (
            <Fragment key={card.id}>
              {index === firstConstructorIndex ? (
                <ConstructorPedagogico onGem={(target, origin) => setGate({ target, origin })} />
              ) : null}
              {cardElement}
            </Fragment>
          );
        })}
      </div>

      <GemOrientation
        target={gate?.target ?? null}
        origin={gate?.origin ?? null}
        onClose={() => setGate(null)}
      />
    </>
  );
}
