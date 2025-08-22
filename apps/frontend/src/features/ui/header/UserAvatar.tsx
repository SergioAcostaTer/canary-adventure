"use client";

import { useUser } from "@/context/UserContext";
import { User } from "@/types/user";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function AvatarSkeleton() {
  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      {/* Skeleton for status indicator */}
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
    </div>
  );
}

function FallbackIcon() {
  return (
    <div className="relative w-10 h-10 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group">
      <UserIcon
        size={20}
        className="text-gray-500 dark:text-gray-400 group-hover:text-[var(--brand-primary)] transition-colors"
      />
    </div>
  );
}

function InitialsAvatar({ user }: { user: User }) {
  const initials =
    user.fullName
      ?.split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
      {initials}
    </div>
  );
}

function AvatarImage({ user }: { user: User }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (!user.avatarUrl || imageError) {
    return <InitialsAvatar user={user} />;
  }

  return (
    <>
      {/* Show initials while image is loading */}
      {imageLoading && (
        <div className="absolute inset-0 w-full h-full">
          <InitialsAvatar user={user} />
        </div>
      )}

      {/* Next.js Image component for better performance */}
      <Image
        src={user.avatarUrl}
        alt={user.fullName || "User avatar"}
        width={40}
        height={40}
        className={`w-full h-full object-cover rounded-full transition-opacity duration-200 ${
          imageLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setImageLoading(false)}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
        priority={false} // Set to true if this is above the fold
        unoptimized={false} // Set to true if using external image domains
      />
    </>
  );
}

// Online status indicator
function StatusIndicator({ isActive }: { isActive?: boolean }) {
  if (!isActive) return null;

  return (
    <span
      className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
      aria-label="Online"
    />
  );
}

// Main component using context
export function UserAvatar() {
  const { user, loading, error } = useUser();

  // Show skeleton during loading
  if (loading) {
    return <AvatarSkeleton />;
  }

  // Show fallback icon on error or no user
  if (error || !user) {
    return <FallbackIcon />;
  }

  return (
    <div
      className="relative w-10 h-10 flex-shrink-0 overflow-hidden"
      role="img"
      aria-label={`${user.fullName || "User"} avatar`}
    >
      <AvatarImage user={user} />
      <StatusIndicator isActive={user.isActive} />
    </div>
  );
}
