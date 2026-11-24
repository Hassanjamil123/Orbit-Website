import Image from "next/image";

/*
 * Hero visual: a window into the Orbit universe. The glowing ring is the official
 * extracted logo asset (public/brand/orbit-icon-glow); the astronauts, stars and
 * light are drawn here in SVG. Decorative only (aria-hidden). The slow drift is
 * the page's one ambient motion and stops under prefers-reduced-motion.
 */

// Deterministic star field (no randomness, so server and client render the same).
const hash = (n: number) => {
  const v = Math.sin(n * 12.9898) * 43758.5453;
  return v - Math.floor(v);
};
const STARS = Array.from({ length: 70 }, (_, i) => {
  const x = 2 + hash(i + 1) * 96;
  const y = 2 + hash(i + 101) * 96;
  const r = i % 11 === 0 ? 1.4 : i % 3 === 0 ? 0.9 : 0.55;
  const o = 0.25 + ((i * 29) % 60) / 100;
  return { x, y, r, o };
});

type Paint = { suit: string; limb: string; pack: string };

/** The figure's volumes, drawn once per paint (rim-light copy, then the body). */
function Figure({ p }: { p: Paint }) {
  return (
    <>
      <g strokeLinecap="round" strokeLinejoin="round" fill="none" stroke={p.limb}>
        <path d="M44 62 L32 80 L31 98" strokeWidth="12.5" />
        <path d="M50 102 L45 124 L48 142" strokeWidth="14" />
      </g>
      <rect x="40" y="38" width="44" height="56" rx="9" fill={p.pack} />
      <rect x="33" y="50" width="40" height="56" rx="15" fill={p.suit} />
      <g strokeLinecap="round" strokeLinejoin="round" fill="none" stroke={p.limb}>
        <path d="M68 62 L84 76 L90 94" strokeWidth="12.5" />
        <path d="M63 102 L70 124 L67 143" strokeWidth="14" />
      </g>
      <circle cx="55" cy="33" r="22" fill={p.suit} />
    </>
  );
}

function Astronaut({ id, light = false }: { id: string; light?: boolean }) {
  const rim: Paint = { suit: "#b9a2ff", limb: "#b9a2ff", pack: "#8f73ff" };
  const body: Paint = { suit: `url(#${id}-suit)`, limb: `url(#${id}-limb)`, pack: light ? "#c9c5d8" : "#1d1a2c" };
  const suit = light ? ["#ffffff", "#e4e1ee", "#a8a3bd"] : ["#8b86a3", "#4a4661", "#1c1a29"];
  const limb = light ? ["#ffffff", "#d6d2e3", "#9792ad"] : ["#7d7896", "#3f3b55", "#191725"];
  return (
    <svg viewBox="0 0 120 150" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id={`${id}-suit`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={suit[0]} />
          <stop offset="0.45" stopColor={suit[1]} />
          <stop offset="1" stopColor={suit[2]} />
        </linearGradient>
        <linearGradient id={`${id}-limb`} gradientUnits="userSpaceOnUse" x1="20" y1="30" x2="100" y2="145">
          <stop offset="0" stopColor={limb[0]} />
          <stop offset="0.5" stopColor={limb[1]} />
          <stop offset="1" stopColor={limb[2]} />
        </linearGradient>
        <radialGradient id={`${id}-visor`} cx="0.3" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#d9c4ff" />
          <stop offset="0.25" stopColor="#7c4dff" />
          <stop offset="0.7" stopColor="#21124f" />
          <stop offset="1" stopColor="#07060f" />
        </radialGradient>
      </defs>
      {/* violet rim light from the ring (upper left), then the body over it */}
      {light ? null : (
        <g transform="translate(-2.3 -1.7)" opacity="0.95">
          <Figure p={rim} />
        </g>
      )}
      <Figure p={body} />
      <rect x="41" y="64" width="16" height="10" rx="2.5" fill={light ? "#5f5a78" : "#12101d"} opacity="0.7" />
      <circle cx="45.5" cy="69" r="1.4" fill="#9b7bff" />
      <ellipse cx="60" cy="33" rx="15" ry="12.5" fill={`url(#${id}-visor)`} />
      <ellipse cx="54" cy="28" rx="4.5" ry="2.2" fill="white" opacity="0.55" transform="rotate(-25 54 28)" />
    </svg>
  );
}

export function HeroSpace({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`relative isolate w-full overflow-hidden rounded-xl bg-[#07060f] shadow-[0_40px_80px_-40px_rgba(40,20,90,0.55)] ${compact ? "aspect-square" : "aspect-square sm:aspect-[5/4] lg:aspect-[4/5]"} ${className}`}
    >
      {/* deep-space light: one soft violet bloom behind the ring */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_52%_46%,rgba(120,70,240,0.32),transparent_70%),radial-gradient(90%_70%_at_50%_110%,rgba(60,40,140,0.35),transparent_70%)]" />

      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.18} fill="white" opacity={s.o} />
        ))}
      </svg>

      {/* the official glowing ring */}
      <div className="absolute left-1/2 top-[46%] w-[68%] -translate-x-1/2 -translate-y-1/2">
        <Image src="/brand/orbit-icon-glow.webp" alt="" width={403} height={381} priority={!compact} className="h-auto w-full" />
      </div>

      {/* astronauts: one near, drifting across the ring; one far, small and dim */}
      <div className="space-drift-a absolute left-[56%] top-[56%] w-[21%]">
        <Astronaut id={compact ? "c1" : "a1"} />
      </div>
      {compact ? null : (
      <div className="space-drift-b absolute left-[16%] top-[19%] w-[9%] opacity-60 blur-[0.4px]">
        <div className="-rotate-[28deg] -scale-x-100">
          <Astronaut id="a2" />
        </div>
      </div>
      )}

      {/* tether between them, very faint */}
      {compact ? null : (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M21 28 C 38 31, 50 48, 62 60" stroke="white" strokeOpacity="0.12" strokeWidth="0.25" fill="none" />
      </svg>
      )}

      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-[#07060f] to-transparent" />
    </div>
  );
}

/**
 * Hero background on white: astronauts in white suits drifting in the
 * background. Fills its parent (absolute inset-0).
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden bg-canvas">
      {/* faint star specks in brand violet */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        {STARS.map((st, i) => (
          <circle key={i} cx={st.x * 16} cy={st.y * 9} r={st.r * 1.3} fill="#7b35e8" opacity={st.o * 0.28} />
        ))}
      </svg>

      {/* astronauts: one near (lower right), one far (upper left) */}
      <div className="space-drift-a absolute right-[5%] top-[86%] w-[14vw] min-w-[3.2rem] max-w-[9.5rem] drop-shadow-[0_18px_24px_rgba(60,40,120,0.18)] sm:right-[4%] sm:top-[60%] sm:w-[18vw] lg:right-[11%] lg:top-[58%]">
        <Astronaut id="bg1" light />
      </div>
      <div className="space-drift-b absolute left-[7%] top-[3%] w-[9vw] min-w-[1.8rem] max-w-[4.5rem] opacity-70 drop-shadow-[0_10px_14px_rgba(60,40,120,0.14)] sm:top-[14%] lg:left-[13%]">
        <div className="-rotate-[28deg] -scale-x-100">
          <Astronaut id="bg2" light />
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(36%_38%_at_50%_50%,rgba(255,255,255,0.85),transparent_75%)]" />
    </div>
  );
}
