"use client";
import { useState } from "react";
import { MVP, LINKS } from "@/data/portfolioData";
import Magnetic from "./Magnetic";

/** Section 04 — 2-Week MVP interactive timeline + tier selector. */
export default function MvpConfigurator() {
  const [tier, setTier] = useState(1); // Sprint is the default
  const [day, setDay] = useState(6);
  const t = MVP.tiers[tier];
  const phase = MVP.timeline.findIndex((_, i) => day <= [2, 6, 10, 12, 14][i]);
  const activePhase = phase === -1 ? 4 : phase;
  return (
    <section id="mvp" data-section="mvp-sprint" className="relative z-[2] border-t hairline bg-[#F4F6F9] px-5 py-16 md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#FF1E42]">04 / THE 2-WEEK MVP</p>
      <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">
        I build your mobile app MVP in <em className="font-serif2 italic font-normal">14 days</em>, fixed price, you own the code.
      </h2>

      <p className="mt-8 font-mono2 text-[11px] tracking-[0.18em]">14-DAY TIMELINE — SCRUB DAY {String(day).padStart(2, "0")} / 14</p>
      <input type="range" min={1} max={14} value={day} onChange={(e) => setDay(Number(e.target.value))} className="mt-3 w-full" aria-label="MVP timeline scrubber" />
      <div className="mt-4 grid gap-px bg-[#CBD2D9] md:grid-cols-5">
        {MVP.timeline.map((s, i) => (
          <div key={s.day} className="p-4" style={{ background: i === activePhase ? "#060709" : "#E1E5EC", color: i === activePhase ? "#F4F6F9" : "#060709" }}>
            <p className="font-mono2 text-[11px] tracking-[0.14em]">DAY {s.day}</p>
            <p className="mt-2 font-display text-base font-bold leading-tight">{s.phase}</p>
            <p className="mt-1 text-xs text-[#7E8794]" style={{ color: i === activePhase ? "#CBD2D9" : "#7E8794" }}>{s.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-px bg-[#CBD2D9] md:grid-cols-3">
        {MVP.tiers.map((tierOpt, i) => (
          <button key={tierOpt.id} onClick={() => setTier(i)} className="p-6 text-left" style={{ background: i === tier ? "#FF1E42" : "#F4F6F9", color: i === tier ? "#fff" : "#060709" }} aria-pressed={i === tier}>
            <p className="font-mono2 text-[11px] tracking-[0.18em]">{tierOpt.name.toUpperCase()}</p>
            <p className="mt-2 font-display text-5xl font-extrabold">${tierOpt.price.toLocaleString()}</p>
            <p className="mt-2 text-sm">{tierOpt.note}</p>
            <p className="mt-1 font-mono2 text-[11px] tracking-[0.12em]">{tierOpt.terms.toUpperCase()}</p>
          </button>
        ))}
      </div>

      <div className="mt-px border hairline bg-white p-5 font-mono2 text-[12px] leading-7 tracking-[0.08em]">
        <p>CONTRACT LEDGER — {t.name.toUpperCase()} TIER</p>
        <p>UPFRONT DEPOSIT: ${t.upfront.toLocaleString()} (50%) · BALANCE ON DELIVERY: ${(t.price - t.upfront).toLocaleString()}</p>
        <p>DELIVERY WINDOW: 14 DAYS · IP OWNERSHIP: 100% CLIENT</p>
        <div className="mt-4">
          <Magnetic>
            <a href={`mailto:${LINKS.email}?subject=2-Week%20MVP%20—%20${encodeURIComponent(t.name)}%20Tier%20($${t.price.toLocaleString()})&body=Hi%20Dhyey%2C%0A%0AI%20want%20the%20${encodeURIComponent(t.name)}%20MVP%20sprint%20($${t.price.toLocaleString()}%2C%2050%25%20upfront).%20My%20app%20idea%3A%20`} className="inline-block bg-[#060709] px-5 py-3 text-[#F4F6F9]">START — {t.name.toUpperCase()} ${t.price.toLocaleString()} ↗</a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
