import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./components/ui/button.tsx";
import { setCookie } from "nookies";
import { useNavigate } from "react-router-dom";

export function App() {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setCookie(null, "access_token", tokenResponse.access_token, {
        maxAge: tokenResponse.expires_in,
        path: "/",
      });
      navigate("/home");
    },
    onError: (error) => console.error(error),
  });

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Button type="button" onClick={() => login()}>
        Login com Google
      </Button>
    </div>
  );
}
