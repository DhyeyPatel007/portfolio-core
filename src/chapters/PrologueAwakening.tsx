"use client";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";

/** PROLOGUE — "The Awakening in Bhopal" (Hero + Anti-Wrapper Manifesto).
    Opens in pitch-black space; the monolith fractures open as you scroll. */
export default function PrologueAwakening() {
  return (
    <div data-chapter="prologue">
      <Hero />
      <div className="relative z-[2] border-t border-[#060709] bg-[#060709] px-5 py-16 text-[#F4F6F9] md:px-10">
        <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#00E5FF]">PROLOGUE — THE AWAKENING IN BHOPAL</p>
        <p className="mt-6 max-w-4xl font-serif2 text-[clamp(1.8rem,4vw,3.4rem)] italic leading-tight">
          “In an era drowned in purple-gradient AI wrappers, true power belongs to those who engineer the{" "}
          <span className="text-[#00E5FF] not-italic">hard core</span>.”
        </p>
        <p className="mt-6 font-mono2 text-[11px] leading-6 tracking-[0.14em] text-[#7E8794]">
          19 YEARS OLD · BHOPAL, MADHYA PRADESH, INDIA · EDITOR, GSOC INNOVATORS CLUB AT VIT BHOPAL
          <br />FREELANCE DEVELOPER (JAN 2026 – PRESENT) · FOUNDER &amp; DEVELOPER @ AUDITIFY (SEP 2026 – PRESENT)
        </p>
      </div>
      <Timeline />
    </div>
  );
}
