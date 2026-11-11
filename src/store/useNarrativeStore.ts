// Narrative store — v2 file-tree location.
// Single source: the same zustand store instance as usePortfolio,
// exposed under its narrative name. No divergent state.
export { usePortfolio as useNarrativeStore } from "./store";
export type { ChapterId, SectionId, SurfaceTheme, CursorState } from "./store";
