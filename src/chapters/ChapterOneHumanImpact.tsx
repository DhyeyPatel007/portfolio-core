"use client";
import ActOne from "@/components/projects/ActOne";
import PortalIndex from "./PortalIndex";

/** CHAPTER I — "Production at the Edge of Human Impact".
    DopaDiary + Auditify (PHALANX's tribunal follows as the bridge into
    Chapter II's defense bunker). */
export default function ChapterOneHumanImpact() {
  return (
    <section data-chapter="chapter-one" className="relative z-[2]">
      <div className="border-t border-[#060709] bg-[#060709] px-5 py-14 text-[#F4F6F9] md:px-10">
        <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#00D68F]">CHAPTER I — PRODUCTION AT THE EDGE OF HUMAN IMPACT</p>
        <p className="mt-4 max-w-3xl font-serif2 text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-tight">
          Technology where it meets real human and commercial stakes.
        </p>
        <PortalIndex ids={["dopadiary", "auditify"]} />
      </div>
      <ActOne />
    </section>
  );
}
