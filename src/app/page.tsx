"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePortfolio, type SectionId, type SurfaceTheme } from "@/store/store";
import Chrome from "@/components/Chrome";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import ActOne from "@/components/projects/ActOne";
import ActTwo from "@/components/projects/ActTwo";
import ActThree from "@/components/projects/ActThree";
import ActFour from "@/components/projects/ActFour";
import MvpConfigurator from "@/components/MvpConfigurator";
import Academics from "@/components/Academics";
import Footer from "@/components/Footer";

// Persistent WebGL stage — mounted once, never destroyed by navigation.
const WebGLStage = dynamic(() => import("@/components/webgl/WebGLStage"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

/** Barba-style 5-column flat shutter: retracts after boot, hard cut, no fade. */
function Curtain() {
  useEffect(() => {
    gsap.to(".curtain-col", {
      scaleY: 0, transformOrigin: "top", duration: 0.7, ease: "power4.inOut", stagger: 0.04, delay: 1.85,
    });
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] flex">
      {["#FF3300", "#0A0A0A", "#0047FF", "#C6F10E", "#0A0A0A"].map((c, i) => (
        <div key={i} className="curtain-col h-full flex-1" style={{ background: c }} />
      ))}
    </div>
  );
}

const DARK_SECTIONS = new Set(["works-flagship"]);
const THEME_FOR: Record<string, SurfaceTheme> = {
  hero: "paper",
  manifesto: "paper",
  "works-flagship": "paper",
  "works-editorial": "paper",
  "mvp-sprint": "paper",
  "telemetry-academics": "paper",
  contact: "obsidian",
};

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onScroll = (e: { velocity?: number; progress?: number }) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      usePortfolio.getState().setScroll(progress, e.velocity ?? 0);
    };
    lenis.on("scroll", onScroll);

    // Section tracking: active section + surface theme, hard cuts only.
    const triggers = Array.from(document.querySelectorAll<HTMLElement>("[data-section]")).map((el) => {
      const id = el.dataset.section as SectionId;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) {
            usePortfolio.getState().setSection(id);
            usePortfolio.getState().setTheme(THEME_FOR[id] ?? "paper");
            void DARK_SECTIONS;
          }
        },
      });
    });

    // Kinetic headline skew bound to scroll velocity.
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
    };
  }, []);

  return (
    <main className="relative">
      <Curtain />
      <Chrome />
      <Cursor />
      <WebGLStage />
      {/* Content sits above the fixed canvas (z-2) with flat surfaces. */}
      <div className="relative z-[2]">
        <Hero />
        <Timeline />
        <ActOne />
        <ActTwo />
        <ActThree />
        <ActFour />
        <MvpConfigurator />
        <Academics />
        <Footer />
      </div>
    </main>
  );
}
