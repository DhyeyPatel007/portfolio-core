"use client";
import { useState } from "react";
import { LINKS } from "@/data/portfolioData";
import Magnetic from "./Magnetic";

/** Section 06 — Footer & direct transmission. */
export default function Footer() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(LINKS.email); } catch { /* clipboard may be unavailable */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <footer data-section="contact" className="relative z-[2] border-t hairline bg-[#060709] px-5 pb-24 pt-16 text-[#F4F6F9] md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#B8FF01]">06 / DIRECT TRANSMISSION</p>
      <h2 className="mt-6 font-display text-[clamp(3rem,10vw,10rem)] font-extrabold leading-[0.88] tracking-[-0.04em]">
        LET’S BUILD<br />THE <span className="text-[#FF1E42]">CORE</span>.
      </h2>
      <div className="mt-10 flex flex-wrap gap-4">
        <Magnetic>
          <button onClick={copy} className="bg-[#FF1E42] px-5 py-4 font-mono2 text-[12px] tracking-[0.14em] text-white">
            {copied ? "COPIED TO CLIPBOARD ✓" : `COPY ${LINKS.email}`}
          </button>
        </Magnetic>
        <Magnetic>
          <a href={`mailto:${LINKS.email}`} className="border border-[#F4F6F9] px-5 py-4 font-mono2 text-[12px] tracking-[0.14em]">EMAIL ↗</a>
        </Magnetic>
      </div>
      <div className="mt-12 grid gap-px bg-[#1A202C] md:grid-cols-3">
        {[
          { label: "LINKEDIN", url: LINKS.linkedin },
          { label: "GITHUB", url: LINKS.github },
          { label: "AGENCY — KRYNEX", url: LINKS.agency },
        ].map((l) => (
          <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-[#060709] p-5 font-mono2 text-[11px] tracking-[0.16em] hover:bg-[#0D1015]">
            {l.label} <span className="text-[#FF1E42]">↗</span>
          </a>
        ))}
      </div>
      <p className="mt-10 font-mono2 text-[11px] leading-5 tracking-[0.12em] text-[#7E8794]">
        DHYEY PATEL — 19 · BHOPAL, MADHYA PRADESH, INDIA · B.TECH CSE, VIT BHOPAL (2025–2029)
        <br />FOUNDER @ AUDITIFY · DOPADIARY IN PRODUCTION · EDITOR, GSOC INNOVATORS CLUB
        <br />© 2026 — BUILT WITH FLAT COLOUR ONLY. NO GRADIENTS. NO PURPLE.
      </p>
    </footer>
  );
}
