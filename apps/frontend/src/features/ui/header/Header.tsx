import { ToggleThemeButton } from "@/features/shared/ToggleThemeButton";
import { Globe, Heart, Search } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full h-[80px] bg-[var(--header-background)] shadow-sm border-b text-[var(--header-foreground)] border-[var(--header-border)]">
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
          <div className="flex flex-col items-center cursor-pointer group">
            <Search
              size={24}
              className="text-[var(--icon-default)] group-hover:text-[var(--brand-primary)] transition-colors"
            />
            <span className="group-hover:text-[var(--brand-primary)] transition-colors text-[10px] sm:text-xs mt-1 hidden sm:block">
              Buscar
            </span>
          </div>

          {(
            [
              ["Favoritos", Heart],
              ["ES/EUR €", Globe],
            ] as [string, React.ElementType][]
          ).map(([label, Icon], i) => (
            <div
              key={i}
              className="flex flex-col items-center cursor-pointer group"
            >
              <Icon
                size={24}
                className="text-[var(--icon-default)] group-hover:text-[var(--brand-primary)] transition-colors"
              />
              <span className="group-hover:text-[var(--brand-primary)] transition-colors text-[10px] sm:text-xs mt-1 hidden sm:block">
                {label}
              </span>
            </div>
          ))}

          <ToggleThemeButton />
          <UserAvatar />
        </div>
      </div>
    </header>
  );
};
