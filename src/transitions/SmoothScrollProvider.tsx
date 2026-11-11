"use client";
import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePortfolio, type SectionId, type ChapterId } from "@/store/store";
import { whoosh } from "@/lib/audio";

gsap.registerPlugin(ScrollTrigger);

/** Module singleton so the portal manager can lock/unlock scroll. */
export let lenisInstance: Lenis | null = null;

const CHAPTER_FOR_SECTION: Record<string, ChapterId> = {
  hero: "prologue",
  manifesto: "prologue",
  "works-flagship": "chapter-one",
  "works-editorial": "chapter-four",
  "mvp-sprint": "chapter-five",
  "telemetry-academics": "chapter-five",
  contact: "chapter-five",
};

/** Lenis + GSAP ScrollTrigger ticker synchronization.
    One RAF loop drives Lenis, ScrollTrigger and the R3F frame loop. */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    let lastSection: SectionId | null = null;
    lenis.on("scroll", (e: { velocity?: number }) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      usePortfolio.getState().setScroll(progress, e.velocity ?? 0);
    });

    const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-section]")).map((el) => {
      const id = el.dataset.section as SectionId;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (!self.isActive) return;
          const st = usePortfolio.getState();
          st.setSection(id);
          st.setChapter(CHAPTER_FOR_SECTION[id] ?? "prologue");
          if (lastSection && lastSection !== id && st.soundOn) whoosh();
          lastSection = id;
        },
      });
    });

    // Velocity-driven variable typography: headlines stretch with momentum.
    const skewSetter = gsap.quickTo("h1, h2", "skewX", { duration: 0.4, ease: "power3.out" });
    const skewTick = () => {
      const v = usePortfolio.getState().scrollVelocity;
      skewSetter(Math.max(-8, Math.min(8, v * -0.15)));
    };
    gsap.ticker.add(skewTick);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.remove(skewTick);
      triggers.forEach((t) => t.kill());
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <>{children}</>;
}
