"use client";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/store/store";
import { LINKS } from "@/data/portfolioData";
import Magnetic, { Scramble } from "./Magnetic";

const BOOT_LINES = [
  "INITIALIZING WGSL KERNEL STAGE",
  "MOUNTING 12 PRODUCTION ARTIFACTS",
  "B.TECH CSE // VIT BHOPAL",
  "FLAT COLOUR ONLY — NO GRADIENTS",
];

/** 1.8s max tactile boot sequence + persistent architectural HUD frame. */
export default function Chrome() {
  const [line, setLine] = useState(0);
  const [gone, setGone] = useState(false);
  const booted = usePortfolio((s) => s.booted);
  const setBooted = usePortfolio((s) => s.setBooted);
  const velocity = usePortfolio((s) => s.scrollVelocity);
  const section = usePortfolio((s) => s.activeSection);
  const soundOn = usePortfolio((s) => s.soundOn);
  const toggleSound = usePortfolio((s) => s.toggleSound);
  const systemHud = usePortfolio((s) => s.systemHud);
  const toggleHud = usePortfolio((s) => s.toggleHud);

  useEffect(() => {
    const timers = BOOT_LINES.map((_, i) => setTimeout(() => setLine(i + 1), 320 * (i + 1)));
    const end = setTimeout(() => { setGone(true); setBooted(); }, 1800);
    return () => { timers.forEach(clearTimeout); clearTimeout(end); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!gone && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#060709] p-6 text-[#F4F6F9]">
          <div className="font-mono2 text-[11px] tracking-[0.2em]">DHYEY PATEL — BOOT SEQUENCE</div>
          <div>
            {BOOT_LINES.slice(0, line).map((l) => (
              <div key={l} className="font-mono2 text-xs leading-6 text-[#B8FF01]">{`> ${l}`}</div>
            ))}
            <div className="mt-4 h-3 w-full border border-[#F4F6F9]">
              <div className="h-full bg-[#FF1E42] transition-all duration-300" style={{ width: `${(line / BOOT_LINES.length) * 100}%` }} />
            </div>
          </div>
          <div className="font-mono2 text-[11px] tracking-[0.2em] text-[#7E8794]">1.8S MAX — NON-BLOCKING AFTER FIRST VISIT</div>
        </div>
      )}

      {/* Persistent 1px architectural frame */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] border border-[#060709]" />
      <header className="fixed inset-x-0 top-0 z-[81] flex items-start justify-between px-5 pt-4 font-mono2 text-[10px] tracking-[0.16em] md:px-8 md:text-[11px]">
        <a href="#hero" className="bg-[#F4F6F9] px-2 py-1 text-[#060709]">DHYEY PATEL — 19 // BHOPAL, IN</a>
        <div className="flex items-center gap-2">
          <button onClick={toggleSound} className="border border-[#060709] bg-[#F4F6F9] px-2 py-1 text-[#060709]" aria-pressed={soundOn}>
            <Scramble text={`SOUND ${soundOn ? "ON" : "OFF"}`} />
          </button>
          <button onClick={toggleHud} className="border border-[#060709] bg-[#B8FF01] px-2 py-1 text-[#060709]" aria-pressed={systemHud}>
            <Scramble text={systemHud ? "[SYSTEM: AWAKENED]" : "[SYSTEM: AWAKEN]"} />
          </button>
          <a href="#works" className="hidden bg-[#060709] px-2 py-1 text-[#F4F6F9] sm:block">INDEX ↓</a>
        </div>
      </header>
      <div className="fixed inset-x-0 bottom-0 z-[81] flex items-end justify-between px-5 pb-4 font-mono2 text-[10px] tracking-[0.16em] md:px-8 md:text-[11px]">
        <span className="bg-[#F4F6F9] px-2 py-1 text-[#060709]">VEL: {velocity.toFixed(2)} px/f · {section.toUpperCase()}</span>
        <Magnetic>
          <a href="#mvp" className="bg-[#FF1E42] px-3 py-2 text-[#FFFFFF]">2-WEEK MVP SPRINT — OPEN ↗</a>
        </Magnetic>
      </div>
      {booted && <span className="hidden">{LINKS.email}</span>}
    </>
  );
}
