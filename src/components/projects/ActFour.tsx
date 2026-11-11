"use client";
import { useMemo, useState } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { usePortfolio } from "@/store/store";

function ProjectHead({ p }: { p: (typeof PROJECTS)[number] }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h3 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
        <span className="font-mono2 text-sm tracking-[0.2em] text-[#5A5751]">{p.index} / </span>{p.name}
        {p.badge ? <span className="ml-3 align-middle border border-[#0A0A0A] px-2 py-1 font-mono2 text-[10px] tracking-[0.14em]">{p.badge}</span> : null}
      </h3>
      {p.url ? (
        <a href={p.url} target="_blank" rel="noreferrer" className="border border-current px-3 py-2 font-mono2 text-[11px] tracking-[0.14em] hover:bg-[#0A0A0A] hover:text-[#F2EFE9]">
          LIVE SITE ↗ {p.urlLabel}
        </a>
      ) : (
        <span className="border border-current px-3 py-2 font-mono2 text-[11px] tracking-[0.14em]">{p.urlLabel}</span>
      )}
    </div>
  );
}

/* ---------- 09 EVENLY — paise-perfect split calculator ---------- */
function EvenlyStage() {
  const p = PROJECTS[8];
  const [amount, setAmount] = useState(1000);
  const [people, setPeople] = useState(3);
  const splits = useMemo(() => {
    const totalPaise = Math.round(amount * 100);
    const base = Math.floor(totalPaise / people);
    const rem = totalPaise - base * people;
    return Array.from({ length: people }, (_, i) => (base + (i < rem ? 1 : 0)) / 100);
  }, [amount, people]);
  const [upi, setUpi] = useState("GPay");
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(8)} data-section="works-editorial" className="border-t hairline bg-[#F2EFE9] px-5 py-16 md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#00A86B]">ACT IV — MOBILE CRAFT · {p.tagline.toUpperCase()}</p>
      <div className="mt-4"><ProjectHead p={p} /></div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed">{p.description}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <label className="font-mono2 text-[11px] tracking-[0.18em]" htmlFor="evenly-amount">BILL — ₹{amount}</label>
          <input id="evenly-amount" type="range" min={100} max={10000} step={10} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-2 w-full" />
          <label className="mt-4 block font-mono2 text-[11px] tracking-[0.18em]" htmlFor="evenly-people">PEOPLE — {people}</label>
          <input id="evenly-people" type="range" min={2} max={8} value={people} onChange={(e) => setPeople(Number(e.target.value))} className="mt-2 w-full" />
          <p className="mt-4 font-display text-2xl font-bold leading-snug">
            ₹{amount} / {people} = {splits.map((s) => `₹${s.toFixed(2)}`).join(" + ")}
          </p>
          <p className="mt-2 font-mono2 text-[11px] tracking-[0.12em] text-[#5A5751]">PAISE-PERFECT — SUMS TO EXACTLY ₹{amount.toFixed(2)} · NO ROUNDING LEAK</p>
        </div>
        <div>
          <p className="font-mono2 text-[11px] tracking-[0.18em]">SMART SETTLE-UP + UPI CHOOSER</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["GPay", "PhonePe", "Paytm", "BHIM"].map((u) => (
              <button key={u} onClick={() => setUpi(u)} className="border border-[#0A0A0A] px-4 py-3 font-mono2 text-[11px] tracking-[0.12em]" style={{ background: upi === u ? "#00A86B" : "#F2EFE9", color: upi === u ? "#fff" : "#0A0A0A" }} aria-pressed={upi === u}>{u}</button>
            ))}
          </div>
          <p className="mt-4 border hairline bg-white p-4 text-sm leading-relaxed">Settle-up graph reduction: {people} people, {Math.max(0, people - 1)} transfers instead of {people * (people - 1)} — then pay in {upi} from the chooser. Balances move only on confirmed claims.</p>
        </div>
      </div>
    </article>
  );
}

/* ---------- 10 KRYNEX — typographic specimen poster ---------- */
function KrynexStage() {
  const p = PROJECTS[9];
  const [weight, setWeight] = useState(800);
  const [grid, setGrid] = useState(true);
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(9)} className="border-t hairline bg-[#0A0A0A] px-5 py-16 text-[#F2EFE9] md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#FF3300]">ACT IV — AGENCY · {p.tagline.toUpperCase()}</p>
      <div className="mt-4"><ProjectHead p={p} /></div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed">{p.description} Figma-first workflow, premium typography, no AI slop.</p>
      <div className="relative mt-8 overflow-hidden border border-[#262626] p-6">
        {grid && (
          <div aria-hidden className="pointer-events-none absolute inset-0 flex justify-between px-6">
            {Array.from({ length: 12 }, (_, i) => <span key={i} className="h-full w-px bg-[#262626]" />)}
          </div>
        )}
        <p className="relative font-display leading-[0.9] tracking-[-0.03em]" style={{ fontWeight: weight, fontSize: "clamp(3rem,8vw,7rem)" }}>KRYNEX</p>
        <p className="mt-4 font-serif2 text-2xl italic">Premium typography, Figma-first.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <label className="font-mono2 text-[11px] tracking-[0.14em]">WEIGHT — {weight}
            <input type="range" min={700} max={800} step={100} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="ml-3 w-32 align-middle" aria-label="Font weight" />
          </label>
          <button onClick={() => setGrid(!grid)} className="border border-[#F2EFE9] px-3 py-2 font-mono2 text-[11px] tracking-[0.14em]" aria-pressed={grid}>GRID OVERLAY {grid ? "ON" : "OFF"}</button>
        </div>
      </div>
    </article>
  );
}

/* ---------- 11 AMITA RASA — five-chapter story scrubber ---------- */
const CHAPTERS = [
  { n: "01", name: "Story", text: "A resort with a story before a room — heritage, land, and the people who built it." },
  { n: "02", name: "Experiences", text: "Slow mornings, local food, and experiences built around the place itself." },
  { n: "03", name: "Guest Journey", text: "Arrival to checkout, mapped step by step — nothing left to guess." },
  { n: "04", name: "Gallery", text: "The rooms, the light, and the grounds, shown as they are." },
  { n: "05", name: "Booking", text: "Dates, rooms, and a booking flow that ends in a confirmed stay." },
];
function AmitaRasaStage() {
  const p = PROJECTS[10];
  const [chapter, setChapter] = useState(0);
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(10)} className="border-t hairline bg-[#F2EFE9] px-5 py-16 md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#D9822B]">ACT IV — CLIENT EXHIBITION · EDITORIAL</p>
      <div className="mt-4"><ProjectHead p={p} /></div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed">{p.description}</p>
      <input type="range" min={0} max={4} value={chapter} onChange={(e) => setChapter(Number(e.target.value))} className="mt-8 w-full" aria-label="Amita Rasa chapter scrubber" />
      <div className="mt-4 grid gap-px bg-[#C8C3B8] md:grid-cols-5">
        {CHAPTERS.map((c, i) => (
          <button key={c.n} onClick={() => setChapter(i)} className="p-4 text-left" style={{ background: chapter === i ? "#D9822B" : "#F2EFE9", color: chapter === i ? "#fff" : "#0A0A0A" }} aria-pressed={chapter === i}>
            <span className="font-mono2 text-[11px]">{c.n}</span>
            <span className="block font-display text-lg font-bold">{c.name}</span>
          </button>
        ))}
      </div>
      <p className="mt-6 max-w-3xl font-serif2 text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-tight">{CHAPTERS[chapter].text}</p>
    </article>
  );
}

/* ---------- 12 PAPERFELLOWS — archival showcase ---------- */
function PaperFellowsStage() {
  const p = PROJECTS[11];
  return (
    <article onMouseEnter={() => usePortfolio.getState().setProject(11)} className="border-t hairline bg-[#E4E0D8] px-5 py-16 md:px-10">
      <p className="font-mono2 text-[11px] tracking-[0.22em] text-[#5A5751]">ACT IV — CLIENT EXHIBITION · ARCHIVAL</p>
      <div className="mt-4 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <h3 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold leading-[0.9] tracking-[-0.03em]">
            <span className="font-mono2 text-sm tracking-[0.2em] text-[#5A5751]">{p.index} / </span>PaperFellows
          </h3>
          <p className="mt-6 max-w-xl font-serif2 text-[clamp(1.5rem,3vw,2.2rem)] italic leading-tight">A client project, presented as print — quiet, exact, and finished.</p>
        </div>
        <div className="md:col-span-5">
          <div className="border hairline bg-[#F2EFE9] p-5 font-mono2 text-[11px] leading-6 tracking-[0.1em]">
            <p>CLIENT PROJECT</p><p>FIVERR PORTFOLIO PIECE</p><p>STATUS — DELIVERED</p>
            <p className="mt-3 text-[#5A5751]">ARCHIVE NO. 12 / 12 — END OF THE WORKS INDEX</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ActFour() {
  return (
    <div>
      <EvenlyStage />
      <KrynexStage />
      <AmitaRasaStage />
      <PaperFellowsStage />
    </div>
  );
}
