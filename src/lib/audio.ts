// Procedural Web Audio mechanical micro-click synth.
// Zero assets. 800Hz -> 120Hz, ~12ms envelope. Muted by default;
// only sounds when the user enables sound in the HUD.
let ctx: AudioContext | null = null;

export function tick() {
  try {
    if (!ctx) ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.012);
    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.014);
  } catch {
    // Audio is decorative; never break the page.
  }
}
