"use client";
import Cursor from "@/components/Cursor";
import { usePortfolio } from "@/store/store";

/** Dual-layer spring cursor + live raycast coordinate readout.
    The reticle snaps onto the monolith face under the pointer; the HUD
    pill shows the exact intersected world coordinate. */
export default function CustomReticleCursor() {
  const ray = usePortfolio((s) => s.raycastPoint);
  return (
    <>
      <Cursor />
      {ray && (
        <div aria-hidden className="pointer-events-none fixed bottom-16 left-5 z-[82] hidden font-mono2 text-[10px] tracking-[0.14em] text-[#00E5FF] md:block">
          RAYCAST ▸ X {ray[0].toFixed(2)} · Y {ray[1].toFixed(2)} · Z {ray[2].toFixed(2)}
        </div>
      )}
    </>
  );
}
