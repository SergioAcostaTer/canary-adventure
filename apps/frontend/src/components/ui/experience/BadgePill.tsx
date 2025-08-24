import * as React from "react";

export function BadgePill({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={`rounded-full bg-black/70 px-2 py-1 text-[10px] ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
