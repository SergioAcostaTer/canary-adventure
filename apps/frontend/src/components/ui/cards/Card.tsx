import { cn } from "@/lib/utils/cn";

const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  role?: string;
  tabIndex?: number;
}> = ({
  children,
  className,
  ref,
  onClick,
  onKeyDown,
  role = "button",
  tabIndex,
}) => (
  <div
    className={cn(
      "rounded-3xl border border-black/10 bg-white shadow-sm dark:border-white/20 dark:bg-gray-900",
      className
    )}
    role={role}
    ref={ref}
    onClick={onClick}
    onKeyDown={onKeyDown}
    tabIndex={tabIndex}
  >
    {children}
  </div>
);

export { Card };
