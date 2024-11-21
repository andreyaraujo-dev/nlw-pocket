import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./components/ui/button.tsx";
import { setCookie } from "nookies";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card.tsx";
import { InOrbitIcon } from "./components/icons/in-orbit-icon.tsx";
import { version } from "../package.json";
import { useToast } from "./hooks/use-toast.ts";

export function App() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setCookie(null, "access_token", tokenResponse.access_token, {
        maxAge: tokenResponse.expires_in,
        path: "/",
      });
      navigate("/home");
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Error!",
        description: "Não foi possível realizar o login, tente novamente.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Card className="bg-zinc-900 border-none w-80">
        <CardHeader className="flex gap-3 items-center justify-center">
          <CardTitle className="flex justify-center flex-col items-center gap-2">
            <InOrbitIcon />
            <span className="font-bold text-4xl text-zinc-50">in.orbit</span>
          </CardTitle>
          <CardDescription className="flex flex-col">
            <span className="text-zinc-100 font-normal text-lg">
              Bem vindo de volta!
            </span>
            <span className="text-zinc-400 font-normal text-sm">
              Entre com sua conta Google.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center flex-col gap-5">
          <Button type="button" onClick={() => login()}>
            Login com Google
          </Button>
          <span className="text-xs text-zinc-600">versão {version}</span>
        </CardContent>
      </Card>
    </div>
  );
}
