import { cn } from "@/lib/utils/cn";
import * as React from "react";

export function BadgePill({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "rounded-full bg-black/70 px-2 py-1 text-[10px] text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
