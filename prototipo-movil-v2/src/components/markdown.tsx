import type { ReactNode } from "react";

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}

export function Markdown({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const nodes: ReactNode[] = [];
  let list: string[] = [];
  let table: string[][] = [];

  const flushList = () => {
    if (!list.length) return;
    nodes.push(
      <ul key={`ul-${nodes.length}`}>
        {list.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  const flushTable = () => {
    if (table.length < 2) {
      table = [];
      return;
    }
    const head = table[0];
    const rows = table.slice(2);
    nodes.push(
      <div key={`tb-${nodes.length}`} className="my-3 overflow-x-auto">
        <table className="w-full min-w-[280px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-border text-muted">
              {head.map((c, i) => (
                <th key={i} className="px-2 py-1.5 font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border/60">
                {r.map((c, j) => (
                  <td key={j} className="px-2 py-1.5 align-top">
                    {inline(c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
    table = [];
  };

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();
    if (line.startsWith("|") && line.endsWith("|")) {
      flushList();
      table.push(
        line
          .slice(1, -1)
          .split("|")
          .map((c) => c.trim()),
      );
      return;
    }
    flushTable();
    if (/^\s*[-•]\s+/.test(line)) {
      list.push(line.replace(/^\s*[-•]\s+/, ""));
      return;
    }
    flushList();
    if (!line.trim()) {
      return;
    }
    if (line.startsWith("### ")) {
      nodes.push(<h3 key={idx}>{inline(line.slice(4))}</h3>);
    } else if (line.startsWith("## ")) {
      nodes.push(<h2 key={idx}>{inline(line.slice(3))}</h2>);
    } else if (line.startsWith("# ")) {
      nodes.push(<h1 key={idx}>{inline(line.slice(2))}</h1>);
    } else {
      nodes.push(<p key={idx}>{inline(line)}</p>);
    }
  });
  flushList();
  flushTable();
  return <div className="prose-ai">{nodes}</div>;
}
