"use client";
import ActTwo from "@/components/projects/ActTwo";
import PortalIndex from "./PortalIndex";

/** CHAPTER II — "The Autonomous Shield & the Red Team".
    PHALANX (3-juror tribunal), GillNet, DATUM and BharatRaksha —
    swarms, security, seller defense. */
export default function ChapterTwoAutonomousShield() {
  return (
    <section data-chapter="chapter-two" className="relative z-[2]">
      <div className="border-t border-[#060709] bg-[#060709] px-5 py-14 text-[#F4F6F9] md:px-10">
        <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#FF1E42]">CHAPTER II — THE AUTONOMOUS SHIELD &amp; THE RED TEAM</p>
        <p className="mt-4 max-w-3xl font-serif2 text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-tight">
          Deterministic rule engineering wins on speed and clarity. No bloated models required.
        </p>
        <PortalIndex ids={["phalanx", "gillnet", "datum", "bharatraksha"]} />
      </div>
      <ActTwo />
    </section>
  );
}
