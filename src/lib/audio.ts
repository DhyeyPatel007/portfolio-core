// Procedural Web Audio mechanical micro-click synth.
// Zero assets. 800Hz -> 120Hz, ~12ms envelope. Muted by default;
// only sounds when the user enables sound in the HUD.
let ctx: AudioContext | null = null;

/** Sub-bass camera whoosh for chapter transitions: filtered noise sweep. */
export function whoosh() {
  try {
    if (!ctx) ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    if (ctx.state === "suspended") void ctx.resume();
    const t = ctx.currentTime;
    const len = Math.floor(ctx.sampleRate * 0.5);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 1.2;
    filter.frequency.setValueAtTime(1200, t);
    filter.frequency.exponentialRampToValueAtTime(180, t + 0.45);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.09, t + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start(t);
    src.stop(t + 0.5);
  } catch {
    // Audio is decorative; never break the page.
  }
}

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
