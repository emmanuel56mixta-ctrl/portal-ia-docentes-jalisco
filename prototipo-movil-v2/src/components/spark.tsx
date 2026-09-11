export function Spark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 2.5l4.2 9.3L30 16l-9.8 4.2L16 29.5l-4.2-9.3L2 16l9.8-4.2L16 2.5z"
      />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2 text-fg">
      <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-fg">
        <Spark className="size-3.5" />
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        {compact ? "IA" : "IA para Docentes"}
      </span>
    </span>
  );
}
