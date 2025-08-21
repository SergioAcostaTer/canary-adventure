import React from "react";

/**
 * Hero section restyled to better match Canary Adventure's vibe:
 * - Bright, optimistic sunrise-to-ocean gradient
 * - Subtle island/wave illustration background (pure SVG, no assets)
 * - Warmer marketing palette (amber/teal/sky)
 * - Simplified: no input form, max-h 400
 */
const AdventureHero: React.FC = () => {
  return (
    <div className="relative w-full max-h-[400px] overflow-hidden rounded-lg shadow-lg">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-50" />

      {/* Sun + glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-amber-300/70 blur-3xl opacity-60" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-amber-400 shadow-[0_0_120px_rgba(251,191,36,0.8)]" />

      {/* Decorative waves (SVG) */}
      <svg
        aria-hidden
        className="absolute bottom-0 left-0 w-[140%] max-w-none translate-y-1"
        viewBox="0 0 1440 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 140 C 180 120, 360 180, 540 160 C 720 140, 900 100, 1080 120 C 1260 140, 1350 130, 1440 120 L 1440 300 L 0 300 Z"
          fill="url(#wave1)"
        />
        <path
          d="M0 170 C 200 160, 380 200, 560 190 C 740 180, 940 150, 1140 170 C 1300 185, 1380 180, 1440 175 L 1440 300 L 0 300 Z"
          fill="url(#wave2)"
          opacity=".9"
        />
        <path
          d="M0 200 C 240 210, 420 230, 700 220 C 980 210, 1200 190, 1440 210 L 1440 300 L 0 300 Z"
          fill="url(#wave3)"
          opacity=".85"
        />
        <defs>
          <linearGradient id="wave1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#99f6e4" />
          </linearGradient>
          <linearGradient id="wave2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
          <linearGradient id="wave3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur border border-sky-200 text-sky-700 text-sm font-medium shadow-sm">
            <span className="i-lucide-sparkles" aria-hidden /> Trending island
            experiences
          </span>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
            Find unforgettable adventures in the{" "}
            <span className="text-amber-600">Canary Islands</span>
          </h1>
          <p className="mt-3 text-lg md:text-xl text-slate-700 max-w-3xl mx-auto">
            Surf world‑class beaches, hike ancient volcanoes, and stargaze above
            the clouds — curated by trusted local providers.
          </p>

          {/* Value props */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-700">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 border border-slate-200 shadow-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Free cancellation on many tours
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 border border-slate-200 shadow-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 12H4" />
                <path d="M14 6l6 6-6 6" />
              </svg>
              Instant booking & secure payments
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 border border-slate-200 shadow-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Local guides, top‑rated reviews
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl">
              <span className="relative z-10">Start planning</span>
            </button>
            <button className="group px-8 py-4 border-2 border-teal-500/40 hover:border-teal-600 text-teal-700 hover:text-teal-800 font-semibold rounded-xl bg-white/70 backdrop-blur transition-all">
              Browse experiences
              <svg
                className="inline-block ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdventureHero;
