"use client";
import { EXPERIENCE } from "@/data/portfolioData";

/** Section 02 — Experience & Trajectory Strip. Verified dates only. */
export default function Timeline() {
  return (
    <section data-section="manifesto" className="relative z-[2] border-y hairline bg-[#E1E5EC] px-5 py-14 md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#FF1E42]">02 / TRAJECTORY — VERIFIED DATES ONLY</p>
      <div className="mt-8 grid gap-px bg-[#CBD2D9] md:grid-cols-3">
        {EXPERIENCE.map((e) => (
          <article key={e.role} className="bg-[#E1E5EC] p-6">
            <p className="font-mono2 text-[11px] tracking-[0.18em] text-[#7E8794]">{e.period}</p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight">{e.role}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#7E8794]">{e.detail}</p>
          </article>
        ))}
      </div>
      <p className="mt-8 max-w-3xl font-serif2 text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-tight">
        “If free frontier AI already does it well, I won’t sell it. I build the thing underneath.”
      </p>
    </section>
  );
}
