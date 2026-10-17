import { create } from "zustand";
import { uid } from "./utils";

export type Profile = {
  name: string;
  school: string;
  cct: string;
  zona: string;
  fase: string;
  grupo: string;
  campo: string;
  onboarded: boolean;
};

export type Planeacion = {
  id: string;
  title: string;
  fase: string;
  campo: string;
  tema: string;
  content: string;
  createdAt: string;
};

export type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type DiagAnswers = Record<string, string>;

type State = {
  profile: Profile;
  setProfile: (p: Partial<Profile>) => void;
  planeaciones: Planeacion[];
  savePlaneacion: (p: Omit<Planeacion, "id" | "createdAt"> & { id?: string }) => string;
  deletePlaneacion: (id: string) => void;
  rutaDone: Record<string, boolean>;
  completeStep: (id: string) => void;
  gemaFavs: string[];
  toggleGema: (id: string) => void;
  diag: DiagAnswers | null;
  setDiag: (a: DiagAnswers) => void;
  chat: ChatMsg[];
  pushChat: (m: Omit<ChatMsg, "id">) => void;
  clearChat: () => void;
};

const emptyProfile: Profile = {
  name: "",
  school: "",
  cct: "",
  zona: "",
  fase: "4",
  grupo: "",
  campo: "lenguajes",
  onboarded: false,
};

const KEY = "ia-docentes-v1";

export const useAppStore = create<State>((set) => ({
  profile: emptyProfile,
  setProfile: (p) =>
    set((s) => ({
      profile: { ...s.profile, ...p },
    })),
  planeaciones: [],
  savePlaneacion: (p) => {
    const id = p.id ?? uid();
    const createdAt = new Date().toISOString();
    set((s) => {
      const next = s.planeaciones.filter((x) => x.id !== id);
      return {
        planeaciones: [{ ...p, id, createdAt }, ...next],
      };
    });
    return id;
  },
  deletePlaneacion: (id) =>
    set((s) => ({ planeaciones: s.planeaciones.filter((p) => p.id !== id) })),
  rutaDone: {},
  completeStep: (id) =>
    set((s) => ({ rutaDone: { ...s.rutaDone, [id]: true } })),
  gemaFavs: [],
  toggleGema: (id) =>
    set((s) => ({
      gemaFavs: s.gemaFavs.includes(id)
        ? s.gemaFavs.filter((x) => x !== id)
        : [...s.gemaFavs, id],
    })),
  diag: null,
  setDiag: (a) => set({ diag: a }),
  chat: [],
  pushChat: (m) =>
    set((s) => ({
      chat: [...s.chat, { ...m, id: uid() }].slice(-24),
    })),
  clearChat: () => set({ chat: [] }),
}));

type Persisted = Pick<
  State,
  "profile" | "planeaciones" | "rutaDone" | "gemaFavs" | "diag" | "chat"
>;

export function hydrateAppStore() {
  if (typeof window === "undefined") return () => {};
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Persisted>;
      useAppStore.setState({
        profile: { ...emptyProfile, ...parsed.profile },
        planeaciones: parsed.planeaciones ?? [],
        rutaDone: parsed.rutaDone ?? {},
        gemaFavs: parsed.gemaFavs ?? [],
        diag: parsed.diag ?? null,
        chat: parsed.chat ?? [],
      });
    }
  } catch {
    /* ignore */
  }
  return useAppStore.subscribe((s) => {
    const data: Persisted = {
      profile: s.profile,
      planeaciones: s.planeaciones,
      rutaDone: s.rutaDone,
      gemaFavs: s.gemaFavs,
      diag: s.diag,
      chat: s.chat,
    };
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  });
}
