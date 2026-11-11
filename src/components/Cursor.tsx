"use client";
import { useEffect, useRef } from "react";
import { usePortfolio } from "@/store/store";

/** Dual-layer custom cursor: 28px geometric reticle + context pill.
    Reticle rotates 45deg on interactive targets. */
export default function Cursor() {
  const reticle = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const state = usePortfolio((s) => s.cursorState);
  const label = usePortfolio((s) => s.cursorLabel);

  useEffect(() => {
    let x = -100, y = -100, rx = -100, ry = -100;
    let raf = 0;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      rx += (x - rx) * 0.22; ry += (y - ry) * 0.22;
      if (reticle.current) reticle.current.style.transform = `translate(${rx - 14}px, ${ry - 14}px) rotate(${state === "default" ? 0 : 45}deg)`;
      if (pill.current) pill.current.style.transform = `translate(${x + 18}px, ${y - 14}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, [state]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block">
      <div ref={reticle} className="absolute h-7 w-7 border border-[#060709] bg-transparent">
        <span className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 bg-[#FF1E42]" />
      </div>
      {label ? (
        <div ref={pill} className="absolute whitespace-nowrap bg-[#060709] px-2 py-1 font-mono2 text-[10px] tracking-[0.14em] text-[#F4F6F9]">
          {label}
        </div>
      ) : null}
    </div>
  );
}
