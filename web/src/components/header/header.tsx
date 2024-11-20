import { googleLogout } from "@react-oauth/google";
import { destroyCookie } from "nookies";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { userStore } from "@/stores/user";

export function Header() {
  const navigate = useNavigate();
  const clearUserData = userStore((state) => state.clear);
  const user = userStore((state) => state.user);

  function handleLogout() {
    googleLogout();
    clearUserData();
    navigate("/");
    destroyCookie(null, "access_token");
  }

  return (
    <header className="flex justify-between items-center w-full h-16 px-24 py-8 border-b border-b-zinc-800">
      <span className="flex gap-3 items-center">
        <img
          src={user.imageUrl}
          className="rounded-full w-10 h-10"
          alt={user.name}
        />

        <span>
          <p className="text-zinc-100 font-bold text-lg">{user.name}</p>
          <p className="text-zinc-400 font-normal text-sm">{user.email}</p>
        </span>
      </span>

      <div>
        <Button
          variant="link"
          className="text-base font-normal text-red-300"
          onClick={() => handleLogout()}
        >
          Sair
        </Button>
      </div>
    </header>
  );
}
