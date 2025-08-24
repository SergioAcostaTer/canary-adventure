import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

type FirstButtonProps = {
  text: string;
  ariaLabel?: string;
  title?: string;
  href: string;
};
export const FirstButton = ({
  text,
  ariaLabel,
  title,
  href,
}: FirstButtonProps) => {
  const classes =
    "group inline-flex items-center justify-center " +
    "px-4 sm:px-6 py-2.5 sm:py-4 " +
    "text-sm sm:text-base md:text-lg font-bold " +
    "bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 " +
    "text-white dark:text-black " +
    "rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl " +
    "border border-amber-700 dark:border-amber-300 " +
    "min-h-[48px] sm:min-h-[56px] cursor-pointer";

  const label = ariaLabel ?? text;

  return (
    <Link
      href={href as never}
      prefetch
      aria-label={label}
      title={title ?? text}
      className={classes}
    >
      <span className="relative z-10 drop-shadow-sm text-center whitespace-normal break-words">
        {text}
      </span>
    </Link>
  );
};

export const SecondButton = ({
  text,
  ariaLabel,
  title,
  href,
}: FirstButtonProps) => {
  const classes =
    "group flex items-center justify-center " +
    "px-4 sm:px-6 py-2.5 sm:py-4 " +
    "text-sm sm:text-base md:text-lg font-bold " +
    "border-2 border-teal-400/80 hover:border-teal-300 " +
    "dark:border-teal-400 dark:hover:border-teal-300 " +
    "text-white hover:text-teal-100 dark:text-gray-100 dark:hover:text-teal-200 " +
    "rounded-xl bg-white/20 hover:bg-white/30 dark:bg-gray-800/40 dark:hover:bg-gray-700/50 " +
    "transition-all backdrop-blur-sm shadow-lg hover:shadow-xl " +
    "min-h-[48px] sm:min-h-[56px] cursor-pointer";

  return (
    <Link
      className={classes}
      aria-label={ariaLabel}
      title={title}
      href={href as never}
      prefetch
    >
      <span className="drop-shadow-sm text-center whitespace-normal break-words">
        {text}
      </span>
      <svg
        className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200 drop-shadow-sm"
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
    </Link>
  );
};

export default async function Hero() {
  const t = await getTranslations("hero");
  return (
    <div className="relative max-w-full overflow-hidden sm:rounded-2xl shadow-lg px-4 sm:mt-6 sm:mx-4">
      <div className="absolute inset-0 bg-white dark:bg-gray-900">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/videos/intro/intro.webp"
          role="presentation"
          aria-hidden="true"
        >
          {/* AV1 first (if supported) */}
          <source
            src="/videos/intro/intro-720-av1.mp4"
            type="video/mp4; codecs=av01"
            media="(min-width:640px)"
          />
          <source
            src="/videos/intro/intro-480-av1.mp4"
            type="video/mp4; codecs=av01"
          />
          {/* VP9 WebM */}
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
          {/*           <track
            kind="captions"
            src="/videos/intro/no-audio.vtt"
            srcLang="en"
            label="English"
            default
          /> */}
          Your browser does not support the video tag.
        </video>

        {/* Enhanced overlay for better content visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 dark:from-black/10 dark:via-black/20 dark:to-black/70" />

        {/* Additional subtle overlay for extra contrast */}
        <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 text-sm font-medium shadow-lg cursor-default">
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
            {t("badge")}
          </span>

          <div className="mt-4 p-6 rounded-2xl bg-white/20 dark:bg-gray-900/30 backdrop-blur-md border border-white/30 dark:border-gray-700/30 shadow-2xl">
            <h1 className="text-xl md:text-4xl font-bold tracking-tight text-white dark:text-gray-100 drop-shadow-lg">
              <span className="text-amber-400 dark:text-amber-300 drop-shadow-lg">
                {t("titleHighlight")}
              </span>{" "}
              {t("title")}
            </h1>
            <p className="mt-4 text-md md:text-xl text-gray-100 dark:text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              {t.rich("subtitle", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </div>

          {/* Buttons - enhanced for visibility */}
          <div className="mt-8 flex flex-row gap-4 justify-center items-center text-sm sm:text-base">
            <FirstButton
              text={t("buttons.planTrip.text")}
              ariaLabel={t("buttons.planTrip.ariaLabel")}
              title={t("buttons.planTrip.title")}
              href="/planner"
            />
            <SecondButton
              text={t("buttons.exploreExperiences.text")}
              ariaLabel={t("buttons.exploreExperiences.ariaLabel")}
              title={t("buttons.exploreExperiences.title")}
              href="/experiences"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-100 dark:text-gray-200">
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
</div>;
 */
}
