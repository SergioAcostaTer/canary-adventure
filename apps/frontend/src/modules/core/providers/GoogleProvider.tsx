"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

export function GoogleProviders({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.warn("Google Client ID is not defined");
    return <>{children}</>;
  }

  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
    </React.StrictMode>
  );
}
