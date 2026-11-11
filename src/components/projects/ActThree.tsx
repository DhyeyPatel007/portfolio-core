"use client";
import { useState } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { usePortfolio } from "@/store/store";

function ProjectHead({ p, dark }: { p: (typeof PROJECTS)[number]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h3 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
        <span className="font-mono2 text-sm tracking-[0.2em] text-[#5A5751]">{p.index} / </span>{p.name}
      </h3>
      {p.url ? (
        <a href={p.url} target="_blank" rel="noreferrer" className="border border-current px-3 py-2 font-mono2 text-[11px] tracking-[0.14em] hover:bg-[#F2EFE9] hover:text-[#0A0A0A]">
          LIVE SITE ↗ {p.urlLabel}
        </a>
      ) : null}
    </div>
  );
}

/* ---------- 07 VAJRA — WebGPU kernel variant tuner ---------- */
type Variant = { id: string; kernel: string; status: "queued" | "running" | "culled" | "verified"; time: string };
const INITIAL_VARIANTS: Variant[] = [
  { id: "A", kernel: "SGEMM · TILED 16×16", status: "queued", time: "—" },
  { id: "B", kernel: "SOFTMAX · WARP-REDUCE", status: "queued", time: "—" },
  { id: "C", kernel: "CONV1D · SHARED-MEM", status: "queued", time: "—" },
  { id: "D", kernel: "SOBEL · VECTORISED", status: "queued", time: "—" },
  { id: "E", kernel: "SGEMM · NAIVE", status: "queued", time: "—" },
];
function VajraStage() {
  const p = PROJECTS[6];
  const [variants, setVariants] = useState<Variant[]>(INITIAL_VARIANTS);
  const [running, setRunning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const run = () => {
    setRunning(true); setWinner(null);
    // Deterministic simulated tuner: correct+fast survive, wrong/slow cull.
    const outcomes: Record<string, { status: Variant["status"]; time: string }> = {
      A: { status: "verified", time: "30.5 GFLOPS" },
      B: { status: "verified", time: "0.6 GFLOPS" },
      C: { status: "culled", time: "WRONG ANSWER" },
      D: { status: "verified", time: "47.6 GFLOPS" },
      E: { status: "culled", time: "SLOW — BASELINE FASTER" },
    };
    setVariants((vs) => vs.map((v) => ({ ...v, status: "running", time: "…" })));
    Object.keys(outcomes).forEach((id, i) => {
      setTimeout(() => {
        setVariants((vs) => vs.map((v) => (v.id === id ? { ...v, ...outcomes[id] } : v)));
        if (i === Object.keys(outcomes).length - 1) { setRunning(false); setWinner("A · SGEMM TILED — FASTEST CORRECT KERNEL KEPT"); }
      }, 500 * (i + 1));
    });
  };
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(6)} className="border-t hairline bg-[#0A0A0A] px-5 py-16 text-[#F2EFE9] md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#C6F10E]">ACT III — DEEP COMPUTE · {p.tagline.toUpperCase()} · BUILT FOR THE NEBIUS × NVIDIA HACKATHON</p>
      <div className="mt-4"><ProjectHead p={p} /></div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed">{p.description}</p>
      <p className="mt-2 font-mono2 text-[11px] tracking-[0.14em] text-[#C6F10E]">RULE — A WRONG ANSWER OR A COMPILE FAILURE CULLS THE KERNEL. A SLOW-BUT-CORRECT KERNEL IS KEPT. THE BASELINE STAYS WINNER WHEN NOTHING BEATS IT.</p>
      <div className="mt-8">
        <button onClick={run} disabled={running} className="bg-[#C6F10E] px-4 py-3 font-mono2 text-[11px] tracking-[0.14em] text-[#0A0A0A] disabled:opacity-40">
          {running ? "TUNING VARIANTS…" : "RUN KERNEL TUNER →"}
        </button>
        {winner && <p className="mt-3 bg-[#C6F10E] px-3 py-2 font-mono2 text-[11px] tracking-[0.12em] text-[#0A0A0A]">WINNER — {winner}</p>}
        <div className="mt-4 grid gap-px bg-[#262626] md:grid-cols-5">
          {variants.map((v) => (
            <div key={v.id} className="bg-[#161616] p-4">
              <p className="font-mono2 text-[10px] tracking-[0.18em] text-[#5A5751]">VARIANT {v.id}</p>
              <p className="mt-2 font-display text-base font-bold leading-tight">{v.kernel}</p>
              <p className="mt-3 font-mono2 text-[11px]" style={{ color: v.status === "verified" ? "#C6F10E" : v.status === "culled" ? "#D91E36" : "#F2EFE9" }}>
                {v.status.toUpperCase()} — {v.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ---------- 08 SPECBALLOON — interactive CAD auto-ballooner ---------- */
const BALLOONS = [
  { n: 1, x: 120, y: 60, dim: "Ø 24.00 ±0.05", gd: "⌀ | 0.05 | A" },
  { n: 2, x: 300, y: 48, dim: "120.00 ±0.10", gd: "— flatness 0.02" },
  { n: 3, x: 420, y: 150, dim: "M8 × 1.25 THRU", gd: "⌖ | 0.10 | A B" },
  { n: 4, x: 200, y: 190, dim: "R 12.50", gd: "— profile 0.15" },
  { n: 5, x: 480, y: 90, dim: "45.00° ±0.5°", gd: "∠ | 0.5° | A" },
];
function SpecBalloonStage() {
  const p = PROJECTS[7];
  const [active, setActive] = useState<number | null>(1);
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(7)} className="border-t hairline bg-white px-5 py-16 md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#0047FF]">ACT III — INDUSTRIAL CAD · {p.tagline.toUpperCase()}</p>
      <div className="mt-4"><ProjectHead p={p} /></div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed">{p.description}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="font-mono2 text-[11px] tracking-[0.18em]">ENGINEERING DRAWING — HOVER A BALLOON</p>
          <svg viewBox="0 0 560 260" className="mt-3 w-full border border-[#0047FF] bg-white" role="img" aria-label="CAD drawing with inspection balloons">
            <rect x="40" y="40" width="440" height="180" fill="none" stroke="#0047FF" strokeWidth="2" />
            <circle cx="260" cy="130" r="52" fill="none" stroke="#0047FF" strokeWidth="2" />
            <circle cx="260" cy="130" r="18" fill="none" stroke="#0047FF" strokeWidth="2" />
            <line x1="40" y1="130" x2="480" y2="130" stroke="#0047FF" strokeWidth="1" strokeDasharray="6 4" />
            {BALLOONS.map((b) => (
              <g key={b.n} onMouseEnter={() => setActive(b.n)} style={{ cursor: "pointer" }}>
                <line x1={b.x} y1={b.y} x2={b.x + 26} y2={b.y - 22} stroke="#FF3300" strokeWidth="1.5" />
                <circle cx={b.x + 34} cy={b.y - 28} r="13" fill={active === b.n ? "#FF3300" : "#FFFFFF"} stroke="#FF3300" strokeWidth="2" />
                <text x={b.x + 34} y={b.y - 23} textAnchor="middle" fontSize="13" fontFamily="monospace" fill={active === b.n ? "#FFFFFF" : "#FF3300"}>{b.n}</text>
              </g>
            ))}
          </svg>
          <p className="mt-2 font-mono2 text-[11px] tracking-[0.12em] text-[#5A5751]">2D CAD DRAWING · CNC / AUTO SHOPS · HOVER SNAPS THE BALLOON</p>
        </div>
        <div>
          <p className="font-mono2 text-[11px] tracking-[0.18em]">AS9102 / PPAP EXCEL SHEET — LIVE PREVIEW</p>
          <table className="mt-3 w-full border-collapse border border-[#0047FF] font-mono2 text-[11px]">
            <thead><tr className="bg-[#0047FF] text-white"><th className="border border-[#0047FF] p-2 text-left">BALLOON</th><th className="border border-[#0047FF] p-2 text-left">CHARACTERISTIC</th><th className="border border-[#0047FF] p-2 text-left">GD&amp;T</th></tr></thead>
            <tbody>
              {BALLOONS.map((b) => (
                <tr key={b.n} onMouseEnter={() => setActive(b.n)} style={{ background: active === b.n ? "#E4E0D8" : "#FFFFFF" }}>
                  <td className="border border-[#C8C3B8] p-2">{b.n}</td>
                  <td className="border border-[#C8C3B8] p-2">{b.dim}</td>
                  <td className="border border-[#C8C3B8] p-2">{b.gd}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-sm text-[#5A5751]">AI reads the drawing, balloons each dimension and GD&amp;T callout, and writes the FAI / PPAP sheet — no manual transcription.</p>
        </div>
      </div>
    </article>
  );
}

export default function ActThree() {
  return (
    <div>
      <VajraStage />
      <SpecBalloonStage />
    </div>
  );
}
