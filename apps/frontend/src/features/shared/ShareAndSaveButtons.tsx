import { Heart, Share } from "lucide-react";

export const ShareAndSaveButtons = ({
  className = "text-[var(--text-secondary)]",
}) => (
  <div className={`flex items-center gap-2 justify-end ${className}`}>
    <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
      <Share className="w-4 h-4" />
      <span className="hidden sm:inline">Share</span>
    </button>
    <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium  hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
      <Heart className="w-4 h-4" />
      <span className="hidden sm:inline">Save</span>
    </button>
  </div>
);
