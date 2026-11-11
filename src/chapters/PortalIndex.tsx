"use client";
import { PROJECTS } from "@/data/portfolioData";
import { usePortfolio } from "@/store/store";

/** Per-chapter portal index: "ENTER ARTIFACT" triggers the Barba-style
    portal transition into that project's bespoke full-screen view. */
export default function PortalIndex({ ids }: { ids: string[] }) {
  const setPortal = usePortfolio((s) => s.setPortal);
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {ids.map((id) => {
        const p = PROJECTS.find((x) => x.id === id);
        if (!p) return null;
        return (
          <button
            key={id}
            onClick={() => setPortal(id)}
            className="border border-[#F4F6F9] px-3 py-2 font-mono2 text-[11px] tracking-[0.14em] text-[#F4F6F9] hover:bg-[#F4F6F9] hover:text-[#060709]"
          >
            ENTER ARTIFACT — {p.name.toUpperCase()} ↗
          </button>
        );
      })}
    </div>
  );
}
