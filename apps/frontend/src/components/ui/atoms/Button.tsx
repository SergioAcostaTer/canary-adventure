import { cn } from "@/lib/utils/cn";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost" | "outline" | "accent";
  }
> = ({ className, children, variant = "primary", ...props }) => {
  const base =
    "active:scale-[.99] transition rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  const styles = {
    primary: "bg-[var(--brand-primary)] text-white shadow-sm px-4 py-3",
    accent: "bg-[var(--brand-accent)] text-white shadow-sm px-4 py-3",
    ghost: "bg-transparent text-[var(--brand-primary)] px-2 py-2",
    outline:
      "border border-black/10 text-gray-900 bg-white hover:bg-black/[.03] px-4 py-3",
  }[variant];
  return (
    <button className={cn(base, styles, className)} {...props}>
      {children}
    </button>
  );
};
