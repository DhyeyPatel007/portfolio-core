"use client";
import ActThree from "@/components/projects/ActThree";
import PortalIndex from "./PortalIndex";

/** CHAPTER III — "Bare Metal, Silicon & Blueprints".
    Vajra + SpecBalloon. Orthographic CAD projection zone. */
export default function ChapterThreeSiliconCAD() {
  return (
    <section data-chapter="chapter-three" className="relative z-[2]">
      <div className="border-t border-[#060709] bg-[#060709] px-5 py-14 text-[#F4F6F9] md:px-10">
        <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#00E5FF]">CHAPTER III — BARE METAL, SILICON &amp; BLUEPRINTS</p>
        <p className="mt-4 max-w-3xl font-serif2 text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-tight">
          AI and compute, straight into browser silicon — and onto the CNC floor.
        </p>
        <PortalIndex ids={["vajra", "specballoon"]} />
      </div>
      <ActThree />
    </section>
  );
}
