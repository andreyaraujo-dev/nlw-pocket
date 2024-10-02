import { parseCookies } from "nookies";

export async function getUserProfile(): Promise<{
  name: string;
  email: string;
}> {
  const cookies = parseCookies();

  if (!cookies.access_token) throw new Error("unauthorized");

  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${cookies.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${cookies.access_token}`,
        Accept: "application/json",
      },
      method: "GET",
    }
  );

  const data = await response.json();

  return {
    name: data.name,
    email: data.email,
  };
}
