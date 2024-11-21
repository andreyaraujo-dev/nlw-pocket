import { userStore } from "@/stores/user";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRoutesProps {
  component: JSX.Element;
}

export function PrivateRoute({ component }: PrivateRoutesProps) {
  const navigate = useNavigate();
  const clearUserData = userStore((state) => state.clear);

  function isAuthenticated() {
    const { access_token } = parseCookies();
    if (!access_token) {
      navigate("/");
      clearUserData();
    }
  }

  useEffect(() => {
    isAuthenticated();
  }, []);

  return component;
}
