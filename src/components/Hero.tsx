"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BASICS } from "@/data/portfolioData";
import { usePortfolio } from "@/store/store";
import Magnetic from "./Magnetic";

const TERMS = [
  { word: "Auditify", project: 0, note: "36 CHECKS · 0–100" },
  { word: "DopaDiary", project: 1, note: "4 ENGINES · IN PRODUCTION" },
  { word: "WebGPU", project: 6, note: "WGSL KERNEL TUNER" },
  { word: "Red-Teaming", project: 3, note: "HEURISTIC AUTOPSY" },
];

/** Section 01 — The Hard Core. Asymmetric Swiss grid over the 3D monolith. */
export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const setProject = usePortfolio((s) => s.setProject);
  const setCursor = usePortfolio((s) => s.setCursor);
  const velocity = usePortfolio((s) => s.scrollVelocity);

  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", { yPercent: 110, duration: 1, ease: "power4.out", stagger: 0.12, delay: 1.9 });
    }, titleRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" data-section="hero" className="relative z-[2] flex min-h-screen flex-col justify-end px-5 pb-24 pt-28 md:px-10">
      <div className="pointer-events-none absolute right-0 top-24 hidden w-[38vw] md:block">
        <p className="font-mono2 text-[11px] leading-5 tracking-[0.14em] text-[#7E8794]">
          SCROLL — THE CORE RECONFIGURES
          <br />12 ARTIFACTS · 5 CHAPTERS · 0 GRADIENTS
          <br />BHOPAL, MP, IN — 19
        </p>
      </div>

      <p className="mb-4 font-mono2 text-[11px] tracking-[0.22em] text-[#FF1E42]">01 / THE HARD CORE</p>
      <h1 ref={titleRef} className="font-display text-[clamp(3.5rem,9vw,9.5rem)] font-extrabold leading-[0.88] tracking-[-0.04em]">
        <span className="block overflow-hidden"><span className="hero-line block">DHYEY</span></span>
        <span className="block overflow-hidden"><span className="hero-line block">PATEL<span className="text-[#FF1E42]">.</span></span></span>
      </h1>

      <p className="mt-6 max-w-2xl text-[clamp(1.4rem,2.6vw,2.2rem)] leading-tight">
        Building products where AI is the{" "}
        <em className="font-serif2 italic">hard core</em>, not a wrapper.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TERMS.map((t) => (
          <button
            key={t.word}
            onMouseEnter={() => { setProject(t.project); setCursor("inspect", `INSPECT — ${t.note}`); }}
            onMouseLeave={() => setCursor("default")}
            onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-[#060709] bg-[#F4F6F9] px-3 py-2 font-mono2 text-[11px] tracking-[0.12em] hover:bg-[#060709] hover:text-[#F4F6F9]"
          >
            {t.word} ↗
          </button>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t hairline pt-4 font-mono2 text-[11px] tracking-[0.14em]">
        <span>{BASICS.headline}</span>
        <span className="bg-[#060709] px-2 py-1 text-[#F4F6F9]">{BASICS.role}</span>
        <Magnetic><a href="#mvp" className="bg-[#FF1E42] px-3 py-2 text-white">START A 14-DAY SPRINT ↗</a></Magnetic>
      </div>
      <div style={{ transform: `skewX(${Math.max(-8, Math.min(8, velocity * -0.15))}deg)` }} className="sr-only" aria-hidden />
    </section>
  );
}
