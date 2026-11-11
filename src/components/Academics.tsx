"use client";
import { SKILL_GROUPS, ACADEMICS, NPTEL, INTERESTS } from "@/data/portfolioData";
import { usePortfolio } from "@/store/store";

/** Section 05 — Skills, academic telemetry, personal DNA + System HUD. */
export default function Academics() {
  const systemHud = usePortfolio((s) => s.systemHud);
  return (
    <section data-section="telemetry-academics" className="relative z-[2] border-t hairline bg-[#E1E5EC] px-5 py-16 md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#FF1E42]">05 / TECHNICAL SPECIFICATION SHEET</p>
      <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold leading-[0.92] tracking-[-0.03em]">Skills, scores, <em className="font-serif2 italic font-normal">no fake meters.</em></h2>

      <div className="mt-10 grid gap-px bg-[#CBD2D9] md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((g) => (
          <div key={g.group} className="bg-[#E1E5EC] p-5">
            <p className="font-mono2 text-[11px] tracking-[0.18em] text-[#7E8794]">{g.group.toUpperCase()}</p>
            <p className="mt-3 text-base leading-7">{g.items.join(" · ")}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="border hairline bg-[#F4F6F9] p-6">
          <p className="font-mono2 text-[11px] tracking-[0.18em]">VIT BHOPAL — B.TECH CSE · GRADUATING JUNE 2029</p>
          <p className="mt-2 font-mono2 text-[11px] tracking-[0.12em] text-[#7E8794]">SEMESTER 3 TEE SCORES — RANGE 81–92</p>
          {ACADEMICS.map((a) => (
            <div key={a.subject} className="mt-4">
              <div className="flex justify-between font-mono2 text-[12px]"><span>{a.subject}</span><span>{a.score}</span></div>
              <div className="mt-1 h-3 w-full bg-[#E1E5EC]"><div className="h-full bg-[#060709]" style={{ width: `${a.score}%` }} /></div>
            </div>
          ))}
          <p className="mt-6 border hairline p-3 font-mono2 text-[11px] tracking-[0.12em]">{NPTEL.course} — {NPTEL.score}% ({NPTEL.note})</p>
        </div>
        <div>
          <p className="font-mono2 text-[11px] tracking-[0.18em]">INTERESTS &amp; CURIOSITIES</p>
          <ul className="mt-4 space-y-3">
            {INTERESTS.map((i) => (
              <li key={i} className="border-l-4 border-[#FF1E42] bg-[#F4F6F9] p-4 text-base leading-relaxed">{i}</li>
            ))}
          </ul>
          <p className="mt-4 font-mono2 text-[11px] tracking-[0.12em] text-[#7E8794]">TOGGLE “SYSTEM” IN THE TOP BAR FOR THE SOLO LEVELING-STYLE STATUS HUD.</p>
        </div>
      </div>

      {systemHud && (
        <div className="fixed inset-x-4 top-16 z-[85] border-2 border-[#B8FF01] bg-[#060709] p-5 text-[#F4F6F9] md:inset-x-auto md:right-8 md:w-[420px]" role="dialog" aria-label="System status HUD">
          <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#B8FF01]">[ SYSTEM — ARCHITECT STATUS WINDOW ]</p>
          <p className="mt-3 font-display text-3xl font-extrabold">DHYEY PATEL — LV. 19</p>
          <div className="mt-4 space-y-2 font-mono2 text-[11px] leading-6">
            <p>CLASS — BUILDER / RED-TEAMER</p>
            <p>QUEST — 12 ARTIFACTS SHIPPED · 5 CHAPTERS</p>
            <p>QUEST — 2-WEEK MVP SPRINT: OPEN</p>
            <p>QUEST — B.TECH CSE, VIT BHOPAL: JUNE 2029</p>
            <p>BUFF — AI IS THE HARD CORE, NOT A WRAPPER</p>
          </div>
          <button onClick={() => usePortfolio.getState().toggleHud()} className="mt-4 border border-[#B8FF01] px-3 py-2 font-mono2 text-[11px] tracking-[0.14em] text-[#B8FF01]">CLOSE SYSTEM ▢</button>
        </div>
      )}
    </section>
  );
}
