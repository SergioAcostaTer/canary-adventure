import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  label?: string;
  onClick?: () => void;
  className?: string;
}

export const IconButton = ({ icon: Icon, label, onClick, className }: IconButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center cursor-pointer group ${className}`}
    >
      <Icon
        size={24}
        className="text-[var(--icon-default)] group-hover:text-[var(--brand-primary)] transition-colors"
      />
      {label && (
        <span className="group-hover:text-[var(--brand-primary)] transition-colors text-[10px] sm:text-xs mt-1 hidden sm:block">
          {label}
        </span>
      )}
    </div>
  );
};
