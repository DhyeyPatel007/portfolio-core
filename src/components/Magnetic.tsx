"use client";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";
import { tick } from "@/lib/audio";
import { usePortfolio } from "@/store/store";

const GLYPHS = "01/_[]#";

/** 180ms glyph-decode scramble: label dissolves into technical
    characters and resolves back to the real text. */
export function Scramble({ text }: { text: string }) {
  const [label, setLabel] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const run = () => {
    if (timer.current) clearInterval(timer.current);
    let frame = 0;
    timer.current = setInterval(() => {
      frame++;
      const resolved = Math.floor((frame / 6) * text.length);
      setLabel(
        text.slice(0, resolved) +
          text.slice(resolved).split("").map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("")
      );
      if (frame >= 6) {
        if (timer.current) clearInterval(timer.current);
        setLabel(text);
      }
    }, 30);
  };
  return (
    <span onMouseEnter={run} className="inline-block">
      {label}
    </span>
  );
}

/** Magnetic spring wrapper: damped displacement toward the pointer,
    elastic return on leave. */
export default function Magnetic({ children, strength = 0.35 }: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const soundOn = usePortfolio((s) => s.soundOn);
  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };
  const onLeave = () => {
    if (ref.current)
      gsap.to(ref.current, { x: 0, y: 0, ease: "elastic.out(1, 0.4)", duration: 0.8 });
  };
  const onEnter = () => { if (soundOn) tick(); };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onMouseEnter={onEnter} className="inline-block">
      {children}
    </div>
  );
}
