"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Chrome from "@/components/Chrome";
import CustomReticleCursor from "@/components/ui/CustomReticleCursor";
import SmoothScrollProvider from "@/transitions/SmoothScrollProvider";
import PortalTransitionManager from "@/transitions/PortalTransitionManager";
import ProjectPortalModal from "@/components/ui/ProjectPortalModal";
import PrologueAwakening from "@/chapters/PrologueAwakening";
import ChapterOneHumanImpact from "@/chapters/ChapterOneHumanImpact";
import ChapterTwoAutonomousShield from "@/chapters/ChapterTwoAutonomousShield";
import ChapterThreeSiliconCAD from "@/chapters/ChapterThreeSiliconCAD";
import ChapterFourAtelier from "@/chapters/ChapterFourAtelier";
import ChapterFiveForgeAndDNA from "@/chapters/ChapterFiveForgeAndDNA";

// Persistent WebGL stage — mounted once, never destroyed by navigation.
const PersistentStage = dynamic(() => import("@/webgl/PersistentStage"), { ssr: false });

/** Barba-style 5-column flat shutter: retracts after boot, hard cut, no fade. */
function Curtain() {
  useEffect(() => {
    gsap.to(".curtain-col", {
      scaleY: 0, transformOrigin: "top", duration: 0.7, ease: "power4.inOut", stagger: 0.04, delay: 1.85,
    });
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] flex">
      {["#FF1E42", "#060709", "#0052FF", "#B8FF01", "#060709"].map((c, i) => (
        <div key={i} className="curtain-col h-full flex-1" style={{ background: c }} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative">
        <Curtain />
        <PortalTransitionManager />
        <ProjectPortalModal />
        <Chrome />
        <CustomReticleCursor />
        <PersistentStage />
        {/* Content sits above the fixed canvas (z-2) with flat surfaces. */}
        <div className="relative z-[2]">
          <PrologueAwakening />
          <ChapterOneHumanImpact />
          <ChapterTwoAutonomousShield />
          <ChapterThreeSiliconCAD />
          <ChapterFourAtelier />
          <ChapterFiveForgeAndDNA />
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
