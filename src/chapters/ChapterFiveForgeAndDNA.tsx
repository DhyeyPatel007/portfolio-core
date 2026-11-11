"use client";
import MvpConfigurator from "@/components/MvpConfigurator";
import Academics from "@/components/Academics";
import Footer from "@/components/Footer";

/** CHAPTER V — "The 14-Day MVP Forge & the Architect's DNA".
    The forge, VIT Bhopal telemetry, and the System Awakening HUD. */
export default function ChapterFiveForgeAndDNA() {
  return (
    <section data-chapter="chapter-five" className="relative z-[2]">
      <div className="border-t border-[#060709] bg-[#060709] px-5 py-14 text-[#F4F6F9] md:px-10">
        <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#B8FF01]">CHAPTER V — THE 14-DAY MVP FORGE &amp; THE ARCHITECT’S DNA</p>
        <p className="mt-4 max-w-3xl font-serif2 text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-tight">
          The final chamber — a floating architectural command deck.
        </p>
      </div>
      <MvpConfigurator />
      <Academics />
      <Footer />
    </section>
  );
}
