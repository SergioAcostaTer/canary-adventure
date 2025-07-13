"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
}

interface GoogleSignInConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  ux_mode?: "popup" | "redirect";
}

interface GoogleNotification {
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
  getDismissedReason?: () => string;
  getNotDisplayedReason?: () => string;
  getSkippedReason?: () => string;
}

interface GoogleAccounts {
  id: {
    initialize: (config: GoogleSignInConfig) => void;
    prompt: (callback?: (notification: GoogleNotification) => void) => void;
    cancel: () => void;
    disableAutoSelect: () => void;
  };
}

interface GoogleGlobal {
  accounts: GoogleAccounts;
}

declare global {
  interface Window {
    google?: GoogleGlobal;
  }
}

interface ApiError {
  message: string;
  error?: string;
}

interface UseGoogleAuthReturn {
  isLoading: boolean;
  error: string;
  isGoogleLoaded: boolean;
  signIn: () => Promise<void>;
  clearError: () => void;
}

export function useGoogleAuth(): UseGoogleAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  useEffect(() => {
    const loadGoogleScript = () => {
      if (typeof window === "undefined") return;

      if (window.google) {
        setIsGoogleLoaded(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src*="accounts.google.com/gsi/client"]'
      );
      if (existingScript) {
        existingScript.addEventListener("load", () => setIsGoogleLoaded(true));
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleLoaded(true);
      script.onerror = () => setError("Error al cargar Google Sign-In");
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  const handleCredentialResponse = useCallback(
    async (response: GoogleCredentialResponse) => {
      if (!response.credential) {
        setError("No se pudo obtener las credenciales de Google");
        setIsLoading(false);
        return;
      }

      try {
        const apiResponse = await fetch("http://localhost:8000/auth/google", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: response.credential,
          }),
        });

        if (!apiResponse.ok) {
          const errorData: ApiError = await apiResponse.json().catch(() => ({
            message: "Error de autenticación",
          }));
          throw new Error(errorData.message || "Falló la autenticación");
        }

        router.push("/");
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al iniciar sesión";
        setError(errorMessage);
        console.error("Login error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    if (!isGoogleLoaded || !CLIENT_ID || isInitialized) return;

    try {
      window.google?.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
        ux_mode: "popup", // Force popup mode
      });

      setIsInitialized(true);
    } catch (err) {
      console.error("Error initializing Google Sign-In:", err);
      setError("Error al inicializar Google Sign-In");
    }
  }, [isGoogleLoaded, CLIENT_ID, handleCredentialResponse, isInitialized]);

  const signIn = useCallback(async () => {
    if (!window.google || !isGoogleLoaded || !isInitialized) {
      setError("Google Sign-In no está disponible");
      return;
    }

    if (isLoading) return;

    if (!CLIENT_ID) {
      setError("Google Client ID no configurado");
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      window.google.accounts.id.disableAutoSelect();

      window.google.accounts.id.prompt((notification: GoogleNotification) => {
        console.log("Prompt result:", notification);

        if (notification.isNotDisplayed()) {
          console.warn(
            "Google prompt not displayed:",
            notification.getNotDisplayedReason?.()
          );
          setError(
            "El popup de Google fue bloqueado o no se pudo mostrar. Verifica que no esté bloqueado por tu navegador."
          );
          setIsLoading(false);
        } else if (notification.isSkippedMoment()) {
          console.warn(
            "Google prompt skipped:",
            notification.getSkippedReason?.()
          );
          setError("Inicio de sesión cancelado.");
          setIsLoading(false);
        }
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(errorMessage);
      console.error("Login error:", err);
      setIsLoading(false);
    }
  }, [isGoogleLoaded, isInitialized, isLoading, CLIENT_ID]);

  const clearError = useCallback(() => {
    setError("");
  }, []);

  return {
    isLoading,
    error,
    isGoogleLoaded: isGoogleLoaded && isInitialized,
    signIn,
    clearError,
  };
}
