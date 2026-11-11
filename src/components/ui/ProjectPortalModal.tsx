"use client";
import { useEffect, type ComponentType } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { usePortfolio } from "@/store/store";
import { AuditifyStage, DopaDiaryStage, PhalanxStage } from "@/components/projects/ActOne";
import { GillNetStage, DatumStage, BharatRakshaStage } from "@/components/projects/ActTwo";
import { VajraStage, SpecBalloonStage } from "@/components/projects/ActThree";
import { EvenlyStage, KrynexStage, AmitaRasaStage, PaperFellowsStage } from "@/components/projects/ActFour";

const STAGES: Record<string, ComponentType> = {
  auditify: AuditifyStage,
  dopadiary: DopaDiaryStage,
  phalanx: PhalanxStage,
  gillnet: GillNetStage,
  datum: DatumStage,
  bharatraksha: BharatRakshaStage,
  vajra: VajraStage,
  specballoon: SpecBalloonStage,
  evenly: EvenlyStage,
  krynex: KrynexStage,
  amitarasa: AmitaRasaStage,
  paperfellows: PaperFellowsStage,
};

/** Bespoke full-screen deep-dive view for the open project portal.
    The persistent WebGL canvas stays mounted underneath; only the DOM
    view swaps — the Barba-style enter step. ESC or ✕ leaves. */
export default function ProjectPortalModal() {
  const portal = usePortfolio((s) => s.activePortalProject);
  const setPortal = usePortfolio((s) => s.setPortal);
  useEffect(() => {
    if (!portal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPortal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [portal, setPortal]);
  if (!portal) return null;
  const project = PROJECTS.find((p) => p.id === portal);
  if (!project) return null;
  const Stage = STAGES[portal];
  return (
    <div className="fixed inset-0 z-[97] overflow-y-auto bg-[#F4F6F9]" role="dialog" aria-label={`${project.name} — artifact view`}>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#060709] bg-[#060709] px-5 py-3 font-mono2 text-[11px] tracking-[0.16em] text-[#F4F6F9]">
        <span>ARTIFACT — {project.index} / {project.name.toUpperCase()}</span>
        <div className="flex items-center gap-3">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="bg-[#00E5FF] px-3 py-2 text-[#060709]">LIVE SITE ↗</a>
          )}
          <button onClick={() => setPortal(null)} className="border border-[#F4F6F9] px-3 py-2" aria-label="Close artifact">✕ CLOSE</button>
        </div>
      </div>
      <Stage />
      <div className="border-t border-[#060709] bg-[#F4F6F9] px-5 py-6 text-center">
        <button onClick={() => setPortal(null)} className="border border-[#060709] px-5 py-3 font-mono2 text-[11px] tracking-[0.16em]">← RETURN TO THE ODYSSEY</button>
      </div>
    </div>
  );
}
