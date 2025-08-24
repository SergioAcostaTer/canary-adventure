"use client";

import { IconButton } from "@/modules/core/components/buttons/IconButton";
import { ToggleThemeButton } from "@/modules/core/components/ToggleThemeButton";
import { Heart, LucideIcon, Search, X, Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";
import { UserAvatar } from "./avatar/UserAvatar";
import LanguageSwitcher from "./buttons/LanguageSwitcher";

export const Header = (
  { animation }: { animation?: boolean } = { animation: false }
) => {
  const [hidden, setHidden] = React.useState(false);
  const [bannerVisible, setBannerVisible] = React.useState(true);
  const lastYRef = React.useRef(0);
  const tickingRef = React.useRef(false);
  const THRESHOLD = 80;
  const DELTA = 0;

  React.useEffect(() => {
    if (!animation) return;
    const onScroll = () => {
      const y = window.scrollY;

      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          if (y <= THRESHOLD) {
            setHidden(false);
          } else {
            const last = lastYRef.current;
            const goingDown = y - last > DELTA;
            const goingUp = last - y > DELTA;

            if (goingDown) setHidden(true);
            else if (goingUp) setHidden(false);
          }

          lastYRef.current = y;
          tickingRef.current = false;
        });
      }
    };

    lastYRef.current = window.scrollY || 0;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [animation]);

  const closeBanner = () => {
    setBannerVisible(false);
  };

  return (
    <>
  {/* <div className="relative z-40 bg-[var(--brand-yellow)] text-neutral-900 border-b border-black/10">
    <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5">
      <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base font-medium">
        <Sparkles
          size={20}
          className="shrink-0 text-neutral-800"
          aria-hidden="true"
        />
        <span className="font-semibold">
          Consigue <strong>3 itinerarios de viaje GRATIS</strong>
        </span>
        <span className="hidden sm:inline">
          generados con nuestra IA al registrarte hoy
        </span>
        <span className="sm:hidden">al registrarte</span>
      </div>

      <button
        onClick={closeBanner}
        className="ml-2 rounded-md p-2 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 transition"
        aria-label="Cerrar banner promocional"
      >
        <X size={18} className="text-neutral-800" aria-hidden="true" />
      </button>
    </div>
  </div> */}


      {/* Main Header */}
      <header
        className={[
          "sticky top-0 z-50 w-full h-[80px]",
          "bg-[var(--header-background)] text-[var(--header-foreground)] border-[var(--header-border)] border-b",
          // smooth slide + performance hint
          "transition-transform duration-300 ease-out will-change-transform",
          hidden ? "-translate-y-full" : "translate-y-0",
        ].join(" ")}
        aria-hidden={hidden}
      >
        <div className="flex items-center justify-between w-full max-w-7xl h-full mx-auto px-4 sm:px-6 gap-6">
          {/* Logo and Search */}
          <div className="flex items-center gap-6 w-full max-w-[70%]">
            {/* Logo */}
            <Link
              className="leading-none text-[22px] font-extrabold tracking-tight uppercase text-left text-[var(--brand-yellow)]"
              href="/"
            >
              CANARY
              <br />
              ADVENTURE
            </Link>

            {/* Search bar */}
            <div className="hidden sm:flex flex-1 h-12 border border-[var(--header-border)] rounded-full overflow-hidden shadow-sm transition-shadow hover:shadow-md max-w-[500px]">
              <div className="flex items-center flex-1 px-4">
                <Search size={18} className="text-[var(--icon-default)] mr-2" />
                <input
                  type="text"
                  placeholder="Encuentra lugares y actividades"
                  className="w-full text-sm bg-transparent focus:outline-none text-[var(--foreground)]"
                />
              </div>
              <button className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] transition-colors duration-200 text-white font-semibold px-5 text-sm rounded-full m-1">
                Buscar
              </button>
            </div>
          </div>

          {/* Right-side icons and theme toggle */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-[var(--text-muted)]">
            {(
              [
                ["Buscar", Search],
                ["Favoritos", Heart],
              ] as [string, LucideIcon][]
            ).map(([label, Icon], i) => (
              <IconButton key={i} icon={Icon} label={label} />
            ))}

            <LanguageSwitcher />

            <ToggleThemeButton />
            <UserAvatar />
          </div>
        </div>
      </header>
    </>
  );
};