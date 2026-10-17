import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { AppShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { GEMAS } from "@/lib/content";
import { generateWithGrok } from "@/lib/ai";
import { localChatReply } from "@/lib/templates";
import { useAppStore } from "@/lib/store";
import { Markdown } from "@/components/markdown";
import { Spark } from "@/components/spark";

export const Route = createFileRoute("/asistente")({
  validateSearch: (s: Record<string, unknown>): { gema?: string } =>
    typeof s.gema === "string" ? { gema: s.gema } : {},
  component: AsistentePage,
});

const STARTERS = [
  "Arma una planeación de 2 sesiones",
  "Dame preguntas detonadoras",
  "Rúbrica holística de 4 niveles",
  "Actividad de carácter para el recreo",
];

function AsistentePage() {
  const { gema } = Route.useSearch();
  const profile = useAppStore((s) => s.profile);
  const chat = useAppStore((s) => s.chat);
  const push = useAppStore((s) => s.pushChat);
  const clear = useAppStore((s) => s.clearChat);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const primed = useRef(false);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [chat.length, busy]);

  useEffect(() => {
    if (primed.current) return;
    if (!gema) return;
    const g = GEMAS.find((x) => x.id === gema);
    if (!g) return;
    primed.current = true;
    void send(g.prompt, "gema");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gema]);

  async function send(raw: string, kind: "chat" | "gema" = "chat") {
    const msg = raw.trim();
    if (!msg || busy) return;
    setText("");
    push({ role: "user", content: msg });
    setBusy(true);
    const ctx = [
      profile.name && `Docente: ${profile.name}`,
      profile.school && `Escuela: ${profile.school}`,
      profile.fase && `Fase: ${profile.fase}`,
      profile.campo && `Campo: ${profile.campo}`,
      profile.grupo && `Grupo: ${profile.grupo}`,
    ]
      .filter(Boolean)
      .join(". ");
    const user = ctx ? `${msg}\n\nContexto del docente: ${ctx}` : msg;
    const history = useAppStore.getState().chat.slice(-8).map((m) => ({
      role: m.role,
      content: m.content,
    }));
    try {
      const res = await generateWithGrok({ data: { kind, user, history } });
      if (res.ok) push({ role: "assistant", content: res.text });
      else push({ role: "assistant", content: localChatReply(msg, profile.name) });
    } catch {
      push({ role: "assistant", content: localChatReply(msg, profile.name) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell title="Asistente">
      <div className="flex min-h-[calc(100dvh-8.5rem)] flex-col px-4">
        <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto pb-3">
          {chat.length === 0 && (
            <div className="pt-4">
              <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-primary text-primary-fg">
                <Spark className="size-6" />
              </div>
              <h2 className="text-center text-lg font-semibold tracking-tight">
                ¿Qué preparamos hoy?
              </h2>
              <p className="mx-auto mt-1 max-w-[34ch] text-center text-sm text-muted">
                Pide un borrador. Tú recortas, anclas al grupo y decides.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="rounded-lg bg-surface px-3 py-3 text-left text-[13px] font-medium leading-snug shadow-[0_0_0_1px_rgba(244,244,245,0.08)] hover:bg-surface-2"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {chat.map((m) => (
            <div
              key={m.id}
              className={
                m.role === "user"
                  ? "ml-8 rounded-xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm text-primary-fg"
                  : "mr-4 rounded-xl rounded-bl-sm bg-surface px-3.5 py-3 shadow-[0_0_0_1px_rgba(244,244,245,0.08)]"
              }
            >
              {m.role === "assistant" ? <Markdown text={m.content} /> : m.content}
            </div>
          ))}
          {busy && (
            <div className="mr-4 flex items-center gap-2 rounded-xl bg-surface px-3.5 py-3 text-sm text-muted">
              <Sparkles className="size-4 animate-pulse text-primary" />
              Pensando la clase…
            </div>
          )}
        </div>

        <form
          className="sticky bottom-0 flex items-end gap-2 bg-bg pb-1 pt-2"
          onSubmit={(e) => {
            e.preventDefault();
            void send(text);
          }}
        >
          {chat.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="grid size-11 shrink-0 place-items-center rounded-lg text-subtle hover:bg-surface-2"
              aria-label="Nueva conversación"
            >
              <Trash2 className="size-4" />
            </button>
          )}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            placeholder="Escribe una consigna…"
            className="max-h-28 min-h-11 flex-1 resize-none rounded-lg bg-surface-2 px-3.5 py-2.5 text-sm outline-none shadow-[0_0_0_1px_rgba(244,244,245,0.1)] focus:shadow-[0_0_0_2px_rgba(255,90,31,0.5)]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(text);
              }
            }}
          />
          <Button type="submit" size="icon" disabled={busy || !text.trim()} aria-label="Enviar">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </AppShell>
  );
}
