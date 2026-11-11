"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePortfolio } from "@/store/store";
import { lenisInstance } from "./SmoothScrollProvider";

/** Barba.js-style lifecycle manager (custom React state machine —
    the WebGL context is never destroyed):
    beforeLeave: lock Lenis scroll.
    leave: 5-column flat geometric shutter wipe (portalShutter bands).
    enter: mount the bespoke portal view; shutter retracts. */
export default function PortalTransitionManager() {
  const portal = usePortfolio((s) => s.activePortalProject);
  const cols = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const nodes = cols.current?.querySelectorAll(".portal-col");
    if (!nodes) return;
    if (portal) {
      lenisInstance?.stop();
      gsap.to(nodes, { scaleY: 1, transformOrigin: "bottom", duration: 0.45, ease: "power4.inOut", stagger: 0.04 });
      gsap.to(nodes, { scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "power4.inOut", stagger: 0.04, delay: 0.55 });
    } else {
      gsap.to(nodes, { scaleY: 1, transformOrigin: "top", duration: 0.4, ease: "power4.inOut", stagger: 0.03 });
      gsap.to(nodes, {
        scaleY: 0, transformOrigin: "bottom", duration: 0.55, ease: "power4.inOut", stagger: 0.03, delay: 0.45,
        onComplete: () => lenisInstance?.start(),
      });
    }
  }, [portal]);

  return (
    <div ref={cols} aria-hidden className="pointer-events-none fixed inset-0 z-[96] flex">
      {["#FF1E42", "#060709", "#0052FF", "#B8FF01", "#060709"].map((c, i) => (
        <div key={i} className="portal-col h-full flex-1" style={{ background: c, transform: "scaleY(0)" }} />
      ))}
    </div>
  );
}
