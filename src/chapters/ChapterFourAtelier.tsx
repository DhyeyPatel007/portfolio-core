"use client";
import ActFour from "@/components/projects/ActFour";
import PortalIndex from "./PortalIndex";

/** CHAPTER IV — "The Editorial Atelier & Consumer Craft".
    Amita Rasa, Krynex, Evenly, PaperFellows. */
export default function ChapterFourAtelier() {
  return (
    <section data-chapter="chapter-four" className="relative z-[2]">
      <div className="border-t border-[#060709] bg-[#F4F6F9] px-5 py-14 text-[#060709] md:px-10">
        <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#0052FF]">CHAPTER IV — THE EDITORIAL ATELIER &amp; CONSUMER CRAFT</p>
        <p className="mt-4 max-w-3xl font-serif2 text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-tight">
          Client work, crafted like a luxury cinema piece.
        </p>
        <PortalIndex ids={["amitarasa", "krynex", "evenly", "paperfellows"]} />
      </div>
      <ActFour />
    </section>
  );
}
