import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

interface GoogleAuthProviderProps {
  children: ReactNode;
}

export function GoogleOAuthCustomProvider({
  children,
}: GoogleAuthProviderProps) {
  const GOOGLE_OAUTH_CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}
