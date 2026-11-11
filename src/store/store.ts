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
/** v2 narrative chapters: prologue + I–V. */
export type ChapterId =
  | "prologue"
  | "chapter-one"
  | "chapter-two"
  | "chapter-three"
  | "chapter-four"
  | "chapter-five";

type PortfolioState = {
  scrollProgress: number;
  scrollVelocity: number;
  activeSection: SectionId;
  activeChapter: ChapterId;
  activeProjectIndex: number;
  /** Barba-style portal: id of the project open full-screen, or null. */
  activePortalProject: string | null;
  surfaceTheme: SurfaceTheme;
  cursorState: CursorState;
  cursorLabel: string;
  soundOn: boolean;
  systemHud: boolean;
  /** Solo Leveling System Awakening — same flag as systemHud, narrative name. */
  systemAwakened: boolean;
  booted: boolean;
  /** Last raycast hit on the 3D monolith, in world coords (null = no hit). */
  raycastPoint: [number, number, number] | null;
  setScroll: (progress: number, velocity: number) => void;
  setSection: (s: SectionId) => void;
  setChapter: (c: ChapterId) => void;
  setProject: (i: number) => void;
  setPortal: (id: string | null) => void;
  setTheme: (t: SurfaceTheme) => void;
  setCursor: (c: CursorState, label?: string) => void;
  setRaycast: (p: [number, number, number] | null) => void;
  toggleSound: () => void;
  toggleHud: () => void;
  setBooted: () => void;
};

export const usePortfolio = create<PortfolioState>()((set) => ({
  scrollProgress: 0,
  scrollVelocity: 0,
  activeSection: "hero",
  activeChapter: "prologue",
  activeProjectIndex: 0,
  activePortalProject: null,
  surfaceTheme: "paper",
  cursorState: "default",
  cursorLabel: "",
  soundOn: false,
  systemHud: false,
  systemAwakened: false,
  booted: false,
  raycastPoint: null,
  setScroll: (progress, velocity) =>
    set({ scrollProgress: progress, scrollVelocity: velocity }),
  setSection: (s) => set({ activeSection: s }),
  setChapter: (c) => set({ activeChapter: c }),
  setProject: (i) => set({ activeProjectIndex: i }),
  setPortal: (id) => set({ activePortalProject: id }),
  setTheme: (t) => set({ surfaceTheme: t }),
  setCursor: (c, label = "") => set({ cursorState: c, cursorLabel: label }),
  setRaycast: (p) => set({ raycastPoint: p }),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  toggleHud: () =>
    set((s) => ({ systemHud: !s.systemHud, systemAwakened: !s.systemHud })),
  setBooted: () => set({ booted: true }),
}));

/** Narrative-shaped alias required by the v2 file tree.
    Same store instance — no divergent state. */
export const useNarrativeStore = usePortfolio;
