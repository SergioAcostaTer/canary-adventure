import React from "react";

/**
 * Hero section with enhanced visibility over video background:
 * - Strong contrast overlays for readability
 * - Dark mode support with dark: classes
 * - Enhanced shadows and backgrounds
 * - All content remains highly visible over video
 */
const AdventureHero: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-white dark:bg-gray-900">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/videos/intro/intro.webp"
        >
          {/* AV1 (if generated) */}
          <source
            src="/videos/intro/intro-720-av1.mp4"
            type="video/mp4; codecs=av01"
            media="(min-width:640px)"
          />
          <source
            src="/videos/intro/intro-480-av1.mp4"
            type="video/mp4; codecs=av01"
          />
          {/* VP9 primary */}
          <source
            src="/videos/intro/intro-720.webm"
            type="video/webm"
            media="(min-width:640px)"
          />
          <source src="/videos/intro/intro-480.webm" type="video/webm" />
          {/* H.264 fallback */}
          <source
            src="/videos/intro/intro-720.mp4"
            type="video/mp4"
            media="(min-width:640px)"
          />
          <source src="/videos/intro/intro-480.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Enhanced overlay for better content visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 dark:from-black/60 dark:via-black/50 dark:to-black/70"></div>

        {/* Additional subtle overlay for extra contrast */}
        <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 text-sm font-medium shadow-lg">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09z" />
              <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456z" />
            </svg>
            Trending island experiences
          </span>

          <div className="mt-4 p-6 rounded-2xl bg-white/20 dark:bg-gray-900/30 backdrop-blur-md border border-white/30 dark:border-gray-700/30 shadow-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white dark:text-gray-100 drop-shadow-lg">
              Find unforgettable adventures in the{" "}
              <span className="text-amber-400 dark:text-amber-300 drop-shadow-lg">
                Canary Islands
              </span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-100 dark:text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              Surf world‑class beaches, hike ancient volcanoes, and stargaze
              above the clouds — curated by trusted local providers.
            </p>
          </div>

          {/* Value props - enhanced for visibility */}
          {/*     <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-100 dark:text-gray-200">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 shadow-lg">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 shadow-lg">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 shadow-lg">
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
 */}
          {/* Buttons - enhanced for visibility */}
          <div className="mt-8 flex flex-row gap-4 justify-center items-center text-sm sm:text-base">
            <button className="group flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-sm border border-amber-400/50 dark:border-amber-500/50 min-h-[52px] sm:min-h-[56px]">
              <span className="relative z-10 drop-shadow-sm">
                Start planning
              </span>
            </button>

            <button className="group flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-teal-400/80 hover:border-teal-300 dark:border-teal-400 dark:hover:border-teal-300 text-white hover:text-teal-100 dark:text-gray-100 dark:hover:text-teal-200 font-bold rounded-xl bg-white/20 hover:bg-white/30 dark:bg-gray-800/40 dark:hover:bg-gray-700/50 transition-all backdrop-blur-sm shadow-lg hover:shadow-xl min-h-[52px] sm:min-h-[56px]">
              <span className="drop-shadow-sm">Browse experiences</span>
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 drop-shadow-sm"
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
