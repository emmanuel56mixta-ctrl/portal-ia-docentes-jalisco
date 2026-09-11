import type { GemAccessTarget } from "./content";

export type OriginRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function readOriginRect(element: HTMLElement): OriginRect {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
  };
}

export function promptTarget(id: string, title: string, copyText: string): GemAccessTarget {
  return {
    id,
    title,
    url: "https://gemini.google.com/app",
    copyText,
  };
}
