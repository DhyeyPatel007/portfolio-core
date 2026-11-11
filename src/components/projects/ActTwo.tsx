"use client";
import { useMemo, useState } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { usePortfolio } from "@/store/store";

function ProjectHead({ p, dark }: { p: (typeof PROJECTS)[number]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h3 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
        <span className="font-mono2 text-sm tracking-[0.2em] text-[#7E8794]">{p.index} / </span>{p.name}
        {p.badge ? <span className="ml-3 align-middle border border-[#FF1E42] bg-[#FF1E42] px-2 py-1 font-mono2 text-[10px] tracking-[0.14em] text-white">[{p.badge}]</span> : null}
      </h3>
      {p.url ? (
        <a href={p.url} target="_blank" rel="noreferrer" className="border border-current px-3 py-2 font-mono2 text-[11px] tracking-[0.14em] hover:bg-[#F4F6F9] hover:text-[#060709]">
          LIVE SITE ↗ {p.urlLabel}
        </a>
      ) : null}
    </div>
  );
}

/* ---------- 04 GILLNET — heuristic autopsy inspector ---------- */
export function GillNetStage() {
  const p = PROJECTS[3];
  const [input, setInput] = useState("https://free-gift-claim-verify.example/login");
  const [run, setRun] = useState(false);
  // Deterministic heuristic scoring — rule-based, not trained ML.
  const verdict = useMemo(() => {
    const s = input.toLowerCase();
    let risk = 12;
    if (/free|gift|claim|verify|urgent|winner|login|secure/.test(s)) risk += 38;
    if (/\.example|\.xyz|\.top|bit\.ly|tinyurl/.test(s)) risk += 22;
    if (s.includes("@") || s.length > 90) risk += 10;
    if (/https:\/\//.test(s)) risk -= 6;
    return Math.max(2, Math.min(98, risk));
  }, [input]);
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(3)} className="border-t hairline bg-[#060709] px-5 py-16 text-[#F4F6F9] md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#FF1E42]">ACT II — SECURITY · TERMINAL MATRIX · {p.tagline.toUpperCase()}</p>
      <div className="mt-4"><ProjectHead p={p} /></div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed">{p.description}</p>
      <p className="mt-2 font-mono2 text-[11px] tracking-[0.14em] text-[#FF1E42]">HEURISTIC / RULE-BASED ENGINE — NOT TRAINED ML. EVERY FLAG IS A READABLE RULE.</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <label className="font-mono2 text-[11px] tracking-[0.18em]" htmlFor="gillnet-input">PASTE A LINK OR TEXT TO AUTOPSY</label>
          <input id="gillnet-input" value={input} onChange={(e) => { setInput(e.target.value); setRun(false); }} className="mt-2 w-full border border-[#1A202C] bg-[#0D1015] px-3 py-3 font-mono2 text-sm text-[#F4F6F9]" />
          <button onClick={() => setRun(true)} className="mt-3 bg-[#FF1E42] px-4 py-3 font-mono2 text-[11px] tracking-[0.14em] text-white">RUN AUTOPSY →</button>
          {run && (
            <div className="mt-4 border border-[#1A202C] p-4 font-mono2 text-[11px] leading-6">
              <p>RULE: URGENCY / FREE-GIFT LURE — { /free|gift|claim|verify|urgent|winner/.test(input.toLowerCase()) ? "TRIGGERED" : "CLEAR"}</p>
              <p>RULE: SUSPICIOUS TLD / SHORTENER — { /\.example|\.xyz|\.top|bit\.ly|tinyurl/.test(input.toLowerCase()) ? "TRIGGERED" : "CLEAR"}</p>
              <p className="text-[#FF1E42]">RISK SCORE: {verdict}/100 — {verdict >= 50 ? "SUSPICIOUS — DO NOT OPEN" : "LOW RISK ON THESE RULES"}</p>
            </div>
          )}
        </div>
        <div>
          <p className="font-mono2 text-[11px] tracking-[0.18em]">BENCHMARK — TEST SETS (TABULAR)</p>
          {[{ label: "URL DETECTION", v: 99 }, { label: "TEXT DETECTION", v: 98 }].map((b) => (
            <div key={b.label} className="mt-4">
              <div className="flex justify-between font-mono2 text-[11px] tracking-[0.14em]"><span>{b.label}</span><span>~{b.v}%</span></div>
              <div className="mt-1 h-4 w-full bg-[#0D1015]"><div className="h-full bg-[#FF1E42]" style={{ width: `${b.v}%` }} /></div>
            </div>
          ))}
          <p className="mt-4 text-sm text-[#7E8794]">Autopsy analysis of suspicious links and files. 10 MB file analysis verified live.</p>
        </div>
      </div>
    </article>
  );
}

/* ---------- 05 DATUM — CLI-vs-Web parity workbench ---------- */
const PARITY = [
  { check: "Target scan", cli: "✓", web: "✓" },
  { check: "Technique flags", cli: "✓", web: "✓" },
  { check: "Tamper scripts", cli: "✓", web: "✓" },
  { check: "Database fingerprint", cli: "✓", web: "✓" },
  { check: "Table enumeration", cli: "✓", web: "✓" },
  { check: "Dump output", cli: "✓", web: "✓" },
  { check: "Verdict classifier", cli: "✓", web: "✓" },
];
export function DatumStage() {
  const p = PROJECTS[4];
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(4)} className="border-t hairline bg-[#F4F6F9] px-5 py-16 md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#FF1E42]">ACT II — SECURITY · {p.tagline.toUpperCase()}</p>
      <div className="mt-4"><ProjectHead p={p} /></div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed">{p.description}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="bg-[#060709] p-5 font-mono2 text-[12px] leading-6 text-[#B8FF01]">
          <p className="text-[#F4F6F9]">$ sqlmap — CLI</p>
          <p>sqlmap -u &quot;https://target.example?id=1&quot; \</p>
          <p>&nbsp;&nbsp;--batch --level=3 --risk=2 --dbs</p>
          <p className="text-[#7E8794]"># raw flags, raw output, raw terminal</p>
        </div>
        <div className="border hairline bg-white p-5">
          <p className="font-mono2 text-[11px] tracking-[0.18em]">DATUM — CLEAN WEB CONTROL PLANE</p>
          <div className="mt-4 space-y-2">
            <div className="border hairline px-3 py-2 font-mono2 text-[11px]">TARGET URL —————————— [ RUN SCAN ]</div>
            <div className="border hairline px-3 py-2 font-mono2 text-[11px]">VERDICT — NOT INJECTABLE / INJECTABLE / INCONCLUSIVE</div>
          </div>
          <p className="mt-3 text-sm text-[#7E8794]">Same engine underneath. No flags to memorise.</p>
        </div>
      </div>
      <p className="mt-8 font-mono2 text-[11px] tracking-[0.18em]">CLI-VS-DATUM PARITY MATRIX — 7/7 (100%)</p>
      <div className="mt-3 grid gap-px bg-[#CBD2D9] md:grid-cols-7">
        {PARITY.map((r) => (
          <div key={r.check} className="bg-[#F4F6F9] p-3 text-center">
            <p className="font-mono2 text-[10px] leading-4">{r.check.toUpperCase()}</p>
            <p className="mt-2 font-display text-xl font-bold text-[#00D68F]">{r.cli} = {r.web}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

/* ---------- 06 BHARATRAKSHA — autonomous pipeline ---------- */
export function BharatRakshaStage() {
  const p = PROJECTS[5];
  const [active, setActive] = useState(0);
  const steps = [
    { name: "Telegram Intake", note: "Seller reports a query / dispute in the bot" },
    { name: "Autonomous Support Agent", note: "Reads the case, drafts the response, scores the action" },
    { name: "Razorpay Verification", note: "Payment is the source of truth — queried live every time" },
    { name: "Shiprocket Tracking", note: "Live shipment status joins the evidence" },
    { name: "Human Approval", note: "A human approves before every refund — no auto-refund by default" },
  ];
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(5)} className="border-t hairline bg-[#E1E5EC] px-5 py-16 md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#0052FF]">ACT II — AUTONOMOUS AGENTS · {p.tagline.toUpperCase()}</p>
      <div className="mt-4"><ProjectHead p={p} /></div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed">{p.description}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {steps.map((s, i) => (
          <div key={s.name} className="flex items-center gap-3">
            <button onClick={() => setActive(i)} className="border border-[#060709] px-4 py-3 text-left font-mono2 text-[11px] tracking-[0.1em]" style={{ background: active === i ? "#0052FF" : "#F4F6F9", color: active === i ? "#fff" : "#060709" }} aria-pressed={active === i}>
              {i + 1}. {s.name.toUpperCase()}
            </button>
            {i < steps.length - 1 && <span className="font-display text-xl font-bold">→</span>}
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-2xl border-l-4 border-[#0052FF] bg-[#F4F6F9] p-4 text-base leading-relaxed">{steps[active].note}</p>
      <p className="mt-4 font-mono2 text-[11px] tracking-[0.14em] text-[#7E8794]">DOUBLE-REFUND GUARD — RAZORPAY QUERIED LIVE BY RRN + WEBHOOKS + AUDIT LOG</p>
    </article>
  );
}

export default function ActTwo() {
  return (
    <div>
      <GillNetStage />
      <DatumStage />
      <BharatRakshaStage />
    </div>
  );
}
