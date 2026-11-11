import { create } from "zustand";

export type SectionId =
  | "hero"
  | "manifesto"
  | "works-flagship"
  | "works-editorial"
  | "mvp-sprint"
  | "telemetry-academics"
  | "contact";
export type SurfaceTheme = "paper" | "obsidian" | "blueprint";
export type CursorState =
  | "default"
  | "magnetic"
  | "inspect"
  | "drag"
  | "external-link";

type PortfolioState = {
  scrollProgress: number;
  scrollVelocity: number;
  activeSection: SectionId;
  activeProjectIndex: number;
  surfaceTheme: SurfaceTheme;
  cursorState: CursorState;
  cursorLabel: string;
  soundOn: boolean;
  systemHud: boolean;
  booted: boolean;
  setScroll: (progress: number, velocity: number) => void;
  setSection: (s: SectionId) => void;
  setProject: (i: number) => void;
  setTheme: (t: SurfaceTheme) => void;
  setCursor: (c: CursorState, label?: string) => void;
  toggleSound: () => void;
  toggleHud: () => void;
  setBooted: () => void;
};

export const usePortfolio = create<PortfolioState>()((set) => ({
  scrollProgress: 0,
  scrollVelocity: 0,
  activeSection: "hero",
  activeProjectIndex: 0,
  surfaceTheme: "paper",
  cursorState: "default",
  cursorLabel: "",
  soundOn: false,
  systemHud: false,
  booted: false,
  setScroll: (progress, velocity) =>
    set({ scrollProgress: progress, scrollVelocity: velocity }),
  setSection: (s) => set({ activeSection: s }),
  setProject: (i) => set({ activeProjectIndex: i }),
  setTheme: (t) => set({ surfaceTheme: t }),
  setCursor: (c, label = "") => set({ cursorState: c, cursorLabel: label }),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  toggleHud: () => set((s) => ({ systemHud: !s.systemHud })),
  setBooted: () => set({ booted: true }),
}));
