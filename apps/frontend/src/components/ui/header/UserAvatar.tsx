"use client";

import { getMe } from "@/lib/api/services/auth";
import { User } from "@/types/user";
import { User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();
        setUser(user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}

function FallbackIcon() {
  return (
    <UserIcon
      size={24}
      className="text-[var(--icon-default)] group-hover:text-[var(--brand-primary)] transition-colors"
    />
  );
}

function AvatarSkeleton() {
  return <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />;
}

export function UserAvatar() {
  const { user, loading } = useUser();

  if (loading) {
    return <AvatarSkeleton />;
  }

  if (!user) {
    return <FallbackIcon />;
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
    const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallbackElement) {
      fallbackElement.classList.remove("hidden");
    }
  };

  return (
    <div className="relative w-10 h-10 overflow-hidden">
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.fullName}
          className="w-full h-full object-cover rounded-full"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {user.fullName?.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Fallback initials (hidden by default, shown if image fails) */}
      <div className="hidden absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
        {user.fullName?.charAt(0).toUpperCase()}
      </div>

      {/* Online status indicator */}
      {user.isActive && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
}
