"use client";
import { useEffect, useState } from "react";
import { usePortfolio } from "@/store/store";
import { LINKS } from "@/data/portfolioData";
import Magnetic from "./Magnetic";

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
        <div className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0A0A0A] p-6 text-[#F2EFE9]">
          <div className="font-mono2 text-[11px] tracking-[0.2em]">DHYEY PATEL — BOOT SEQUENCE</div>
          <div>
            {BOOT_LINES.slice(0, line).map((l) => (
              <div key={l} className="font-mono2 text-xs leading-6 text-[#C6F10E]">{`> ${l}`}</div>
            ))}
            <div className="mt-4 h-3 w-full border border-[#F2EFE9]">
              <div className="h-full bg-[#FF3300] transition-all duration-300" style={{ width: `${(line / BOOT_LINES.length) * 100}%` }} />
            </div>
          </div>
          <div className="font-mono2 text-[11px] tracking-[0.2em] text-[#5A5751]">1.8S MAX — NON-BLOCKING AFTER FIRST VISIT</div>
        </div>
      )}

      {/* Persistent 1px architectural frame */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] border border-[#0A0A0A]" />
      <header className="fixed inset-x-0 top-0 z-[81] flex items-start justify-between px-5 pt-4 font-mono2 text-[10px] tracking-[0.16em] md:px-8 md:text-[11px]">
        <a href="#hero" className="bg-[#F2EFE9] px-2 py-1 text-[#0A0A0A]">DHYEY PATEL — 19 // BHOPAL, IN</a>
        <div className="flex items-center gap-2">
          <button onClick={toggleSound} className="border border-[#0A0A0A] bg-[#F2EFE9] px-2 py-1 text-[#0A0A0A]" aria-pressed={soundOn}>
            SOUND {soundOn ? "ON" : "OFF"}
          </button>
          <button onClick={toggleHud} className="border border-[#0A0A0A] bg-[#C6F10E] px-2 py-1 text-[#0A0A0A]" aria-pressed={systemHud}>
            SYSTEM {systemHud ? "ON" : "OFF"}
          </button>
          <a href="#works" className="hidden bg-[#0A0A0A] px-2 py-1 text-[#F2EFE9] sm:block">INDEX ↓</a>
        </div>
      </header>
      <div className="fixed inset-x-0 bottom-0 z-[81] flex items-end justify-between px-5 pb-4 font-mono2 text-[10px] tracking-[0.16em] md:px-8 md:text-[11px]">
        <span className="bg-[#F2EFE9] px-2 py-1 text-[#0A0A0A]">VEL: {velocity.toFixed(2)} px/f · {section.toUpperCase()}</span>
        <Magnetic>
          <a href="#mvp" className="bg-[#FF3300] px-3 py-2 text-[#FFFFFF]">2-WEEK MVP SPRINT — OPEN ↗</a>
        </Magnetic>
      </div>
      {booted && <span className="hidden">{LINKS.email}</span>}
    </>
  );
}
