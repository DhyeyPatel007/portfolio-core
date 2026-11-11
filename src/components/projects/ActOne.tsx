"use client";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { usePortfolio } from "@/store/store";

function ProjectHead({ p }: { p: (typeof PROJECTS)[number] }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h3 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
        <span className="font-mono2 text-sm tracking-[0.2em] text-[#7E8794]">{p.index} / </span>{p.name}
      </h3>
      {p.url ? (
        <a href={p.url} target="_blank" rel="noreferrer" className="border border-current px-3 py-2 font-mono2 text-[11px] tracking-[0.14em] hover:bg-[#060709] hover:text-[#F4F6F9]">
          LIVE SITE ↗ {p.urlLabel}
        </a>
      ) : (
        <span className="border border-current px-3 py-2 font-mono2 text-[11px] tracking-[0.14em]">{p.urlLabel}</span>
      )}
    </div>
  );
}

/* ---------- 01 AUDITIFY — 36-check live report-card dial ---------- */
export function AuditifyStage() {
  const p = PROJECTS[0];
  const [score, setScore] = useState(0);
  const [whiteLabel, setWhiteLabel] = useState(false);
  const lit = Math.round((score / 100) * 36);
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(0)} data-section="works-flagship" className="border-t hairline bg-[#F4F6F9] px-5 py-16 md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#FF1E42]">ACT I — FLAGSHIP · {p.tagline.toUpperCase()}</p>
      <div className="mt-4"><ProjectHead p={p} /></div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed">{p.description}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <div className="flex items-end justify-between">
            <span className="font-mono2 text-[11px] tracking-[0.18em]">36-CHECK REPORT-CARD DIAL — DRAG TO SCRUB</span>
            <span className="font-display text-6xl font-extrabold text-[#FF1E42]">{score}<span className="text-2xl">/100</span></span>
          </div>
          <input type="range" min={0} max={100} value={score} onChange={(e) => setScore(Number(e.target.value))} className="mt-4 w-full" aria-label="Auditify score scrubber" />
          <div className="mt-4 grid grid-cols-6 gap-1">
            {Array.from({ length: 36 }, (_, i) => (
              <div key={i} title={`Check ${i + 1}`} className="flex h-9 items-center justify-center border hairline font-mono2 text-[10px]" style={{ background: i < lit ? "#FF1E42" : "#E1E5EC", color: i < lit ? "#fff" : "#060709" }}>{i + 1}</div>
            ))}
          </div>
          <p className="mt-3 font-mono2 text-[11px] tracking-[0.12em] text-[#7E8794]">{lit} / 36 CHECKS LIT · 0–100 REPORT-CARD SCORE</p>
        </div>
        <div className="border hairline bg-white p-5">
          <p className="font-mono2 text-[11px] tracking-[0.18em]">PDF REPORT GENERATOR — WIREFRAME</p>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-3/4 bg-[#060709]" /><div className="h-3 w-1/2 bg-[#CBD2D9]" /><div className="h-3 w-2/3 bg-[#CBD2D9]" />
            <div className="mt-3 flex gap-2"><span className="bg-[#FF1E42] px-2 py-1 font-mono2 text-[10px] text-white">FULL PDF REPORT</span><span className="border hairline px-2 py-1 font-mono2 text-[10px]">SITE MONITORING ● LIVE</span></div>
          </div>
          <button onClick={() => setWhiteLabel(!whiteLabel)} className="mt-6 w-full border border-[#060709] px-3 py-3 font-mono2 text-[11px] tracking-[0.14em] hover:bg-[#060709] hover:text-[#F4F6F9]" aria-pressed={whiteLabel}>
            AGENCY WHITE-LABEL: {whiteLabel ? "ON — YOUR BRAND" : "OFF — AUDITIFY"}
          </button>
          <p className="mt-3 text-sm text-[#7E8794]">Free for everyone. Signed-in users get monitoring for 10 sites and white-label reports.</p>
        </div>
      </div>
    </article>
  );
}

/* ---------- 02 DOPADIARY — 4-engine clinical telemetry console ---------- */
const ENGINES = [
  { id: "spiral", name: "Spiral Drawing", note: "Archimedean trace" },
  { id: "voice", name: "Voice", note: "Frequency bars" },
  { id: "tapping", name: "Finger Tapping", note: "Cadence" },
  { id: "tremor", name: "Tremor", note: "Accelerometer waveform" },
] as const;

function EngineCanvas({ engine, active }: { engine: string; active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!active) return;
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0; const t0 = performance.now();
    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = "#060709"; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#00D68F"; ctx.lineWidth = 2; ctx.beginPath();
      if (engine === "spiral") {
        for (let a = 0; a < Math.PI * 10; a += 0.08) {
          const r = a * 3.2 * (1 + 0.06 * Math.sin(t * 2 + a));
          const x = w / 2 + r * Math.cos(a), y = h / 2 + r * Math.sin(a);
          if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
      } else if (engine === "voice") {
        for (let i = 0; i < 24; i++) {
          const bh = 8 + Math.abs(Math.sin(t * 6 + i * 0.7)) * (h - 30);
          ctx.fillStyle = "#00D68F"; ctx.fillRect(8 + i * ((w - 16) / 24), h - bh - 8, (w - 16) / 24 - 3, bh);
        }
      } else if (engine === "tapping") {
        for (let i = 0; i < 12; i++) {
          const y = h / 2 + Math.sin(t * 8 + i) * 0 + (i % 2 === 0 ? -20 : 20) * Math.max(0, Math.sin(t * 4 + i));
          ctx.fillStyle = "#00D68F"; ctx.beginPath(); ctx.arc(16 + i * ((w - 32) / 11), y, 5, 0, Math.PI * 2); ctx.fill();
        }
      } else {
        for (let x = 0; x < w; x += 2) {
          const y = h / 2 + Math.sin(x * 0.12 + t * 9) * 14 * Math.sin(x * 0.02 + t) + Math.sin(x * 0.4) * 4;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [engine, active]);
  return <canvas ref={ref} width={520} height={220} className="h-[220px] w-full" aria-label={`${engine} simulation`} />;
}

export function DopaDiaryStage() {
  const p = PROJECTS[1];
  const [engine, setEngine] = useState<string>("spiral");
  const [doseHour, setDoseHour] = useState(8);
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(1)} className="border-t hairline bg-[#060709] px-5 py-16 text-[#F4F6F9] md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#00D68F]">ACT I — FLAGSHIP · {p.tagline.toUpperCase()}</p>
      <div className="mt-4"><ProjectHead p={p} /></div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#F4F6F9]">{p.description}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <p className="font-mono2 text-[11px] tracking-[0.18em]">4-ENGINE CLINICAL TELEMETRY CONSOLE — TAP AN ENGINE</p>
          <div className="mt-4 grid grid-cols-2 gap-px bg-[#1A202C]">
            {ENGINES.map((e) => (
              <button key={e.id} onClick={() => setEngine(e.id)} className="p-4 text-left" style={{ background: engine === e.id ? "#00D68F" : "#0D1015", color: engine === e.id ? "#060709" : "#F4F6F9" }} aria-pressed={engine === e.id}>
                <span className="font-display text-lg font-bold">{e.name}</span>
                <span className="block font-mono2 text-[10px] tracking-[0.12em]">{e.note.toUpperCase()}</span>
              </button>
            ))}
          </div>
          <div className="mt-px border hairline-dark"><EngineCanvas engine={engine} active /></div>
          <p className="mt-3 font-mono2 text-[11px] tracking-[0.12em] text-[#7E8794]">SCORED VS YOUR OWN 7-DAY BASELINE · TIMED TO THE LEVODOPA DOSE CLOCK</p>
        </div>
        <div>
          <p className="font-mono2 text-[11px] tracking-[0.18em]">LEVODOPA DOSE CLOCK — DRAG THE HOUR</p>
          <div className="mt-4 flex items-center gap-6">
            <div className="relative h-36 w-36 shrink-0 rounded-full border-2 border-[#00D68F]">
              <div className="absolute left-1/2 top-1/2 h-14 w-[3px] origin-bottom bg-[#00D68F]" style={{ transform: `translate(-50%,-100%) rotate(${(doseHour / 24) * 360}deg)` }} />
              <span className="absolute inset-0 flex items-center justify-center font-mono2 text-sm">{String(doseHour).padStart(2, "0")}:00</span>
            </div>
            <input type="range" min={0} max={23} value={doseHour} onChange={(e) => setDoseHour(Number(e.target.value))} className="w-full" aria-label="Levodopa dose hour" />
          </div>
          <div className="mt-6 space-y-2 font-mono2 text-[11px] tracking-[0.12em]">
            <p className="border hairline-dark p-3">DOCTOR PORTAL — DAILY DIGEST, SCORES VS BASELINE</p>
            <p className="border hairline-dark p-3">OFFLINE PWA — WORKS WITHOUT A CONNECTION</p>
            <p className="border hairline-dark p-3">ALERTS — SCORE COLLAPSE · EARLY WEARING-OFF · MISSED TEST 21:00</p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- 03 PHALANX — 3-juror deliberation + human gate ---------- */
type GateStep = "idle" | "j1" | "j2" | "j3" | "gate" | "executed";
export function PhalanxStage() {
  const p = PROJECTS[2];
  const [step, setStep] = useState<GateStep>("idle");
  const [log, setLog] = useState<string[]>([]);
  const run = () => {
    setStep("j1"); setLog(["DISPUTE PP-R-480 · $480 · FRAUD CLAIM — EVIDENCE ATTACHED"]);
    const seq: [GateStep, string, number][] = [
      ["j2", "JUROR 01 — EVIDENCE SCORE 85 · TRACKING VERIFIED", 700],
      ["j3", "JUROR 02 — EVIDENCE SCORE 85 · DOSSIER PDF VERIFIED", 1400],
      ["gate", "JUROR 03 — EVIDENCE SCORE 85 · CONSENSUS 85 → CONTEST", 2100],
    ];
    seq.forEach(([s, msg, ms]) => setTimeout(() => { setStep(s); setLog((l) => [...l, msg]); }, ms));
    setTimeout(() => { setStep("gate"); setLog((l) => [...l, "HUMAN APPROVAL GATE — MANDATORY · NO AUTO-ACTION"]); }, 2800);
  };
  const approve = () => { setStep("executed"); setLog((l) => [...l, "HUMAN APPROVED → PROVIDE-EVIDENCE EXECUTED · TRACKING 1Z999AA10123456784"]); };
  const stages = [
    { id: "j1", label: "JUROR 01" }, { id: "j2", label: "JUROR 02" }, { id: "j3", label: "JUROR 03" }, { id: "gate", label: "HUMAN GATE" },
  ] as const;
  const order = ["idle", "j1", "j2", "j3", "gate", "executed"];
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(2)} className="border-t hairline bg-[#F4F6F9] px-5 py-16 md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#FF1E42]">ACT I — FLAGSHIP · {p.tagline.toUpperCase()}</p>
      <div className="mt-4"><ProjectHead p={p} /></div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed">{p.description}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <div className="grid grid-cols-4 gap-px bg-[#CBD2D9]">
            {stages.map((s) => {
              const active = order.indexOf(step) > order.indexOf(s.id as GateStep) || step === s.id;
              return (
                <div key={s.id} className="p-4 text-center font-mono2 text-[11px] tracking-[0.12em]" style={{ background: active ? "#060709" : "#E1E5EC", color: active ? "#B8FF01" : "#060709" }}>
                  {s.label}{active ? " ●" : ""}
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={run} disabled={step !== "idle" && step !== "executed"} className="bg-[#060709] px-4 py-3 font-mono2 text-[11px] tracking-[0.14em] text-[#F4F6F9] disabled:opacity-40">SIMULATE PAYPAL SANDBOX DISPUTE →</button>
            <button onClick={approve} disabled={step !== "gate"} className="bg-[#FF1E42] px-4 py-3 font-mono2 text-[11px] tracking-[0.14em] text-white disabled:opacity-40">HUMAN APPROVE — EXECUTE ACTION</button>
            <button onClick={() => { setStep("idle"); setLog([]); }} className="border border-[#060709] px-4 py-3 font-mono2 text-[11px] tracking-[0.14em]">RESET</button>
          </div>
          <p className="mt-3 font-mono2 text-[11px] tracking-[0.12em] text-[#7E8794]">DETERMINISTIC SCORING · NOTHING EXECUTES WITHOUT THE HUMAN GATE · $480 CONTEST / $210 OFFER / $95 CONCEDE — PROVEN LIVE ON SANDBOX</p>
        </div>
        <div className="bg-[#060709] p-4 font-mono2 text-[11px] leading-5 text-[#B8FF01] md:col-span-2">
          {log.length === 0 ? <span className="text-[#7E8794]">DELIBERATION LOG — EMPTY. RUN THE SIMULATION.</span> : log.map((l, i) => <p key={i}>{`> ${l}`}</p>)}
          {step === "executed" && <p className="mt-2 text-[#F4F6F9]">STATUS: EXECUTED — WAITING FOR BUYER</p>}
        </div>
      </div>
    </article>
  );
}

export default function ActOne() {
  return (
    <div id="works">
      <AuditifyStage />
      <DopaDiaryStage />
      <PhalanxStage />
    </div>
  );
}
